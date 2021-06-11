import React from 'react';

import { URL } from '../../lib/constants';

const placeBackground = ({ system, backgroundType = 'svg' }) => {
    if (!system) return null;
    return `url('${URL.SYSTEM_BACKGROUNDS_DIR}/${backgroundType}/${system}.${backgroundType}')`;
}

const SystemTile = ({ system, style = {}, ...props }) => {
    style.backgroundImage = placeBackground({ system });
    return <div className="system-tile" style={style} />;
};

export default SystemTile;