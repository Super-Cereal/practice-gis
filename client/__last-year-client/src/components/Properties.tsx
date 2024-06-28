import { FC } from "react";
import { useAppSelector } from "../hooks";
import { PointProperty } from "./PointProperty";
import { Point } from "../models/point";

export const Properties: FC = () => {
	const editor = useAppSelector(x => x.editor);
	const points: Point[] = [];
	editor.selectedPointIds.forEach(selectedPointId => {
		const point = editor.points.find(point => point.id === selectedPointId);
		if (!point) {
			throw new Error("Point is not found");
		}

		points.push(point);
	});

	return (
		<div className="h-100 p-3 d-flex flex-column">
			<h5>Выбранные точки</h5>
			<div className="flex-grow-1 overflow-auto">
				<div className="d-flex flex-column gap-3">
					{
						points.map(x => (
							<PointProperty
								key={x.id}
								point={x}
							/>
						))
					}
				</div>
			</div>
		</div>
	);
};