import React from 'react'

import styles from './geoobject-form.module.css';
import { editorModal } from '../map-editor/lib/editor-modal.model';
import { Button } from '../../shared/ui/button';
import { bem } from '../../shared/lib';
const b = bem('editor-modal');
export const GeoobjectForm = ({/* selectedObject */ }) => {



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
    <div className={styles.container}>
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
            <input id="ADM" type="radio" name="radio" value="ADM" />
            ADM
          </label>
          <label>
            <input id="BLDG" type="radio" name="radio" value="BLDG" />
            BLDG
          </label>
          <label>
            <input id="OTHER" type="radio" name="radio" value="OTHER" />
            OTHER
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>Текст: </label><br />
          <textarea id="text" className={styles.textarea} /* value={text} onChange={handleTextChange} */ />
        </div>
        <div className={styles.buttonGroup} role="group">
          <Button
          disabled={true}
          mix={styles.editorModal__button}
          /*   onClick={handleSaveClick} */
          >
            Сохранить
          </Button>
          <Button
            mix={styles.editorModal__button}
            onClick={() => editorModal.setIsGeoObjectModalOpenFalse()}
          >
            Закрыть форму
          </Button>
        </div>
      </div>
    </div>

  );
};





