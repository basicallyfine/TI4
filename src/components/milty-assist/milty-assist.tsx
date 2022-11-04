import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import { TECH_COLOR, ANOMALY, WORMHOLE } from '../../lib/constants';
import SYSTEMS from '../../lib/data/systems';
import FACTIONS from '../../lib/data/factions';

import type { System } from '../../lib/data/systems';
import type { Faction } from '../../lib/data/factions';

import MiltyInput from './milty-input';

type MiltySlice = {
    label: string;
    available: boolean;
    systems: (System | void)[];
}

type MiltySliceValue = {
    optimal: number;
    max: number;
    // tokenOptimal: number;
};

type MiltySliceAttribute = {
    type: typeof TECH_COLOR;
    value: TECH_COLOR;
} | {
    type: typeof ANOMALY;
    value: ANOMALY;
} | {
    type: typeof WORMHOLE;
    value: WORMHOLE;
} | {
    type: 'LEGENDARY';
    value: boolean;
};

type MiltySliceSummary = {
    resources: MiltySliceValue,
    influence: MiltySliceValue,
    attributes: MiltySliceAttribute[]
};

type MiltyFaction = {
    faction: Faction | void;
    available: boolean;
}

const VALUE_DELIM = '-';
const VALUE_LIST_DELIM = '_';

const parseSliceParam = (param: string) => {
    const [label, available, ...paramSystems] = param.split(new RegExp(`${VALUE_LIST_DELIM}|${VALUE_DELIM}`));

    const slice: MiltySlice = {
        label,
        available: available === '1',
        systems: (paramSystems).map(paramSystem => _.find(SYSTEMS, { number: Number(paramSystem) }))
    };

    return slice;
};

const appendSliceParams = (params: URLSearchParams, slices: MiltySlice[]) => {
    for (const slice of slices) {
        params.append('slices', `${slice.label}${VALUE_DELIM}${slice.available ? 1 : 0}${VALUE_DELIM}${_.map(slice.systems, 'number').join(VALUE_LIST_DELIM)}`);
    }
}

const parseFactionParam: (param: string) => MiltyFaction = (param: string) => {
    const [code, available] = param.split(VALUE_DELIM);
    const faction = {
        faction: _.find(FACTIONS, { code }),
        available: available === '1',
    }; 
    return faction;
};

const appendFactionParams = (params: URLSearchParams, factions: MiltyFaction[]) => {
    for (const faction of factions) {
        if (faction.faction?.code) {
            params.append('factions', `${faction.faction.code}${VALUE_DELIM}${faction.available ? 1 : 0}`);
        }
    }
}

const MiltyAssist = () => {
    const initialSlices: MiltySlice[] = [];
    const initialFactions: MiltyFaction[] = [];

    const [slices, setSlices] = useState(initialSlices);
    const [factions, setFactions] = useState(initialFactions);

    // window.location.search =
    //  slices=label:available:system,system,system,system,system
    //  faction=key:available

    const history = useHistory();

    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        const urlSlices = p.getAll('slices').map(parseSliceParam);
        setSlices(urlSlices);
        const urlFactions = p.getAll('factions').map(parseFactionParam).filter(( { faction } ) => faction);
        setFactions(urlFactions)
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        appendSliceParams(params, slices);
        appendFactionParams(params, factions);

        console.log(params.toString());

    }, [slices, factions]);

    return (
        <div className="container">
            <h2>Slice string</h2>
            <MiltyInput onSave={(input) => {
                if (input.slices) {
                    const importSlices : MiltySlice[] = [];
                    let sliceCode = 'A'.charCodeAt(0);
                    input.slices
                        .replace(/^[\s|]+|[\s|]+$/g, '')
                        .split(/\s*\|\s*/)
                        .map(sliceString => sliceString.trim().split(/\s+/))
                        .forEach((slice) => {
                            if (slice?.length > 0) {
                                importSlices.push(parseSliceParam(`${String.fromCharCode(sliceCode)}${VALUE_DELIM}1${VALUE_DELIM}${slice.join(VALUE_LIST_DELIM)}`))
                            }
                            sliceCode += 1;
                        });
                    
                    setSlices(importSlices);
                }
            }} />
        </div>
    );
}

export default MiltyAssist;