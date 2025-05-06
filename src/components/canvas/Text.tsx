import { getColorRGBA } from "@/lib/converter";
import type { TextLayer } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardTitle } from "../ui/card";
import { CheckSquare } from "lucide-react";
import { useMutation } from "@liveblocks/react";

interface TextProps {
  id: string;
  layer: TextLayer;
  style?: React.CSSProperties;
  onPointerDown: (e: React.PointerEvent) => void;
}

const Text: React.FC<TextProps> = ({
  id,
  layer,
  onPointerDown = (e) => {},
  ...props
}) => {
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

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [draftText, setDraftText] = useState(text);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftText(event.target.value);
  };

  const onUpdate = useMutation(
    ({ storage }, text) => {
      const layers = storage.get("layers");
      const layer = layers.get(id);
      if (layer) {
        layer.update({ text });
      }
    },
    [id],
  );

  const onUpdateAction = () => {
    onUpdate(draftText);
    setIsEditing(false);
  };

  const onkeydownAction = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onUpdate(draftText);
      setIsEditing(false);
    }
  };
  return (
    <g
      onDoubleClick={(e) => {
        e.preventDefault();
        setIsEditing(true);
      }}
      onPointerDown={onPointerDown}
    >
      {isEditing ? (
        <foreignObject
          x={x}
          y={y}
          width={width}
          height={height > 150 ? height : 150}
        >
          <div
            className={`relative flex flex-col gap-1.5 rounded-sm bg-cyan-100 ${isEditing ? "z-50" : "-z-10"}`}
          >
            <div className="flex flex-row-reverse">
              <span
                className="absolute top-3 right-2 cursor-pointer"
                onClick={onUpdateAction}
              >
                <CheckSquare />
              </span>
            </div>
            <div className="flex flex-col">
              <Textarea
                ref={inputRef}
                placeholder={text}
                value={draftText}
                onChange={onTextChange}
                onKeyDown={onkeydownAction}
              />
            </div>
          </div>
        </foreignObject>
      ) : (
        <text
          className="-z-10 select-none"
          //   onPointerDown={}
          style={{ transform: `translate(${x}px, ${y}px)`, ...props.style }}
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
      )}
    </g>
  );
};

export default Text;
