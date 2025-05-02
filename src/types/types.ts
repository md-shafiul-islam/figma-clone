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
  Rectangle,
  Ellipse,
  Path,
  Text,
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
  | { mode: CanvasMode.None };
  
export enum CanvasMode {
  None,
  Inserting,
}
