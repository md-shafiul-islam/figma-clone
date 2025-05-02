import React from "react";
import { Button } from "../ui/button";
import { Bold, Circle, Hand, MousePointer2, Square } from "lucide-react";

import { CanvasMode, LayerType, type CanvasState } from "@/types/types";
import ToolItem from "./ToolItem";

interface ToolsBarProps {
  canvasState: CanvasState;
  setCanvasState: (canvasState: CanvasState) => void;
}

const ToolsBar: React.FC<ToolsBarProps> = ({
  canvasState,
  setCanvasState,
  ...props
}) => {
  const handleToolClick = (canvas: CanvasState) => {
    setCanvasState(canvas);
  };

  const checkIsActive = (type: any) => {
    if (canvasState?.layerType === type) {
      return (
        canvasState?.mode === CanvasMode.Inserting ||
        canvasState?.mode === CanvasMode.Dragging
      );
    }

    return false;
  };

  return (
    <div className="fixed bottom-5 left-0 flex h-20 w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="container mx-auto">
        <div className="z-40 flex w-full flex-row items-center justify-center">
          <div className="flex flex-row gap-5">
            <ToolItem
              className="cursor-pointer"
              onClick={() =>
                handleToolClick({
                  mode: CanvasMode.None,
                })
              }
              isActive={checkIsActive(CanvasMode.Dragging)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsBar;
