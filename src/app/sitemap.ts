import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrlEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.URL ??
    "https://flintsecure.app";
  const baseUrl = siteUrlEnv.startsWith("http")
    ? siteUrlEnv
    : `https://${siteUrlEnv}`;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add other pages here if they exist
  ];
}
