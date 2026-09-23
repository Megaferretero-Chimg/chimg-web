import "./globals.scss";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageMotion from "@/components/page-motion";

export const metadata = {
  title: {
    default: "CHIMG | Construimos contigo, transformamos tus espacios",
    template: "%s | CHIMG",
  },
  description: "Más de 25 años acompañando tus proyectos. Hogar, acabados, maquinaria, construcción y ferretería en Ambato y Salcedo, Ecuador.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <PageMotion />
      </body>
    </html>
  );
}
