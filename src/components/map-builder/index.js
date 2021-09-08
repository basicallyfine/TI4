import React, { useState, useEffect } from 'react';
import _ from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import utils from '../../lib/utils';
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

const STORAGE_KEYS = {
    MAP_DATA: 'map_data',
    MAP_OPTION: 'map_option',
};


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

const getMapString = (data) => {
    const string = _.chain(data)
        .toPairs()
        .filter(([place]) => (place || '').match(/^MAP_/))
        .sortBy(0)
        .map(([place, data]) => (data.system || '0').toString(10))
        .value()
        .join(' ');
    
    return string.replace(/[\s0]+$/, '');
};

const parseMapString = (string) => {
    const systems = _.chain(string).split(' ').filter().map(_.parseInt).value();
    return _.chain(MAP_PLACES)
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .mapValues((data, place) => ({ system: _.get(systems, parseInt(place.substr(-2), 10)) || null }))
        .value();
};

const cleanMapData = (data) => {
    const usedSystems = [];
    return _.chain(data)
    .toPairs()
    .sortBy(0)
    .fromPairs()
    .mapValues((place) => {
        if (place.system && usedSystems.indexOf(place.system) >= 0) {
            place.system = null;
        } else {
            usedSystems.push(place.system);
        }
        if (!place.system) delete place.system;
        if (!place.locked) delete place.locked;
        if (!place.unavailable) delete place.unavailable;
        return place;
    })
    .value();
}

const MapBuilder = () => {
    let initialMapOption;
    // TODO: pull from URL if set
    if (!initialMapOption) initialMapOption = window.localStorage.getItem(STORAGE_KEYS.MAP_OPTION);

    let initialMapPlaceData;
    // TODO: pull from URL (map string) if set
    if (!initialMapPlaceData) initialMapPlaceData = utils.parseJSON(window.localStorage.getItem(STORAGE_KEYS.MAP_DATA));

    const [mapOption, setMapOption] = useState(initialMapOption || MAP_OPTION.FOUR_PLAYER);
    const [tileDisplayType, setTileDisplayType] = useState(TILE_DISPLAY_TYPE.TEXT);
    const [mapPlaceData, setMapPlaceData] = useState(initialMapPlaceData || {});
    const [mapString, setMapString] = useState('');

    useEffect(() => {
        resetMapConfig(MAP_CONFIG[mapOption]);
        window.localStorage.setItem(STORAGE_KEYS.MAP_OPTION, mapOption);
    }, [mapOption]);

    useEffect(() => {
        setMapString(getMapString(mapPlaceData));
        window.localStorage.setItem(STORAGE_KEYS.MAP_DATA, JSON.stringify(cleanMapData(mapPlaceData)));
    }, [mapPlaceData]);

    // useEffect(() => {
        
    // }, [mapString]);

    const unassignedSystems = _.chain(SYSTEMS)
        .map('number')
        .without(
            ..._.chain(mapPlaceData)
            .values()
            .filter('system')
            .map('system')
            .value()
        )
        .sort()
        .value();

    const moveTiles = (tiles) => {
        if (mapPlaceData.locked || mapPlaceData.unavailable) {
            console.log('Place is locked');
            return;
        };
        
        const newState = _.clone(mapPlaceData);
        tiles.forEach(({ system, place }) => {
            const existingSystem = _.get(mapPlaceData, `${place}.system`);
            const prevPlace = _.findKey(mapPlaceData, { system });

            if (prevPlace) {
                newState[prevPlace].system = existingSystem || null;
            }
            if (newState[place]) {
                newState[place].system = system;
            }
        });
        setMapPlaceData(newState);
    };

    const moveTile = (system, place) => moveTiles([{ system, place }]);

    const toggleLockedPlace = (place) => {
        setMapPlaceData((prevState) => {
            const newPlaceData = _.clone(prevState[place]);
            newPlaceData.locked = !newPlaceData.locked;
            return { ...prevState, ...{ [place]: newPlaceData } };
        });
    };

    const resetMapConfig = (config = MAP_CONFIG[mapOption]) => {
        const defaultData = defaultMapPlaceData(config);

        _.chain(mapPlaceData)
        .entries()
        .value()
        .forEach(([place, { system, locked }]) => {
            if (!(system || locked)) return;
            if (defaultData[place].unavailable || defaultData[place].locked) return;

            defaultData[place].system = system;
            defaultData[place].locked = locked;
        });

        setMapPlaceData(defaultData);
    };
    const clearMap = () => {
        moveTiles(
            _.chain(mapPlaceData)
            .pickBy(data => data.system && !data.locked && !data.unavailable)
            .values()
            .map(({ system }) => ({ system, place: null }))
            .value()
        )
    };
    const setRandomMap = () => {
        const randomSystems = _.chain(SYSTEMS)
            .map('number')
            .without(
                ..._.chain(mapPlaceData)
                .values()
                .filter(data => data.locked || data.unavailable)
                .map('system')
                .value()
            )
            .shuffle()
            .value();

        moveTiles(_.chain(mapPlaceData)
            .pickBy(data => !data.locked && !data.unavailable)
            .keys()
            .map((place, i) => ({ place, system: randomSystems[i] || null }))
            .value()
        );
    };

    return (
        <div id="map-builder" className="container-fluid">
            <div className="build-area">
                <DndProvider backend={HTML5Backend}>
                    <MapContainer
                        mapPlaceData={mapPlaceData}
                        displayType={tileDisplayType}
                        moveTile={moveTile}
                        toggleLockedPlace={toggleLockedPlace}
                    />
                    <TileDisplay
                        systems={unassignedSystems}
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
                    <button className="btn btn-outline-dark ml-1" onClick={clearMap}>Clear</button>
                </div>
            </div>
            <div className="stat-tables">
                <StatsTable mapPlaceData={mapPlaceData} mapConfig={MAP_CONFIG[mapOption]} />
            </div>
        </div>
    );
};

export default MapBuilder;
