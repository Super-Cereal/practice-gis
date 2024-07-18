import { useUnit } from 'effector-react';

import type { EditorLine, EditorObjectType, EditorPoint, EditorPolygon } from '../../map-editor';
import { mapEditorModel } from '../../map-editor';

import { geoObjectFormModel } from './geoobject-form.model';

interface PreparedEditorObject {
    object: EditorPoint | EditorLine | EditorPolygon;
    type: EditorObjectType;
}

export const usePreparedEditorObject = (): PreparedEditorObject | null => {
    const $selectedEditorObject = useUnit(geoObjectFormModel.$selectedEditorObject);

    const editorPoints = useUnit(mapEditorModel.$points);
    const editorLines = useUnit(mapEditorModel.$lines);
    const editorPolygons = useUnit(mapEditorModel.$polygons);

    if (!$selectedEditorObject) {
        return null;
    }

    const collection = {
        Point: editorPoints,
        PolyLine: editorLines,
        Polygon: editorPolygons,
    }[$selectedEditorObject.type];

    return { object: collection[$selectedEditorObject._id], type: $selectedEditorObject.type };
};