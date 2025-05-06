import {
  LayerType,
  type EllipseLayer,
  type RectangleLayer,
} from "@/types/types";
import { useStorage } from "@liveblocks/react";
import React, { memo } from "react";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Path from "./Path";
import { getColorRGBA } from "@/lib/converter";
import Text from "./Text";

const LayerComponent = memo(
  ({
    id,
    onLayerPointerDown,
  }: {
    id: string;
    onLayerPointerDown: (e: React.MouseEvent) => void;
  }) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) return null;

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            onPointerDown={onLayerPointerDown}
            id={id}
            layer={layer as RectangleLayer}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            onPointerDown={onLayerPointerDown}
            id={id}
            layer={layer as EllipseLayer}
          />
        );
      case LayerType.Path:
        return (
          <Path
            onPointerDown={onLayerPointerDown}
            fill={getColorRGBA(layer.fillColor)}
            opacity={layer.opacity}
            points={(layer.points ?? []).filter(
              (point): point is [number, number, number] => point.length === 3,
            )}
            stroke={getColorRGBA(layer.strokeColor)}
            x={layer.x}
            y={layer.y}
          />
        );
      case LayerType.Text:
        return (
          <Text id={id} layer={layer} onPointerDown={onLayerPointerDown} />
        );
      default:
        return null;
    }
  },
);

LayerComponent.displayName = "LayerComponent";
export default LayerComponent;
