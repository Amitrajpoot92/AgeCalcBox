import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Client ka exact non-www domain protocol 🚀
  const baseUrl = 'https://agecalculatorbox.com';

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/age-calculator-online`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/future-age-calculator`, // 🔥 Sync with your exact folder name!
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/age-difference-calculator`, // 🔥 Sync with your exact folder name!
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}