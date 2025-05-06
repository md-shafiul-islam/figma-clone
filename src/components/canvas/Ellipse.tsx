import { getColorRGBA } from "@/lib/converter";
import type { EllipseLayer } from "@/types/types";
import React from "react";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent) => void;
}

const Ellipse: React.FC<EllipseProps> = ({
  id,
  layer,
  onPointerDown = (e) => {},
  ...props
}) => {
  const { fillColor, height, opacity, strokeColor, strokeWidth, width, x, y } =
    layer;
  return (
    <g onPointerDown={onPointerDown}>
      <ellipse
        style={{ transform: `translate(${x}px, ${y}px)` }}
        fill={fillColor ? getColorRGBA(fillColor) : "#CCCCCC"}
        strokeWidth={strokeWidth}
        stroke={strokeColor ? getColorRGBA(strokeColor) : "#000000"}
        opacity={opacity}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
      />
    </g>
  );
};

export default Ellipse;
