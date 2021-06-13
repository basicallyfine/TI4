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

        moveTile(19, TILE_PLACEMENT.MAP_01);
        moveTile(20, TILE_PLACEMENT.MAP_02);
        moveTile(25, TILE_PLACEMENT.MAP_03);
        moveTile(29, TILE_PLACEMENT.MAP_04);
        moveTile(41, TILE_PLACEMENT.MAP_06);
        moveTile(43, TILE_PLACEMENT.MAP_07);
        moveTile(39, TILE_PLACEMENT.MAP_08);
        moveTile(40, TILE_PLACEMENT.MAP_09);
        moveTile(42, TILE_PLACEMENT.MAP_10);
        moveTile(44, TILE_PLACEMENT.MAP_11);
        moveTile(75, TILE_PLACEMENT.MAP_12);
        moveTile(67, TILE_PLACEMENT.MAP_13);
        moveTile(68, TILE_PLACEMENT.MAP_14);
        moveTile(65, TILE_PLACEMENT.MAP_15);
        moveTile(79, TILE_PLACEMENT.MAP_16);
        moveTile(80, TILE_PLACEMENT.MAP_17);
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
