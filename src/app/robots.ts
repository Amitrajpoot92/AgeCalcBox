import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://agecalculatorbox.com'; // Aapka exact domain 🚀

  return {
    rules: {
      userAgent: '*', // Sabhi search engines (Google, Bing, etc.) ke liye
      allow: '/',     // Poori website ko crawl karne ki permission dein
      disallow: [
        '/admin',       // Admin folder ko Google search se block karo ❌
        '/dashboard',   // Dashboard analytics ko block karo ❌
        '/api',         // API routes ko block karo ❌
        '/login'        // Login page ko block karo ❌
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Aapke sitemap ka path dynamic integration
  }
}