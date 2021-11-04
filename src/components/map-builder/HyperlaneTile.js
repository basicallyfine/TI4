import React from 'react';
import _ from 'lodash';

import { SYSTEM_PNG_URL, TILE_DISPLAY_TYPE } from './map-constants';

import SystemTileSVG from './SystemTileSVG';

const SystemTileContent = ({ type }) => {
  if (type === TILE_DISPLAY_TYPE.TEXT) {
    return '-';
  }

  if (type === TILE_DISPLAY_TYPE.IMAGE) {
    // TODO (maybe)
    return <img src={`${SYSTEM_PNG_URL}HL.png`} alt="Home system" className="system-image" draggable={false} />;
  }

  return <SystemTileSVG fill="#8616FD33" />;
}

const HomeSystemTile = ({ style = {}, contentType }) => {
    return (
      <div className={`system-tile locked hyperlane content-${contentType}`} style={style}>
        <SystemTileContent type={contentType} />
      </div>
    );
};

export default HomeSystemTile;
