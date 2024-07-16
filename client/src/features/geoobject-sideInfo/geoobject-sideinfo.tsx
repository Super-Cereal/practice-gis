import React from 'react';

import styles from './geoobject-sideinfo.module.css';

/** Редактор выбранного/сохраняемого геообьекта (код, название, описание, статус, тд) */
export const GeoobjectSideInfo = () => {
    return (
        <div className={styles.editor}>
            <h2>Выберите геообъект, чтобы увидеть справку</h2>
        <table className={styles.table}>
        <tbody>
          <tr>
            <th>Название:</th>
            <td>geoObject.name</td>
          </tr>
          <tr>
            <th>ID:</th>
            <td>geoObject.id</td>
          </tr>
          <tr>
            <th>Статус:</th>
            <td>geoObject.statusg</td>
          </tr>
          <tr>
            <th>Описание:</th>
            <td>geoObject.description</td>
          </tr>
          <tr>
            <th>Родительский объект:</th>
            <td>geoObject.parentObject</td>
          </tr>
          <tr>
            <th>Дочерний объект:</th>
            <td>geoObject.childObject</td>
          </tr>
        </tbody>
      </table>
         
        </div>
    );
};
