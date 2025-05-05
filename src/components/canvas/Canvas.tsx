"use client";
import {
  getColorRGBA,
  penPointToPathLayer,
  pointerEventToCanvasPoint,
} from "@/lib/converter";
import { useMutation, useSelf, useStorage } from "@liveblocks/react";
import React, { use, useCallback, useEffect, useState } from "react";
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
import { set } from "zod";
import Path from "./Path";
interface CanvasProps {
  children?: React.ReactNode;
}

const MAX_LAYERS = 1000;

const Canvas: React.FC<CanvasProps> = ({ children, ...props }) => {
  const roomColor = useStorage((root) => root.roomColor);
  const layers = useStorage((root) => root.layers);
  const layerIds = useStorage((root) => root.layerIds);
  const [canZoomIn, setCanZoomIn] = useState<boolean>(false);
  const [canZoomOut, setCanZoomOut] = useState<boolean>(false);

  const pencilDraft = useSelf((me) => me.presence.pencilDraft);

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
        case LayerType.Rectangle:
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

  const continueDrawing = useMutation(
    (
      { setMyPresence, self },
      point: { x: number; y: number },
      e: React.PointerEvent,
    ) => {
      const { pencilDraft } = self.presence;

      if (
        CanvasMode.Pencil !== canvasState.mode ||
        e.buttons !== 1 ||
        pencilDraft === null
      ) {
        return;
      }

      setMyPresence({
        pencilDraft: [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [],
  );

  const startDrawing = useMutation(
    ({ setMyPresence, self }, pointer: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[pointer.x, pointer.y, pressure]],
        penColor: {
          r: Math.random() * 255,
          g: Math.random() * 255,
          b: Math.random() * 255,
          a: 1,
        },
      });
    },
    [],
  );

  const insertPatch = useMutation(({ setMyPresence, self, storage }) => {
    const { pencilDraft } = self.presence;
    const liveLayers = storage.get("layers");
    const layerIds = storage.get("layerIds");

    if (
      pencilDraft === null ||
      pencilDraft?.length < 2 ||
      liveLayers.size >= MAX_LAYERS
    ) {
      setMyPresence({
        pencilDraft: null,
      });
      return;
    }

    const layerId = uuidv4();
    const pathLayer = penPointToPathLayer(pencilDraft, {
      r: 217,
      g: 217,
      b: 217,
      a: 1,
    });

    const layer = new LiveObject<Layer>(pathLayer);

    liveLayers.set(layerId, layer);
    layerIds.push(layerId);
    setMyPresence({
      selection: [layerId],
      pencilDraft: null,
    });
    setCanvasState({
      mode: CanvasMode.Pencil,
    });
  }, []);

  //   useEffect(() => {
  //     insertLayer(LayerType.Rectangle, { x: 350, y: 400 });
  //   }, []);

  const onPointerUpAction = useMutation(
    ({}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        if (canvasState.layerType === LayerType.Ellipse) {
          insertLayer(LayerType.Ellipse, point);
        } else if (canvasState.layerType === LayerType.Rectangle) {
          insertLayer(LayerType.Rectangle, point);
        }
      } else if (canvasState.mode === CanvasMode.Dragging) {
        setCanvasState({ mode: CanvasMode.Dragging, origin: null });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPatch();
      }
    },
    [canvasState, setCanvasState, camera, insertLayer],
  );

  const onWheelAction = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      ...camera,
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerDownAction = useMutation(
    ({}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      const isDragging = canvasState.mode === CanvasMode.Dragging;

      if (isDragging) {
        setCanvasState({ mode: CanvasMode.Dragging, origin: point });
        return;
      }

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }
    },
    [canvasState.mode, setCanvasState, camera, startDrawing],
  );

  const onPointerMoveAction = useMutation(
    ({}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.Dragging &&
        canvasState.origin !== null
      ) {
        const cx = camera.x + e.movementX;
        const cy = camera.y + e.movementY;
        setCamera((camera) => ({
          x: cx,
          y: cy,
          zoom: camera.zoom,
        }));
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(point, e);
      }
    },

    [canvasState, setCanvasState, camera, continueDrawing],
  );
  console.log("canvasState, ", canvasState);
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <main
        className={`fixed inset-0 flex h-screen w-full items-center justify-center overflow-hidden`}
      >
        <div
          style={{ backgroundColor: getColorRGBA(roomColor) }}
          className={`flex h-full w-full touch-none bg-${getColorRGBA(roomColor)}`}
        >
          <svg
            className="h-full w-full"
            onPointerUp={onPointerUpAction}
            onWheel={onWheelAction}
            onPointerDown={onPointerDownAction}
            onPointerMove={onPointerMoveAction}
          >
            <g
              style={{
                transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
              }}
            >
              {layerIds &&
                layerIds.map((layerId) => {
                  return <LayerComponent key={layerId} id={layerId} />;
                })}
              {pencilDraft !== null && pencilDraft.length > 0 && (
                <Path
                  points={pencilDraft}
                  fill={getColorRGBA({})}
                  opacity={1}
                  stroke={getColorRGBA({})}
                  x={0}
                  y={0}
                />
              )}
            </g>
          </svg>
        </div>
      </main>
      <div className="flex w-full flex-row">
        <ToolsBar
          canvasState={canvasState}
          setCanvasState={setCanvasState}
          onZoomIn={() => {
            setCamera((camera) => ({ ...camera, zoom: camera.zoom + 0.1 }));
          }}
          onZoomOut={() => {
            setCamera((camera) => ({ ...camera, zoom: camera.zoom - 0.1 }));
          }}
          canZoomIn={camera.zoom < 2}
          canZoomOut={camera.zoom > 0.5}
        />
      </div>
    </div>
  );
};

export default Canvas;
