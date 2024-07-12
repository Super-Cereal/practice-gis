import React from 'react';
import { useUnit } from 'effector-react';

import { mapModel } from '../../entities/map';
import type { MapMode } from '../../entities/map/lib/types';

import styles from './info-plate.module.css';

/** Настройки страницы и карты (выбор режима просмотра) */
export const InfoPlate = () => {
    const setMapMode = useUnit(mapModel.setMapMode);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMapMode(e.target.value as MapMode);
    };

    return (
        <div className={styles.plate}>
            <div className={styles.setting}>
                <label htmlFor="map-mode-select">Режим работы с картой:</label>

                <select name="map-mode" id="map-mode-select" onChange={handleChange}>
                    <option value="view" defaultChecked={true}>
                        Просмотр сохраненных геообьектов
                    </option>
                    <option value="edit">Создание новых геообьектов</option>
                </select>
            </div>
        </div>
    );
};
