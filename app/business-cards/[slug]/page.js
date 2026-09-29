import { getTranslator } from "@/lib/i18n/server";
import { notFound } from "next/navigation";
import PresentationCard from "@/components/presentation-card";
import { getPresentationCard, presentationCards } from "@/lib/presentation-cards";
import styles from "./page.module.scss";

export const dynamicParams = false;

export function generateStaticParams() {
  return presentationCards.map(card => ({ slug: card.slug }));
}

export async function generateMetadata({ params }) {
  const t = await getTranslator();
  const { slug } = await params;
  const card = getPresentationCard(slug);
  if (!card) return {};
  return { title: `${card.name} · ${t(card.role)}`, description: t("Conecta con {name}, {role} en {company}.", { name: card.name, role: t(card.role), company: card.company }) };
}

export default async function CardPage({ params }) {
  const { slug } = await params;
  const card = getPresentationCard(slug);
  if (!card) notFound();

  return <main id="main-content" className={styles.page}>
    <PresentationCard card={card} />
  </main>;
}
