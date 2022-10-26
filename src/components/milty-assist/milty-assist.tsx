import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { TECH_COLOR, ANOMALY, WORMHOLE } from '../../lib/constants';
import SYSTEMS from '../../lib/data/systems';
import FACTIONS from '../../lib/data/factions';

import type { System } from '../../lib/data/systems';
import type { Faction } from '../../lib/data/factions';

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

const parseSliceParam = (param: string) => {
    const [label, available, ...paramSystems] = param.split(/:|,/);

    const slice: MiltySlice = {
        label,
        available: available === '1',
        systems: (paramSystems).map(paramSystem => _.find(SYSTEMS, { number: Number(paramSystem) }))
    }

    return slice;
};

const parseFactionParam: (param: string) => MiltyFaction = (param: string) => {
    const [code, available] = param.split(':');
    const faction = {
        faction: _.find(FACTIONS, { code }),
        available: available === '1',
    }; 
    return faction;
};

const MiltyAssist = () => {
    const initialSlices: MiltySlice[] = [];
    const initialFactions: MiltyFaction[] = [];

    const [slices, setSlices] = useState(initialSlices);
    const [factions, setFactions] = useState(initialFactions);

    // window.location.search =
    //  slices=label:available:system,system,system,system,system
    //  faction=key:available

    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        const urlSlices = p.getAll('slices').map(parseSliceParam);
        setSlices(urlSlices);
        const urlFactions = p.getAll('factions').map(parseFactionParam).filter(( { faction } ) => faction);
        setFactions(urlFactions)
    }, []);


    console.log('slices', slices);
    console.log('factions', factions);

    return null;
}

export default MiltyAssist;