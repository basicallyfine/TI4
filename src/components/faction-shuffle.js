import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const LIST_KEY_BASE = 36;
const LIST_KEY_MAX_LENGTH = 1; // max 36 factions
const { FACTIONS } = require('../lib/constants');

const CollapsibleSection = ({ title, children, className, ...props }) => {
    const [open, setOpen] = useState(!!props.open);

    const classes = ['card card-sm bg-none border-secondary'];
    if (className) classes.push(className);

    return (
        <div className={classes.join(' ')}>
            <div className="card-header -border-secondary p-0 bg-none">
                <button
                    className="btn p-0 btn-block text-left px-1 py-0-5 d-flex"
                    onClick={() => { setOpen(!open); }}
                >
                    <span className="mr-auto">{title}</span>
                    <span>{open ? '⨉' : '<'}</span>
                </button>
            </div>
            <div className={`card-body p-1 pt-0-5 ${open ? 'd-block' : 'd-none'}`}>{children}</div>
        </div>
    );
}

const FactionDeal = () => {
    const [playerCount, setPlayerCount] = useState(4);
    const [playerNames, setPlayerNames] = useState([]);
    const [factionMax, setFactionMax] = useState(null);

    const [expansions, setExpansions] = useState({ pok: true });

    const [factionList, setFactionList] = useState([]);
    useEffect(() => {
        setFactionList(FACTIONS.map(f => ({ ...f, selected: true })));
    }, [])

    // function encodeList(keys) {
    //     return window.btoa(keys.map(int => int.toString(LIST_KEY_BASE).padStart(LIST_KEY_MAX_LENGTH, '0')).join('')).replace(/=+$/, '');
    // }

    function setExpansionValue(key, value) {
        const newValue = _.clone(expansions);
        newValue[key] = value;
        setExpansions(newValue);

        return newValue;
    }

    function selectFaction(name, selected = true) {
        const newValue = _.clone(factionList);
        _.find(factionList, { name }).selected = selected;

        setFactionList(newValue);
        return newValue;
    }

    const defaultFactionsPerPlayer = 0;

    return (
        <div className="container dice-table my-2">
            <h2>Faction shuffler</h2>
            
            <CollapsibleSection title="Players" className="mb-1" open >
                <div className="form-group mb-1">
                    <label htmlFor="input-player-count" className="mr-1">Player count</label>
                    <input
                        type="number"
                        // inputMode="numeric"
                        id="input-player-count"
                        className="form-control"
                        min={3}
                        max={expansions.pok ? 8 : 6}
                        value={playerCount ? playerCount.toString(10) : ''}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setPlayerCount(value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Names <small className="text-muted">(optional)</small></label>
                    {_.range(0, playerCount).map(i => (
                        <input
                            type="text"
                            key={i}
                            className="form-control mb-0-5"
                            value={playerNames[i] || ''}
                            placeholder={`Player ${i + 1}`}
                            onChange={(e) => {
                                const names = [...playerNames];
                                names[i] = e.target.value.trim(/^\s+|\s+$/g, '');
                                setPlayerNames(names);
                            }}
                        />
                    ))}
                </div>
                <div className="form-group mb-1">
                    <label htmlFor="input-faction-count" className="mr-1">Max factions per player</label>
                    <input
                        type="number"
                        // inputMode="numeric"
                        id="input-faction-count"
                        className="form-control"
                        placeholder={defaultFactionsPerPlayer || '-'}
                        min={1}
                        value={factionMax ? factionMax.toString(10) : ''}
                        onChange={(e) => {
                            const { value } = e.target;
                            setFactionMax(value ? parseInt(value, 10) : null);
                        }}
                    />
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Factions" className="mb-1">
                {factionList.map((faction, i) => (
                    <div className="form-group form-check" key={faction.name}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`faction-checkbox-${faction.key}`}
                            name="factions"
                            checked={!!(faction.selected && (expansions.pok || !faction.pok))}
                            disabled={faction.pok && !expansions.pok}
                            onChange={(e) => {
                                selectFaction(faction.name, !!e.target.checked)
                            }}
                            value={faction.key}
                        />
                        <label className="form-check-label" htmlFor={`faction-checkbox-${i}`}>{faction.name}</label>
                    </div>
                ))}

                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                        const selected = _.sumBy(factionList, 'selected') < factionList.length;
                        setFactionList(factionList.map(f => ({ ...f, selected })));
                    }}
                >
                    Select {_.sumBy(factionList, 'selected') < factionList.length ? 'all' : 'none'}
                </button>
            </CollapsibleSection>

            <CollapsibleSection title="Expansion options" className="mb-1">
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="expansion-checkbox-pok"
                        checked={!!expansions.pok}
                        onChange={(e) => {
                            setExpansionValue('pok', !!e.target.checked);
                        }}
                    />
                    <label className="form-check-label" htmlFor="expansion-checkbox-pok">Prophecy of Kings</label>
                </div>
            </CollapsibleSection>
        </div>
    );
};

export default FactionDeal;
