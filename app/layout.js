import "./globals.scss";
import { getLanguage, getTranslator } from "@/lib/i18n/server";
import { LanguageProvider } from "@/components/language-selector";

export async function generateMetadata() {
  const t = await getTranslator();
  return {
  title: {
    default: t("CHIMG | Construimos contigo, transformamos tus espacios"),
    template: "%s | CHIMG",
  },
  description: t("Más de 25 años acompañando tus proyectos. Hogar, acabados, maquinaria, construcción y ferretería en Ambato y Salcedo, Ecuador."),
};
}

export default async function RootLayout({ children }) {
  const language = await getLanguage();
  const t = await getTranslator();
  return (
    <html lang={language}>
      <body>
        <LanguageProvider language={language}>
          <a href="#main-content" className="skip-link">{t("Saltar al contenido")}</a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
