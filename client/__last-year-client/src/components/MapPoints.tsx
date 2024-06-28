import { Circle, Popup, useMap, useMapEvent } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../hooks";
import { LeafletMouseEvent, PathOptions } from "leaflet";
import { addPoint, removePoint, togglePointSelected } from "../store/editor.slice";
import { nanoid } from "nanoid";
import { Point } from "../models/point";

const defaultOptions: PathOptions = {
	fillColor: "gray",
	color: "gray"
};
const selectedOptions: PathOptions = {
	fillColor: "green",
	color: "green"
};

export const MapPoints = () => {
	const editor = useAppSelector(x => x.editor);
	const points = useAppSelector(x => x.editor.points);
	const dispatch = useAppDispatch();
	const map = useMap();
	let isRemoving = false;

	const usedInPolygons = (pointId: string) => editor.polygons.some(x => x.points.some(p => p.id === pointId));

	const handleClick = (e: LeafletMouseEvent) => {
		if (isRemoving) {
			return;
		}

		const point: Point = {
			id: nanoid(),
			coordinates: [e.latlng.lat, e.latlng.lng],
		};
		dispatch(addPoint(point));
	};

	useMapEvent("click", handleClick);

	if (points.length === 0) {
		return null;
	}

	const isSelected = (point: Point): boolean => {
		return editor.selectedPointIds.some(x => x === point.id);
	};

	return (
		<>
			{
				points.map((x, index) => (
					<Circle
						key={index}
						center={x.coordinates}
						pathOptions={isSelected(x) ? selectedOptions : defaultOptions}
						radius={20}
					>
						<Popup>
							<div className="">
								<div className="d-flex justify-content-between align-items-center gap-3">
									<h3>Точка: </h3>
									<h4 className="font-monospace">{x.id.substring(0, 10)}</h4>
								</div>
							</div>
							<div className="">
								<div className="btn-group" role="group">
									{
										!usedInPolygons(x.id) && <button
											type="button"
											className="btn btn-outline-danger"
											onClick={(e) => {
												map.closePopup();
												e.stopPropagation();
												return dispatch(removePoint(x));
											}}
										>
											Удалить
										</button>
									}

									<button
										type="button"
										className="btn btn-outline-primary"
										onClick={(e) => {
											e.stopPropagation();
											return dispatch(togglePointSelected(x));
										}}
									>
										{isSelected(x) ? "Снять выделение" : "Выделить"}
									</button>
								</div>
							</div>
						</Popup>
					</Circle>
				))
			}
		</>
	);
};