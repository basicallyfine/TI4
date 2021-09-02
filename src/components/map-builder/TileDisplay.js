import React from 'react';
import { useDrop } from 'react-dnd';
import _ from 'lodash';

import { MAP_PLACES } from './map-constants';

import SystemTile from './SystemTile';

const TileDisplay = ({
    systems = [],
    moveTile,
    displayType,
    ...props
}) => {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: 'TILE',
        drop: ({ system }) => { moveTile(system, MAP_PLACES.TABLE) },
        // canDrop: () => true,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    return (
        <div className="tile-display-container" ref={dropRef}>
            <div style={{ width: '100%' }}>{systems.length}</div>
            {systems.map(system => <SystemTile key={system} system={system} contentType={displayType} />)}
        </div>
    );
};

export default TileDisplay;