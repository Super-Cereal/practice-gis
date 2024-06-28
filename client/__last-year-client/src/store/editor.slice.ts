import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models/point";
import { Polygon } from "../models/polygon";
import { nanoid } from "nanoid";

export interface EditorState {
	points: Point[];
	selectedPointIds: string[];
	polygons: Polygon[];
	isPolygonsVisible: boolean;
};

const initialState: EditorState = {
	points: [],
	selectedPointIds: [],
	polygons: [],
	isPolygonsVisible: true,
};

const editorSlice = createSlice({
	name: "editor",
	initialState: initialState,
	reducers: {
		addPoint: (state, action: PayloadAction<Point>) => {
			state.points.push(action.payload);
			state.selectedPointIds.push(action.payload.id);
		},

		removePoint: (state, action: PayloadAction<Point>) => {
			const point = state.points.find(x => x.id === action.payload.id);
			if (!point) {
				throw new Error("Point is not found");
			}

			const index = state.points.indexOf(point);
			state.points.splice(index, 1);

			state.selectedPointIds = state.selectedPointIds
				.filter(s => state.points.some(p => p.id === s));
		},

		clearAllPoints: (state) => {
			state.points = state.points.filter(x => {
				const used = state.polygons.some(p => p.points.some(pp => pp.id === x.id));
				return used;
			});

			state.selectedPointIds = state.selectedPointIds.filter(s => state.points.some(p => p.id === s));
		},

		clearAllSelectedPoints: (state) => {
			state.selectedPointIds.length = 0;
		},

		togglePointSelected: (state, action: PayloadAction<Point>) => {
			if (state.selectedPointIds.find(x => x === action.payload.id)) {
				state.selectedPointIds = state.selectedPointIds.filter(x => x !== action.payload.id);
			}
			else {
				state.selectedPointIds.push(action.payload.id);
			}
		},

		createPolygon: (state) => {
			const selectedPointIds = state.selectedPointIds;
			const selectedPoints: Point[] = [];
			selectedPointIds.forEach(selectedPointId => {
				const point = state.points.find(point => point.id === selectedPointId);
				if (!point) {
					throw new Error("Point is not found");
				}

				selectedPoints.push(point);
			});

			if (selectedPoints.length < 3) {
				throw new Error("Too less selected points to create polygon");
			}

			state.polygons.push({
				id: nanoid(),
				points: [...selectedPoints],
				selected: false,
			});
		},
		removePolygon: (state, action: PayloadAction<Polygon>) => {
			const polygon = state.polygons.find(x => x.id === action.payload.id);
			if (!polygon) {
				throw new Error("Polygon is not found");
			}

			const index = state.polygons.indexOf(polygon);
			state.polygons.splice(index, 1);
		},
		togglePolygonSelected: (state, action: PayloadAction<Polygon>) => {
			const polygon = state.polygons.find(x => x.id === action.payload.id);
			if (!polygon) {
				throw new Error("Polygon is not found");
			}

			polygon.selected = !polygon.selected;
		},

		removeSelectedPolygons: (state) => {
			state.polygons = state.polygons.filter(x => !x.selected);
		},
		createPolygonFromPoints: (state, action: PayloadAction<Point[]>) => {
			state.polygons.push({
				id: nanoid(),
				points: [...action.payload],
				selected: true,
			});
		},

		changePointCoordinates: (state, action: PayloadAction<Point>) => {
			const point = state.points.find(x => x.id === action.payload.id);
			if (!point) {
				throw new Error("Point is not found");
			}

			point.coordinates = action.payload.coordinates;
		},
		togglePolygonsVisible: (state) => {
			state.isPolygonsVisible = !state.isPolygonsVisible;
		},
	}
});

export const {
	addPoint,
	removePoint,
	clearAllPoints,
	togglePointSelected,
	createPolygon,
	removePolygon,
	togglePolygonSelected,
	removeSelectedPolygons,
	createPolygonFromPoints,
	changePointCoordinates,
	clearAllSelectedPoints,
	togglePolygonsVisible,
} = editorSlice.actions;
export const { reducer: editorReducer, reducerPath: editorReducerPath } = editorSlice; 
