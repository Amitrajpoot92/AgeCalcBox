import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Client ka exact live domain rasta set kar diya hai 🚀
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
      url: `${baseUrl}/future-age-calculator`, // 🔥 Updated to same format
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/age-difference-calculator`, // 🔥 Updated to same format
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}