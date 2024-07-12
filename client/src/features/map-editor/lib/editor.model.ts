import { editorPointsModel } from './editor-points.model';
import { editorPolygonsModel } from './editor-polygons.model';

export const editorModel = { ...editorPointsModel, ...editorPolygonsModel };
