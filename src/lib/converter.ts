import {
  LayerType,
  type Camera,
  type Color,
  type Layer,
  type PathLayer,
} from "@/types/types";

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

export const penPointToPathLayer = (
  points: [x: number, y: number, pressure: number][],
  color: Color,
): PathLayer => {
  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottm = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (x === undefined || y === undefined) continue;
    if (x < left) left = x;
    if (y < top) top = y;
    if (x > right) right = x;
    if (y > bottm) bottm = y;
  }

  const layer: PathLayer = {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottm - top,
    fillColor: color,
    opacity: 1,
    strokeColor: color,
    strokeWidth: 1,
    points: points
      .filter(
        (point): point is [number, number, number] =>
          point[0] !== undefined &&
          point[1] !== undefined &&
          point[2] !== undefined,
      )
      .map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
  return layer;
};

export const getSvgPathFromStroke = (stroke: number[][]) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const nextPoint = arr[(i + 1) % arr.length];
      if (!nextPoint) {
        return acc;
      }
      const [x1, y1] = nextPoint;
      acc.push(x0!, y0!, (x0! + x1!) / 2, (y0! + y1!) / 2);
      return acc;
    },
    ["M", ...(stroke[0] ?? []), "Q"],
  );

  d.push("Z");
  return d.join(" ");
};
