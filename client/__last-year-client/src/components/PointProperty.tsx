import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { Point } from "../models/point";
import { useMap } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useAppMap } from "./MapService";
import { changePointCoordinates } from "../store/editor.slice";

export interface PointPropertyProps {
	point: Point;
}

interface Errors {
	lattitude?: string;
	longitude?: string;
}

export const PointProperty: FC<PointPropertyProps> = props => {
	const [coordinates, setCoordinates] = useState({
		lattitude: props.point.coordinates[0],
		longitude: props.point.coordinates[1],
	});
	const [errors, setErrors] = useState({} as Errors);
	const editor = useAppSelector(x => x.editor);
	const map = useAppMap();
	const dispatch = useAppDispatch();

	const inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value);
		const name = event.target.name;
		if (isNaN(value)) {
			enableError(name);
			return;
		}

		setCoordinates(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const enableError = (name: string) => {
		setErrors(prev => ({
			...prev,
			[name]: "Введите число",
		}));
	};

	const show = () => {
		if (!map) {
			throw new Error("Map is not ready");
		}

		map.setView({
			lat: coordinates.lattitude,
			lng: coordinates.longitude,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(changePointCoordinates({
			...props.point,
			coordinates: [coordinates.lattitude, coordinates.longitude],
		}));
	};

	return (
		<form className="d-flex flex-column gap-2 border rounded p-3"
			onSubmit={handleSubmit}
		>
			<div className="d-flex justify-content-between align-items-center gap-3">
				<h6>Точка: </h6>
				<h6 className="font-monospace">{props.point.id.substring(0, 10)}</h6>
				{
					!!map && <button
						className="btn btn btn-secondary btn-sm"
						type="button"
						onClick={show}
					>
						Показать
					</button>
				}
			</div>

			<div className="form-group">
				<label htmlFor="lattitude">Широта</label>
				<input
					type="number"
					name="lattitude"
					className="form-control"
					id="lattitude"
					placeholder="Широта"
					onChange={inputChanged}
					value={coordinates.lattitude}
				/>

			</div>
			<div className="form-group">
				<label htmlFor="longitude">Долгота</label>
				<input
					type="number"
					name="longitude"
					className="form-control"
					id="longitude"
					placeholder="Долгота"
					onChange={inputChanged}
					value={coordinates.longitude}
				/>
			</div>
			<button
				className="btn btn-primary"
				type="submit"
			>
				Применить
			</button>
		</form>
	);
};