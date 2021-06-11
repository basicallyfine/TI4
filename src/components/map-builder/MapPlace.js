import React from 'react';
import _ from 'lodash';

import { URL } from '../../lib/constants';
import { MAP_PLACE_POSITION } from './map-constants';

const placeWrapperStyle = ({ position }) => {
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
    <div className="map-place-wrapper" style={placeWrapperStyle({ position: MAP_PLACE_POSITION[place], system })} >
        <div className="map-place" key={place} style={{ backgroundImage: placeBackground({ system }) }} />
    </div>
);

export default MapPlace;