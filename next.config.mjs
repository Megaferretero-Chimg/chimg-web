/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/nosotros", destination: "/about", permanent: true },
      { source: "/servicios", destination: "/services", permanent: true },
      { source: "/contacto", destination: "/contact", permanent: true },
      { source: "/tarjetas/:path*", destination: "/business-cards/:path*", permanent: true },
      { source: "/lineas", destination: "/product-lines", permanent: true },
      { source: "/productos", destination: "/product-lines", permanent: true },
      { source: "/product-lines/finishes", destination: "/product-lines/flooring", permanent: true },
      { source: "/product-lines/construction", destination: "/product-lines/building-materials", permanent: true },
      ...Object.entries({
        hogar: "home-living",
        acabados: "flooring",
        maquinaria: "machinery",
        construccion: "building-materials",
        ferreteria: "hardware",
        jardineria: "lawn-garden",
        herramientas: "tools",
        "herramientas-electricas": "power-tools",
        pintura: "paint",
        pisos: "flooring",
        plomeria: "plumbing",
        electricidad: "electrical",
        electrodomesticos: "appliances",
        bano: "bath",
        iluminacion: "lighting",
        cocina: "kitchen",
      }).map(([previous, current]) => ({
        source: `/lineas/${previous}`,
        destination: `/product-lines/${current}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
