import React from 'react';
import _ from 'lodash';

import {
  SYSTEMS,
} from '../../lib/constants';
import { SYSTEM_PNG_URL } from './map-constants';

import SystemTileSVG from './SystemTileSVG';
import SystemTileKonvaStage from './SystemTileKonvaStage';

const SystemTileContent = ({ number, type }) => {
  const system = _.find(SYSTEMS, { number });

  if (!system) return null;

  if (type === 'image') {
    return <img src={`${SYSTEM_PNG_URL}${number}.png`} alt={`System ${number}`} className="system-image" />;
  }

  return (
    <SystemTileSVG><SystemTileKonvaStage system={system} /></SystemTileSVG>
  );
}

const SystemTile = ({ system, style = {}, contentType }) => {
    // style.backgroundImage = placeBackground({ system });
    return (
      <div className={`system-tile content-${contentType}`} style={style}>
        <SystemTileContent
          number={system}
          type={contentType}
        />
      </div>
    );
};

export default SystemTile;
