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

const MapPlace = ({
    place,
    system = null,
    playerHome = null,
    contentType,
    moveTile,
    locked,
    unavailable,
    ...props
}) => {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: 'TILE',
        drop: ({ system }) => { moveTile(system, place) },
        canDrop: () => !(locked || unavailable),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });
    
    const classes = ['map-place-wrapper'];
    if (isOver) {
        classes.push(canDrop ? 'can-drop' : 'no-drop');
    }
    if (locked) {
        classes.push('locked');
    }
    if (unavailable) {
        classes.push('unavailable');
    }


    return (
        <div className={classes.join(' ')} key={place} style={placeWrapperStyle({ place })} ref={dropRef}>
            {playerHome && <HomeSystemTile player={playerHome} contentType={contentType} place={place} />}
            {system && (
                <SystemTile
                    place={place}
                    system={system}
                    contentType={contentType}
                    locked={locked}
                    unavailable={unavailable}
                />
            )}
            {!unavailable && <span className="marker-dot" />}
        </div>
    );
};

export default MapPlace;