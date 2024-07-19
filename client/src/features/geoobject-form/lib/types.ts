import type { DraftGeoObject } from '../../../entities/geoobject';
import type { EditorLine, EditorPoint, EditorPolygon, EditorObjectType } from '../../map-editor';

export interface FormFields {
    name: string;
    aspect: string;
    description: string;
    classCode: string;
    status: DraftGeoObject['status'];
}

export interface PreparedEditorObject {
    object: EditorPoint | EditorLine | EditorPolygon;
    type: EditorObjectType;
}
