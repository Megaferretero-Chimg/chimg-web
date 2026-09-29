export const LANGUAGE_COOKIE = "chimg-language";
export const supportedLanguages = ["es", "en"];

export function resolveLanguage(saved, acceptLanguage = "") {
  if (supportedLanguages.includes(saved)) return saved;
  const preferred = acceptLanguage.split(",").map((part, index) => {
    const [tag, ...parameters] = part.trim().toLowerCase().split(";");
    const quality = parameters.find(value => value.trim().startsWith("q="));
    return { language: tag.split("-")[0], quality: quality ? Number(quality.trim().slice(2)) : 1, index };
  }).filter(item => item.quality > 0 && item.quality <= 1)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  return preferred.find(item => supportedLanguages.includes(item.language))?.language ?? (acceptLanguage ? "en" : "es");
}
