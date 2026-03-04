export function getSiteUrl(): string {
  const siteUrlEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.URL ??
    "https://flintsecure.app";

  return siteUrlEnv.startsWith("http") ? siteUrlEnv : `https://${siteUrlEnv}`;
}
