import React from 'react'
import { FormParentChild } from '../../../geoobject-form/lib/types';
import { useForm } from 'react-hook-form';
import styles from './create-pc.module.css'
import cx from 'classnames';
import { topologyModel } from '../../../../entities/geoobject';
import { Button } from '../../../../shared/ui/button';
import { geoObjectFormModel } from '../../../geoobject-form';


export const CreatePclink = () => {

    // поля для формы создания Связи
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormParentChild>({});

    const handleCreateRelationship = async (data: FormParentChild) => {
        await topologyModel.addParentChildLinkFx(data);
    
      //  setShowCreateRelationship(false);
    
        geoObjectFormModel.setIsChildModalOpen(false);
        reset();
    };
    
    const handleClose = () => {
        geoObjectFormModel.setIsChildModalOpen(false);
        reset();
    };  

  return (

    <form
    onSubmit={handleSubmit(handleCreateRelationship)}
    className={cx(styles.form, styles.newClassifierForm)}
>
    <label>
        ID родителя:
        <input className={styles.input} type="text" {...register('parentGeographicalObjectId', { required: true })} />
    </label>
    <label>
        ID ребенка:
        <input className={styles.input} type="text" {...register('childGeographicalObjectId', { required: true })} />
    </label>
   

    <div className={cx(styles.btns, styles.reversed)}>
        <Button mix={styles.btn}>Создать классификатор</Button>
        <Button
            mix={styles.btn}
            color="orange"
            onClick={(e) => {
                e.preventDefault();
                /* setIsCreateClassifierFormOpen(false) */;
            }}
        >
            Закрыть форму
        </Button>
    </div>
</form>
  )
}
