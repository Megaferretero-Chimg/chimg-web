import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageMotion from "@/components/page-motion";

export default function SiteLayout({ children }) {
  return <><SiteHeader />{children}<SiteFooter /><PageMotion /></>;
}
