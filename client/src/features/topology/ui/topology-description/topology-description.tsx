import React from 'react';
import cx from 'classnames';

import { TextWithCopy } from '../../../../shared/ui/text-with-copy';
import { TopologyLink } from '../../../../entities/geoobject';

import styles from './topology-description.module.css';

interface Props {
    topology: TopologyLink;
    noBorders?: boolean;
}

export const TopologyDescription = ({
    topology: { id, geographicalObjectInId, geographicalObjectOutId },
    noBorders,
}: Props) => {
    return (
        <div className={cx(!noBorders && styles.class)}>
            <TextWithCopy title="id связи" text={id} />
            <div style={{ height: 8 }} />
            <TextWithCopy title="in id" text={geographicalObjectInId} color="black" />
            <TextWithCopy title="out id" text={geographicalObjectOutId} color="black" />
        </div>
    );
};
