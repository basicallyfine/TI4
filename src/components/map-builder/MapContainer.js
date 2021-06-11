import React from 'react';
import _ from 'lodash';

import { MAP_PLACES } from './map-constants';

import MapPlace from './MapPlace';

const MapContainer = ({
    tilePlacement,
    moveTile,
    ...props
}) => (
    <div className="map-container">
        {MAP_PLACES.map(place => <MapPlace key={place} place={place} system={_.chain(tilePlacement).find({ place }).get('system').value() || null} />)}
    </div>
);

export default MapContainer;