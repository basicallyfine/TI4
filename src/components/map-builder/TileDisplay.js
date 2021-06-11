import React from 'react';
import _ from 'lodash';

import { MAP_PLACES } from './map-constants';

import SystemTile from './SystemTile';

const TileDisplay = ({
    systems = [],
    moveTile,
    ...props
}) => (
    <div className="tile-display-container">
        {systems.map(system => <SystemTile key={system} system={system} />)}
    </div>
);

export default TileDisplay;