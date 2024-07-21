import React, { FC, useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import styles from './classifier-from.module.css';
import { geoObjectModel } from '../../../../entities/geoobject';
import { Button } from '../../../../shared/ui/button';
import { Classifier, GeoObjectsClassifier } from '../../../../entities/geoobject/lib/types';



interface ClassifierFormProps {
  geoObjectId: string;
}

export const ClassifierForm: FC<ClassifierFormProps> = ({ geoObjectId }) => {
  //классы с бэка
  const geoClassifiers = useUnit(geoObjectModel.$classifiers);

  useEffect(() => {
    getClassifiers();
  }, []);

  const getClassifiers = geoObjectModel.getClassifiers;
  const addGeoObjectClassifierFx = geoObjectModel.addGeoObjectClassifierFx;
  const saveClassifierFx = geoObjectModel.saveClassifierFx;

  //выбранный класс
  const [selectedClassifier, setSelectedClassifier] = useState<Classifier | null>(null);

  const handleSelectClassifier = (classifier: Classifier) => {
    setSelectedClassifier(classifier);
  };

  //добавление класса объекту
  const handleAddClassifierToObject = async () => {
    if (!selectedClassifier || !geoObjectId || !selectedClassifier.id) {
      return;
    }

    const classifierId = selectedClassifier.id
    await addGeoObjectClassifierFx({ geoObjectId, classifierId });

  };

 //создание нового класса
  const handleCreateNewClassifier = async () => {
    const newClassifier = {
      name: 'New Classifier',
      code: 'NEW',
      commonInfo: 'This is a new classifier',
    };
    await saveClassifierFx(newClassifier);
  };

  return (
    <>
      <div className={styles.classifierGroup}>
        <label>Код классификатора: </label>
        <select className={styles.classifierSelect} onChange={(e) => {
          const selectedClassifier = geoClassifiers.find((cl) => cl.code === e.target.value);
          if (selectedClassifier) {
            handleSelectClassifier(selectedClassifier);
          }
        }}>
          <option value="">Выберите классификатор</option>
          {geoClassifiers.map((cl) => (
            <option className={styles.aspectOption} key={cl.code} value={cl.code}>
              {cl.code} - {cl.commonInfo}
            </option>
          ))}
        </select>

      </div>
      <div className={styles.btns} role="group">
        <Button mix={styles.btn} onClick={handleAddClassifierToObject} disabled={!selectedClassifier}>
          Добавить классификатор объекту
        </Button>
        <Button mix={styles.btn} onClick={handleCreateNewClassifier}>
          Создать новый классификатор
        </Button>
      </div>
    </>
  );
};
