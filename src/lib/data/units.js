import { FACTION, UNIT_TYPE } from '../constants';

const UNITS = [
    {
        name: 'Carrier',
        type: UNIT_TYPE.CARRIER,
        cost: 3,
        combat: 9,
        move: 1,
        capacity: 4,
    },
    {
        name: 'Carrier II',
        type: UNIT_TYPE.CARRIER,
        cost: 3,
        combat: 9,
        move: 2,
        capacity: 6,
    },
    {
        name: 'Advanced Carrier',
        type: UNIT_TYPE.CARRIER,
        upgrade: true,
        faction: FACTION.FEDERATION_OF_SOL,
        cost: 3,
        combat: 9,
        move: 1,
        capacity: 6,
    },
    {
        name: 'Advanced Carrier II',
        type: UNIT_TYPE.CARRIER,
        upgrade: true,
        faction: FACTION.FEDERATION_OF_SOL,
        cost: 3,
        combat: 9,
        move: 1,
        capacity: 6,
        sustain_damage: true
    },
];

export { UNITS };