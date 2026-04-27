export const SITE_NAME = "JHB Web Studio"

export const DEFAULT_DESCRIPTION =
  "Solo web developer and designer in Johannesburg, South Africa. Marketing sites, e-commerce stores, and content platforms with transparent tiered pricing."

type SeoInput = {
  title: string
  description: string
  robots?: string
}

export function buildMeta({ title, description, robots = "index,follow" }: SeoInput) {
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ]
}
