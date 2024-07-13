import React from 'react'

import styles from './geoobject-form.module.css';

export const GeoobjectForm = ({/* selectedObject */}) => {
 


 /*  const [name, setName] = useState('');
    const [type, setType] = useState('ADM');
    const [text, setText] = useState(''); 

    const handleNameChange = (e) => {
      setName(e.target.value);
    };

    const handleTypeChange = (e) => {
      setType(e.target.value);
    };

    const handleTextChange = (e) => {
      setText(e.target.value);
    };

    const handleSaveClick = (e) => {
      e.stopPropagation();
      dispatch(createGeoObject({ name, type, text, polygon: x }));
    };

    const handleDeleteClick = (e) => {
      map.closePopup();
      e.stopPropagation();
      dispatch(removePolygon(x)) && dispatch(clearAllPoints());
    };

    const handleToggleSelectedClick = (e) => {
      e.stopPropagation();
      dispatch(togglePolygonSelected(x));
    };
 */
    return (
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Полигон: 1{/* {index} */}</label>
        </div>
        <div className={styles.formGroup}>
          <label>Название: </label>
          <input type="text" id="name" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label>
            <input id="ADM" type="radio" name="radio" value="ADM"  />
            ADM
          </label>
          <label>
            <input id="BLDG" type="radio" name="radio" value="BLDG"  />
            BLDG
          </label>
          <label>
            <input id="OTHER" type="radio" name="radio" value="OTHER"  />
            OTHER
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>Текст: </label><br />
          <textarea id="text" className={styles.textarea} /* value={text} onChange={handleTextChange} */ />
        </div>
        <div className={styles.buttonGroup} role="group">
          <button
            type="button"
            className={styles.button}
          /*   onClick={handleSaveClick} */
          >
            Сохранить
          </button>

          <button
            type="button"
            className={styles.button}
           /*  onClick={handleDeleteClick} */
          >
            Удалить
          </button>

          <button
            type="button"
            className={styles.button}
           /*  onClick={handleToggleSelectedClick} */
          >
      {/*       {x.selected ? "Снять выделение" : "Выделить"} */}
          </button>
        </div>
      </div>
    );
  };





