import { cache } from "react";
import { cookies, headers } from "next/headers";
import { LANGUAGE_COOKIE, resolveLanguage } from "./language";
import { translator } from "./translate";

export const getLanguage = cache(async () => {
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  return resolveLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value, requestHeaders.get("accept-language") ?? "");
});
export async function getTranslator() {
  return translator(await getLanguage());
}
