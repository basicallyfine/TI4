import React, { useState, useEffect } from 'react';
import _ from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SYSTEMS } from '../../lib/constants';

import './styles.css';

const TILE_PLACEMENT = {
    BOX: 'BOX',
    TABLE: 'TABLE',
    MAP_00: 'MAP_00',
    MAP_01: 'MAP_01', MAP_02: 'MAP_02', MAP_03: 'MAP_03', MAP_04: 'MAP_04', MAP_05: 'MAP_05',
    MAP_06: 'MAP_06', MAP_07: 'MAP_07', MAP_08: 'MAP_08', MAP_09: 'MAP_09', MAP_10: 'MAP_10',
    MAP_11: 'MAP_11', MAP_12: 'MAP_12', MAP_13: 'MAP_13', MAP_14: 'MAP_14', MAP_15: 'MAP_15',
    MAP_16: 'MAP_16', MAP_17: 'MAP_17', MAP_18: 'MAP_18', MAP_19: 'MAP_19', MAP_20: 'MAP_20',
    MAP_21: 'MAP_21', MAP_22: 'MAP_22', MAP_23: 'MAP_23', MAP_24: 'MAP_24', MAP_25: 'MAP_25',
    MAP_26: 'MAP_26', MAP_27: 'MAP_27', MAP_28: 'MAP_28', MAP_29: 'MAP_29', MAP_30: 'MAP_30',
    MAP_31: 'MAP_31', MAP_32: 'MAP_32', MAP_33: 'MAP_33', MAP_34: 'MAP_34', MAP_35: 'MAP_35',
    MAP_36: 'MAP_36'
};

const MAP_TILE_POSITION = {
    MAP_00: { left: '50.0%', top: '50.0%', zIndex: 199 },
    MAP_01: { left: '50.0%', top: '35.7%', zIndex: 198 },
    MAP_02: { left: '63.6%', top: '42.9%', zIndex: 197 },
    MAP_03: { left: '63.6%', top: '57.1%', zIndex: 196 },
    MAP_04: { left: '50.0%', top: '64.3%', zIndex: 195 },
    MAP_05: { left: '36.4%', top: '57.1%', zIndex: 194 },
    MAP_06: { left: '36.4%', top: '42.9%', zIndex: 193 },
    MAP_07: { left: '50.0%', top: '21.4%', zIndex: 192 },
    MAP_08: { left: '63.6%', top: '28.6%', zIndex: 191 },
    MAP_09: { left: '77.3%', top: '35.7%', zIndex: 190 },
    MAP_10: { left: '77.3%', top: '50.0%', zIndex: 189 },
    MAP_11: { left: '77.3%', top: '64.3%', zIndex: 188 },
    MAP_12: { left: '63.6%', top: '71.4%', zIndex: 187 },
    MAP_13: { left: '50.0%', top: '78.6%', zIndex: 186 },
    MAP_14: { left: '36.4%', top: '71.4%', zIndex: 185 },
    MAP_15: { left: '22.7%', top: '64.3%', zIndex: 184 },
    MAP_16: { left: '22.7%', top: '50.0%', zIndex: 183 },
    MAP_17: { left: '22.7%', top: '35.7%', zIndex: 182 },
    MAP_18: { left: '36.4%', top: '28.6%', zIndex: 181 },
    MAP_19: { left: '50.0%', top: '7.1%', zIndex: 180 },
    MAP_20: { left: '63.6%', top: '14.3%', zIndex: 179 },
    MAP_21: { left: '77.3%', top: '21.4%', zIndex: 178 },
    MAP_22: { left: '90.9%', top: '28.6%', zIndex: 177 },
    MAP_23: { left: '90.9%', top: '42.9%', zIndex: 176 },
    MAP_24: { left: '90.9%', top: '57.1%', zIndex: 175 },
    MAP_25: { left: '90.9%', top: '71.4%', zIndex: 174 },
    MAP_26: { left: '77.3%', top: '78.6%', zIndex: 173 },
    MAP_27: { left: '63.6%', top: '85.7%', zIndex: 172 },
    MAP_28: { left: '50.0%', top: '92.9%', zIndex: 171 },
    MAP_29: { left: '36.4%', top: '85.7%', zIndex: 170 },
    MAP_30: { left: '22.7%', top: '78.6%', zIndex: 169 },
    MAP_31: { left: '9.1%', top: '71.4%', zIndex: 168 },
    MAP_32: { left: '9.1%', top: '57.1%', zIndex: 167 },
    MAP_33: { left: '9.1%', top: '42.9%', zIndex: 166 },
    MAP_34: { left: '9.1%', top: '28.6%', zIndex: 165 },
    MAP_35: { left: '22.7%', top: '21.4%', zIndex: 164 },
    MAP_36: { left: '36.4%', top: '14.3%', zIndex: 163 },
};

const MapBuilder = () => {
    // TODO: import from url params
    const defaultTilePositions = _.fromPairs(SYSTEMS.map(({ number }) => [number, TILE_PLACEMENT.BOX]));
    defaultTilePositions['18'] = TILE_PLACEMENT.MAP_00;

    const [tilePositions, setTilePositions] = useState(defaultTilePositions);

    // useEffect(() => {
    // }, [JSON.stringify(tilePositions)])

    const moveTile = (tileNumber, newPosition) => {
        if (!tilePositions[tileNumber]) {
            console.error(`Unknown tile number: ${tileNumber}`);
            return;
        }
        if (!newPosition) {
            console.error('Unknown tile position');
            return;
        }

        const newPositions = Object.assign({}, tilePositions);
        if (/^MAP_/.test(newPosition)) {
            const existingTile = _.findKey(newPositions, (val, key) => val === newPosition);
            if (existingTile) {
                newPositions[existingTile] = TILE_PLACEMENT.TABLE;
            }
        }

        setTilePositions(newPositions);
    }

    return (
        <div id="map-builder">
            <DndProvider backend={HTML5Backend}>
                <div className="map-tile-container">
                    {_.chain(MAP_TILE_POSITION).toPairs().map(([key, position]) => (
                        <div className="system-tile-wrapper" style={{ ...position }} >
                            <div className="system-tile" key={key} />
                        </div>
                    )).value()}
                </div>
            </DndProvider>
        </div>
    );
};

export default MapBuilder;