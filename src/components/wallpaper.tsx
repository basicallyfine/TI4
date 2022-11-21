import { useEffect, useState, FC } from "react";
// import Konva from 'konva';
import { Layer, Stage, Image } from "react-konva";
import _ from "lodash";

import SYSTEMS from "../lib/data/systems";
import { SYSTEM_TILE_BACK } from "../lib/constants";
import { SYSTEM_PNG_URL } from "./map-builder/map-constants";
import useImage from "use-image";

const empties = _.filter(
  SYSTEMS,
  (system) =>
    system.back === SYSTEM_TILE_BACK.RED &&
    !(system.planets.length || system.anomaly || system.wormhole)
);

type Tile = {
  number: number | null;
  x: number;
  y: number;
};

const TileImage: FC<{
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
}> = ({ url, x, y, width, height }) => {
  const [image] = useImage(url);
  return <Image x={x} y={y} width={width} height={height} image={image} />;
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
};

const Wallpaper: FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  const urlParams = new URLSearchParams(window.location.search);

  const DIMENSIONS = [urlParams.get("w") || 375, urlParams.get("h") || 667].map(
    Number
  );
  const GRID = [urlParams.get("x") || 7, urlParams.get("y") || 10].map(Number);
  const RADIUS = Math.ceil((DIMENSIONS[0] / (GRID[0] - 2)) * 0.5 * 1.1);
  const HEIGHT = (RADIUS ** 2 - (RADIUS / 2) ** 2) ** 0.5 * 2;

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
    const tiles = _.sortBy(tilePositions(), (tile) => [
      Math.abs(tile.y) + Math.abs(tile.x),
      Math.abs(tile.x),
      Math.abs(tile.y),
      tile.x,
      tile.y,
    ]);
    tiles[0].number = 18;

    tiles.forEach((tile, i) => {
      if (tile.number) return;
      const unusedSystems = _.filter(
        SYSTEMS,
        (system) => _.map(tiles, "number").indexOf(system.number) < 0
      );
      if (unusedSystems.length === 0) {
        tiles[i].number = _.sample(empties)!.number;
        return;
      }
      tiles[i].number = _.sample(unusedSystems)!.number;
    });

    return tiles;
  };

  const xPos = (x: number) => x * RADIUS * 1.5 + DIMENSIONS[0] / 2;
  const yPos = (y: number, x: number) =>
    y * HEIGHT - (x % 2 ? 0 : HEIGHT / 2) + HEIGHT / 2 + DIMENSIONS[1] / 2;

  useEffect(() => {
    chooseTiles().then(setTiles);
  }, []);

  console.log(tiles);

  return (
    <div className="container-fluid">
      <div style={{ maxWidth: "100%", maxHeight: "80vh", overflow: "auto" }}>
        <Stage width={DIMENSIONS[0]} height={DIMENSIONS[1]}>
          <Layer>
            {tiles.reverse().map((tile, i) => (
              <TileImage
                key={i}
                url={`${SYSTEM_PNG_URL}${tile.number}.png`}
                x={xPos(tile.x) - RADIUS}
                y={yPos(tile.y, tile.x) - HEIGHT / 2}
                width={RADIUS * 2}
                height={HEIGHT}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div className="mb-4" />
      <form className="d-flex flex-column align-items-start ">
        <div>
          <label className="form-label">Dimensions</label>
          <div className="input-group mb-3">
            <input
              className="form-control align-right"
              type="number"
              defaultValue={DIMENSIONS[0]}
              name="w"
            />
            <span className="input-group-text">x</span>
            <input
              className="form-control align-right"
              type="number"
              defaultValue={DIMENSIONS[1]}
              name="h"
            />
          </div>
        </div>
        <div>
          <label className="form-label">Gid</label>
          <div className="input-group mb-3">
            <input
              className="form-control align-right"
              type="number"
              defaultValue={GRID[0]}
              name="x"
            />
            <span className="input-group-text">x</span>
            <input
              className="form-control align-right"
              type="number"
              defaultValue={GRID[1]}
              name="y"
            />
          </div>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default Wallpaper;
