import React from 'react';
import _ from 'lodash';

import {
  SYSTEMS,
} from '../../lib/constants';
import { SYSTEM_PNG_URL } from './map-constants';

import SystemTileContents from './SystemTileContents';

const placeBackground = ({ system, backgroundType = 'svg' }) => {
    if (!system) return null;
    return `url('${SYSTEM_PNG_URL}${system}.${backgroundType}')`;
}

const systemContent = (systemNumber, contentType) => {
  const system = _.find(SYSTEMS, { number: systemNumber });

  if (!system) return null;

  if (contentType === 'image') {
    return <img src={`${SYSTEM_PNG_URL}${systemNumber}.png`} alt={`System ${systemNumber}`} className="system-image" />;
  }

  return <SystemTileContents system={system} />;
}

const SystemTile = ({ system, style = {}, contentType = 'text', ...props }) => {
    // style.backgroundImage = placeBackground({ system });
    return <div className="system-tile" style={style}>{systemContent(system, contentType)}</div>;
};

export default SystemTile;
