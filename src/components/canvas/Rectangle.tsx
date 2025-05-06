import { getColorRGBA } from "@/lib/converter";
import type { RectangleLayer } from "@/types/types";
import React from "react";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown?: (e: React.PointerEvent) => void;
}

const Rectangle: React.FC<RectangleProps> = ({
  id,
  layer,
  onPointerDown = (e) => {},
  ...props
}) => {
  const {
    fillColor,
    height,
    opacity,
    strokeColor,
    strokeWidth,
    width,
    x,
    y,
    radius,
  } = layer;
  return (
    <g onPointerDown={onPointerDown}>
      <rect
        style={{ transform: `translate(${x}px, ${y}px)` }}
        width={width}
        height={height}
        fill={fillColor ? getColorRGBA(fillColor) : "#CCCCCC"}
        strokeWidth={strokeWidth}
        stroke={strokeColor ? getColorRGBA(strokeColor) : "#000000"}
        opacity={opacity}
        rx={radius ?? 0}
        ry={radius ?? 0}
      />
    </g>
  );
};

export default Rectangle;
