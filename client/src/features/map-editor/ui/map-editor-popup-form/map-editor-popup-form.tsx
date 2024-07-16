import React from 'react';
import { Popup } from 'react-leaflet';

import { Button } from '../../../../shared/ui/button';

import styles from './map-editor-popup-form.module.css';
import { editorModal } from '../../lib/editor-modal.model';
import { useUnit } from 'effector-react';
import { GeoModel } from '../../../../entities/geoobject/lib/geoobject.model';

interface Props {
  
   // polygonId: number
   type: string;
    onDelete: () => void;
    id: string;
}

/** Рендерит универсальную форму в попапе для геообьектов на карте */
export const MapEditorPopupForm = ({ onDelete, type, id }: Props) => {
    const selectedObject = useUnit(GeoModel.$selectedObjectStore)
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };
    const handleModalOpen = () =>{
        GeoModel.setSelectedObjectEvent({type, id })
        editorModal.setIsGeoObjectModalOpenTrue()
      
    }

    return (
        <Popup>
            <h4>{type} : {id}</h4>
            <Button onClick={() => handleModalOpen() } >
                        Создать геообъект
            </Button>
        </Popup>
    );
};
