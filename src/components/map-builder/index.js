import React, { useState, useEffect } from 'react';
import _ from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SYSTEMS } from '../../lib/constants';
import {
    MAP_PLACES,
    MAP_CONFIG,
    MAP_OPTION,
    TILE_DISPLAY_TYPE,
} from './map-constants';

import MapContainer from './MapContainer';
import TileDisplay from './TileDisplay';
import StatsTable from './StatsTable';

import './styles.css';

// TODO: import from url params
const defaultMapPlaceData = (mapConfig) => {
    const placeData = _.mapValues(MAP_PLACES, (v, k) => {
        switch (k) {
            case MAP_PLACES.MAP_00:
                return { system: 18, locked: true };
            default:
                return { system: null, unavailable: true };
        }
    });

    mapConfig.players.forEach((player) => {
        placeData[player.position.hs].hs = player.label;
        _.uniq([
            ...player.position.adjacent,
            ...player.position.slice,
            ...player.position.equidistant,
        ]).forEach((place) => {
            delete placeData[place].locked;
            delete placeData[place].unavailable;
        })
    });

    return placeData;
}

const MapBuilder = () => {
    const [mapOption, setMapOption] = useState(MAP_OPTION.FOUR_PLAYER);
    const [tileDisplayType, setTileDisplayType] = useState(TILE_DISPLAY_TYPE.TEXT);
    const [mapPlaceData, setMapPlaceData] = useState(defaultMapPlaceData(MAP_CONFIG[mapOption]));

    const moveTile = (system, place) => {
        console.log({ system, place });

        setMapPlaceData((prevState) => {
            // TODO: swap the places of the system and the one that was there (or null placement)

            const update = { [place]: { ...prevState[place], system } };

            console.log(update);

            return { ...prevState, ...update };
        });
    };

    return (
        <div id="map-builder" className="container-fluid">
            <div className="build-area">
                <DndProvider backend={HTML5Backend}>
                    <MapContainer
                        mapPlaceData={mapPlaceData}
                        displayType={tileDisplayType}
                        moveTile={moveTile}
                        // config={config}
                        // homeSystems={homeSystems}
                        // lockedPlaces={lockedPlaces}
                        // setLockedPlace={setLockedPlace}
                    />
                    <TileDisplay
                        systems={_.chain(SYSTEMS)
                            .map('number')
                            .without(
                                ..._.chain(mapPlaceData)
                                .values()
                                .filter('system')
                                .map('system')
                                .value()
                            )
                            .sort()
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
                </div>
            </div>
            <div className="stat-tables">
                {/* <StatsTable tilePlacement={tilePlacement} mapConfig={config} /> */}
            </div>
        </div>
    );
};

export default MapBuilder;
