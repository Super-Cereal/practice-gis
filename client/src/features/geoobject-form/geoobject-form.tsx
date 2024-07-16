import React, { ChangeEvent, useState } from 'react';
import { useUnit } from 'effector-react';
import { nanoid } from 'nanoid';

import { aspects } from '../../widgets/map/lib/mocks';
import { geoObjectModel } from '../../entities/geoobject/lib/geoobject.model';
import { Button } from '../../shared/ui/button';

import { editorModal } from '../map-editor/lib/editor-modal.model';
import { editorPointsModel } from '../map-editor/lib/editor-points.model';
import { editorPolygonsModel } from '../map-editor/lib/editor-polygons.model';
import { editorLinesModel } from '../map-editor/lib/editor-lines.model';
import { geoObjectFormModel } from './lib/geoobject-form.model';
import type { EditorLine, EditorPoint, EditorPolygon } from '../map-editor/lib/types';

import { GeoInfo, GeoObject } from '../../entities/geoobject';
import styles from './geoobject-form.module.css';

interface IObjectforGeoCreate {
    object: EditorPoint | EditorPolygon | EditorLine | null;
    type: string;
}

export const GeoobjectForm = () => {
    const selectedObjectStore = useUnit(geoObjectFormModel.$selectedObjectStore);
    const points = useUnit(editorPointsModel.$points);
    const polygons = useUnit(editorPolygonsModel.$polygons);
    const lines = useUnit(editorLinesModel.$lines);

    let ObjectforGeoCreate: IObjectforGeoCreate = { object: null, type: '' };

    if (selectedObjectStore) {
        ObjectforGeoCreate = (() => {
            switch (selectedObjectStore.type) {
                case 'point':
                    const foundPoint = Object.values(points).find((point) => point.id === selectedObjectStore?.id);
                    return { object: foundPoint ?? null, type: 'point' };
                case 'line':
                    const foundLine = Object.values(lines).find((line) => line.id === selectedObjectStore.id);
                    return { object: foundLine ?? null, type: 'line' };
                case 'polygon':
                    const foundPolygon = Object.values(polygons).find(
                        (polygon) => polygon.id === selectedObjectStore.id,
                    );
                    return { object: foundPolygon ?? null, type: 'polygon' };
                default:
                    return { object: null, type: '' };
            }
        })();
    }

    const [name, setName] = useState('');
    const [selectedAspect, setSelectedAspect] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAspect(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSaveClick = () => {
        if (!ObjectforGeoCreate.object || ObjectforGeoCreate.object === null) {
            console.error('No selected object');
            return;
        }

        /* if(ObjectforGeoCreate.object != null){
      const existingGeoObject = geoObjectModel.$geoObjectsStore.getState().find(
        (geoObject) =>
          geoObject.geometryObject.id === ObjectforGeoCreate.object.id &&
          geoObject.geoInfo.type === selectedAspect
      );
    }
  
  
    if (existingGeoObject) {
      alert(`Геообъект с аспектом "${selectedAspect}" на этой геометрии уже существует`);
      return;
    } */
        const GeoObjId = nanoid();

        const newGeoInfo: GeoInfo = {
            type: selectedAspect,
            info: description,
            relevance: true,
            id: nanoid(),
            GeoobjectId: GeoObjId,
        };
        const newGeoObject: GeoObject = {
            id: GeoObjId,
            name,
            type: ObjectforGeoCreate.type,
            geometryObject: ObjectforGeoCreate.object,
            geoInfo: newGeoInfo,
        };
        // geoObjectFormModel.addGeoObjectEvent(newGeoObject);
        editorModal.setIsGeoObjectModalOpenFalse();
        // console.log(geoObjectModel.$geoObjectsStore.getState());
    };

    return (
        <div className={styles.container}>
            <div className={styles.overlay} onClick={() => editorModal.setIsGeoObjectModalOpenFalse()} />

            <div className={styles.form}>
                {/* Описание + id полигона */}
                <div className={styles.formGroup}>
                    <label>
                        Создание геообъекта на основе &nbsp;
                        {ObjectforGeoCreate !== null
                            ? ObjectforGeoCreate.type === 'point'
                                ? 'точки'
                                : ObjectforGeoCreate.type === 'line'
                                ? 'линии'
                                : ObjectforGeoCreate.type === 'polygon'
                                ? 'полигона'
                                : null
                            : null}
                    </label>
                    <label>ID: {ObjectforGeoCreate.object != null && ObjectforGeoCreate?.object.id}</label>
                </div>
                {/* Название -> GeoObject.name */}
                <div className={styles.formGroup}>
                    <input
                        placeholder="Название"
                        value={name}
                        onChange={handleNameChange}
                        type="text"
                        id="name"
                        className={styles.input}
                    />
                </div>
                {/* Аспекты -> GeoInfo.type */}
                <select className={styles.aspectSelect} value={selectedAspect} onChange={handleSelect}>
                    {aspects.map((aspect) => (
                        <option className={styles.aspectOption} key={aspect.id} value={aspect.title}>
                            {aspect.title}
                        </option>
                    ))}
                </select>
                {/* Описание GeoInfo.info */}
                <div className={styles.formGroup}>
                    <textarea
                        placeholder="Описание"
                        value={description}
                        onChange={handleDescriptionChange}
                        id="text"
                        className={styles.textarea} /* value={text} onChange={handleTextChange} */
                    />
                </div>

                <div className={styles.buttonGroup} role="group">
                    <Button
                        disabled={!name || !selectedAspect || !description}
                        mix={styles.editorModal__button}
                        onClick={handleSaveClick}
                    >
                        Сохранить
                    </Button>
                    <Button
                        mix={styles.editorModal__button}
                        onClick={() => editorModal.setIsGeoObjectModalOpenFalse()}
                        color="orange"
                    >
                        Закрыть форму
                    </Button>
                </div>
            </div>
        </div>
    );
};
