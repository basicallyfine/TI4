import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const LIST_KEY_BASE = 36;
const LIST_KEY_MAX_LENGTH = 1; // max 36 factions
const FACTIONS = require("../data/faction-shuffle.yaml");

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

    const [usePOK, setUsePOK] = useState(true);

    function encodeList(keys) {
        return window.btoa(keys.map(int => int.toString(LIST_KEY_BASE).padStart(LIST_KEY_MAX_LENGTH, '0')).join('')).replace(/=+$/, '');
    }

    return (
        <div className="container dice-table my-2">
            <h2>Faction shuffler</h2>

            <CollapsibleSection title="Players" className="mb-1" open >
                <div className="form-group mb-1">
                    <label htmlFor="input-player-count" className="mr-1">Count</label>
                    <input
                        type="number"
                        // inputMode="numeric"
                        id="input-player-count"
                        className="form-control"
                        min={3}
                        max={usePOK ? 8 : 6}
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
                                console.log(names);
                                setPlayerNames(names);
                            }}
                        />
                    ))}
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Exclude" className="mb-1">
                BIG LIST
            </CollapsibleSection>

            <CollapsibleSection title="Expansion options" className="mb-1">
                BIG LIST
            </CollapsibleSection>
        </div>
    );
};

export default FactionDeal;
