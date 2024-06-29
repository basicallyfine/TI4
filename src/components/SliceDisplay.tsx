import { useLayoutEffect, useMemo, useState } from "react";

import SYSTEMS from "../lib/data/systems";
import { SYSTEM_PNG_URL } from "./map-builder/map-constants";

import "../styles/slice-display.scss";

export const SliceDisplay = () => {
  const [sliceString, setSliceString] = useState<string | undefined>();
  useLayoutEffect(() => {
    const query = window?.location?.search?.replace(/^\?/, "");
    if (query) {
      setSliceString(
        decodeURIComponent(query.replace(/^[\s,;|]+|[\s,;|]+$/g, ""))
      );
    }
  }, []);

  const slices = useMemo(() => {
    if (sliceString) {
      return sliceString.split(/\s*\|\s*|\s*;\s*/).map((s) => {
        const slice = {
          key: s,
          systems: s
            .split(/\s+|\s*,\s*/)
            .map((n) =>
              n && n.match(/^\d+$/)
                ? SYSTEMS.find(({ number }) => number === Number(n))
                : null
            ),
          value: {
            resources_max: 0,
            influence_max: 0,
            resources_efficient: 0,
            influence_efficient: 0,
          },
        };
        slice.systems.forEach((system) => {
          system?.planets.forEach((planet) => {
            slice.value.resources_max += planet.resources;
            slice.value.influence_max += planet.influence;
            if (planet.resources > planet.influence) {
              slice.value.resources_efficient += planet.resources;
            } else if (planet.influence > planet.resources) {
              slice.value.influence_efficient += planet.influence;
            } else {
              slice.value.resources_efficient += planet.resources / 2;
              slice.value.influence_efficient += planet.influence / 2;
            }
          });
        });
        return slice;
      });
    }
    return null;
  }, [sliceString]);

  return (
    <div className="container-fluid" id="slice-display">
      {slices &&
        slices.map(({ key, systems, value }) => (
          <div key={key} className="slice">
            <div className="tiles">
              {systems.map(
                (system, i) =>
                  system && (
                    <div
                      key={system.number}
                      className={`tile tile-${i}`}
                      style={{
                        backgroundImage: `url(${SYSTEM_PNG_URL}${system.number}.png)`,
                      }}
                    >
                      <span className="label">{system.number}</span>
                    </div>
                  )
              )}
            </div>
            <div className="info">
              <div className="wrapper">
                <span>
                  {value.resources_max}/{value.influence_max}
                </span>
                <span>
                  ({value.resources_efficient.toString(10).replace(".5", "½")}/
                  {value.influence_efficient.toString(10).replace(".5", "½")})
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
