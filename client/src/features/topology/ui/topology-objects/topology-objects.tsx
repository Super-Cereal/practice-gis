import { useUnit } from 'effector-react';
import { Polyline, Popup } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';

import { topologyModel } from '../../../../entities/geoobject';
import { readonlyOptions } from '../../../map-editor/lib/get-color-options';
import { TopologyDescription } from '../topology-description/topology-description';

export const TopologyObjects = () => {
    const topologies = useUnit(topologyModel.$topologies);

    return (
        <>
            {topologies.map((topology) => {
                const geometry = topology.commonBorder
                    ? (JSON.parse(topology.commonBorder) as {
                          type: 'LineString';
                          coordinates: LatLngTuple[];
                      })
                    : null;

                if (!geometry) {
                    return null;
                }

                return (
                    <Polyline
                        /** pane определяет z-index */
                        pane="markerPane"
                        key={topology.id}
                        positions={geometry.coordinates}
                        weight={5}
                        pathOptions={readonlyOptions}
                    >
                        <Popup>
                            <h3 style={{ marginBottom: 4 }}>Граница двух связанных обьектов</h3>
                            <TopologyDescription topology={topology} noBorders={true} />
                        </Popup>
                    </Polyline>
                );
            })}
        </>
    );
};
