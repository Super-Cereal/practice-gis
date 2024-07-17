import React, { ChangeEvent, useState } from 'react';
import { useUnit } from 'effector-react';
import { nanoid } from 'nanoid';

import { Button } from '../../../../shared/ui/button';
import { geoObjectModel, type GeoObject } from '../../../../entities/geoobject';
import { aspects } from '../../../../widgets/map/lib/mocks';

import { mapEditorModel } from '../../../map-editor';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { usePreparedEditorObject } from '../../lib/use-prepared-editor-object';

import styles from './geoobject-form.module.css';

const typeToLabel = {
    Point: 'точки',
    PolyLine: 'линии',
    Polygon: 'полигона',
};

export const GeoobjectForm = () => {
    const editorObject = usePreparedEditorObject();

    const [name, setName] = useState('');
    const [selectedAspect, setSelectedAspect] = useState('');
    const [description, setDescription] = useState('');

    if (!editorObject) {
        return null;
    }

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
        const geobjectToSave = {};

        geoObjectFormModel.setIsGeoObjectModalOpen(false);
        // geoObjectFormModel.addGeoObjectEvent(newGeoObject);
    };

    return (
        <div className={styles.container}>
            <div className={styles.overlay} onClick={() => geoObjectFormModel.setIsGeoObjectModalOpen(false)} />

            <div className={styles.form}>
                {/* Описание + id полигона */}
                <div className={styles.formGroup}>
                    <label>
                        Создание геообъекта на основе &nbsp;
                        {editorObject && typeToLabel[editorObject.type]}
                    </label>
                    <label>ID: {editorObject.object != null && editorObject?.object._id}</label>
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
                    <option>выберете аспект</option>
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
                        onClick={() => geoObjectFormModel.setIsGeoObjectModalOpen(false)}
                        color="orange"
                    >
                        Закрыть форму
                    </Button>
                </div>
            </div>
        </div>
    );
};
