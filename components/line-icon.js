import { House, Layers3, Drill, BrickWall, Wrench, Flower2, Factory, Hammer, PaintRoller, Grid2X2, KeyRound, Pipette, Cable, Refrigerator, Bath, LampDesk, CookingPot, HardHat, Store, UserRound, ShoppingBag } from "lucide-react";
function Pipes({ size = 24, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 3v6a7 7 0 0 0 7 7h10M8 3v6a3 3 0 0 0 3 3h10M2 3h8M21 10v8M3 21h8M5 21v-3M9 21v-3" /></svg>;
}
function Stove({ size = 24, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M7 6h2M15 6h2M7 21v1M17 21v1" /><rect x="6" y="12" width="12" height="6" rx="1" /></svg>;
}
const icons = { home: House, layers: Layers3, drill: Drill, brick: BrickWall, wrench: Wrench, garden: Flower2, machinery: Factory, tools: Hammer, paint: PaintRoller, flooring: Grid2X2, hardware: KeyRound, plumbing: Pipes, electrical: Cable, appliances: Refrigerator, bath: Bath, lighting: LampDesk, kitchen: Stove, builder: HardHat, store: Store, professional: UserRound, consumer: ShoppingBag };
export default function LineIcon({ name, ...props }) {
  const Icon = icons[name] || House;
  return <Icon aria-hidden="true" strokeWidth={1.5} {...props} />;
}
