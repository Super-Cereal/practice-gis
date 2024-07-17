import React from 'react';

import { Button } from '../../../../shared/ui/button';
import { geoObjectFormModel } from '../..';

import styles from './geoaspects-list.module.css';

export const GeoaspectsList = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.overlay} onClick={() => geoObjectFormModel.setIsAspectsModalOpen(true)} />

                <div className={styles.form}>
                    ? тут списком они будут ?
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
                            onClick={() => geoObjectFormModel.setIsAspectsModalOpen(true)}
                            color="orange"
                        >
                            Закрыть форму
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
