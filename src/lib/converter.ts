import type { Camera } from "@/types/types";

export const getColorRGBA = (
  color:
    | {
        r: number;
        g: number;
        b: number;
        a: number;
      }
    | any,
) => {
  if (!color) {
    return `rgba(0, 0, 0, 0.4)`;
  }
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

export const pointerEventToCanvasPoint = (
  e: React.PointerEvent,
  camera: Camera,
) => {
  const svg = e.currentTarget as SVGSVGElement;
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const ctm = svg.getScreenCTM()?.inverse();
  if (!ctm) return { x: 0, y: 0 };
  const svgP = pt.matrixTransform(ctm);
  return {
    x: (svgP.x - camera.x) / camera.zoom,
    y: (svgP.y - camera.y) / camera.zoom,
  };
};
