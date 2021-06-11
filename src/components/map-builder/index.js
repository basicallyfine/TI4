import React, { useState, useEffect } from 'react';
import _ from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SYSTEMS } from '../../lib/constants';
import { TILE_PLACEMENT } from './map-constants';

import MapContainer from './MapContainer';

import './styles.css';

// TODO: import from url params
const defaultTilePlacement = _.chain(SYSTEMS)
.map(({ number }) => {
    switch (number) {
        case 18:
            return { system: number, place: TILE_PLACEMENT.MAP_00 };
        default:
            return { system: number, place: TILE_PLACEMENT.BOX };
    }
})
.sortBy('system')
.value();

const MapBuilder = () => {
    const [tilePlacement, setTilePlacement] = useState(defaultTilePlacement);

    // useEffect(() => {
    // }, [JSON.stringify(tilePlacement)])

    const moveTile = (system, place) => {
        if (!_.find(tilePlacement, { system })) {
            console.error(`Unknown system number: ${system}`);
            return;
        }
        if (!place) {
            console.error('Unknown position');
            return;
        }

        const newPlacements = _.clone(tilePlacement);
        if (/^MAP_/.test(place)) {
            const existingTile = _.find(newPlacements, { place });
            if (existingTile) {
                existingTile.place = TILE_PLACEMENT.TABLE;
            }
        }

        _.find(newPlacements, { place }).number = system;

        setTilePlacement(newPlacements);
    }

    return (
        <div id="map-builder" className="container-fluid">
            <DndProvider backend={HTML5Backend}>
                <MapContainer
                    tilePlacement={tilePlacement}
                    moveTile={moveTile}
                />
            </DndProvider>
        </div>
    );
};

export default MapBuilder;