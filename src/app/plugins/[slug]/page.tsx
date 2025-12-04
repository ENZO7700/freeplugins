
import * as React from 'react';
import { getPluginData } from '@/lib/plugins';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PluginDetailClient from '@/components/plugin-detail-client';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const plugin = getPluginData(params.slug);
  
  if (!plugin) {
    return {
      title: 'Plugin nenájdený',
    }
  }
 
  return {
    title: `${plugin.name} | FreePlugins`,
    description: plugin.description,
  }
}

export default function PluginDetailPage({ params }: { params: { slug: string } }) {
  const pluginData = getPluginData(params.slug);

  if (!pluginData) {
    notFound();
  }
  
  return <PluginDetailClient pluginData={pluginData} />;
}
