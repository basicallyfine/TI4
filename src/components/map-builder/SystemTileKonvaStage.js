import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import FontFaceObserver from 'fontfaceobserver';

import 'konva';
import { Stage, Layer, Group, Circle, Text, Line, Star } from 'react-konva';

import {
  GAME_COLOURS,
  SYSTEM_TILE_BACK,
  TECH_COLOR,
  PLANET_TRAIT,
  ANOMALY,
  WORMHOLE,
} from '../../lib/constants';

const WIDTH = 119 * 2;
const HEIGHT = Math.round(WIDTH * 0.866025);

const PT = WIDTH * 0.01;

const COLOR = {
  WHITE: GAME_COLOURS.WHITE,
  BLACK: "#000000",
  RED: GAME_COLOURS.RED,
  GREEN: GAME_COLOURS.GREEN,
  BLUE: GAME_COLOURS.BLUE,
  YELLOW: GAME_COLOURS.YELLOW,
  ORANGE: GAME_COLOURS.ORANGE,
  PINK: GAME_COLOURS.PINK,
  GREY: "#C0C0C0",
};

const OBJECT_TYPE = {
  PLANET: 'PLANET',
  ANOMALY: 'ANOMALY',
  WORMHOLE: 'WORMHOLE',
};

const OBJECT_RADIUS = WIDTH * 0.155;
const OBJECT_LARGE_RADIUS = WIDTH * 0.23;
const OBJECT_STROKE_WIDTH = 2 * PT;
const OBJECT_STROKE_DASH = [OBJECT_STROKE_WIDTH * 2, OBJECT_STROKE_WIDTH * 2];

const TEXT_PROPS = {
  BASE: {
    fontFamily: 'Roboto Mono',
    fontStyle: 'bold',
    fill: COLOR.WHITE,
    align: 'center',
    verticalAlign: 'middle',
    lineHeight: 1.1,
  },
  OBJECT_LABEL: { fontSize: 4.75 * PT },
  SYSTEM_LABEL: { fontSize: 4.75 * PT },
  PLANET_VALUES: { fontSize: 9 * PT },
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
  const width = 2 * PT;
  const size = WIDTH * 0.09;
  const corner = (angle) => (
    <Line
      points={[
        0, size * -1,
        size * 0.5772, 0,
        0, size,
      ]}
      stroke={COLOR.RED}
      closed={false}
      strokeWidth={width}
      x={WIDTH / 2}
      y={HEIGHT / 2}
      offsetX={WIDTH * -0.391}
      rotation={angle}
    />
  );

  return (
    <Group>
    {corner(-120)}
    {corner(-60)}
    {corner(0)}
    {corner(60)}
    {corner(120)}
    </Group>
  )
}

const PlanetIcon = ({ planet, size, ...props }) => {
  if (!planet) {
    console.error('No planet', this);
    return null;
  }

  if (planet.legendary) return (
    <Star
      numPoints={5}
      fill={COLOR.GREY}
      offsetY={size * 0.7}
      outerRadius={size * 0.7}
      innerRadius={size * 0.35}
      {...props}
    />
  );

  const iconProps = {
    width: size,
    height: size,
    offsetY: size * 0.5,
    ...props,
  };

  switch (planet.tech) {
    case TECH_COLOR.GREEN:
      iconProps.fill = COLOR.GREEN;
    break;
    case TECH_COLOR.YELLOW:
      iconProps.fill = COLOR.YELLOW;
    break;
    case TECH_COLOR.BLUE:
      iconProps.fill = COLOR.BLUE;
    break;
    case TECH_COLOR.RED:
      iconProps.fill = COLOR.RED;
    break;
    default:
      return null;
  }

  return <Circle {...iconProps} />;
};

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

  const labelMarginY = planetProps.strokeWidth * 2 - labelProps.fontSize * 0.1;
  const labelMarginX = planetProps.strokeWidth * 2.2;

  switch (position) {
    case '2,0':
      labelProps.width = WIDTH * 0.24;
      labelProps.height = HEIGHT * 0.2;
      labelProps.x = planetProps.radius + labelMarginX;
      labelProps.offsetY = labelProps.height * 0.5;
      labelProps.verticalAlign = 'middle';
      labelProps.align = 'left';
    break;
    case '2,1':
      labelProps.width = WIDTH * 0.27;
      labelProps.height = HEIGHT * 0.2;
      labelProps.offsetX = labelProps.width;
      labelProps.x = (planetProps.radius + labelMarginX) * -1;
      labelProps.offsetY = labelProps.height * 0.5;
      labelProps.verticalAlign = 'middle';
      labelProps.align = 'right';
    break;
    case '3,0':
      labelProps.width = WIDTH * 0.24;
      labelProps.height = HEIGHT * 0.2;
      labelProps.x = planetProps.radius + labelMarginX;
      labelProps.offsetY = labelProps.height * 0.8;
      labelProps.verticalAlign = 'middle';
      labelProps.align = 'left';
    break;
    case '3,1':
      labelProps.width = WIDTH * 0.5;
      labelProps.height = labelProps.fontSize * labelProps.lineHeight;
      labelProps.offsetX = labelProps.width;
      labelProps.x = (planetProps.radius + labelMarginX) * -1;
      labelProps.offsetY = labelProps.height * 0.5;
      labelProps.verticalAlign = 'middle';
      labelProps.align = 'right';
    break;
    case '3,2':
      labelProps.width = WIDTH * 0.24;
      labelProps.height = HEIGHT * 0.2;
      labelProps.x = planetProps.radius + labelMarginX;
      labelProps.offsetY = labelProps.height * 0.2;
      labelProps.verticalAlign = 'middle';
      labelProps.align = 'left';
    break;
    default:
      labelProps.width = WIDTH * 0.5;
      labelProps.height = labelProps.fontSize * labelProps.lineHeight;
      labelProps.offsetX = labelProps.width * 0.5;
      labelProps.offsetY = labelProps.height;
      labelProps.y = planetProps.radius * -1 - labelMarginY
      labelProps.verticalAlign = 'bottom';
  }

  switch (planet.trait) {
    case PLANET_TRAIT.BLUE:
      planetProps.stroke = COLOR.BLUE;
      labelProps.fill = COLOR.BLUE;
    break;
    case PLANET_TRAIT.RED:
      planetProps.stroke = COLOR.RED;
      labelProps.fill = COLOR.RED;
    break;
    case PLANET_TRAIT.GREEN:
      planetProps.stroke = COLOR.GREEN;
      labelProps.fill = COLOR.GREEN;
    break;
  }

  const planetValueProps = {
    ...TEXT_PROPS.BASE,
    ...TEXT_PROPS.PLANET_VALUES,
    text: `${planet.resources}/${planet.influence}`,
    width: planetProps.radius * 2,
  };

  const iconSize = 6 * PT;
  const iconMargin = planetValueProps.fontSize * 0.5;
  const icon = (planet.tech || planet.legendary) ? <PlanetIcon planet={planet} y={iconMargin * -0.8} size={iconSize} /> : null;

  planetValueProps.height = planetValueProps.fontSize * planetValueProps.lineHeight;
  planetValueProps.offsetX = planetValueProps.width * 0.5;
  planetValueProps.offsetY = planetValueProps.height * 0.5;

  if (icon) {
    planetValueProps.y = (iconSize * 0.5) + (iconMargin * 0.3);
  }

  return (
    <>
      <Circle {...planetProps} />
      {icon}
      <TextWithFont {...planetValueProps} />
      {/* <Rect {..._.pick(labelProps, ['x', 'y', 'width', 'height', 'offsetX', 'offsetY'])} fill="#00ffff" opacity={0.5} /> */}
      <TextWithFont {...labelProps} />
    </>
  );
}

const AnomalyObject = ({ type }) => {
  const textBoxSize = radius => ({ width: radius * 1.8, height: radius * 1.8, offsetX: radius * 0.9, offsetY: radius * 0.9 })

  switch (type) {
    case ANOMALY.SUPERNOVA:
      return (
        <>
          <Circle
            radius={OBJECT_LARGE_RADIUS}
            fill={COLOR.ORANGE}
          />
          <TextWithFont
            {...TEXT_PROPS.BASE}
            {...TEXT_PROPS.OBJECT_LABEL}
            text={type.toUpperCase()}
            fill={COLOR.BLACK}
            {...textBoxSize(OBJECT_LARGE_RADIUS)}
          />
        </>
      );
    case ANOMALY.ASTEROID_FIELD:
      return (
        <>
          <Circle
            radius={OBJECT_RADIUS}
            stroke={COLOR.GREY}
            strokeWidth={OBJECT_STROKE_WIDTH}
            dash={OBJECT_STROKE_DASH}
          />
          <TextWithFont
            {...TEXT_PROPS.BASE}
            {...TEXT_PROPS.OBJECT_LABEL}
            text={type.toUpperCase()}
            fill={COLOR.GREY}
            {...textBoxSize(OBJECT_RADIUS)}
          />
        </>
      );
    case ANOMALY.NEBULA:
      return (
        <>
          <Circle
            radius={OBJECT_RADIUS}
            stroke={COLOR.PINK}
            strokeWidth={OBJECT_STROKE_WIDTH}
            dash={OBJECT_STROKE_DASH}
          />
          <TextWithFont
            {...TEXT_PROPS.BASE}
            {...TEXT_PROPS.OBJECT_LABEL}
            text={type.toUpperCase()}
            fill={COLOR.PINK}
            {...textBoxSize(OBJECT_RADIUS)}
          />
        </>
      );
    case ANOMALY.GRAV_RIFT:
      return (
        <>
          <Circle
            radius={OBJECT_RADIUS}
            fill={COLOR.GREY}
          />
          <TextWithFont
            {...TEXT_PROPS.BASE}
            {...TEXT_PROPS.OBJECT_LABEL}
            text={type.toUpperCase()}
            fill={COLOR.BLACK}
            {...textBoxSize(OBJECT_RADIUS)}
          />
        </>
      );
    default:
      return null;
  }
};

const WormholeObject = ({ type }) => {
  const wormholeProps = {};

  switch (type) {
    case WORMHOLE.A:
      wormholeProps.color = COLOR.ORANGE;
      wormholeProps.text = 'α';
    break;
    case WORMHOLE.B:
      wormholeProps.color = COLOR.GREEN;
      wormholeProps.text = 'β';
    break;
    default:
      return null;
  }
  return (
    <>
      <Circle
        radius={OBJECT_RADIUS}
        stroke={wormholeProps.color}
        strokeWidth={OBJECT_STROKE_WIDTH}
        dash={OBJECT_STROKE_DASH}
      />
      <TextWithFont
        {...TEXT_PROPS.BASE}
        fontFamily="sans-serif"
        text={wormholeProps.text}
        fill={wormholeProps.color}
        fontSize={OBJECT_RADIUS * 0.8}
        width={OBJECT_RADIUS * 2}
        height={OBJECT_RADIUS * 2}
        offsetX={OBJECT_RADIUS}
        offsetY={OBJECT_RADIUS}
      />
    </>
  );
}

const SystemObject = ({ position, type, object }) => {
  switch (type) {
    case OBJECT_TYPE.PLANET: return <Planet planet={object} position={position} />;
    case OBJECT_TYPE.ANOMALY: return <AnomalyObject type={object} />;
    case OBJECT_TYPE.WORMHOLE: return <WormholeObject type={object} />;
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
};

const SystemNumber = ({ system }) => {
  const labelProps = {
    ...TEXT_PROPS.BASE,
    ...TEXT_PROPS.SYSTEM_LABEL,
    text: system.number,
    x: WIDTH * 0.5,
    y: HEIGHT * 0.5,
    width: WIDTH * 0.86,
    align: 'left',
  };

  labelProps.height = labelProps.fontSize * 2;
  labelProps.offsetX = labelProps.width / 2;
  labelProps.offsetY = labelProps.height / 2;

  switch (system.back) {
    case SYSTEM_TILE_BACK.RED:
      labelProps.fill = COLOR.RED;
    break;
    case SYSTEM_TILE_BACK.BLUE:
      labelProps.fill = COLOR.BLUE;
    break;
    default:
      labelProps.fill = COLOR.GREY;
  }

  return <Text {...labelProps} />;
};

const SystemTileContents = ({ system }) => (
  <Stage width={WIDTH} height={HEIGHT}>
    <Layer>
      {system.anomaly ? <AnomalyBorder /> : null}
      <SystemNumber system={system} />
      <SystemObjects system={system} />
    </Layer>
  </Stage>
);

export default SystemTileContents;
