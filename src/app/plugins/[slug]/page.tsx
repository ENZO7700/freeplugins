import * as React from 'react';
import { getPluginData } from '@/components/plugin-list';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import PluginDetailClient from '@/components/plugin-detail-client';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const plugin = getPluginData(slug);
  
  if (!plugin) {
    return {
      title: 'Plugin nenájdený',
    }
  }
 
  // fetch data
  const parentTitle = (await parent).title?.absolute;
 
  return {
    title: `${plugin.name} | ${parentTitle || 'FreePlugins'}`,
    description: plugin.description,
  }
}

export default async function PluginDetailPage({ params }: Props) {
  const { slug } = await params;
  const pluginData = getPluginData(slug);

  if (!pluginData) {
    notFound();
  }
  
  return <PluginDetailClient pluginData={pluginData} />;
}
