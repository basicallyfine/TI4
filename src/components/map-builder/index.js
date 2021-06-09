import React, { useState, useEffect } from 'react';
import _ from 'lodash';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SYSTEMS } from '../../lib/constants';

const TILE_POSITIONS = {
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
    MAP_36: 'MAP_36', MAP_37: 'MAP_37', MAP_38: 'MAP_38', MAP_39: 'MAP_39', MAP_40: 'MAP_40',
    MAP_41: 'MAP_41', MAP_42: 'MAP_42', MAP_43: 'MAP_43', MAP_44: 'MAP_44', MAP_45: 'MAP_45',
    MAP_46: 'MAP_46', MAP_47: 'MAP_47', MAP_48: 'MAP_48', MAP_49: 'MAP_49', MAP_50: 'MAP_50',
    MAP_51: 'MAP_51', MAP_52: 'MAP_52', MAP_53: 'MAP_53', MAP_54: 'MAP_54', MAP_55: 'MAP_55',
    MAP_56: 'MAP_56', MAP_57: 'MAP_57', MAP_58: 'MAP_58', MAP_59: 'MAP_59', MAP_60: 'MAP_60',
};

const MapBuilder = () => {
    // TODO: import from url params
    const defaultTilePositions = _.fromPairs(SYSTEMS.map(({ number }) => [number, TILE_POSITIONS.BOX]));
    defaultTilePositions['18'] = TILE_POSITIONS.MAP_00;

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
                newPositions[existingTile] = TILE_POSITIONS.TABLE;
            }
        }

        setTilePositions(newPositions);
    }

    return (
        <div id="map-builder">
            <DndProvider backend={HTML5Backend}>
                <button
                    onClick={() => {
                        moveTile(_.sample([19, 20, 21]), TILE_POSITIONS.MAP_01);
                    }}
                >
                    Move a tile
                    </button>
                <div />
            </DndProvider>
        </div>
    );
};

export default MapBuilder;