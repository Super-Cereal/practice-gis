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

    const mapMode = useUnit(mapModel.$mapMode);
    const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams({ ...searchParams, mapMode: e.target.value as MapMode });
    };

    const editorPointsOnCorners = useUnit(mapModel.$editorPointsOnCorners);
    const handlePointsOnCornersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        mapModel.setEditorPointsOnCorners(e.target.checked);
    };

    return (
        <div className={styles.plate}>
            <div className={styles.settings}>
                <label>
                    <span>Режим работы с картой:</span>
                    <select name="map-mode" onChange={handleModeChange}>
                        <option value="view" selected={mapMode === 'view'}>
                            Просмотр сохраненных геообьектов
                        </option>
                        <option value="edit" selected={mapMode === 'edit'}>
                            Создание новых геообьектов
                        </option>
                    </select>
                </label>

                {mapMode === 'edit' && (
                    <label>
                        <span>Включить отображение точек на углах:</span>
                        <input type="checkbox" onChange={handlePointsOnCornersChange} checked={editorPointsOnCorners} />
                    </label>
                )}
            </div>
        </div>
    );
};
