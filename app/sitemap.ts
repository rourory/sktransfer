import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sktransfer.by"
  const lastModified = new Date()

  const staticPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/excursions`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  const vehicles = [
    "volkswagen-polo",
    "skoda-superb",
    "mercedes-e-class",
    "mercedes-v-class",
    "mercedes-s-class",
    "mercedes-sprinter",
    "volkswagen-caravella",
  ]

  const vehiclePages = vehicles.map((vehicle) => ({
    url: `${baseUrl}/fleet/${vehicle}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const excursions = [
    "minsk-city-tour",
    "mir-nesvizh-castles",
    "belovezhskaya-pushcha",
    "brest-fortress",
    "khatyn-memorial",
    "dudutki-museum",
  ]

  const excursionPages = excursions.map((excursion) => ({
    url: `${baseUrl}/excursions/${excursion}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...vehiclePages, ...excursionPages]
}
