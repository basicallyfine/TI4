import React, { useState, useEffect } from 'react';
import _, { indexOf } from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SYSTEMS } from '../../lib/constants';
import {
    TILE_PLACEMENT,
    MAP_CONFIG,
    MAP_OPTION,
    TILE_DISPLAY_TYPE,
    MAP_PLACES,
} from './map-constants';

import MapContainer from './MapContainer';
import TileDisplay from './TileDisplay';
import StatsTable from './StatsTable';

import './styles.css';

// TODO: import from url params
const defaultTilePlacement = _.chain(SYSTEMS)
.map(({ number }) => {
    switch (number) {
        case 18:
            return { system: number, place: TILE_PLACEMENT.MAP_00 };
        default:
            return { system: number, place: TILE_PLACEMENT.TABLE };
    }
})
.sortBy('system')
.value();

const MapBuilder = () => {
    const [tilePlacement, setTilePlacement] = useState(defaultTilePlacement);
    const [mapOption, setMapOption] = useState(MAP_OPTION.THREE_PLAYER);
    const [homeSystems, setHomeSystems] = useState([]);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [lockedPlaces, setLockedPlaces] = useState([TILE_PLACEMENT.MAP_00]);

    const [tileDisplayType, setTileDisplayType] = useState(TILE_DISPLAY_TYPE.IMAGE)

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
        const mapPlaces = _.chain(config)
            .get('players', [])
            .reduce((systems, player) => {
                return systems.concat(player.position.adjacent, player.position.slice, player.position.equidistant)
            }, [])
            .uniq()
            .sortBy()
            .value();

        setAvailablePlaces(mapPlaces);

        // TODO: send back tiles on unavailable spaces
        const unavailablePlaces = _.without(MAP_PLACES, TILE_PLACEMENT.MAP_00, ...mapPlaces);
        // for (const unavailablePlaces)
        
        setLockedPlaces((prevState) => _.filter(prevState, place => (
            (place === TILE_PLACEMENT.MAP_00)
            || (mapPlaces.indexOf(place) >= 0)
        )));

    }, [mapOption]);

    useEffect(() => {
        availablePlaces.forEach((place) => {
            const existingTile = _.find(tilePlacement, { place });
            if (existingTile) {
                moveTile(existingTile.system, place);
            }
        });
    }, [availablePlaces.join(',')])

    const setRandomMap = () => {
        const randomPlacement = _.cloneDeep(defaultTilePlacement);

        const unlockedPlaces = _.without(availablePlaces, ...lockedPlaces);

        _.chain(randomPlacement)
        .filter({ place: TILE_PLACEMENT.TABLE })
        .shuffle()
        .slice(0, unlockedPlaces.length)
        .value()
        .forEach(({ system }, i) => {
            _.find(randomPlacement, { system }).place = unlockedPlaces[i];
        });

        console.log({ availablePlaces, lockedPlaces, unlockedPlaces, randomPlacement });

        setTilePlacement(randomPlacement);
    }

    const resetMap = () => {
        const resetPlacement = _.cloneDeep(tilePlacement);
        resetPlacement.forEach(({ system, place }, i) => {
            if (lockedPlaces.indexOf(place) >= 0) return;
            const defaultPlacement = _.find(defaultTilePlacement, { system });
            _.find(resetPlacement, { system }).place = defaultPlacement.place;

            // if (defaultPlacement) {
            //     moveTile(system, defaultPlacement.place);
            // } else {
            //     console.error(`Couldn’t find default place for system ${system}`);
            // }
        });

        setTilePlacement(resetPlacement);
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
                existingTile.place = _.find(newPlacements, { system }).place;
            }
        }

        _.find(newPlacements, { system }).place = place;

        setTilePlacement(newPlacements);
    }

    // toggle by default
    const setLockedPlace = (place, lock = undefined) => {
        let setLock = lock;
        if (typeof lock !== 'boolean') { // toggle
            setLock = lockedPlaces.indexOf(place) === -1;
        }

        const newLockedPlaces = setLock
            ? _.chain(lockedPlaces).clone().concat(place).uniq().value()
            : _.without(lockedPlaces, place);

        setLockedPlaces(newLockedPlaces);

        console.log({ place, lock, setLock, newLockedPlaces });
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
                        lockedPlaces={lockedPlaces}
                        setLockedPlace={setLockedPlace}
                    />
                    <TileDisplay
                        systems={_.chain(tilePlacement)
                            .filter({ place: TILE_PLACEMENT.TABLE })
                            .map('system')
                            .value()
                        }
                        moveTile={moveTile}
                        displayType={tileDisplayType}
                    />
                </DndProvider>
            </div>
            <div className="config-options">
                <div className="form-inline mb-1">
                    <label className="my-auto" htmlFor="map-option-select">Map setup</label>
                    <select
                        className="custom-select ml-1"
                        id="map-option-select"
                        onChange={(e) => { setMapOption(e.target.value); }}
                        value={mapOption}
                    >
                        {_.values(MAP_OPTION).map(key => <option value={key} key={key}>{_.get(MAP_CONFIG, `${key}.name`)}</option>)}
                    </select>

                    <select
                        className="custom-select ml-1"
                        id="map-option-select"
                        onChange={(e) => { setTileDisplayType(e.target.value); }}
                        value={tileDisplayType}
                    >
                        <option value={TILE_DISPLAY_TYPE.IMAGE}>Full colour</option>
                        <option value={TILE_DISPLAY_TYPE.SVG}>Lo-fi</option>
                    </select>
                    
                    <button className="btn btn-outline-dark ml-1" onClick={setRandomMap}>Randomise</button>
                    <button className="btn btn-outline-dark ml-1" onClick={resetMap}>Clear</button>
                </div>
            </div>
            <div className="stat-tables">
                <StatsTable tilePlacement={tilePlacement} mapConfig={config} />
            </div>
        </div>
    );
};

export default MapBuilder;
