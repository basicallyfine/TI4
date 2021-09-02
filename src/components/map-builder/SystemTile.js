import React from 'react';
import { useDrag } from 'react-dnd';
import _ from 'lodash';

import {
  SYSTEMS,
} from '../../lib/constants';
import { SYSTEM_PNG_URL, TILE_DISPLAY_TYPE } from './map-constants';

import SystemTileSVG from './SystemTileSVG';
import SystemTileKonvaStage from './SystemTileKonvaStage';

const SystemTileContent = ({ number, type }) => {
  const system = _.find(SYSTEMS, { number });

  if (!system) return null;

  if (type === TILE_DISPLAY_TYPE.TEXT) {
    return <span className="tile-label">{number}</span>;
  }

  if (type === TILE_DISPLAY_TYPE.IMAGE) {
    return <img src={`${SYSTEM_PNG_URL}${number}.png`} alt={`System ${number}`} className="system-image" draggable={false} />;
  }

  return (
    <SystemTileSVG><SystemTileKonvaStage system={system} /></SystemTileSVG>
  );
}

const SystemTile = ({ system, style = {}, contentType, locked, toggleLocked, ...props }) => {
    const [collected, dragRef] = useDrag(
      () => ({
        type: 'TILE',
        item: { system },
        canDrag: () => !locked,
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        }),
      }),
      [system, locked, props.place]
    );

    const classes = ['system-tile'];
    if (contentType) classes.push(`content-${contentType}`);
    if (collected.isDragging) {
      classes.push('is-dragging');
    }

    if (locked) {
      classes.push('locked');
    }

    // style.backgroundImage = placeBackground({ system });
    return (
      <div
        className={classes.join(' ')}
        style={style} ref={dragRef}
        onDoubleClick={toggleLocked || null}
        role="button"
      >
        <SystemTileContent
          number={system}
          type={contentType}
        />
      </div>
    );
};

export default SystemTile;
