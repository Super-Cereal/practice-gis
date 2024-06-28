import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapPoints } from "./MapPoints";
import { MapPolygons } from "./MapPolygons";
import { MapService } from "./MapService";
import { useAppSelector } from "../hooks";

export const MapBox = () => {
	const editor = useAppSelector(x => x.editor);

	return (
		<MapContainer
			className="h-100 w-100"
			center={[59.939, 30.316]}
			zoom={15}
			scrollWheelZoom={true}
		>
			<MapService />

			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<MapPoints />

			{editor.isPolygonsVisible && <MapPolygons />}

		</MapContainer>
	);
};