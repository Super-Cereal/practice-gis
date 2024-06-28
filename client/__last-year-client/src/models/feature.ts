import { Geometry } from "./geometry";

export interface Feature {
	type: string;
	geometry?: Geometry;
	properties: object;
	features?: Feature[];
}
