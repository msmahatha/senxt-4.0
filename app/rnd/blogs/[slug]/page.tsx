import { getSiteContent } from "@/lib/site-content";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { blogs } = await getSiteContent();
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}


export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { blogs, rnd } = await getSiteContent();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/rnd/blogs" 
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium mb-12 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {rnd.backToBlogsLabel}
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-neutral-400 mb-6 font-mono tracking-wider">
            <span className="uppercase text-cyan-500">{blog.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            <span>{blog.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            <span>{blog.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
            {blog.title}
          </h1>

          <div className="w-full aspect-[21/9] md:aspect-[2.5/1] bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-12 relative flex items-center justify-center">
            {blog.image && <Image src={blog.image} alt={blog.title} fill sizes="(max-width: 768px) 100vw, 896px" className="object-contain" />}
          </div>
          
          <div className={`w-full h-px opacity-50 bg-gradient-to-r ${blog.gradient}`} />
        </header>

        <article className="prose prose-invert prose-lg max-w-none prose-p:text-neutral-300 prose-p:font-light prose-p:leading-relaxed prose-a:text-cyan-400">
          {blog.content.map((paragraph, index) => (
            <p key={index} className="body-copy mb-6">{paragraph}</p>
          ))}
        </article>
      </div>
    </main>
  );
}
