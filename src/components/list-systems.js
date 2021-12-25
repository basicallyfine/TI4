import _ from 'lodash';
import React from 'react';
import { useLocation } from 'react-router';

import SYSTEMS from '../lib/data/systems';
import { SYSTEM_PNG_URL } from './map-builder/map-constants';

const parseList = list => list.split(/\D+/).map(itemString => parseFloat(itemString));

const ListSystems = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);

    const systemNumbers = [];
    if (query.get('s')) {
        systemNumbers.push(...parseList(query.get('s')));
    } else if (query.get('b')) {
        const decoded = window.atob(query.get('b'));
        if (decoded) systemNumbers.push(...parseList(decoded));
    }

    const systemsList = _.map(systemNumbers, number => _.find(SYSTEMS, { number }));

    const planetValues = _.chain(systemsList)
    .map('planets')
    .flatten()
    .value();

    console.log(`Total resources: ${_.sumBy(planetValues, 'resources')}`);
    console.log(`Total influence: ${_.sumBy(planetValues, 'influence')}`);

    return (
        <div className="container-fluid text-center">
            {systemsList.map((system, i) => {
                const number = _.get(system, 'number', `undefined (${i})`);
                return (
                    <div
                        style={{
                            padding: '0.5rem',
                            width: '240px',
                            display: 'inline-block',
                            maxWidth: '45%'
                        }}
                    >
                        <img
                            key={number}
                            src={`${SYSTEM_PNG_URL}${number}.png`}
                            alt={`System ${number}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ListSystems;