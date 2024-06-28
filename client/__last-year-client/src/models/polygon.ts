import { Point } from "./point";

export interface Polygon {
	id: string,
	points: Point[],
	selected: boolean,
}