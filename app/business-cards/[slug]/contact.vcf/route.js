import { createContactVCard } from "@/lib/contact-vcard";
import { getPresentationCard } from "@/lib/presentation-cards";
import { getTranslator } from "@/lib/i18n/server";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const card = getPresentationCard(slug);
  if (!card) return new Response("Contact not found", { status: 404 });

  const t = await getTranslator();
  return new Response(createContactVCard({ ...card, role: t(card.role) }), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${card.slug}.vcf"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
