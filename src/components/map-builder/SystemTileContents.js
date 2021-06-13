import React from 'react';
import _ from 'lodash';

import 'konva';
import { Stage, Layer, RegularPolygon, Path, Circle, Text } from 'react-konva';

import {
  GAME_COLOURS,
  SYSTEM_TILE_BACK,
  TECH_COLOR,
  PLANET_TRAIT,
  ANOMALY,
  WORMHOLE,
  SYSTEMS,
} from '../../lib/constants';

// const Planet = ({ planet }) => {
//   const classes = ['planet'];
//
//   let icon = null;
//
//   if (planet.mecatol || planet.legendary) classes.push('big-planet');
//
//   if (planet.legendary) {
//     icon = SVG_ASSETS.PLANET_ICON_LEGENDARY;
//   }
//   switch (planet.tech) {
//     case TECH_COLOR.BLUE:
//       icon = SVG_ASSETS.PLANET_ICON_TECH_BLUE;
//     break;
//     case TECH_COLOR.GREEN:
//       icon = SVG_ASSETS.PLANET_ICON_TECH_GREEN;
//     break;
//     case TECH_COLOR.RED:
//       icon = SVG_ASSETS.PLANET_ICON_TECH_RED;
//     break;
//     case TECH_COLOR.YELLOW:
//       icon = SVG_ASSETS.PLANET_ICON_TECH_BLUE;
//     break;
//     default:
//   }
//
//
//   return (
//     <div class="object">
//       {SVG_ASSETS.CIRCLE}
//       {icon}
//       <span className="name">{planet.name}</span>
//       <span className="value">{planet.resources} / {planet.influence}</span>
//     </div>
//   );
// };
//
// const NonPlanet = ({ wormhole, anomaly }) => {
//   return '*';
// };

const WIDTH = 470;
const HEIGHT = 407;
const COLOR = {
  WHITE: GAME_COLOURS.WHITE,
  BLACK: "#000000",
  RED: GAME_COLOURS.RED,
  GREEN: GAME_COLOURS.GREEN,
  BLUE: GAME_COLOURS.BLUE,
  YELLOW: GAME_COLOURS.YELLOW,
};
const BORDER_WIDTH = 14;

const TileBorder = () => (
  <RegularPolygon
    stroke={COLOR.WHITE}
    strokeWidth={BORDER_WIDTH}
    radius={WIDTH/2 - BORDER_WIDTH/2}
    sides={6}
    x={WIDTH/2}
    y={HEIGHT/2}
    rotation={90}
  />
);

const AnomalyBorder = () => {
  const radius = WIDTH/2 - (BORDER_WIDTH * 2);
  return (
    <RegularPolygon
      stroke={COLOR.RED}
      strokeWidth={BORDER_WIDTH}
      // dash={[0, radius/4, radius/2, radius/4]}
      dash={[0, radius * 0.15, radius * 0.2, radius * 0.15]}
      radius={radius}
      sides={6}
      x={WIDTH/2}
      y={HEIGHT/2}
      rotation={90}
    />
  );
}

const SystemTileContents = ({ system }) => {

  const objects = [];
  if (_.get(system, 'planets.length') >= 1) {
    objects.push(...system.planets.map(planet => ({ planet })));
  }

  return (
    <Stage width={WIDTH} height={HEIGHT}>
      <Layer>
        <TileBorder />
        {system.anomaly ? <AnomalyBorder /> : null}
      </Layer>
    </Stage>
  );

  // return system.number;
};

export default SystemTileContents;
