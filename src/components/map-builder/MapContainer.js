import React, { useState } from 'react';
import _ from 'lodash';

import { TILE_PLACEMENT, MAP_PLACES } from './map-constants';

import MapPlace from './MapPlace';

const MapContainer = ({
    tilePlacement,
    moveTile,
    config,
    homeSystems,
    displayType,
    fixed,
    lockedPlaces,
    setLockedPlace,
    ...props
}) => {
    return (
        <div className="map-container">
            {MAP_PLACES.map((place) => {
                const homeSystem = _.find(homeSystems, { place });
                // const hardFixed = !!(homeSystem || place === TILE_PLACEMENT.MAP_00);
                return (
                    <MapPlace
                        key={place}
                        place={place}
                        system={_.chain(tilePlacement).find({ place }).get('system').value() || null}
                        playerHome={_.get(homeSystem, 'player') || null}
                        // fixed={hardFixed || fixedPlaces[place]}
                        fixed={fixed || lockedPlaces.indexOf(place) >= 0}
                        // toggleFixed={toggleFixed}
                        toggleFixed={() => { setLockedPlace(place); }}
                        contentType={displayType}
                        moveTile={moveTile}
                    />
                );
            })}
        </div>
    );
}

export default MapContainer;