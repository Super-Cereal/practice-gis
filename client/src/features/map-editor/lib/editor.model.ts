import { editorPointsModel } from './editor-points.model';
import { editorPolygonsModel } from './editor-polygons.model';
import { editorLinesModel } from './editor-lines.model';

export const editorModel = { ...editorPointsModel, ...editorPolygonsModel, ...editorLinesModel };
