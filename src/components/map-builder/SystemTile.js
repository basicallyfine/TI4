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

  if (type === TILE_DISPLAY_TYPE.IMAGE) {
    return <img src={`${SYSTEM_PNG_URL}${number}.png`} alt={`System ${number}`} className="system-image" />;
  }

  return (
    <SystemTileSVG><SystemTileKonvaStage system={system} /></SystemTileSVG>
  );
}

const SystemTile = ({ system, style = {}, contentType }) => {
    const [collected, dragRef] = useDrag(
      () => ({
        type: 'TILE',
        item: { system }
      }),
      []
    );

    // style.backgroundImage = placeBackground({ system });
    return (
      <div className={`system-tile content-${contentType}`} style={style} ref={dragRef}>
        <SystemTileContent
          number={system}
          type={contentType}
        />
      </div>
    );
};

export default SystemTile;
