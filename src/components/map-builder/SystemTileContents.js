import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import FontFaceObserver from 'fontfaceobserver';

import 'konva';
import { Stage, Layer, Group, RegularPolygon, Path, Circle, Text, Rect } from 'react-konva';

import {
  GAME_COLOURS,
  SYSTEM_TILE_BACK,
  TECH_COLOR,
  PLANET_TRAIT,
  ANOMALY,
  WORMHOLE,
  SYSTEMS,
} from '../../lib/constants';

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

const OBJECT_TYPE = {
  PLANET: 'PLANET',
  ANOMALY: 'ANOMALY',
  WORMHOLE: 'WORMHOLE',
};

const OBJECT_RADIUS = WIDTH * 0.15;
const OBJECT_LARGE_RADIUS = WIDTH * 0.23;
const OBJECT_STROKE_WIDTH = 6;

const TEXT_PROPS = {
  BASE: {
    fontFamily: 'Roboto Mono',
    fontStyle: 'bold',
    fill: COLOR.WHITE,
    align: 'center',
    verticalAlign: 'middle',
    lineHeight: 1.1,
  },
  OBJECT_LABEL: { fontSize: 22 },
  SYSTEM_LABEL: { fontSize: 22 },
  PLANET_VALUES: { fontSize: 30 },
};

const TextWithFont = ({ key, ...props }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(async () => {
    // TODO: set from text props
    const font = new FontFaceObserver('Roboto Mono', {
      weight: 700,
    });
    await font.load().catch(function () {
      console.log('font failed failed to load');
    });
    setFontLoaded(true);
  }, []);

  if (!fontLoaded) return null;
  return <Text key={key} {...props} />;
}

const AnomalyBorder = () => {
  const width = 12;
  const radius = WIDTH * 0.5 - width * 1.5;
  return (
    <RegularPolygon
      stroke={COLOR.RED}
      strokeWidth={width}
      // dash={[0, radius/4, radius/2, radius/4]}
      dash={[0, radius * 0.15, radius * 0.2, radius * 0.15]}
      radius={radius}
      sides={6}
      x={WIDTH / 2}
      y={HEIGHT / 2}
      rotation={90}
    />
  );
}

const Planet = ({ position, planet }) => {
  const planetProps = {
    radius: (planet.mecatol || planet.legendary) ? OBJECT_LARGE_RADIUS : OBJECT_RADIUS,
    stroke: COLOR.WHITE,
    strokeWidth: OBJECT_STROKE_WIDTH,
  };
  const labelProps = {
    ...TEXT_PROPS.BASE,
    ...TEXT_PROPS.OBJECT_LABEL,
    text: planet.name.toUpperCase(),
    x: 0,
    y: 0,
  };

  switch (position) {
    case '2,0':

      break;
    case '2,1':

      break;
    case '3,0':

      break;
    case '3,1':

      break;
    case '3,2':

      break;
    default:
      labelProps.width = WIDTH / 2;
      labelProps.height = labelProps.fontSize * labelProps.lineHeight;
      labelProps.offsetX = labelProps.width / 2;
      labelProps.offsetY = planetProps.radius + (planetProps.strokeWidth * 2) + (labelProps.height);
      labelProps.verticalAlign = 'bottom';
  }

  return (
    <>
      <Circle {...planetProps} />
      <Rect {..._.pick(labelProps, ['x', 'y', 'width', 'height', 'offsetX', 'offsetY'])} fill="#00ffff" opacity={0.5} />
      <Text {...labelProps} />
    </>
  );
}

const SystemObject = ({ position, type, object }) => {
  switch (type) {
    case OBJECT_TYPE.PLANET: return <Planet planet={object} position={position} />;
    case OBJECT_TYPE.ANOMALY:
      return <TextWithFont text={object} fill={COLOR.WHITE} x={0} y={0} />;
    case OBJECT_TYPE.WORMHOLE:
      return <TextWithFont text={`${object} hole`} fill={COLOR.WHITE} x={0} y={0} />;
  }
}

const SystemObjects = ({ system }) => {
  const objects = [];
  if (_.get(system, 'planets.length') >= 1) {
    objects.push(...system.planets.map(planet => [OBJECT_TYPE.PLANET, planet]));
  }

  if (system.anomaly) objects.push([OBJECT_TYPE.ANOMALY, system.anomaly]);
  if (system.wormhole) objects.push([OBJECT_TYPE.WORMHOLE, system.wormhole]);

  return objects.map(([objectType, object], i) => {
    const position = `${objects.length},${i}`;
    const positionProps = {};
    switch (position) {
      case '2,0': positionProps.x = WIDTH * 0.40; positionProps.y = HEIGHT * 0.29; break;
      case '2,1': positionProps.x = WIDTH * 0.60; positionProps.y = HEIGHT * 0.70; break;
      case '3,0': positionProps.x = WIDTH * 0.39; positionProps.y = HEIGHT * 0.26; break;
      case '3,1': positionProps.x = WIDTH * 0.74; positionProps.y = HEIGHT * 0.50; break;
      case '3,2': positionProps.x = WIDTH * 0.39; positionProps.y = HEIGHT * 0.74; break;
      default:
        positionProps.x = WIDTH / 2;
        positionProps.y = HEIGHT / 2;
    }
    return (
      <Group
        key={i}
        {...positionProps}
      >
        <SystemObject
          position={position}
          type={objectType}
          object={object}
        />
      </Group>
    );
  });
}

const SystemTileContents = ({ system }) => {

  return (
    <div className="svg-wrapper">
      <svg xmlns="http://www.w3.org/1999/xlink" viewBox="0 0 515 446" className="system-image svg-border">
        <path d="m 0 223 l 128.75 -223 l 257.5 0 l 128.75 223 l -128.75 223 l -257.5 0 z " stroke="#000000" stroke-width="1" />
      </svg>
      <Stage width={WIDTH} height={HEIGHT}>
        <Layer>
          {system.anomaly ? <AnomalyBorder /> : null}
          <SystemObjects system={system} />
        </Layer>
      </Stage>
    </div>
  );

  // return system.number;
};

export default SystemTileContents;


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
