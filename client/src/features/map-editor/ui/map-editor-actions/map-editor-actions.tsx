import React, { useEffect } from 'react';
import { LatLngTuple, LeafletMouseEvent } from 'leaflet';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { mapModel } from '../../../../entities/map';

import { editorModel } from '../../lib/editor.model';
import { EditorObject, EditorPolygon, featureToEditorObject } from '../../lib/types';
import { useSelectedObjectsByType } from '../../lib/use-objects-by-type';

import styles from './map-editor-actions.module.scss';
import { MapObjectActions, mapObjectsModel } from '../../../map-objects';
import { pointInsidePolygon } from '../../../../utils/IsPolygonInside';
import { GeoObject, getGeometry } from '../../../../entities/geoobject';
import { intersectPolygonsRequest, unionPolygonsRequest } from '../../../../entities/geoobject/api/requests';
import {
    convertPolygonsToFeatureCollection,
    FeatureCollection,
    GeometryGeoJSONPolygon,
} from '../../../../entities/geoobject/model/types';

/** Рендерит список действий в черновиковом режиме (обьединение/удаление кнопок/полигонов) */
export const MapEditorActions = () => {
    const map = useUnit(mapModel.$map);
    const isClippingMode = useUnit(mapModel.$isClippingMode);
    const clippedObject = useUnit(editorModel.$clippedObject);
    const selectedObjects = useUnit(mapObjectsModel.$selectedGeoobjects);
    // Клик по карте создает новую точку
    useEffect(() => {
        if (!map) {
            console.log(' (!map)');
            return;
        }
        const handleMapClick = (e: LeafletMouseEvent) => {
            if (isClippingMode && clippedObject) {
                const clippedPolygon = getGeometry(clippedObject);

                const isPointInsidePolygon = pointInsidePolygon(
                    [e.latlng.lat, e.latlng.lng],
                    clippedPolygon?.coordinates as LatLngTuple[],
                );

                if (!isPointInsidePolygon) {
                    console.log('точка не может быть вне родительского полигона');
                } else {
                    editorModel.addObject({ type: 'Point', coordinates: [e.latlng.lat, e.latlng.lng] });
                }
            } else {
                editorModel.addObject({ type: 'Point', coordinates: [e.latlng.lat, e.latlng.lng] });
            }
        };

        map.addEventListener('click', handleMapClick);

        return () => {
            map.removeEventListener('click', handleMapClick);
        };
    }, [map, isClippingMode, clippedObject]);

    const unitePointsTo = (type: Exclude<EditorObject['type'], 'Point'>) => {
        map?.closePopup();

        editorModel.unitePointsTo(type);
    };

    const selectedPoints = useSelectedObjectsByType('Point');
    const selectedPolylines = useSelectedObjectsByType('PolyLine');
    const selectedPolygons = useSelectedObjectsByType('Polygon');

    const closePolygon = (coordinates: LatLngTuple[]): LatLngTuple[][] => {
        if (coordinates.length < 3) {
            throw new Error('Polygon must have at least 3 points.');
        }
        // Проверяем, замкнут ли полигон
        const isClosed =
            coordinates[0][0] === coordinates[coordinates.length - 1][0] &&
            coordinates[0][1] === coordinates[coordinates.length - 1][1];

        if (!isClosed) {
            coordinates.push(coordinates[0]);
        }

        return [coordinates];
    };

    const scalar = 1000000;

    const Union = (selectedPolygons: EditorObject[]) => {
        const isPolygon = selectedPolygons.every((obj): obj is EditorPolygon => obj.type === 'Polygon');
        if (!isPolygon) {
            throw new Error("All selected objects must have type 'Polygon'.");
        }

        const Polygons = selectedPolygons.map((obj) => ({
            type: obj.type,
            coordinates: closePolygon(obj.coordinates),
        }));

        if (Polygons.length < 2) {
            throw new Error('At least two polygons are required.');
        }

        if (isPolygon) {
            /*  const sanitizedPolygons = Polygons.map(({ readonly, selected, _id, ...rest }) => rest); */
            //@ts-ignore
            const FC = convertPolygonsToFeatureCollection(Polygons as GeometryGeoJSONPolygon[]);

            unionPolygonsRequest({ FeatureCollection: FC }).then((result) => {
                console.log(selectedPolygons[0]);

                editorModel.deleteObject(selectedPolygons[0]._id);
                editorModel.deleteObject(selectedPolygons[1]._id);

                console.log('result1', result);

                result.geometry.coordinates = result.geometry.coordinates.map((ring) => {
                    if (
                        ring.length > 0 &&
                        (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1])
                    ) {
                        ring.push([...ring[0]]); // Добавляем копию первой точки в конец
                    }

                    return ring.map(([lon, lat]) => [
                        parseFloat((lat / scalar).toFixed(6)), // Разделяем на scalar для восстановления координат
                        parseFloat((lon / scalar).toFixed(6)), // Разделяем на scalar для восстановления координат
                    ]);
                });

                console.log('result2', result);

                /*         const obj = featureToEditorObject(result); */
                editorModel.addObject({ type: 'Polygon', coordinates: result.geometry.coordinates[0] });
            });
        }
    };

    const Interspect = (selectedPolygons: EditorObject[]) => {
        const isPolygon = selectedPolygons.every((obj): obj is EditorPolygon => obj.type === 'Polygon');
        if (!isPolygon) {
            throw new Error("All selected objects must have type 'Polygon'.");
        }

        const Polygons = selectedPolygons.map((obj) => ({
            type: obj.type,
            coordinates: closePolygon(obj.coordinates),
        }));

        if (Polygons.length < 2) {
            throw new Error('At least two polygons are required.');
        }

        if (isPolygon) {
            /*  const sanitizedPolygons = Polygons.map(({ readonly, selected, _id, ...rest }) => rest); */
            //@ts-ignore
            const FC = convertPolygonsToFeatureCollection(Polygons as GeometryGeoJSONPolygon[]);

            intersectPolygonsRequest({ FeatureCollection: FC }).then((result) => {
                console.log(selectedPolygons[0]);

                editorModel.deleteObject(selectedPolygons[0]._id);
                editorModel.deleteObject(selectedPolygons[1]._id);

                console.log('result1', result);

                result.geometry.coordinates = result.geometry.coordinates.map((ring) => {
                    if (
                        ring.length > 0 &&
                        (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1])
                    ) {
                        ring.push([...ring[0]]); // Добавляем копию первой точки в конец
                    }

                    return ring.map(([lon, lat]) => [
                        parseFloat((lat / scalar).toFixed(6)), // Разделяем на scalar для восстановления координат
                        parseFloat((lon / scalar).toFixed(6)), // Разделяем на scalar для восстановления координат
                    ]);
                });

                console.log('result2', result);

                /*         const obj = featureToEditorObject(result); */
                editorModel.addObject({ type: 'Polygon', coordinates: result.geometry.coordinates[0] });
            });
        }
    };

    return (
        <div>
            <MapObjectActions />
            <h2>Выбранные геообъекты:</h2>
            {selectedPolygons.length === 2 && (
                <>
                    <Button onClick={() => Union(selectedPolygons)}>Обьединить полигоны</Button>
                    <Button onClick={() => Interspect(selectedPolygons)}>Пересечь полигоны</Button>
                </>
            )}
            <ObjectsActionsContainer
                objects={selectedPoints}
                extraButtons={
                    <>
                        {selectedPoints.length > 1 && (
                            <Button onClick={() => unitePointsTo('PolyLine')}>Обьединить в линию</Button>
                        )}
                        {selectedPoints.length > 2 && (
                            <Button onClick={() => unitePointsTo('Polygon')}>Обьединить в полигон</Button>
                        )}
                    </>
                }
            />
            <ObjectsActionsContainer objects={selectedPolylines} />
            <ObjectsActionsContainer objects={selectedPolygons} />
        </div>
    );
};

const typeToText = {
    Point: 'Точки',
    PolyLine: 'Линии',
    Polygon: 'Полигоны',
};

const ObjectsActionsContainer = ({
    objects,
    extraButtons,
}: {
    objects: EditorObject[];
    extraButtons?: React.ReactNode;
}) => {
    const map = useUnit(mapModel.$map);

    if (objects.length === 0) {
        return null;
    }

    /** Обработчик "массовых" событий для обьектов одного типа */
    const handleEvent = (func: (_id: string) => void) => {
        map?.closePopup();

        objects.forEach(({ _id }) => func(_id));
    };
    const handleDelete = () => handleEvent(editorModel.deleteObject);
    const handleRemoveSelection = () => handleEvent(editorModel.toggleObjectSelect);

    return (
        <div className={styles.container}>
            <h3>
                {typeToText[objects[0].type]} ({objects.length})
            </h3>

            <div>
                {objects.map(({ _id, readonly }) => (
                    <div key={_id}>
                        id: {_id} {readonly && '(readonly)'}
                    </div>
                ))}
            </div>

            {extraButtons}

            <Button onClick={handleRemoveSelection}>Снять выделение</Button>
            <Button onClick={handleDelete} color="orange">
                Удалить
            </Button>
        </div>
    );
};
