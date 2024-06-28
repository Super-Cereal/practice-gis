import { useAppDispatch, useAppSelector } from "../hooks";
import { Feature } from "../models/feature";
import {
	removeSelectedPolygons, createPolygon, createPolygonFromPoints,
	clearAllSelectedPoints, clearAllPoints, togglePolygonsVisible,
} from "../store/editor.slice";
import { useIntersectMutation, useUnionMutation } from "../store/overlays.api";
import { Point } from "../models/point";
import { nanoid } from "nanoid";
import { FC } from "react";

const scalar = 1000000;

export const CommandBar: FC = () => {
	const editor = useAppSelector(x => x.editor);
	const dispatch = useAppDispatch();
	const [union, { isError: isUnionError }] = useUnionMutation();
	const [intersect, { isError: isIntersectError }] = useIntersectMutation();

	const selectedPolygonsCount = editor.polygons.filter(x => x.selected).length;

	const buildFeatureCollection = () => ({
		type: "FeatureCollection",
		features: editor.polygons.filter(x => x.selected)
			.map(x => ({
				type: "Feature",
				geometry: {
					type: "Polygon",
					coordinates: [x.points.map(point => point.coordinates.map(c => c! * scalar))
						.concat([x.points[0].coordinates.map(c => c! * scalar)])
					],
				},
				properties: {},
			} as Feature)),
		properties: {},
	});

	const handleApiResponse = (response: Feature) => {
		console.log("Response: ", response);
		const geometry = response.geometry;
		if (geometry && geometry.coordinates.length > 0) {
			dispatch(removeSelectedPolygons());
			dispatch(createPolygonFromPoints(
				(geometry.coordinates as number[][][])[0]
					.map(point => ({
						id: nanoid(),
						coordinates: point.map(c => c / scalar),
					} as Point))
			));
		}
	};

	const handleUnionPolygons = () => {
		send(union);
	};

	const handleIntersectPolygons = () => {
		send(intersect);
	};

	const send = (method: (feature: Feature) => ReturnType<typeof union>) => {
		method(buildFeatureCollection())
			.unwrap()
			.then(handleApiResponse)
			.catch(reason => {
				console.error(reason);
			});
	};

	const canCreatePolygon = (): boolean => {
		const selected = editor.selectedPointIds;
		return selected.length >= 3;
	};

	const anySelectedPoint = (): boolean => {
		return editor.selectedPointIds.length !== 0;
	};

	const anyPoint = (): boolean => {
		return editor.points.length !== 0;
	};

	return (
		<div className="container p-3 bg-light d-flex gap-4 align-items-center justify-content-between">
			<div className="d-flex gap-4 align-items-center">
				<button
					className="btn btn-outline-primary"
					onClick={() => dispatch(togglePolygonsVisible())}
				>
					{
						editor.isPolygonsVisible
							? "Скрыть полигоны"
							: "Показать полигоны"
					}
				</button>
				{
					anySelectedPoint() && <button
						className="btn btn-outline-primary"
						onClick={() => dispatch(clearAllSelectedPoints())}
					>
						Снять выделение точек
					</button>
				}
				{
					anyPoint() && <button
						className="btn btn-outline-primary"
						onClick={() => dispatch(clearAllPoints())}
					>
						Удалить точки
					</button>
				}

				{
					canCreatePolygon() && <button
						className="btn btn-outline-primary"
						onClick={() => dispatch(createPolygon())}
					>
						Создать полигон
					</button>
				}
			</div>

			{
				selectedPolygonsCount > 0 &&
				<div className="font-italic">
					Выбранные полигоны: {selectedPolygonsCount}
				</div>
			}

			{
				selectedPolygonsCount >= 2 &&
				<div className="d-flex gap-3">
					<button
						className="btn btn-outline-secondary text-uppercase"
						onClick={() => handleUnionPolygons()}
					>
						Объеденить
					</button>
					<button
						className="btn btn-outline-secondary text-uppercase"
						onClick={() => handleIntersectPolygons()}
					>
						Пересечь
					</button>
				</div>
			}

			<div className="font-italic">
				Полигоны: {editor.polygons.length}
			</div>
		</div>
	);
};