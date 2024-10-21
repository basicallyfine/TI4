import { orderBy } from "lodash";
import { useLayoutEffect, useMemo, useState } from "react";

import SYSTEMS from "../lib/data/systems";
import { SYSTEM_PNG_URL } from "./map-builder/map-constants";

import "../styles/slice-display.scss";

const SLICE_LABELS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

type SliceValues = {
  resources_max: number;
  influence_max: number;
  resources_efficient: number;
  influence_efficient: number;
  planets: number;
};

type SliceDetails = {
  key: string;
  label: string;
  systems: ((typeof SYSTEMS)[number] | null)[];
  value: SliceValues;
  non_equi_value: SliceValues;
  attributes: string[];
};

function valueLabel(value: number) {
  return value.toString(10).replace(".5", "½");
}

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
    } else if (
      params
        .keys()
        ?.next()
        .value?.match(/^[\d,;\s]+$/)
    ) {
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
      const _s = sliceString.split(/\s*\|\s*|\s*;\s*/).map((s, sliceIdx) => {
        const slice: SliceDetails = {
          key: s,
          label: SLICE_LABELS[sliceIdx],
          systems: s
            .split(/\s+|\s*,\s*/)
            .map(
              (n) =>
                (n && n.match(/^\d+$/)
                  ? SYSTEMS.find(({ number }) => number === Number(n))
                  : null) ?? null
            ),
          value: {
            resources_max: 0,
            influence_max: 0,
            resources_efficient: 0,
            influence_efficient: 0,
            planets: 0,
          },
          non_equi_value: {
            resources_max: 0,
            influence_max: 0,
            resources_efficient: 0,
            influence_efficient: 0,
            planets: 0,
          },
          attributes: [],
        };
        slice.systems.forEach((system, systemIdx) => {
          const isEquidistant = systemIdx === 3;
          slice.value.planets += system?.planets.length || 0;
          if (!isEquidistant) {
            slice.non_equi_value.planets += system?.planets.length || 0;
          }
          system?.planets.forEach((planet) => {
            const systemValue = {
              resources_max: 0,
              influence_max: 0,
              resources_efficient: 0,
              influence_efficient: 0,
            };

            if (planet.tech) {
              slice.attributes.push(
                `${planet.tech}${isEquidistant ? " (E)" : ""}`
              );
            }
            if (planet.legendary) {
              slice.attributes.push(
                `${planet.name}${isEquidistant ? " (E)" : ""}`
              );
            }

            systemValue.resources_max += planet.resources;
            systemValue.influence_max += planet.influence;
            if (planet.resources > planet.influence) {
              systemValue.resources_efficient += planet.resources;
            } else if (planet.influence > planet.resources) {
              systemValue.influence_efficient += planet.influence;
            } else {
              systemValue.resources_efficient += planet.resources / 2;
              systemValue.influence_efficient += planet.influence / 2;
            }

            slice.value.resources_max += systemValue.resources_max;
            slice.value.influence_max += systemValue.influence_max;
            slice.value.resources_efficient += systemValue.resources_efficient;
            slice.value.influence_efficient += systemValue.influence_efficient;

            if (!isEquidistant) {
              slice.non_equi_value.resources_max += systemValue.resources_max;
              slice.non_equi_value.influence_max += systemValue.influence_max;
              slice.non_equi_value.resources_efficient +=
                systemValue.resources_efficient;
              slice.non_equi_value.influence_efficient +=
                systemValue.influence_efficient;
            }
          });

          if (system?.wormhole) {
            slice.attributes.push(
              `${system.wormhole}${isEquidistant ? " (E)" : ""}`
            );
          }
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
    <>
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
                    ({valueLabel(value.resources_efficient)}/
                    {valueLabel(value.influence_efficient)})
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>-</th>
              <th>Optimal</th>
              <th>Max</th>
              <th>Optimal+E</th>
              <th>Max+E</th>
              <th>Planets</th>
              <th>Planets+E</th>
              <th>Skips</th>
            </tr>
          </thead>
          <tbody>
            {slices &&
              slices.map(
                ({
                  key,
                  label,
                  value,
                  non_equi_value,
                  attributes,
                }) => (
                  <tr key={key}>
                    <td>{label}</td>
                    <td>
                      {valueLabel(non_equi_value.resources_efficient)} /{" "}
                      {valueLabel(non_equi_value.influence_efficient)}
                    </td>
                    <td>
                      {non_equi_value.resources_max} /{" "}
                      {non_equi_value.influence_max}
                    </td>
                    <td>
                      {valueLabel(value.resources_efficient)} /{" "}
                      {valueLabel(value.influence_efficient)}
                    </td>
                    <td>
                      {value.resources_max} / {value.influence_max}
                    </td>
                    <td>{non_equi_value.planets}</td>
                    <td>{value.planets}</td>
                    <td>{attributes.join(", ")}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};
