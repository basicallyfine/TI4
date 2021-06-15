import React from 'react';
import _ from 'lodash';

import { URL } from '../../lib/constants';
import { MAP_PLACE_POSITION } from './map-constants';

import SystemTile from './SystemTile';
import HomeSystemTile from './HomeSystemTile';

const placeWrapperStyle = ({ place }) => {
    const position = _.get(MAP_PLACE_POSITION, place);

    const style = {
        left: _.get(position, 'left') || null,
        top: _.get(position, 'top') || null,
        zIndex: _.get(position, 'zIndex') || null,
    };

    return style;
}

const MapPlace = ({ place, system = null, playerHome = null, contentType = 'svg', ...props }) => (
    <div className="map-place-wrapper" key={place} style={placeWrapperStyle({ place })} >
        {playerHome && <HomeSystemTile player={playerHome} contentType={contentType} />}
        {system && <SystemTile system={system} contentType={contentType} />}
    </div>
);

export default MapPlace;