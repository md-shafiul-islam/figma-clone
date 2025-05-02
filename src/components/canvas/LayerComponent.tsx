import {
  LayerType,
  type EllipseLayer,
  type RectangleLayer,
} from "@/types/types";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import Rectangle from "./Rectangle";
import { E } from "node_modules/@liveblocks/react/dist/room-CqT08uWZ";
import Ellipse from "./Ellipse";

const LayerComponent = memo(({ id }: { id: string }) => {
  const layer = useStorage((root) => root.layers.get(id));
  if (!layer) return null;

  switch (layer.type) {
    case LayerType.Rectangle:
      return <Rectangle id={id} layer={layer as RectangleLayer} />;
    case LayerType.Ellipse:
      return <Ellipse id={id} layer={layer as EllipseLayer} />;
    case LayerType.Path:
      return (
        <g key={`path-${Math.random() * 8504}`}>
          <circle
            cx={layer.x + layer.width / 2}
            cy={layer.y + layer.height / 2}
            r={Math.min(layer.width, layer.height) / 2}
            fill={`rgba(${layer.fillColor.r}, ${layer.fillColor.g}, ${layer.fillColor.b}, ${layer.fillColor.a})`}
          />
        </g>
      );
    case LayerType.Text:
      return (
        <g key={`text-${Math.random() * 6004}`}>
          <circle
            cx={layer.x + layer.width / 2}
            cy={layer.y + layer.height / 2}
            r={Math.min(layer.width, layer.height) / 2}
            fill={`rgba(${layer.fillColor.r}, ${layer.fillColor.g}, ${layer.fillColor.b}, ${layer.fillColor.a})`}
          />
        </g>
      );
    default:
      return null;
  }
});

LayerComponent.displayName = "LayerComponent";
export default LayerComponent;
