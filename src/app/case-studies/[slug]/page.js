// app/case-studies/[slug]/page.jsx
import SingleCaseStudy from "../../../../components/case-studies/SingleCaseStudy";


export default function CaseStudyDetailPage({ params }) {
  return (
    <div>
      <SingleCaseStudy params={params} />
    </div>
  );
}
