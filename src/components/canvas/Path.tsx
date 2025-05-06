import React from "react";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/converter";
interface PathProps {
  x: number;
  y: number;
  stroke: string;
  fill: string;
  opacity: number;
  points: [number, number, number][];
  onPointerDown?: (e: React.PointerEvent) => void;
}
const Path: React.FC<PathProps> = ({
  x,
  y,
  stroke,
  fill,
  opacity,
  points,
  onPointerDown = (e) => {},
  ...props
}) => {
  const pathData = getSvgPathFromStroke(
    getStroke(points, {
      size: 16,
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
    }),
  );

  return (
    <path
      onPointerDown={onPointerDown}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      d={pathData}
      stroke={stroke}
      strokeWidth={1}
      fill={fill}
      opacity={opacity}
    />
  );
};

export default Path;
