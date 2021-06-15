import React from 'react';
import _ from 'lodash';

import { TILE_PLACEMENT, MAP_PLACES } from './map-constants';

import MapPlace from './MapPlace';

const MapContainer = ({
    tilePlacement,
    moveTile,
    config,
    ...props
}) => {
    const homeSystems = _.chain(config)
        .get('players', [])
        .map((player, i) => ({ player: i + 1, place: _.get(player, 'position.hs') }))
        .value();

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
                    />
                );
            })}
        </div>
    );
}

export default MapContainer;