import english from "./en.json";

export function translator(language) {
  return (source, values = {}) => {
    if (typeof source !== "string") return source;
    const translated = language === "en" ? english[source] ?? source : source;
    return translated.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  };
}
