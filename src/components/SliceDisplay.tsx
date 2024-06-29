import { useLayoutEffect, useState } from "react";

import { SYSTEM_PNG_URL } from "./map-builder/map-constants";

import "../styles/slice-display.scss";

export const SliceDisplay = () => {
  const [slices, setSlices] = useState<number[][]>([]);
  useLayoutEffect(() => {
    const query = window?.location?.search?.replace(/^\?/, "");
    if (query) {
      const numbers = decodeURIComponent(query)
        .split(/\s*\|\s*/)
        .map((s) => s.split(/\s+/).map(Number));
      console.log(numbers);
      setSlices(numbers);
    }
  }, []);

  return (
    <div className="container-fluid" id="slice-display">
      {slices.map((tiles) => (
        <div key={tiles.join(",")} className="slice">
          <div className="tiles">
            {tiles.map((tile, i) => (
              <div
                key={tile}
                className={`tile tile-${i}`}
                style={{ backgroundImage: `url(${SYSTEM_PNG_URL}${tile}.png)` }}
              >
                <span className="label">{tile}</span>
              </div>
            ))}
          </div>
          <div className="info">
            <div className="wrapper">
              <span>X/X</span>
              <span>(X/X)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
