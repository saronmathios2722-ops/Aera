import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aera.style'
  
  const routes = [
    '',
    '/onboarding',
    '/dashboard',
    '/dashboard/shop',
    '/dashboard/blueprint',
    '/dashboard/goals',
    '/dashboard/inspiration',
    '/dashboard/outfits',
    '/dashboard/pricing',
    '/dashboard/wardrobe',
    '/dashboard/rituals',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
