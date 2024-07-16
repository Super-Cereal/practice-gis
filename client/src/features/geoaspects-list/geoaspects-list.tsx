import React from 'react'
import styles from './geoaspects-list.module.css'
import { editorModal } from '../map-editor/lib/editor-modal.model'
import { Button } from '../../shared/ui/button'
export const GeoaspectsList = () => {

  return (
   <>
   <div className={styles.container}>
            <div className={styles.overlay} onClick={() => editorModal.setIsAspectsModalOpenFalse()} />

            <div className={styles.form}>
            ?  тут списком они будут ?
            <Button
                      /*   disabled={!name || !selectedAspect || !description}
                        mix={styles.editorModal__button}
                        onClick={handleSaveClick} */
                    >
                        Изменить
                    </Button>
                <div className={styles.buttonGroup} role="group">
                    
                    <Button
                        mix={styles.editorModal__button}
                        onClick={() => editorModal.setIsAspectsModalOpenFalse()}
                        color="orange"
                    >
                        Закрыть форму
                    </Button>
                </div>
            </div>
        </div>
   </>
  )
}
