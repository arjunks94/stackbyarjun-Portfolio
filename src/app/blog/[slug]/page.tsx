import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { FadeIn } from "@/components/animations/fade-in";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { generateArticleJsonLd, generateSEO } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || post.draft) return {};
  return generateSEO({
    title: post.title,
    description: post.description,
    image: post.coverImage,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || post.draft) notFound();

  const jsonLd = generateArticleJsonLd(post);

  return (
    <main className="min-h-screen pt-[var(--header-height)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <FadeIn>
          <Link
            href="/#blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          {post.coverImage && (
            <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-2xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
            <span className="rounded-full bg-accent/10 px-3 py-0.5 text-accent">
              {post.category}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm text-accent-secondary">
                #{tag}
              </span>
            ))}
          </div>

          <div className="prose prose-custom prose-invert mt-12 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>
              {post.body}
            </ReactMarkdown>
          </div>
        </FadeIn>
      </article>
    </main>
  );
}
