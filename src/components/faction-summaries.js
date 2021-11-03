import React, { useState } from 'react';
import _ from 'lodash';

import { FACTIONS } from '../lib/constants';

import '../styles/components/faction-summaries.css';

const parseURLCodes = (param) => {
    const input = (param || '').toUpperCase().replace(/[^A-Z0-1\-]/g, '');
    if (!input) return null;
    if (input === 'ALL') return _.map(FACTIONS, 'code');
    if (input === 'POK') return _.chain(FACTIONS).filter('pok').map('code').value();
    if (input === 'BASE') return _.chain(FACTIONS).filter(faction => !faction.pok).map('code').value();
    
    const codes = _.map(FACTIONS, 'code');

    return _.chain([...input.matchAll(/(\w{3}-\w{3}|\w{3}(?!-))/g)])
        .map(([code]) => {
            console.log(code);
            if (code.match(/^\w{3}$/)) return code;
            if (code.match(/^\w+-\w+$/)) {
                const [first, last] = code.split('-');
                if (codes.indexOf(first) >= 0 && codes.indexOf(last) >= 0) {
                    return codes.slice(codes.indexOf(first), codes.indexOf(last) + 1);
                }
            }

            return null;
        })
        .filter()
        .flatten()
        .value()
}

const consolidateURLCodes = (input) => {
    const codes = _.uniq(input).sort();
    if (codes.length === FACTIONS.length) return 'ALL';
    if (codes.join('') === _.chain(FACTIONS).filter('pok').map('code').value().join('')) return 'POK';
    if (codes.join('') === _.chain(FACTIONS).filter(faction => !faction.pok).map('code').value().join('')) return 'BASE';

    const indexClusters = codes.reduce((reducer, code) => {
        const lastSubArray = reducer[reducer.length - 1];
        const codeIndex = _.findIndex(FACTIONS, { code });
        if (codeIndex < 0) return reducer;
        
        if(!lastSubArray || lastSubArray[lastSubArray.length - 1] !== codeIndex - 1) {
          reducer.push([]);
        }
        
        reducer[reducer.length - 1].push(codeIndex);
        
        return reducer;  
    }, []);

    return indexClusters.map((indexes) => {
        switch (indexes.length) {
            case 0:
                return '';
            case 1:
                return FACTIONS[indexes[0]].code;
            case 2:
                return `${FACTIONS[indexes[0]].code}${FACTIONS[indexes[1]].code}`;
            default:
                return `${FACTIONS[_.first(indexes)].code}-${FACTIONS[_.last(indexes)].code}`;
        }
    })
    .join('');
}

const FactionSummaries = ({ match, history }) => {
    const [selectedCodes, setSelectedCodes] = useState([]);

    const codes = parseURLCodes(_.get(match, 'params.codes'));

    if (codes) {
        const selectedFactions = FACTIONS.filter(({ code }) => codes.indexOf(code) >= 0);

        return (
            <div className="container faction-summary summary-results my-1">
                <ul className="faction-summary-images">
                    {selectedFactions.map(({ code, name }) => (
                        <li key={code}>
                            <img
                                src={`${process.env.PUBLIC_URL}/faction-summaries/${code}.jpg`}
                                alt={`${name} summary`}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="container faction-summary select-factions my-2">
            <h2>Select factions for summary sheets</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    history.push(match.path.replace(':codes?', consolidateURLCodes(selectedCodes)));
                }}
            >
                {FACTIONS.map(({ code, name }) => (
                    <div className="form-check" key={code}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={code}
                            id={`checkbox-${code}`}
                            name="faction-checkboxes"
                            checked={(selectedCodes.indexOf(code) >= 0 || false)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedCodes(
                                        prevCodes => _.chain(prevCodes)
                                            .concat(code)
                                            .uniq()
                                            .value()
                                    )
                                } else {
                                    setSelectedCodes(
                                        prevCodes => _.chain(prevCodes)
                                            .without(code)
                                            .uniq()
                                            .value()
                                    )
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`checkbox-${code}`}>
                            {name}
                        </label>
                    </div>
                ))}
                <div className="mt-2 mb-3">
                    <button
                        className="btn btn-primary mr-1"
                        type="submit"
                    >
                    Go
                    </button>
                    <button
                        className="btn btn-outline-dark mr-1"
                        type="button"
                        onClick={() => {
                            if (selectedCodes.length < FACTIONS.length) {
                                setSelectedCodes(_.map(FACTIONS, 'code'));
                            } else {
                                setSelectedCodes([]);
                            }
                        }}
                    >
                    {selectedCodes.length < FACTIONS.length ? 'All' : 'None'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FactionSummaries;