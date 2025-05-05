import { number } from "zod";

export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export enum LayerType {
  Rectangle = "rectangle",
  Ellipse = "ellipse",
  Path = "path",
  Text = "text",
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: Color;
  fillColor: Color;
  opacity: number;
  radius?: number; // For rounded corners
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: Color;
  fillColor: Color;
  opacity: number;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: Color;
  fillColor: Color;
  opacity: number;
  points: number[][];
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  width: number;
  height: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fillColor: Color;
  strokeWidth: number;
  strokeColor: Color;
  text: string;
  opacity: number;
};

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer;

export type Point = {
  x: number;
  y: number;
};

export type CanvasState =
  | {
      layerType:
        | LayerType.Rectangle
        | LayerType.Ellipse
        | LayerType.Path
        | LayerType.Text;
      mode: CanvasMode.Inserting;
    }
  | { mode: CanvasMode.None }
  | { mode: CanvasMode.Dragging; origin: Point | null }
  | { mode: CanvasMode.Pencil }
  | { mode: CanvasMode.Selecting; origin: Point | null }
  | { mode: CanvasMode.TYPING };

export enum CanvasMode {
  None = "None",
  Inserting = "Inserting",
  TYPING = "Typing",
  Dragging = "Dragging",
  Selecting = "Selecting",
  Resizing = "Resizing",
  Pencil = "Pencil",
  Drawing = "Drawing",
  Editing = "Editing",
  Erasing = "Erasing",
  Panning = "Panning",
  Rotating = "Rotating",
  Transforming = "Transforming",
  Grouping = "Grouping",
  Ungrouping = "Ungrouping",
  Cloning = "Cloning",
  Duplicating = "Duplicating",
}
