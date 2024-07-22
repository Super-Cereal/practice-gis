import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';

import { Spoiler } from '../../../../shared/ui/spoiler';
import { TextWithCopy } from '../../../../shared/ui/text-with-copy';
import { Button } from '../../../../shared/ui/button';
import { mapModel } from '../../../../entities/map';
import { type GeoObject, geoObjectModel, getGeometry, topologyModel } from '../../../../entities/geoobject';
import { geoObjectFormModel } from '../../../geoobject-form';

import { mapObjectsModel } from '../../lib/map-objects.model';

import styles from './map-object-actions.module.css';

/** Рендерит возможные действия с геообьектом */
export const MapObjectActions = () => {
    const selectedGeoobject = useUnit(mapObjectsModel.$selectedGeoobject);
    const selectedAspect = useUnit(mapModel.$mapAspect);
    const parentChildLinks = useUnit(topologyModel.$parentChildLinks);

    useEffect(() => {
        topologyModel.getParentChildLinksFx();
    }, []);

    const geoObjects = useUnit(geoObjectModel.$geoObjects);

    const childGeoObjects = parentChildLinks.filter(
        (link) => link.parentGeographicalObjectId === selectedGeoobject?.id
    ).map((link) => link.childGeographicalObjectId).flatMap((id) =>
        geoObjects.find((geoObject) => geoObject.id === id)
    );

    const parentGeoObjects = parentChildLinks.filter(
        (link) => link.childGeographicalObjectId === selectedGeoobject?.id
    ).map((link) => link.parentGeographicalObjectId).flatMap((id) =>
        geoObjects.find((geoObject) => geoObject.id === id)
    );
    //from update
    const handleUpdateModalFormOpen = () => {
        geoObjectFormModel.setIsUpdateModalOpen(true);
    };
    //from topology
    const handleTopologyFormOpen = () => {
        geoObjectFormModel.setIsTopologyFormOpen(true);
    };
    //form child
    const handleChildModalFormOpen = () => {
        geoObjectFormModel.setIsChildModalOpen(true);
        console.log(geoObjectFormModel.$isChildModalOpen.getState());
    };

    if (!selectedGeoobject) {
        return <h3>Нажмите на геообьект, чтобы редактировать его</h3>;
    }

    const { id, name } = selectedGeoobject;

    const handleDelete = () => {
        geoObjectModel.deleteGeoObjectFx(id);
    };

    return (
        <div>
            <MapObjectDescription
                parentGeoObjects={parentGeoObjects}
                geoObject={selectedGeoobject}
                childGeoObjects={childGeoObjects}
            />

            <div className={styles.btns}>
                {selectedAspect ? (
                    <Button /* onClick={handleUpdateModalFormOpen} */>
                        Создать {selectedAspect.title} для геообъекта
                    </Button>
                ) : (
                    <>
                        <Button mix={styles.btn} onClick={handleUpdateModalFormOpen}>
                            Изменить геообъект
                        </Button>
                        <Button mix={styles.btn} onClick={handleTopologyFormOpen}>
                            Добавить топологию
                        </Button>
                        <Button mix={styles.btn} onClick={handleChildModalFormOpen}>
                            Создать дочерний геообъект
                        </Button>
                    </>
                )}

                <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button>
            </div>
        </div>
    );
};

interface MapObjectDescriptionProps {
    geoObject: GeoObject;
    childGeoObjects?: (GeoObject | undefined)[];
    parentGeoObjects?: (GeoObject | undefined)[];
}

const MapObjectDescription = ({ geoObject, childGeoObjects, parentGeoObjects, }: MapObjectDescriptionProps) => {

    const geometry = getGeometry(geoObject);

    if (!geometry) {
        return <h3>Ошибка: выбран обьект с неизвестной геометрией</h3>;
    }

    const { type } = geometry;

    return (
        <>
            <h3 className={styles.title}>
                {type}: {geoObject.name}
            </h3>
            <TextWithCopy title="ID" text={geoObject.id} />

            <Spoiler mix={styles.spoiler} title="Классы" badgeText="К" color="gray">
                <div className={styles.classes}>
                    {geoObject.geoObjectInfo?.classifiers?.map(({ id, code, commonInfo }) => (
                        <div key={id} className={styles.class}>
                            <TextWithCopy title="id" text={id} />
                            <TextWithCopy title="code" text={code} />
                            <p className={styles.classInfo}>{commonInfo}</p>
                        </div>
                    ))}
                </div>
            </Spoiler>

            <Spoiler mix={styles.spoiler} title="Топологии" badgeText="Т" color="gray">
                <div className={styles.classes}>
                    {geoObject.geoObjectInfo?.classifiers?.map(({ id, code, commonInfo }) => (
                        <div key={id} className={styles.class}>
                            <TextWithCopy title="id" text={id} />
                            <TextWithCopy title="code" text={code} />
                            <p className={styles.classInfo}>{commonInfo}</p>
                        </div>
                    ))}
                </div>
            </Spoiler>
            {childGeoObjects && childGeoObjects.length > 0 ? (
                <Spoiler mix={styles.spoiler} title="Дети" badgeText="Д" color="gray">
                    <div className={styles.classes}>
                        {childGeoObjects.map((child) =>
                            child ? (
                                <div key={child.id} className={styles.class}>
                                    <TextWithCopy title="id" text={child.id} />
                                    <TextWithCopy title="name" text={child.name} />
                                </div>
                            ) : null
                        )}
                    </div>
                </Spoiler>
            ) : (
                <div className={styles.noObject}>Нет дочерних элементов</div>
            )}

            {parentGeoObjects && parentGeoObjects.length > 0 ? (
                <Spoiler mix={styles.spoiler} title="Родители" badgeText="Р" color="gray">
                    <div className={styles.classes}>
                        {parentGeoObjects.map((parent) =>
                            parent ? (
                                <div key={parent.id} className={styles.class}>
                                    <TextWithCopy title="id" text={parent.id} />
                                    <TextWithCopy title="name" text={parent.name} />
                                </div>
                            ) : null
                        )}
                    </div>
                </Spoiler>
            ) : (
                <div className={styles.noObject}>Нет родительских элементов</div>
            )}

        </>
    );
};
