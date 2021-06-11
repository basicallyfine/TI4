import React, { useState, useEffect } from 'react';
import _ from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SYSTEMS } from '../../lib/constants';
import { TILE_PLACEMENT } from './map-constants';

import MapContainer from './MapContainer';
import TileDisplay from './TileDisplay';

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

    useEffect(() => {
        moveTile(78, TILE_PLACEMENT.MAP_19);
        moveTile(50, TILE_PLACEMENT.MAP_22);
        moveTile(49, TILE_PLACEMENT.MAP_25);
        moveTile(48, TILE_PLACEMENT.MAP_28);
        moveTile(47, TILE_PLACEMENT.MAP_31);
        moveTile(46, TILE_PLACEMENT.MAP_34);
        
        _.chain(SYSTEMS)
        .filter(s => _.get(s, 'planets.length'))
        .sampleSize(6)
        .forEach((s) => { moveTile(s.number, TILE_PLACEMENT.TABLE); })
        .value();
    }, [])
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

        _.find(newPlacements, { system }).place = place;

        setTilePlacement(newPlacements);
    }

    return (
        <div id="map-builder" className="container-fluid">
            <div className="build-area">
                <DndProvider backend={HTML5Backend}>
                    <MapContainer
                        tilePlacement={tilePlacement}
                        moveTile={moveTile}
                    />
                    <TileDisplay
                        systems={_.chain(tilePlacement)
                            .filter({ place: TILE_PLACEMENT.TABLE })
                            .map('system')
                            .value()
                        }
                    />
                </DndProvider>
            </div>
            <div className="stat-tables">
                <table className="table">
                    <thead><tr><th>TABLE STUFF</th></tr></thead>
                </table>
            </div>
        </div>
    );
};

export default MapBuilder;