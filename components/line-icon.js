import { House, Layers3, Drill, BrickWall, Wrench, Flower2, Factory } from "lucide-react";
const icons = { home: House, layers: Layers3, drill: Drill, brick: BrickWall, wrench: Wrench, garden: Flower2, machinery: Factory };
export default function LineIcon({ name, ...props }) {
  const Icon = icons[name] || House;
  return <Icon aria-hidden="true" strokeWidth={1.5} {...props} />;
}
