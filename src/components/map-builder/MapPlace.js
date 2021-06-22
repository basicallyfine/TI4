import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import _ from 'lodash';

import { URL } from '../../lib/constants';
import { MAP_PLACE_POSITION } from './map-constants';

import SystemTile from './SystemTile';
import HomeSystemTile from './HomeSystemTile';

const placeWrapperStyle = ({ place }) => {
    const position = _.get(MAP_PLACE_POSITION, place);

    const style = {
        left: _.get(position, 'left') || null,
        top: _.get(position, 'top') || null,
        zIndex: _.get(position, 'zIndex') || null,
    };

    return style;
}

const MapPlace = ({ place, system = null, playerHome = null, contentType, moveTile, fixed, ...props }) => {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: 'TILE',
        drop: ({ system }) => { moveTile(system, place) },
        canDrop: () => !fixed,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });
    
    const classes = ['map-place-wrapper'];
    if (isOver) {
        classes.push(canDrop ? 'can-drop' : 'no-drop');
    }


    return (
        <div className={classes.join(' ')} key={place} style={placeWrapperStyle({ place })} ref={dropRef}>
            {playerHome && <HomeSystemTile player={playerHome} contentType={contentType} place={place} />}
            {system && <SystemTile system={system} contentType={contentType} fixed={fixed} place={place} />}
        </div>
    );
};

export default MapPlace;