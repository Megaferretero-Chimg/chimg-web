/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/nosotros", destination: "/about", permanent: true },
      { source: "/servicios", destination: "/services", permanent: true },
      { source: "/contacto", destination: "/contact", permanent: true },
      { source: "/tarjetas/:path*", destination: "/business-cards/:path*", permanent: true },
      { source: "/lineas", destination: "/product-lines", permanent: true },
      ...Object.entries({
        hogar: "home-living",
        acabados: "finishes",
        maquinaria: "machinery",
        construccion: "construction",
        ferreteria: "hardware",
      }).map(([previous, current]) => ({
        source: `/lineas/${previous}`,
        destination: `/product-lines/${current}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
