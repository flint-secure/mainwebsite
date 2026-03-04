import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrlEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.URL ??
    "https://flintsecure.app";
  const siteUrl = siteUrlEnv.startsWith("http")
    ? siteUrlEnv
    : `https://${siteUrlEnv}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
