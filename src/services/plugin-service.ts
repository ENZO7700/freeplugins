
import { plugins, Plugin } from '@/components/plugin-list';

/**
 * Finds plugins based on a search query and/or category.
 * @param query Optional search string to match against plugin names and descriptions.
 * @param category Optional category to filter by.
 * @returns A list of plugins that match the criteria.
 */
export async function findPlugins(
    query?: string,
    category?: string
): Promise<Plugin[]> {
    let results = plugins;

    if (category) {
        results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (query) {
        const lowercasedQuery = query.toLowerCase();
        results = results.filter(p =>
            p.name.toLowerCase().includes(lowercasedQuery) ||
            p.description.toLowerCase().includes(lowercasedQuery) ||
            p.longDescription.toLowerCase().includes(lowercasedQuery)
        );
    }

    // In a real app, this might be an API call to a database.
    // For now, we just simulate an async operation.
    await new Promise(resolve => setTimeout(resolve, 200));

    return results;
}
