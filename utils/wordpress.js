// WordPress API utility functions
const WORDPRESS_API_URL = 'https://app.thetecheyrie.com/wp-json/wp/v2';
const WORDPRESS_GRAPHQL_URL = 'https://app.thetecheyrie.com/graphql';

// Try GraphQL first, fallback to REST
const USE_GRAPHQL = true;

/**
 * Transform WordPress post data to our app's format
 */
export function transformWordPressPost(wpPost, featuredMedia = null) {
  // Extract category name (default to "Other" if no category)
  let category = "Other";
  if (wpPost._embedded && wpPost._embedded['wp:term'] && wpPost._embedded['wp:term'][0]) {
    // Get category from embedded terms
    const categories = wpPost._embedded['wp:term'][0];
    if (categories && categories.length > 0) {
      category = categories[0].name || "Other";
    }
  } else if (wpPost.categories && wpPost.categories.length > 0) {
    // Fallback: map category IDs to names (you may need to adjust this based on your WordPress setup)
    const categoryId = wpPost.categories[0];
    // Common WordPress category IDs - adjust based on your setup
    category = categoryId === 8 ? "Demand Generation" : "Other";
  }

  // Calculate read time from content (rough estimate: 200 words per minute)
  const wordCount = wpPost.content?.rendered 
    ? wpPost.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length 
    : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Get featured image URL
  let imageUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"; // Default fallback
  if (featuredMedia && featuredMedia.source_url) {
    imageUrl = featuredMedia.source_url;
  } else if (wpPost._embedded && wpPost._embedded['wp:featuredmedia'] && wpPost._embedded['wp:featuredmedia'][0]) {
    imageUrl = wpPost._embedded['wp:featuredmedia'][0].source_url;
  }

  // Format date
  const date = new Date(wpPost.date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return {
    id: wpPost.id,
    title: wpPost.title?.rendered || wpPost.title || '',
    category: category,
    author: wpPost._embedded?.author?.[0]?.name || 'Admin',
    readTime: `${readTime} min read`,
    date: formattedDate,
    slug: wpPost.slug,
    image: imageUrl,
    content: wpPost.content?.rendered || wpPost.content || '',
    excerpt: wpPost.excerpt?.rendered || wpPost.excerpt || '',
    link: wpPost.link || '',
  };
}

/**
 * Fetch all posts from WordPress using GraphQL
 */
async function fetchWordPressPostsGraphQL() {
  try {
    const query = `
      query GetPosts {
        posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            slug
            date
            content
            excerpt
            author {
              node {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `;

    const response = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data.posts.nodes.map(post => ({
      id: post.id,
      title: post.title || '',
      category: post.categories?.nodes?.[0]?.name || 'Other',
      author: post.author?.node?.name || 'Admin',
      readTime: calculateReadTime(post.content || ''),
      date: formatDate(post.date),
      slug: post.slug,
      image: post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      content: post.content || '',
      excerpt: post.excerpt || '',
      link: `https://app.thetecheyrie.com/${post.slug}/`,
    }));
  } catch (error) {
    console.error('Error fetching WordPress posts via GraphQL:', error);
    return null;
  }
}

/**
 * Fetch all posts from WordPress API (REST fallback)
 */
async function fetchWordPressPostsREST() {
  try {
    // Fetch posts with embedded featured media and author
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?_embed&per_page=100&orderby=date&order=desc`
    );
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts = await response.json();
    
    // Transform each post
    return posts.map(post => transformWordPressPost(post));
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return null; // Return null on error to trigger fallback
  }
}

/**
 * Fetch all posts from WordPress API (tries GraphQL first, falls back to REST)
 */
export async function fetchWordPressPosts() {
  if (USE_GRAPHQL) {
    const graphqlPosts = await fetchWordPressPostsGraphQL();
    if (graphqlPosts) {
      return graphqlPosts;
    }
    // Fallback to REST if GraphQL fails
    console.log('GraphQL failed, falling back to REST API');
  }
  return await fetchWordPressPostsREST();
}

/**
 * Helper function to calculate read time
 */
function calculateReadTime(content) {
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  return `${readTime} min read`;
}

/**
 * Helper function to format date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Fetch a single post by slug from WordPress using GraphQL
 */
async function fetchWordPressPostBySlugGraphQL(slug) {
  try {
    const query = `
      query GetPost($slug: String!) {
        postBy(slug: $slug) {
          id
          title
          slug
          date
          content
          excerpt
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    `;

    const response = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query,
        variables: { slug }
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    if (!result.data.postBy) {
      return null;
    }

    const post = result.data.postBy;

    return {
      id: post.id,
      title: post.title || '',
      category: post.categories?.nodes?.[0]?.name || 'Other',
      author: post.author?.node?.name || 'Admin',
      readTime: calculateReadTime(post.content || ''),
      date: formatDate(post.date),
      slug: post.slug,
      image: post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      content: post.content || '',
      excerpt: post.excerpt || '',
      link: `https://app.thetecheyrie.com/${post.slug}/`,
    };
  } catch (error) {
    console.error('Error fetching WordPress post via GraphQL:', error);
    return null;
  }
}

/**
 * Fetch a single post by slug from WordPress API (REST fallback)
 */
async function fetchWordPressPostBySlugREST(slug) {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`
    );
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts = await response.json();
    
    if (posts.length === 0) {
      return null;
    }

    return transformWordPressPost(posts[0]);
  } catch (error) {
    console.error('Error fetching WordPress post:', error);
    return null; // Return null on error to trigger fallback
  }
}

/**
 * Fetch a single post by slug from WordPress API (tries GraphQL first, falls back to REST)
 */
export async function fetchWordPressPostBySlug(slug) {
  if (USE_GRAPHQL) {
    const graphqlPost = await fetchWordPressPostBySlugGraphQL(slug);
    if (graphqlPost) {
      return graphqlPost;
    }
    // Fallback to REST if GraphQL fails
    console.log('GraphQL failed, falling back to REST API');
  }
  return await fetchWordPressPostBySlugREST(slug);
}

/**
 * Fetch featured media for a post
 */
export async function fetchFeaturedMedia(mediaId) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/media/${mediaId}`);
    
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching featured media:', error);
    return null;
  }
}
