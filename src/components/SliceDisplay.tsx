import { orderBy } from "lodash";
import { useLayoutEffect, useMemo, useState } from "react";

import SYSTEMS from "../lib/data/systems";
import { SYSTEM_PNG_URL } from "./map-builder/map-constants";

import "../styles/slice-display.scss";

export const SliceDisplay = () => {
  const [sliceString, setSliceString] = useState<string | undefined>();
  const [sorting, setSorting] = useState<string | null>();
  useLayoutEffect(() => {
    // const query = window?.location?.search?.replace(/^\?/, "");
    const params = new URLSearchParams(window.location.search);
    const paramValues = {
      slice: params?.get("s"),
      sort: params?.get("sort"),
    };
    console.log(params.keys()?.next().value);

    if (paramValues.slice) {
      setSliceString(
        decodeURIComponent(
          paramValues.slice.replace(/^[\s,;|]+|[\s,;|]+$/g, "")
        )
      );
    } else if (params.keys()?.next().value?.match(/^[\d,;\s]+$/)) {
      const newUrl = new URL(window.location.href);
      newUrl.search = `s=${newUrl.search}`;
      window.location.replace(newUrl.toString());
    }
    if (paramValues.sort) {
      setSorting(decodeURIComponent(paramValues.sort));
    }
  }, []);

  const slices = useMemo(() => {
    if (sliceString) {
      const _s = sliceString.split(/\s*\|\s*|\s*;\s*/).map((s) => {
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

      switch (sorting) {
        case "best":
          return orderBy(
            _s,
            (slice) =>
              slice.value.resources_efficient +
              slice.value.influence_efficient +
              (slice.value.resources_max + slice.value.influence_max) / 100 +
              Math.random() / 1000,
            "desc"
          );
        case "random":
          return orderBy(_s, () => Math.random(), "asc");
        default:
          return _s;
      }
    }
    return null;
  }, [sliceString, sorting]);

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
