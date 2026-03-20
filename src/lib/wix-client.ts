import { createClient, OAuthStrategy, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { members } from "@wix/members";
import { files } from "@wix/media";

export function getWixClient() {
  return createClient({
    modules: { items, members },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });
}

export function getWixServerClient() {
  return createClient({
    modules: { items, members, files },
    auth: ApiKeyStrategy({
      siteId: process.env.WIX_SITE_ID!,
      apiKey: process.env.WIX_API_KEY!,
    }),
  });
}

export type WixClient = ReturnType<typeof getWixClient>;
