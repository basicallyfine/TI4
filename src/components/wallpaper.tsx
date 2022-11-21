import React, { useEffect, useMemo, useState, FC } from 'react';
import Konva from 'konva';
import ReactKonva, { Circle, Layer, Stage, Image } from 'react-konva';
import _ from 'lodash';

import SYSTEMS from '../lib/data/systems';
import { SYSTEM_TILE_BACK } from '../lib/constants'
import { SYSTEM_PNG_URL } from './map-builder/map-constants';
import useImage from 'use-image';

const empties = _.filter(SYSTEMS, system => system.back === SYSTEM_TILE_BACK.RED && !(system.planets.length || system.anomaly || system.wormhole))

type Tile = {
    number: number | null;
    x: number;
    y: number;
}

const DIMENSIONS = [375,667];
const GRID = [7, 10];
const RADIUS= Math.ceil(DIMENSIONS[0] / (GRID[0] - 2) * 0.5 * 1.1);
const HEIGHT = ((RADIUS**2) - ((RADIUS/2)**2)) ** 0.5 * 2;

console.log({ RADIUS, HEIGHT })

const tilePositions = () => {
  const tiles: Tile[] = [];
  for (let x = 0; x <= GRID[0]; x += 1) {
    for (let y = 0; y <= GRID[1]; y += 1) {
      tiles.push({
        number: null,
        x: x - Math.floor(GRID[0] / 2),
        y: y - Math.floor(GRID[1] / 2),
      });
    }
  }
  return tiles;
};

const chooseTiles = async () => {
    const tiles = _.sortBy(tilePositions(), tile => [Math.abs(tile.y) + Math.abs(tile.x), Math.abs(tile.x), Math.abs(tile.y), tile.x, tile.y]);
    tiles[0].number = 18;

    tiles.forEach((tile, i) => {
        if (tile.number) return;
        const unusedSystems = _.filter(SYSTEMS, system => _.map(tiles, 'number').indexOf(system.number) < 0);
        if (unusedSystems.length === 0) {
            tiles[i].number = _.sample(empties)!.number;
            return;
        }
        tiles[i].number = _.sample(unusedSystems)!.number;
    });

    return tiles;
};

const xPos = (x: number) => (x * RADIUS * 1.5) + DIMENSIONS[0]/2;
const yPos = (y: number, x: number) => (y * HEIGHT) - (x%2 ? 0 : HEIGHT/2) + HEIGHT/2 + DIMENSIONS[1]/2;

const TileImage: FC<{ tile: Tile }> = ({ tile }) => {
    const [image] = useImage(`${SYSTEM_PNG_URL}${tile.number}.png`);
    return (
        <Image
            x={xPos(tile.x) - RADIUS}
            y={yPos(tile.y, tile.x) - (HEIGHT/2)}
            width={RADIUS * 2}
            height={HEIGHT}
            image={image}
        />
    );
    // return (
    //     <>

    //     <Circle
    //         radius={2}
    //         x={xPos(tile.x)}
    //         y={yPos(tile.y, tile.x)}
    //         fill={tile.number === 18 ? '#FF0' : '#FFF'}
    //         fillEnabled
    //     />
    //     </>
    // );
}


const Wallpaper: FC = () => {
    const [tiles, setTiles] = useState<Tile[]>([]);

    useEffect(() => {
        chooseTiles().then(setTiles);
    }, []);

    console.log(tiles);

    return (
        <Stage width={DIMENSIONS[0]} height={DIMENSIONS[1]}>
        <Layer>
            {tiles.reverse().map((tile, i) => <TileImage key={i} tile={tile} />)}
        </Layer>
      </Stage>
    );
};

export default Wallpaper;