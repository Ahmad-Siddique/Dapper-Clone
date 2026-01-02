// app/case-studies/[slug]/page.jsx
import SingleCaseStudy from "../../../../components/case-studies/SingleCaseStudy";


export default async function CaseStudyDetailPage({ params }) {
  // In Next.js 13+, params might be a Promise, so we await it
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || resolvedParams;
  
  return (
    <div>
      <SingleCaseStudy params={{ slug }} />
    </div>
  );
}
