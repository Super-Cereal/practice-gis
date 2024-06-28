import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";
import { Map } from "leaflet";

let instance: Map | undefined;

export const MapService: FC = () => {
	const map = useMap();

	useEffect(() => {
		console.log("set map");
		instance = map;
	}, []);

	return null;
};

export const useAppMap = (): Map | undefined => {
	return instance;
};