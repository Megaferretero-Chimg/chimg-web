export default function WhatsAppIcon({ size = 20, className }) {
  return <span aria-hidden="true" className={className} style={{ display: "inline-block", width: size, height: size, flexShrink: 0, background: "currentColor", mask: "url('/icons/whastapp.svg') center / contain no-repeat" }} />;
}
