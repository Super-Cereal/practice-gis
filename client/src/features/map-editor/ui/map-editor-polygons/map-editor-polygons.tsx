import { Polygon, Popup } from 'react-leaflet';
import type { PathOptions } from 'leaflet';
import { useUnit } from 'effector-react';

import { editorModel } from '../../lib/editor.model';

/** Рендерит черновиковые полигоны и обрабатывает их создание, выделение и сохранение */
export const MapEditorPolygons = () => {
    const $polygons = useUnit(editorModel.$polygons);

    return (
        <>
            {Object.values($polygons).map(({ id, points, selected }, index) => {
                return (
                    <Polygon
                        key={index}
                        positions={points.map(({ coordinates }) => coordinates)}
                        pathOptions={selected ? selectedOptions : defaultOptions}
                        eventHandlers={{ click: () => editorModel.togglePolygonSelect(id) }}
                    >
                        <Popup>
                            <h3>Полигон {id}</h3>
                        </Popup>
                    </Polygon>
                );
            })}
        </>
    );
};

const defaultOptions: PathOptions = {
    fillColor: 'gray',
    color: 'gray',
};
const selectedOptions: PathOptions = {
    fillColor: 'green',
    color: 'green',
};
