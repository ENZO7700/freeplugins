
import { plugins, Plugin } from '@/components/plugin-list';

/**
 * Nájde pluginy na základe vyhľadávacieho dopytu a/alebo kategórie.
 * @param query Voliteľný reťazec na vyhľadávanie v názvoch a popisoch pluginov.
 * @param category Voliteľná kategória na filtrovanie.
 * @returns Zoznam pluginov, ktoré zodpovedajú kritériám.
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

    // V reálnej aplikácii by to mohol byť API hovor do databázy.
    // Zatiaľ simulujeme asynchrónnu operáciu.
    await new Promise(resolve => setTimeout(resolve, 200));

    return results;
}
