"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ReadMoreBlogs({ posts = [], currentSlug = '', theme = 'light' }) {
  const isDark = theme === 'dark';

  // Filter out current post and limit to 4 related posts
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, 4);

  // Return null if no related posts
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section
      className={`relative py-16 md:py-20 lg:py-24 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F5]'}`}
    >
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Header - Left Aligned */}
        <div className="mb-12">
          <h2 className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-bold leading-[1.1] ${
            isDark ? 'text-white' : 'text-[#111111]'
          }`}>
            Read <span className="italic font-light">more</span> blogs
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          
          {relatedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      {post.authorAvatar ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={post.authorAvatar}
                            alt={post.author}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-semibold bg-[#111111] text-white">
                          {post.author?.charAt(0) || 'A'}
                        </div>
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          {post.author}
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
