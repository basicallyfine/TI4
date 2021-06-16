import React, { useState, useEffect } from 'react';
import _ from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SYSTEMS } from '../../lib/constants';
import {
    TILE_PLACEMENT,
    MAP_CONFIG,
    MAP_OPTION,
    TILE_DISPLAY_TYPE,
} from './map-constants';

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
    const [mapOption, setMapOption] = useState(MAP_OPTION.THREE_PLAYER);
    const [homeSystems, setHomeSystems] = useState([]);
    const [availablePlaces, setAvailablePlaces] = useState([]);

    const [tileDisplayType, setTileDisplayType] = useState(TILE_DISPLAY_TYPE.SVG)

    // useEffect(() => {
    // }, [JSON.stringify(tilePlacement)])

    const config = _.get(MAP_CONFIG, mapOption) || {};

    useEffect(() => {
        setHomeSystems(
            _.chain(config)
            .get('players', [])
            .map((player) => ({ player: player.label, place: _.get(player, 'position.hs') }))
            .value()
        );
        setAvailablePlaces(
            _.chain(config)
            .get('players', [])
            .reduce((systems, player) => {
                return systems.concat(player.position.adjacent, player.position.slice, player.position.equidistant)
            }, [])
            .uniq()
            .sortBy()
            .value()
        );

        // TODO: send back tiles on unavailable spaces

    }, [mapOption]);

    useEffect(() => {
        availablePlaces.forEach((place) => {
            const existingTile = _.find(tilePlacement, { place });
            if (existingTile) {
                moveTile(existingTile.system, place);
            }
        });
    }, [availablePlaces.join(',')])

    // for testing
    const setRandomMap = () => {
        const randomPlacement = _.cloneDeep(defaultTilePlacement);

        _.chain(randomPlacement)
        .filter({ place: TILE_PLACEMENT.BOX })
        .shuffle()
        .slice(0, availablePlaces.length)
        .value()
        .forEach(({ system }, i) => {
            _.find(randomPlacement, { system }).place = availablePlaces[i];
        });

        console.log(randomPlacement);

        setTilePlacement(randomPlacement);
    }

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
                        config={config}
                        homeSystems={homeSystems}
                        displayType={tileDisplayType}
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
            <div className="config-options">
                <div className="form-inline mb-1">
                    <label className="my-auto mr-1" htmlFor="map-option-select">Map setup</label>
                    <select
                        className="custom-select mr-1"
                        id="map-option-select"
                        onChange={(e) => { setMapOption(e.target.value); }}
                        value={mapOption}
                    >
                        {_.values(MAP_OPTION).map(key => <option value={key} key={key}>{_.get(MAP_CONFIG, `${key}.name`)}</option>)}
                    </select>
                    
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="tile-display-type"
                            id={`tile-display-type-${TILE_DISPLAY_TYPE.SVG}`}
                            value={TILE_DISPLAY_TYPE.SVG}
                            checked={tileDisplayType === TILE_DISPLAY_TYPE.SVG}
                            onChange={(e) => { setTileDisplayType(e.target.value); }}
                        />
                        <label className="form-check-label" htmlFor={`tile-display-type-${TILE_DISPLAY_TYPE.SVG}`}>
                            Lo-fi
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="tile-display-type"
                            id={`tile-display-type-${TILE_DISPLAY_TYPE.IMAGE}`}
                            value={TILE_DISPLAY_TYPE.IMAGE}
                            checked={tileDisplayType === TILE_DISPLAY_TYPE.IMAGE}
                            onChange={(e) => { setTileDisplayType(e.target.value); }}
                        />
                        <label className="form-check-label" htmlFor={`tile-display-type-${TILE_DISPLAY_TYPE.IMAGE}`}>
                            Full colour
                        </label>
                    </div>
                    
                    <button className="btn btn-outline-dark" onClick={setRandomMap}>Randomise</button>
                </div>
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
