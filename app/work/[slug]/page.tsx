import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { works } from "@/data/works";
import { buildMetadata } from "@/config/site.config";
import HeroWorkSingle from "@/components/sections/HeroWorkSingle";
import GridBackground from "@/components/GridBackground";
import CtaNextProject from "@/components/sections/CtaNextProject";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return works.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: Props) {
 const {slug}=await params; const work=works.find(w=>w.slug===slug);
 return work ? buildMetadata({title: work.title, description: work.description, alternates:{canonical:`/work/${slug}`}}) : {};
}
export default async function WorkPage({params}: Props) {
 const {slug}=await params; const index=works.findIndex(w=>w.slug===slug);
 if(index<0) notFound(); const work=works[index]; const next=works[(index+1)%works.length];
 return <article className="fp-work-single">
 <GridBackground/><HeroWorkSingle heroImage={work.heroImage} title={work.title}/>
 <section className="container relative z-2 py-16 md:py-24">
 <p className="text-sm mb-4">{work.status}</p>
 <h1 className="text-4xl md:text-6xl mb-8">{work.title}</h1>
 <p className="text-xl max-w-3xl leading-relaxed mb-10">{work.description}</p>
 <dl className="grid md:grid-cols-3 gap-8 border-y border-neutral-400 py-8 mb-12">
 <div><dt className="text-sm mb-2">My role</dt><dd>{work.role}</dd></div>
 <div><dt className="text-sm mb-2">Design</dt><dd>{work.design}</dd></div>
 <div><dt className="text-sm mb-2">Collaboration</dt><dd>{work.context}</dd></div>
 </dl>
 <h2 className="text-2xl md:text-3xl mb-5">{work.challenge}</h2>
 <p className="max-w-3xl text-lg leading-relaxed mb-8">{work.body}</p>
 {work.result && <p className="max-w-3xl text-base leading-relaxed mb-8">{work.result}</p>}
 {work.url && <a className="fp-btn fp-btn-filled-1 mb-10 inline-block" href={work.url} target="_blank" rel="noopener noreferrer">Visit website ↗</a>}
 <Image src={work.detailImage} alt={`${work.title} — ${work.challenge}`} width={1280} height={720} className="w-full h-auto rounded-2xl" sizes="(max-width: 768px) 100vw, 1200px"/>
 {work.slug==='natural-awakenings' && <Image src="/images/projects/natural-awakenings-search.jpg" alt="Magazine directory search for Boston returns one location" width={1280} height={720} className="w-full h-auto rounded-2xl mt-8"/>}
 </section>
 <Link href={`/work/${next.slug}`} aria-label={`Next project: ${next.title}`}><CtaNextProject/></Link>
 </article>;
}
