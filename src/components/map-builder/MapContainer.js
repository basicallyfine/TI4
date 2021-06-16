import React from 'react';
import _ from 'lodash';

import { TILE_PLACEMENT, MAP_PLACES } from './map-constants';

import MapPlace from './MapPlace';

const MapContainer = ({
    tilePlacement,
    moveTile,
    config,
    homeSystems,
    displayType,
    ...props
}) => {
    return (
        <div className="map-container">
            {MAP_PLACES.map((place) => {
                const homeSystem = _.find(homeSystems, { place });
                return (
                    <MapPlace
                        key={place}
                        place={place}
                        system={_.chain(tilePlacement).find({ place }).get('system').value() || null}
                        playerHome={_.get(homeSystem, 'player') || null}
                        fixed={!!(homeSystem || place === TILE_PLACEMENT.MAP_00)}
                        contentType={displayType}
                    />
                );
            })}
        </div>
    );
}

export default MapContainer;