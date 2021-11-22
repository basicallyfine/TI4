import React, { useState, memo, Fragment } from 'react';
import _ from 'lodash';

import { MAP_SYSTEM_GROUPS } from './map-constants';
import mapUtils from './map-utils';

import { PLANET_TRAIT } from '../../lib/constants';

const StatsTable = ({ mapPlaceData, mapConfig }) => {
    const [includedSystems, setIncludedSystems] = useState([MAP_SYSTEM_GROUPS.SLICE]);

    const setIncludedSystemGroup = (group, checked) => {
        setIncludedSystems((prevGroups) => _.chain(MAP_SYSTEM_GROUPS)
            .values()
            .filter((includedGroup) => {
                if (includedGroup === group) return checked;
                return prevGroups.indexOf(includedGroup) >= 0;
            })
            .value()
        );
    };

    const players = mapUtils.playerSystems({ mapPlaceData, mapConfig });

    return (
        <div className="map-stats-wrapper">
            <div>
                {_.toPairs(MAP_SYSTEM_GROUPS).map(([key, group]) => (
                    <div className="form-check form-check-inline" key={group}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`includeSystems-${key}`}
                            value={group}
                            checked={includedSystems.indexOf(group) >= 0}
                            onChange={(e) => {
                                setIncludedSystemGroup(group, e.target.checked);
                            }}
                        />
                        <label className="form-check-label" htmlFor={`includeSystems-${key}`}>{group}</label>
                    </div>
                ))}
            </div>
            <div className="table-responsive">
                <table className="table map-stats-table table-sm">
                    <thead><tr>
                        <th colSpan="2"></th>
                        <th className="vertical"><span>Planets</span></th>
                        <th className="vertical"><span>Resources</span></th>
                        <th className="vertical"><span>Influence</span></th>
                        <th className="vertical"><span>Total value</span></th>
                        <th className="vertical"><span>Efficient value</span></th>
                        <th className="vertical"><span>Legendary planets</span></th>
                        <th className="vertical"><span>Tech specialties</span></th>
                        <th className="vertical"><span>Cultural traits</span></th>
                        <th className="vertical"><span>Industrial traits</span></th>
                        <th className="vertical"><span>Hazardous traits</span></th>
                        <th className="vertical"><span>Anomalies</span></th>
                        <th className="vertical"><span>Wormholes</span></th>
                        <th className="vertical"><span>No-planet systems</span></th>
                    </tr></thead>
                    <tbody>
                        {players.map((player) => (
                            <Fragment key={player.label}>
                                {includedSystems.map((systemGroup, systemGroupIdx) => (
                                    <tr
                                        key={systemGroup}
                                        className={
                                            [
                                                'row-group',
                                                (systemGroupIdx === 0 ? 'row-group-first' : ''),
                                                (systemGroupIdx === 1 ? 'row-group-second' : ''),
                                                (systemGroupIdx === (includedSystems.length - 1) ? 'row-group-last' : ''),
                                            ].join(' ')
                                        }
                                    >
                                        {systemGroupIdx === 0 && <td rowSpan={includedSystems.length} className="player-label">{player.label}</td>}
                                        <td className="system-group-label">{systemGroup}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].planets || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].resources || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].influence || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].totalValue || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].efficientValue || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].legendary || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].tech || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].traits[PLANET_TRAIT.BLUE] || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].traits[PLANET_TRAIT.GREEN] || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].traits[PLANET_TRAIT.RED] || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].anomalies || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].wormholes || 0}</td>
                                        <td className="stat-value text-center">{player.systems[systemGroup].nonPlanet || 0}</td>
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const memoCompare = ({ _memo: oldProps }, { _memo: newProps }) => _.isEqual(oldProps, newProps);

export default memo(StatsTable, memoCompare);