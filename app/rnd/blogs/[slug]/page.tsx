import { BLOGS } from "@/data/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = BLOGS.find((b) => b.slug === slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${blog.title} | Sense-XT Innovations`,
    description: blog.excerpt,
  };
}

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = BLOGS.find((b) => b.slug === slug);

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
          Back to all blogs
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
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 text-sm">
              <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Image placeholder</span>
              <span className="font-mono text-xs mt-1 opacity-70">public/blogs/{blog.slug}.jpg</span>
            </div>
            <div 
              className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/blogs/${blog.slug}.jpg')` }}
            />
          </div>
          
          <div className={`w-full h-px opacity-50 bg-gradient-to-r ${blog.gradient}`} />
        </header>

        <article className="prose prose-invert prose-lg max-w-none prose-p:text-neutral-300 prose-p:font-light prose-p:leading-relaxed prose-a:text-cyan-400">
          {blog.content.map((paragraph, index) => (
            <p key={index} className="mb-6">{paragraph}</p>
          ))}
        </article>
      </div>
    </main>
  );
}
