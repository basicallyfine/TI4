import React from 'react';
import _ from 'lodash';

import { URL } from '../../lib/constants';
import { MAP_PLACE_POSITION } from './map-constants';

import SystemTile from './SystemTile';

const placeWrapperStyle = ({ place }) => {
    const position = _.get(MAP_PLACE_POSITION, place);

    const style = {
        left: _.get(position, 'left') || null,
        top: _.get(position, 'top') || null,
        zIndex: _.get(position, 'zIndex') || null,
    };

    return style;
}

const placeBackground = ({ system, backgroundType = 'svg' }) => {
    if (!system) return null;
    return `url('${URL.SYSTEM_BACKGROUNDS_DIR}/${backgroundType}/${system}.${backgroundType}')`;
}

const MapPlace = ({ place, system = null, ...props }) => (
    <div className="map-place-wrapper" key={place} style={placeWrapperStyle({ place })} >
        <SystemTile system={system} />
    </div>
);

export default MapPlace;