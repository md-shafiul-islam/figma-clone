"use client";
import { getColorRGBA, pointerEventToCanvasPoint } from "@/lib/converter";
import { useMutation, useStorage } from "@liveblocks/react";
import React, { useEffect, useState } from "react";
import LayerComponent from "./LayerComponent";
import {
  LayerType,
  type Camera,
  type Layer,
  type Point,
  type CanvasState,
  CanvasMode,
} from "@/types/types";
import { v4 as uuidv4 } from "uuid";
import { u } from "node_modules/@liveblocks/react/dist/room-CqT08uWZ";
import { LiveObject } from "@liveblocks/client";
import ToolsBar from "../toolsbar/ToolsBar";
interface CanvasProps {
  children?: React.ReactNode;
}

const MAX_LAYERS = 1000;

const Canvas: React.FC<CanvasProps> = ({ children, ...props }) => {
  const roomColor = useStorage((root) => root.roomColor);
  const layers = useStorage((root) => root.layers);
  const layerIds = useStorage((root) => root.layerIds);

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Path
        | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        console.error("Max layers reached");
        return;
      }
      const layerIds = storage.get("layerIds");
      const layerId = uuidv4();

      let layer: LiveObject<Layer> | null = null;

      switch (layerType) {
        case LayerType.Ellipse:
          layer = new LiveObject<Layer>({
            type: LayerType.Ellipse,
            x: position.x,
            y: position.y,
            width: Math.random() * 400,
            height: Math.random() * 250,
            fillColor: {
              r: Math.random() * 255,
              g: Math.random() * 255,
              b: Math.random() * 255,
              a: 1,
            },
            strokeColor: { r: 217, g: 217, b: 217, a: 1 },
            strokeWidth: 1,
            opacity: 100,
          });
          break;
        case LayerType.Path:
          layer = new LiveObject<Layer>({
            type: LayerType.Rectangle,
            x: position.x,
            y: position.y,
            width: 100,
            height: 100,
            fillColor: {
              r: Math.random() * 255,
              g: Math.random() * 255,
              b: Math.random() * 255,
              a: 1,
            },
            strokeColor: { r: 217, g: 217, b: 217, a: 1 },
            strokeWidth: 1,
            opacity: 100,
          });
          break;
        case LayerType.Text:
          layer = new LiveObject<Layer>({
            type: LayerType.Rectangle,
            x: position.x,
            y: position.y,
            width: 100,
            height: 100,
            fillColor: {
              r: Math.random() * 255,
              g: Math.random() * 255,
              b: Math.random() * 255,
              a: 1,
            },
            strokeColor: { r: 217, g: 217, b: 217, a: 1 },
            strokeWidth: 1,
            opacity: 100,
          });
          break;
        default:
          layer = new LiveObject<Layer>({
            type: LayerType.Rectangle,
            x: position.x,
            y: position.y,
            width: 100,
            height: 100,
            fillColor: {
              r: Math.random() * 255,
              g: Math.random() * 255,
              b: Math.random() * 255,
              a: 1,
            },
            strokeColor: { r: 217, g: 217, b: 217, a: 1 },
            strokeWidth: 1,
            opacity: 100,
          });
          break;
      }

      if (layer) {
        liveLayers.set(layerId, layer);
        layerIds.push(layerId);
        setMyPresence(
          {
            selection: [layerId],
          },
          { addToHistory: true },
        );
      }
    },
    [],
  );

  //   useEffect(() => {
  //     insertLayer(LayerType.Rectangle, { x: 350, y: 400 });
  //   }, []);

  const onPointerUpAction = useMutation(({}, e: React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e, camera);
    insertLayer(LayerType.Ellipse, point);
  }, []);

  console.log("roomColor", roomColor);
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <main
        className={`fixed inset-0 flex h-screen w-full items-center justify-center overflow-hidden`}
      >
        <div
          style={{ backgroundColor: getColorRGBA(roomColor) }}
          className={`flex h-full w-full touch-none bg-${getColorRGBA(roomColor)}`}
        >
          <svg className="h-full w-full" onPointerUp={onPointerUpAction}>
            <g>
              {layerIds &&
                layerIds.map((layerId) => {
                  return <LayerComponent key={layerId} id={layerId} />;
                })}
            </g>
          </svg>
        </div>
      </main>
      <div className="flex w-full flex-row">
        <ToolsBar canvasState={canvasState} setCanvasState={setCanvasState} />
      </div>
    </div>
  );
};

export default Canvas;
