import { House, Layers3, Drill, BrickWall, Wrench } from "lucide-react";
const icons = { home: House, layers: Layers3, drill: Drill, brick: BrickWall, wrench: Wrench };
export default function LineIcon({ name, ...props }) {
  const Icon = icons[name] || House;
  return <Icon aria-hidden="true" strokeWidth={1.5} {...props} />;
}
