import React, { useState } from 'react';
import _ from 'lodash';

import MapPlace from './MapPlace';

const MapContainer = ({
    mapPlaceData,
    displayType,
    moveTile,
    className = '',
    toggleLockedPlace,
    ...props
}) => {
    return (
        <div className={`map-container ${className}`} {...props}>
            {_.toPairs(mapPlaceData).map(([place, { system, hs, locked, unavailable }]) => {
                return (
                    <MapPlace
                        key={place}
                        place={place}
                        system={system}
                        playerHome={hs}
                        locked={locked}
                        unavailable={unavailable}
                        contentType={displayType}
                        moveTile={moveTile}
                        toggleLockedPlace={toggleLockedPlace}
                    />
                );
            })}
        </div>
    );
}

export default MapContainer;