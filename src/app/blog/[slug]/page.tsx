import { getPostBySlug } from '@/lib/blog-posts';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog-post-client';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
