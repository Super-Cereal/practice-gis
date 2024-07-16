import { EditorLine, EditorPoint, EditorPolygon } from "../../../features/map-editor/lib/types";

export interface GeoObject {
	type: string; // код  ADM, BLDG и т. д. возможно не нужно
	name: string;
	geoInfo?: GeoInfo;
	id: string;
	geometryObject: EditorPoint | EditorPolygon | EditorLine;
	GeoObjects?: GeoObject[];
}

export interface GeoInfo  {
	type: string; // информация по типу (со стороны экологии, популяции и т д)
	relevance: boolean;
	info: string;
	id: string;
	GeoobjectId: string;
	properties?: object;

}