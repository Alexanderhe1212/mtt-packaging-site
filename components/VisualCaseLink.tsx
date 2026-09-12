import {caseForImage,visualStudies} from '../lib/visual-cases';
export default function VisualCaseLink({image}:{image?:string}){const id=caseForImage(image);if(!id)return null;const [slug,title]=visualStudies[id];return <a className="visual-case-link" href={`/insights/${slug}`}><span>Related packaging study</span>{title} <span aria-hidden="true">→</span></a>}
