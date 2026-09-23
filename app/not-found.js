import Link from "next/link";
export default function NotFound() {
  return <main id="contenido" className="container" style={{ paddingBlock: "100px", minHeight: "50vh" }}><p className="eyebrow">PÁGINA NO ENCONTRADA</p><h1 className="section-title">Busquemos un nuevo camino.</h1><p>Esta página no está disponible. Descubre nuestras cinco líneas para continuar.</p><Link href="/lineas" className="button button-yellow">Explorar nuestras líneas</Link></main>;
}
