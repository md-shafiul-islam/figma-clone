import React from "react";
import { Button } from "../ui/button";
import {
  Bold,
  Circle,
  Hand,
  MousePointer2,
  Pencil,
  Square,
  SquareMousePointer,
  TextCursor,
  Type,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { CanvasMode, LayerType, type CanvasState } from "@/types/types";
import ToolItem from "./ToolItem";
import { pointerEventToCanvasPoint } from "@/lib/converter";

interface ToolsBarProps {
  canvasState: CanvasState;
  setCanvasState: (canvasState: CanvasState) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

const ToolsBar: React.FC<ToolsBarProps> = ({
  canvasState,
  setCanvasState,
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut,
  ...props
}) => {
  const handleToolClick = (canvas: CanvasState) => {
    const isSameMode = canvasState?.mode === canvas.mode;
    const isSameLayer = canvasState?.layerType === canvas?.layerType;

    if (isSameMode) {
      if (isSameLayer) {
        setCanvasState({ mode: CanvasMode.None });
      } else {
        setCanvasState(canvas);
      }
    } else {
      setCanvasState(canvas);
    }
  };

  const checkIsActive = (type: LayerType): boolean => {
    if (canvasState?.layerType === type) {
      return canvasState?.mode === CanvasMode.Inserting;
    }

    return false;
  };

  return (
    <div className="fixed bottom-5 left-0 flex h-20 w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="container mx-auto">
        <div className="z-40 flex w-full flex-row items-center justify-center">
          <div className="flex flex-row gap-5">
            <ToolItem
              className="z-50 cursor-pointer"
              onClick={(e) => {
                handleToolClick({
                  mode: CanvasMode.Selecting,
                  origin: null,
                });
              }}
              isActive={canvasState?.mode === CanvasMode.Selecting}
              disabled={false}
            >
              <SquareMousePointer />
            </ToolItem>
            <ToolItem
              className="z-50 cursor-pointer"
              onClick={(e) => {
                handleToolClick({
                  mode: CanvasMode.Dragging,
                  origin: null,
                });
              }}
              isActive={canvasState?.mode === CanvasMode.Dragging}
              disabled={false}
            >
              <MousePointer2 />
            </ToolItem>
            <ToolItem
              className="cursor-pointer"
              onClick={() =>
                handleToolClick({
                  layerType: LayerType.Rectangle,
                  mode: CanvasMode.Inserting,
                })
              }
              isActive={checkIsActive(LayerType.Rectangle)}
              disabled={false}
            >
              <Square />
            </ToolItem>
            <ToolItem
              className="cursor-pointer"
              onClick={() =>
                handleToolClick({
                  layerType: LayerType.Ellipse,
                  mode: CanvasMode.Inserting,
                })
              }
              isActive={checkIsActive(LayerType.Ellipse)}
              disabled={false}
            >
              <Circle />
            </ToolItem>
            <ToolItem
              className="cursor-pointer"
              onClick={() =>
                handleToolClick({
                  mode: CanvasMode.Pencil,
                })
              }
              isActive={canvasState.mode === CanvasMode.Pencil}
              disabled={false}
            >
              <Pencil />
            </ToolItem>

            <ToolItem
              className="cursor-pointer"
              onClick={() =>
                handleToolClick({
                  mode: CanvasMode.Inserting,
                  layerType: LayerType.Text,
                })
              }
              isActive={checkIsActive(LayerType.Text)}
              disabled={false}
            >
              <TextCursor />
            </ToolItem>

            <div className="flex flex-row gap-3">
              <Button onClick={onZoomIn} disabled={!canZoomIn}>
                <ZoomIn />
              </Button>
              <Button onClick={onZoomOut} disabled={!canZoomOut}>
                <ZoomOut />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsBar;
