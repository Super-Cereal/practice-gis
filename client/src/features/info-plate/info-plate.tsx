import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';

import { mapModel } from '../../entities/map';
import type { MapMode } from '../../entities/map/lib/types';

import styles from './info-plate.module.css';
import { useSearchParams } from 'react-router-dom';

/** Настройки страницы и карты (выбор режима просмотра) */
export const InfoPlate = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    /** Сохраняем режим карты в query, чтобы не сбрасывать вкладку при перезагрузке */
    useEffect(() => {
        const mapModeFromSearch = searchParams.get('mapMode') as MapMode | null;

        if (mapModeFromSearch) {
            mapModel.setMapMode(mapModeFromSearch);
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams({ mapMode: e.target.value as MapMode });
    };

    const mapMode = useUnit(mapModel.$mapMode);

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
