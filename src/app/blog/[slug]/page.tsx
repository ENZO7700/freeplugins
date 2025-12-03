import { getPostBySlug } from '@/lib/blog-posts';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog-post-client';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Článok nenájdený',
    }
  }

  const parentTitle = (await parent).title?.absolute;
 
  return {
    title: `${post.title} | ${parentTitle || 'FreePlugins Blog'}`,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
