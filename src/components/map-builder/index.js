import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import utils from '../../lib/utils';
import SYSTEMS from '../../lib/data/systems';
import {
    MAP_PLACES,
    MAP_CONFIG,
    MAP_OPTION,
    TILE_DISPLAY_TYPE,
} from './map-constants';

import MapContainer from './MapContainer';
import TileDisplay from './TileDisplay';
import StatsTable from './StatsTable';
import MapStringModal from './MapStringModal';

import './styles.css';
import { SYSTEM_TILE_BACK } from '../../lib/constants';

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

    if (mapConfig.hyperlanes) {
        mapConfig.hyperlanes.forEach((position) => {
            placeData[position].unavailable = true;
            placeData[position].hyperlane = true;
        });
    }

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
    
    return string.replace(/(\s+0*)+$/, '');
};

const parseMapString = (string) => {
    const systems = _.chain(string)
        .replace(/^\D+|\D+$/g, '')
        .split(/\D+/)
        .filter()
        .map(_.parseInt)
        .value();

    return _.chain(MAP_PLACES)
        .toPairs()
        .sortBy(0)
        .map(([place]) => ({ place, system: _.get(systems, parseInt(place.substr(-2), 10)) || null }))
        .filter(({ place, system }) => place && system)
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

const useInitialMapState = () => {
    const location = useLocation();
    const query = new URLSearchParams(`?${location.hash.replace(/^[?#]+/, '')}`);

    const mapOption = () => {
        const option = query.get('o') || window.localStorage.getItem(STORAGE_KEYS.MAP_OPTION);
        return _.get(MAP_CONFIG, option) ? option : null;
    };
    const mapPlaceData = () => {
        if (query.get('s')) {
            const data = {};
            parseMapString(query.get('s')).forEach(({ place, system }) => {
                data[place] = { system };
            });
            return data;
        }

        return utils.parseJSON(window.localStorage.getItem(STORAGE_KEYS.MAP_DATA));
    }

    return { initialMapOption: mapOption(), initialMapPlaceData: mapPlaceData() }; 
}

const MapBuilder = () => {
    const location = useLocation();
    const history = useHistory();

    const { initialMapOption, initialMapPlaceData } = useInitialMapState();

    const [mapOption, setMapOption] = useState(initialMapOption || MAP_OPTION.FOUR_PLAYER);
    const [mapPlaceData, setMapPlaceData] = useState(initialMapPlaceData || {});
    const [tileDisplayType, setTileDisplayType] = useState(TILE_DISPLAY_TYPE.IMAGE);
    const [mapString, setMapString] = useState('');
    const [mapStringDialog, setMapStringDialog] = useState(false);

    useEffect(() => {
        resetMapConfig(MAP_CONFIG[mapOption]);
        window.localStorage.setItem(STORAGE_KEYS.MAP_OPTION, mapOption);
    }, [mapOption]);

    useEffect(() => {
        setMapString(getMapString(mapPlaceData));
        window.localStorage.setItem(STORAGE_KEYS.MAP_DATA, JSON.stringify(cleanMapData(mapPlaceData)));
    }, [mapPlaceData]);

    // useEffect(() => {
    //     console.log({ mapString });
    // }, [mapString]);

    useLayoutEffect(() => {
        if (location.hash) {
            history.replace({ hash: null });
        }
    });

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

        const alreadyMoved = [];
        
        const newState = _.clone(mapPlaceData);
        tiles.forEach(({ system, place }) => {
            if (place) {
                if (alreadyMoved.indexOf(system) >= 0) return;
                if (newState[place]) {
                    if (newState[place].unavailable) return;
                    if (newState[place].locked) return;
                }
            }
            if (!_.find(SYSTEMS, { number: system })) return;
            const existingSystem = _.get(mapPlaceData, `${place}.system`);
            const prevPlace = _.findKey(mapPlaceData, { system });

            if (prevPlace) {
                newState[prevPlace].system = existingSystem || null;
            }
            if (newState[place]) {
                newState[place].system = system;
            }

            if (place) {
                alreadyMoved.push(system);
            }
        });
        setMapPlaceData(cleanMapData(newState));
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

    const emptyMap = () => _.chain(mapPlaceData)
        .pickBy(data => data.system && !data.locked && !data.unavailable)
        .values()
        .map(({ system }) => ({ system, place: null }))
        .value()

    const shuffledMap = () => {
        const blueSystems = _.chain(SYSTEMS)
            .filter({ back: SYSTEM_TILE_BACK.BLUE })
            .map('number')
            .without(
                ..._.chain(mapPlaceData)
                .values()
                .filter(data => data.locked || data.unavailable)
                .map('system')
                .value()
            )
            .shuffle()
            .value()
            .slice(0, _.get(MAP_CONFIG, `${mapOption}.systems.blue`) || SYSTEMS.length);

        const redSystems = _.chain(SYSTEMS)
            .filter({ back: SYSTEM_TILE_BACK.RED })
            .map('number')
            .without(
                ..._.chain(mapPlaceData)
                .values()
                .filter(data => data.locked || data.unavailable)
                .map('system')
                .value()
            )
            .shuffle()
            .value()
            .slice(0, _.get(MAP_CONFIG, `${mapOption}.systems.red`) || SYSTEMS.length);


        const shuffledSystems = _.shuffle([
            ...blueSystems,
            ...redSystems,
        ]);

        return _.chain(mapPlaceData)
            .pickBy(data => !data.locked && !data.unavailable)
            .keys()
            .map((place, i) => ({ place, system: shuffledSystems[i] || null }))
            .value();
    };

    const setMapFromString = (string) => {
        const empty = emptyMap();
        const fromString = parseMapString(string);
        moveTiles([...empty, ...fromString]);
    }

    return (
        <div id="map-builder" className="container-fluid">
            <div className="build-area responsive">
                <DndProvider backend={HTML5Backend}>
                    <MapContainer
                        mapPlaceData={mapPlaceData}
                        displayType={tileDisplayType}
                        moveTile={moveTile}
                        toggleLockedPlace={toggleLockedPlace}
                        // style={{ opacity: 0 }}
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

                    <button className="btn btn-outline-dark ml-1" onClick={() => { moveTiles(shuffledMap()); }}>Randomise</button>
                    <button className="btn btn-outline-dark ml-1" onClick={() => { moveTiles(emptyMap()); }}>Clear</button>
                    <button className="btn btn-outline-dark ml-1" onClick={() => { setMapStringDialog(true); }}>Map string</button>
                </div>
            </div>
            <div className="stat-tables">
                <StatsTable
                    _memo={[mapString, mapOption]} // Just for the memo comparison - only use strings
                    mapPlaceData={mapPlaceData}
                    mapConfig={MAP_CONFIG[mapOption] || {}}
                />
            </div>

            <MapStringModal
                show={!!mapStringDialog}
                onClose={() => { setMapStringDialog(false); }}
                onChange={(value) => {
                    setMapFromString(value);
                }}
                value={mapString}
            />
        </div>
    );
};

export default MapBuilder;
