import { Research } from "@/interfaces/research/research.interface";

export async function fetchResearchMetadata(url: string): Promise<Partial<Research>> {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const html = await response.text();

    // Helper to extract meta tags
    const getMetaContent = (property: string): string => {
      const regex = new RegExp(`<meta property="${property}" content="([^"]*)"`, 'i');
      const match = html.match(regex);
      return match ? match[1] : '';
    };

    const title = getMetaContent('og:title') || getMetaContent('twitter:title');
    const description = getMetaContent('og:description') || getMetaContent('twitter:description');
    const imageUrl = getMetaContent('og:image') || getMetaContent('twitter:image');

    // Clean up title (remove " - IMCO" suffix if present)
    const cleanTitle = title.replace(/ - IMCO$/, '');

    return {
      title: cleanTitle,
      description,
      imageUrl,
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error);
    return {
      title: 'Error cargando información',
      description: 'No se pudo obtener la información de esta investigación.',
      imageUrl: '',
    };
  }
}
