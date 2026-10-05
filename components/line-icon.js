import { House, Layers3, Drill, BrickWall, Wrench, Flower2, Factory, Hammer, PaintRoller, Grid2X2, KeyRound, Pipette, Cable, Refrigerator, Bath, LampDesk, CookingPot, HardHat, Store, UserRound, ShoppingBag } from "lucide-react";
const icons = { home: House, layers: Layers3, drill: Drill, brick: BrickWall, wrench: Wrench, garden: Flower2, machinery: Factory, tools: Hammer, paint: PaintRoller, flooring: Grid2X2, hardware: KeyRound, plumbing: Pipette, electrical: Cable, appliances: Refrigerator, bath: Bath, lighting: LampDesk, kitchen: CookingPot, builder: HardHat, store: Store, professional: UserRound, consumer: ShoppingBag };
export default function LineIcon({ name, ...props }) {
  const Icon = icons[name] || House;
  return <Icon aria-hidden="true" strokeWidth={1.5} {...props} />;
}
