import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Client ka exact non-www domain 🚀
  const baseUrl = 'https://agecalculatorbox.com';

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      // 🚀 Folder rename ke mutabik sahi naya URL:
      url: `${baseUrl}/age-calculator-online`, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/future-age`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/age-difference`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}