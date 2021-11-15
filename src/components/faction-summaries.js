import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { URL, FACTIONS } from '../lib/constants';

import '../styles/components/faction-summaries.css';

const parseURLCodes = (param) => {
    const input = (param || '').toUpperCase().replace(/[^A-Z0-9-]/g, '');
    if (!input) return [];
    // if (input === 'ALL') return _.map(FACTIONS, 'code');
    // if (input === 'POK') return _.chain(FACTIONS).filter('pok').map('code').value();
    // if (input === 'BASE') return _.chain(FACTIONS).filter(faction => !faction.pok).map('code').value();
    
    const codes = _.map(FACTIONS, 'code');

    return _.chain([...input.matchAll(/(\w-\w|\w(?!-))/g)])
        .map(([code]) => {
            if (code.length === 1) return code;
            if (code.match(/^\w-\w$/)) {
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
    const codes = _.chain(input)
        .map(code => _.findIndex(FACTIONS, { code }))
        .filter(i => i >= 0)
        .sortBy()
        .value();
    // if (codes.length === FACTIONS.length) return 'ALL';
    // if (codes.join('') === _.chain(FACTIONS).filter('pok').map('code').value().join('')) return 'POK';
    // if (codes.join('') === _.chain(FACTIONS).filter(faction => !faction.pok).map('code').value().join('')) return 'BASE';

    const indexClusters = codes.reduce((reducer, codeIndex) => {
        const lastSubArray = reducer[reducer.length - 1];
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
            case 2:
            case 3:
                return indexes.map(i => FACTIONS[i].code).join('');
            default:
                return `${FACTIONS[_.first(indexes)].code}-${FACTIONS[_.last(indexes)].code}`;
        }
    })
    .join('');
}

const FactionSummaries = ({ match, history, location }) => {
    const [selectedCodes, setSelectedCodes] = useState('');
    useEffect(() => {
        if (window.location.href.match(/\?$/) || location.search) {
            history.replace(location.pathname);
        }
        if (window.sessionStorage.getItem('selectedFactionCodes')) {
            setSelectedCodes(window.sessionStorage.getItem('selectedFactionCodes'));
        }
    }, []);

    const codes = parseURLCodes(_.get(match, 'params.codes'));
    useEffect(() => {
        window.sessionStorage.setItem('selectedFactionCodes', selectedCodes);
    }, [selectedCodes]);

    const imageTypes = [
        'overview', 
        'summary', 
        'sheet-front',
        // 'sheet-back',
    ];

    if (_.size(codes) > 0) {
        const selectedFactions = FACTIONS.filter(({ code }) => codes.indexOf(code) >= 0);

        return (
            <div className="faction-summary summary-results">
                <div className={`faction-summary-images ${codes.length === 1 ? 'single-faction' : 'mdivtiple-factions'}`}>
                    {selectedFactions.map(({ code, name, image_name }) => (
                        <div key={code} className={`faction-row row-size-${imageTypes.length}`}>
                            {imageTypes.map((imageType) => (
                                <img
                                    className="image-cell"
                                    key={imageType}
                                    src={`${URL.ASSETS_BUCKET}ti4/factions/${imageType}/${image_name}.jpg`}
                                    // src={`https://via.placeholder.com/320x${_.random(250,300)}`}
                                    // style={{ backgroundImage: `url(${URL.ASSETS_BUCKET}ti4/factions/${imageType}/${image_name}.jpg)` }}
                                    alt={`${name} summary`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container faction-summary select-factions my-2">
            <h2>Select factions for summary sheets</h2>
            <form
                method="GET"
                action={match.path.replace(':codes?', consolidateURLCodes(selectedCodes))}
                onSubmit={(e) => {
                    const submitCodes = _.chain(FACTIONS)
                        .filter(({ code }) => selectedCodes.indexOf(code) >= 0)
                        .map('code')
                        .value();
                    if (submitCodes.length === 0) {
                        e.preventDefault();
                        setSelectedCodes('');
                    }
                    // e.preventDefault();
                    // const pathParam = consolidateURLCodes(submitCodes);
                    // history.push(match.path.replace(':codes?', pathParam));
                }}
            >
                {FACTIONS.map(({ code, name }, i) => (
                    <div className="form-check" key={code}>
                        <label className="form-check-label" htmlFor={`checkbox-${code}`}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                // value={code}
                                value=""
                                name={code}
                                id={`checkbox-${code}`}
                                checked={(selectedCodes.indexOf(code) >= 0 || false)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedCodes(
                                            prevCodes => _.chain(prevCodes)
                                                .split('')
                                                .concat(code)
                                                .uniq()
                                                .value()
                                                .join('')
                                        )
                                    } else {
                                        setSelectedCodes(
                                            prevCodes => _.chain(prevCodes)
                                                .split('')
                                                .without(code)
                                                .uniq()
                                                .value()
                                                .join('')
                                        )
                                    }
                                }}
                            />
                            {name}
                        </label>
                        <a
                            href={match.path.replace(':codes?', code)}
                            className="faction-link"
                            target="_blank"
                        >→</a>
                    </div>
                ))}
                <div className="mt-2 mb-3">
                    <button
                        className="btn btn-primary mr-1"
                        type="submit"
                        disabled={selectedCodes.length === 0}
                    >
                    Go
                    </button>
                    <button
                        className="btn btn-outline-dark mr-1"
                        type="button"
                        onClick={() => {
                            if (selectedCodes.length < FACTIONS.length) {
                                setSelectedCodes(_.map(FACTIONS, 'code').join(''));
                            } else {
                                setSelectedCodes('');
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