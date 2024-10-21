import { orderBy } from "lodash";
import { useLayoutEffect, useMemo, useState } from "react";

import SYSTEMS from "../lib/data/systems";
import { SYSTEM_PNG_URL } from "./map-builder/map-constants";

import "../styles/slice-display.scss";

function valueLabel(value: number) {
  return value.toString(10).replace(".5", "½");
}

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
  value_total: number;
  resources_efficient: number;
  influence_efficient: number;
  either_efficient: number;
  value_efficient: number;
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

type DisplayComponentsType = { images: boolean; table: boolean };

export const SliceDisplay = () => {
  const [sliceString, setSliceString] = useState<string | undefined>();
  const [sorting, setSorting] = useState<string | null>();
  const [displayComponents, setDisplayComponents] =
    useState<DisplayComponentsType>({ images: true, table: true });
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
    if (params.has("d")) {
      const urlDisplayComponents: DisplayComponentsType = {
        images: false,
        table: false,
      };
      for (const key of params.getAll("d")) {
        if (key in urlDisplayComponents) {
          urlDisplayComponents[key as keyof DisplayComponentsType] = true;
        }
      }
      setDisplayComponents(urlDisplayComponents);
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
            value_total: 0,
            resources_efficient: 0,
            influence_efficient: 0,
            either_efficient: 0,
            value_efficient: 0,
            planets: 0,
          },
          non_equi_value: {
            resources_max: 0,
            influence_max: 0,
            value_total: 0,
            resources_efficient: 0,
            influence_efficient: 0,
            either_efficient: 0,
            value_efficient: 0,
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
            const planetValue = {
              resources_max: 0,
              influence_max: 0,
              resources_efficient: 0,
              influence_efficient: 0,
              either_efficient: 0,
              value_efficient: 0,
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

            planetValue.resources_max += planet.resources;
            planetValue.influence_max += planet.influence;
            if (planet.resources > planet.influence) {
              planetValue.resources_efficient += planet.resources;
              planetValue.value_efficient += planet.resources;
            } else if (planet.influence > planet.resources) {
              planetValue.influence_efficient += planet.influence;
              planetValue.value_efficient += planet.influence;
            } else {
              planetValue.either_efficient += planet.resources;
              planetValue.value_efficient += planet.resources;
            }

            slice.value.resources_max += planetValue.resources_max;
            slice.value.influence_max += planetValue.influence_max;
            slice.value.value_total +=
              planetValue.resources_max + planetValue.influence_max;
            slice.value.resources_efficient += planetValue.resources_efficient;
            slice.value.influence_efficient += planetValue.influence_efficient;
            slice.value.either_efficient += planetValue.either_efficient;
            slice.value.value_efficient += planetValue.value_efficient;

            if (!isEquidistant) {
              slice.non_equi_value.resources_max += planetValue.resources_max;
              slice.non_equi_value.influence_max += planetValue.influence_max;
              slice.non_equi_value.value_total +=
                planetValue.resources_max + planetValue.influence_max;
              slice.non_equi_value.resources_efficient +=
                planetValue.resources_efficient;
              slice.non_equi_value.influence_efficient +=
                planetValue.influence_efficient;
              slice.non_equi_value.either_efficient +=
                planetValue.either_efficient;
              slice.non_equi_value.value_efficient +=
                planetValue.value_efficient;
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
              slice.value.value_efficient +
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

  if (!sliceString?.trim() || (sliceString.trim() && !slices?.length)) {
    return (
      <div className="container">
        <form method="GET" className="my-2">
          <div className="form-group mb-2">
            <textarea
              className="form-control"
              name="s"
              placeholder="Copy / paste slice string (eg: 67 69 44 65 19 | 43 25 76 ...)"
            ></textarea>
          </div>
          <div className="form-group mb-2">
            <label>Sorting</label>
            <div className="form-check">
              <label className="form-check-label" htmlFor="sort-original">
                <input
                  type="radio"
                  className="form-check-input"
                  id="sort-original"
                  name="sort"
                  value=""
                  defaultChecked
                />
                Original order
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="sort-best">
                <input
                  type="radio"
                  className="form-check-input"
                  id="sort-best"
                  name="sort"
                  value="best"
                />
                Best by efficient value
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="sort-random">
                <input
                  type="radio"
                  className="form-check-input"
                  id="sort-random"
                  name="sort"
                  value="random"
                />
                Random
              </label>
            </div>
          </div>
          <div className="form-group mb-2">
            <label>Display</label>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="d"
                  value="images"
                  defaultChecked
                />
                Images
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="d"
                  value="table"
                  defaultChecked
                />
                Table
              </label>
            </div>
          </div>
          <div className="form-group mb-2">
            <button type="submit" className="btn btn-primary">
              Go
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      {displayComponents.images ? (
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
                      (
                      {valueLabel(
                        value.resources_efficient + value.either_efficient / 2
                      )}
                      /
                      {valueLabel(
                        value.influence_efficient + value.either_efficient / 2
                      )}
                      )
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : null}
      {displayComponents.table ? (
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>-</th>
                <th>Optimal</th>
                <th>Max</th>
                <th>Optimal + Equi.</th>
                <th>Max + Equi.</th>
                <th>Planets</th>
                <th>Planets+E</th>
                <th>Skips, Wormholes, Legendaries</th>
              </tr>
            </thead>
            <tbody>
              {slices &&
                slices.map(
                  ({ key, label, value, non_equi_value, attributes }) => (
                    <tr key={key}>
                      <td>{label}</td>
                      <td>
                        {non_equi_value.resources_efficient}/
                        {non_equi_value.influence_efficient}
                        {non_equi_value.either_efficient
                          ? `+${non_equi_value.either_efficient}`
                          : ""}{" "}
                        ({non_equi_value.value_efficient})
                      </td>
                      <td>
                        {non_equi_value.resources_max}/
                        {non_equi_value.influence_max} (
                        {non_equi_value.value_total})
                      </td>
                      <td>
                        {value.resources_efficient}/{value.influence_efficient}
                        {value.either_efficient
                          ? `+${value.either_efficient}`
                          : ""}{" "}
                        ({value.value_efficient})
                      </td>
                      <td>
                        {value.resources_max}/{value.influence_max} (
                        {value.value_total})
                      </td>
                      <td>{non_equi_value.planets}</td>
                      <td>{value.planets}</td>
                      <td>{attributes.join(", ")}</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          <figcaption className="small">
            Notes:
            <ul>
              <li>
                Optimal values refer to spending each planet for the higher of
                its resource or influence value.
              </li>
              <li>
                Optimal values are represented as{" "}
                <code>resources / influence + either (total)</code> where
                "either" refers to planets that equal resource and influence
                values.
              </li>
              <li>
                Max values refer to spending both resources and influence.
              </li>
            </ul>
          </figcaption>
        </div>
      ) : null}
    </>
  );
};
