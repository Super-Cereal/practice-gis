import React from 'react';
import { useUnit } from 'effector-react';

import { mapModel } from '../../entities/map';
import type { MapMode } from '../../entities/map/lib/types';

import styles from './info-plate.module.css';

/** Настройки страницы и карты (выбор режима просмотра) */
export const InfoPlate = () => {
    const mapMode = useUnit(mapModel.$mapMode);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        mapModel.setMapMode(e.target.value as MapMode);
    };

    return (
        <div className={styles.plate}>
            <div className={styles.setting}>
                <label htmlFor="map-mode-select">Режим работы с картой:</label>

                <select name="map-mode" id="map-mode-select" onChange={handleChange}>
                    <option value="view" selected={mapMode === 'view'}>
                        Просмотр сохраненных геообьектов
                    </option>
                    <option value="edit" selected={mapMode === 'edit'}>
                        Создание новых геообьектов
                    </option>
                </select>
            </div>
        </div>
    );
};
