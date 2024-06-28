import { Polygon, Popup, useMap } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removePolygon, togglePolygonSelected } from "../store/editor.slice";

const greenOptions = { fillColor: 'green' };
const redOptions = { fillColor: 'red' };

export const MapPolygons = () => {
	const dispatch = useAppDispatch();
	const map = useMap();

	const polygons = useAppSelector(x => x.editor.polygons);

	if (polygons.length === 0) {
		return null;
	}

	return (
		<>
			{
				polygons.map((x, index) => (
					<Polygon
						key={index}
						positions={[x.points.map(point => point.coordinates)]}
						pathOptions={x.selected ? greenOptions : redOptions}
					>
						<Popup>
							<div className="">
								<h1>Полигон: {index}</h1>
							</div>

							<div className="">
								<div className="btn-group" role="group">
									<button
										type="button"
										className="btn btn-outline-danger"
										onClick={(e) => {
											map.closePopup();
											e.stopPropagation();
											return dispatch(removePolygon(x));
										}}
									>
										Удалить
									</button>

									<button
										type="button"
										className="btn btn-outline-primary"
										onClick={(e) => {
											e.stopPropagation();
											return dispatch(togglePolygonSelected(x));
										}}
									>
										{x.selected ? "Снять выделение" : "Выделить"}
									</button>
								</div>
							</div>
						</Popup>
					</Polygon>
				))
			}
		</>
	);
};