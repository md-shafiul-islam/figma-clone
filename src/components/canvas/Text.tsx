import { getColorRGBA } from "@/lib/converter";
import type { TextLayer } from "@/types/types";
import React from "react";

interface TextProps {
  id: string;
  layer: TextLayer;
}

const Text: React.FC<TextProps> = ({ id, layer }) => {
  const {
    fillColor,
    fontFamily,
    fontSize,
    fontWeight,
    height,
    opacity,
    strokeColor,
    strokeWidth,
    text,
    type,
    width,
    x,
    y,
  } = layer;
  return (
    <g>
      <text
        style={{ transform: `translate(${x}px, ${y}px)` }}
        fill={getColorRGBA(fillColor)}
        stroke={getColorRGBA(strokeColor)}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        height={height}
        opacity={opacity}
        strokeWidth={strokeWidth}
        width={width}
      >
        {text}
      </text>
    </g>
  );
};

export default Text;
