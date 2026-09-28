// vCard 3.0: se genera desde la misma colección que alimenta los enlaces.
function escapeText(value = "") {
  return value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export function createContactVCard(card) {
  const fields = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeText(card.familyName)};${escapeText(card.givenName ?? card.name)};;;`,
    `FN:${escapeText(card.name)}`,
  ];
  if (card.company) fields.push(`ORG:${escapeText(card.company)}`);
  if (card.role) fields.push(`TITLE:${escapeText(card.role)}`);
  const phoneNumbers = new Set();
  for (const link of card.links ?? []) {
    if (link.href?.startsWith("mailto:")) fields.push(`EMAIL;TYPE=INTERNET,WORK:${escapeText(decodeURIComponent(link.href.slice(7).split("?")[0]))}`);
    const phone = link.href?.match(/^tel:(\+?[\d -]+)$/)?.[1];
    const whatsapp = link.href?.match(/^https:\/\/wa\.me\/(\d+)(?:\?|$)/)?.[1];
    if (phone) phoneNumbers.add(phone.replace(/[ -]/g, ""));
    if (whatsapp) phoneNumbers.add(`+${whatsapp}`);
  }
  for (const phone of phoneNumbers) fields.push(`TEL;TYPE=CELL:${phone}`);
  fields.push("END:VCARD", "");
  return fields.join("\r\n");
}
