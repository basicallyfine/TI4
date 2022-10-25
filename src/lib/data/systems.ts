import {
    SYSTEM_TILE_BACK,
    PLANET_TRAIT,
    TECH_COLOR,
    ANOMALY,
    WORMHOLE,
    FACTION,
} from '../constants';
import FACTIONS from './factions';

export type Planet = {
    name: string;
    trait?: PLANET_TRAIT | null,
    tech?: TECH_COLOR | null,
    legendary?: boolean;
    resources: number;
    influence: number;
    mecatol?: true;
};

export type System = {
    number: number;
    back: SYSTEM_TILE_BACK;
    pok?: boolean;
    planets: Planet[];
    anomaly?: ANOMALY;
    wormhole?: WORMHOLE;
    faction?: FACTION;
};

const SYSTEMS: System[] = [
    {
        number: 18,
        back: SYSTEM_TILE_BACK.SPECIAL,
        planets: [
            { name: 'Mecatol Rex', trait: null, tech: null, legendary: false, resources: 1, influence: 6, mecatol: true }
        ]
    },
    {
        number: 61,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Ang', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.RED, legendary: false, resources: 2, influence: 0 }
        ],
    },
    {
        number: 22,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Tar’Mann', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.GREEN, legendary: false, resources: 1, influence: 1 }
        ],
    },
    {
        number: 43,
        back: SYSTEM_TILE_BACK.RED,
        anomaly: ANOMALY.SUPERNOVA,
        planets: []
    },
    {
        number: 64,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        wormhole: WORMHOLE.B,
        planets: [
            { name: 'Atlas', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 3, influence: 1 }
        ],
    },
    {
        number: 79,
        back: SYSTEM_TILE_BACK.RED,
        pok: true,
        anomaly: ANOMALY.ASTEROID_FIELD,
        wormhole: WORMHOLE.A,
        planets: []
    },
    {
        number: 19,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Wellon', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.YELLOW, legendary: false, resources: 1, influence: 2 }
        ],
    },
    {
        number: 34,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Centauri', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 1, influence: 3 },
            { name: 'Gral', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.BLUE, legendary: false, resources: 1, influence: 1 }
        ],
    },
    {
        number: 75,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Ashtroth', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 2, influence: 0 },
            { name: 'Abaddon', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 1, influence: 0 },
            { name: 'Loki', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 1, influence: 2 }
        ],
    },
    {
        number: 69,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Accoen', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 2, influence: 3 },
            { name: 'Jeol Ir', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 2, influence: 3 }
        ],
    },
    {
        number: 20,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Vefut II', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 2, influence: 2 }
        ],
    },
    {
        number: 59,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Archon Vail', trait: PLANET_TRAIT.RED, tech: TECH_COLOR.BLUE, legendary: false, resources: 1, influence: 3 }
        ],
    },
    {
        number: 73,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Cealdri', trait: PLANET_TRAIT.BLUE, tech: TECH_COLOR.YELLOW, legendary: false, resources: 0, influence: 2 },
            { name: 'Xanhact', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 0, influence: 1 }
        ],
    },
    {
        number: 66,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Hope’s End', trait: PLANET_TRAIT.RED, tech: null, legendary: true, resources: 3, influence: 0 }
        ],
    },
    {
        number: 70,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Kraag', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 2, influence: 1 },
            { name: 'Siig', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 0, influence: 2 }
        ],
    },
    {
        number: 37,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Arinam', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 1, influence: 2 },
            { name: 'Meer', trait: PLANET_TRAIT.RED, tech: TECH_COLOR.RED, legendary: false, resources: 0, influence: 4 }
        ],
    },
    {
        number: 27,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'New Albion', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.GREEN, legendary: false, resources: 1, influence: 1 },
            { name: 'Starpoint', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 3, influence: 1 }
        ],
    },
    {
        number: 42,
        back: SYSTEM_TILE_BACK.RED,
        anomaly: ANOMALY.NEBULA,
        planets: []
    },
    {
        number: 78,
        back: SYSTEM_TILE_BACK.RED,
        pok: true,
        planets: []
    },
    {
        number: 50,
        back: SYSTEM_TILE_BACK.RED,
        planets: []
    },
    {
        number: 49,
        back: SYSTEM_TILE_BACK.RED,
        planets: []
    },
    {
        number: 76,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Rigel I', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 0, influence: 1 },
            { name: 'Rigel II', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 1, influence: 2 },
            { name: 'Rigel III', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.GREEN, legendary: false, resources: 1, influence: 1 }
        ],
    },
    {
        number: 60,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Perimeter', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 2, influence: 1 }
        ],
    },
    {
        number: 24,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Mehar Xull', trait: PLANET_TRAIT.RED, tech: TECH_COLOR.RED, legendary: false, resources: 1, influence: 3 }
        ],
    },
    {
        number: 31,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Lazar', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.YELLOW, legendary: false, resources: 1, influence: 0 },
            { name: 'Sakulag', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 2, influence: 1 }
        ],
    },
    {
        number: 32,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Dal Bootha', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 0, influence: 2 },
            { name: 'Xxehan', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 1, influence: 1 }
        ],
    },
    {
        number: 36,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Arnor', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 2, influence: 1 },
            { name: 'Lor', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 1, influence: 2 }
        ],
    },
    {
        number: 71,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Alio Prima', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 1, influence: 1 },
            { name: 'Ba’kal', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 3, influence: 2 }
        ],
    },
    {
        number: 80,
        back: SYSTEM_TILE_BACK.RED,
        pok: true,
        anomaly: ANOMALY.SUPERNOVA,
        planets: []
    },
    {
        number: 38,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Abyz', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 3, influence: 0 },
            { name: 'Fria', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 2, influence: 0 }
        ],
    },
    {
        number: 74,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Vega Major', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 2, influence: 1 },
            { name: 'Vega Minor', trait: PLANET_TRAIT.BLUE, tech: TECH_COLOR.BLUE, legendary: false, resources: 1, influence: 2 }
        ],
    },
    {
        number: 63,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Vorhal', trait: PLANET_TRAIT.BLUE, tech: TECH_COLOR.GREEN, legendary: false, resources: 0, influence: 2 }
        ],
    },
    {
        number: 23,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Saudor', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 2, influence: 2 }
        ],
    },
    {
        number: 41,
        back: SYSTEM_TILE_BACK.RED,
        anomaly: ANOMALY.GRAV_RIFT,
        planets: []
    },
    {
        number: 72,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Lisis', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 2, influence: 2 },
            { name: 'Velnor', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.RED, legendary: false, resources: 2, influence: 1 }
        ],
    },
    {
        number: 29,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Qucen’n', trait: PLANET_TRAIT.GREEN, tech: null, legendary: false, resources: 1, influence: 2 },
            { name: 'Rarron', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 0, influence: 3 }
        ],
    },
    {
        number: 48,
        back: SYSTEM_TILE_BACK.RED,
        planets: []
    },
    {
        number: 28,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Tequ’ran', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 2, influence: 0 },
            { name: 'Torkan', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 0, influence: 3 }
        ],
    },
    {
        number: 47,
        back: SYSTEM_TILE_BACK.RED,
        planets: []
    },
    {
        number: 40,
        back: SYSTEM_TILE_BACK.RED,
        wormhole: WORMHOLE.B,
        planets: []
    },
    {
        number: 68,
        back: SYSTEM_TILE_BACK.RED,
        pok: true,
        anomaly: ANOMALY.NEBULA,
        planets: [
            { name: 'Everra', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 3, influence: 1 }
        ]
    },
    {
        number: 39,
        back: SYSTEM_TILE_BACK.RED,
        wormhole: WORMHOLE.A,
        planets: []
    },
    {
        number: 21,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Thibah', trait: PLANET_TRAIT.GREEN, tech: TECH_COLOR.BLUE, legendary: false, resources: 1, influence: 1 }
        ],
    },
    {
        number: 26,
        back: SYSTEM_TILE_BACK.BLUE,
        wormhole: WORMHOLE.A,
        planets: [
            { name: 'Lodor', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 3, influence: 1 }
        ],
    },
    {
        number: 44,
        back: SYSTEM_TILE_BACK.RED,
        anomaly: ANOMALY.ASTEROID_FIELD,
        planets: []
    },
    {
        number: 46,
        back: SYSTEM_TILE_BACK.RED,
        planets: []
    },
    {
        number: 65,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Primor', trait: PLANET_TRAIT.BLUE, tech: null, legendary: true, resources: 2, influence: 1 }
        ],
    },
    {
        number: 45,
        back: SYSTEM_TILE_BACK.RED,
        anomaly: ANOMALY.ASTEROID_FIELD,
        planets: []
    },
    {
        number: 25,
        back: SYSTEM_TILE_BACK.BLUE,
        wormhole: WORMHOLE.B,
        planets: [
            { name: 'Quann', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 2, influence: 1 }
        ],
    },
    {
        number: 77,
        back: SYSTEM_TILE_BACK.RED,
        pok: true,
        planets: []
    },
    {
        number: 35,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Bereg', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 3, influence: 1 },
            { name: 'Lirta IV', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 2, influence: 3 }
        ],
    },
    {
        number: 30,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Mellon', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 0, influence: 2 },
            { name: 'Zohbat', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 3, influence: 1 }
        ],
    },
    {
        number: 67,
        back: SYSTEM_TILE_BACK.RED,
        pok: true,
        anomaly: ANOMALY.GRAV_RIFT,
        planets: [
            { name: 'Cormund', trait: PLANET_TRAIT.RED, tech: null, legendary: false, resources: 2, influence: 0 }
        ]
    },
    {
        number: 33,
        back: SYSTEM_TILE_BACK.BLUE,
        planets: [
            { name: 'Corneeq', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 1, influence: 2 },
            { name: 'Resculon', trait: PLANET_TRAIT.BLUE, tech: null, legendary: false, resources: 2, influence: 0 }
        ],
    },
    {
        number: 62,
        back: SYSTEM_TILE_BACK.BLUE,
        pok: true,
        planets: [
            { name: 'Sem-Lore', trait: PLANET_TRAIT.BLUE, tech: TECH_COLOR.YELLOW, legendary: false, resources: 3, influence: 2 }
        ],
    },
    {
        number: 5,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.ARBOREC,
        planets: [
            { name: 'Nestphar', resources: 3, influence: 2 }
        ]
    },
    {
        number: 9900,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.ARGENT_FLIGHT,
        planets: [
            { name: 'Valk', resources: 2, influence: 0 },
            { name: 'Avar', resources: 1, influence: 1 },
            { name: 'Ylir', resources: 0, influence: 2 },
        ]
    },
    {
        number: 9901,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.BARONY_OF_LETNEV,
        planets: [
            { name: 'Arc Prime', resources: 4, influence: 0 },
            { name: 'Wren Terra', resources: 2, influence: 1 },
        ]
    },
    {
        number: 9902,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.CLAN_OF_SAAR,
        planets: [
            { name: 'Lisis II', resources: 1, influence: 0 },
            { name: 'Ragh', resources: 2, influence: 1 },
        ]
    },
    {
        number: 9903,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.EMBERS_OF_MUAAT,
        planets: [
            { name: 'Muaat', resources: 4, influence: 1 },
        ]
    },
    {
        number: 9904,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.EMIRATES_OF_HACAN,
        planets: [
            { name: 'Hercant', resources: 1, influence: 1 },
            { name: 'Arretze', resources: 2, influence: 0 },
            { name: 'Kamdorn', resources: 0, influence: 1 },
        ]
    },
    {
        number: 9905,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.EMPYREAN,
        planets: [
            { name: 'The Dark', resources: 3, influence: 4 },
        ]
    },
    {
        number: 9906,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.FEDERATION_OF_SOL,
        planets: [
            { name: 'Jord', resources: 4, influence: 2 },
        ]
    },
    {
        number: 9907,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.GHOSTS_OF_CREUSS,
        planets: [
            { name: 'Creuss', resources: 4, influence: 2 },
        ]
    },
    {
        number: 9908,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.L1Z1X_MINDNET,
        planets: [
            { name: '[0.0.0]', resources: 5, influence: 0 },
        ]
    },
    {
        number: 9909,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.MAHACT_GENE_SORCERERS,
        planets: [
            { name: 'Ixth', resources: 3, influence: 5 },
        ]
    },
    {
        number: 9910,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.MENTAK_COALITION,
        planets: [
            { name: 'Moll Primus', resources: 4, influence: 1 },
        ]
    },
    {
        number: 9911,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.NAALU_COLLECTIVE,
        planets: [
            { name: 'Druaa', resources: 3, influence: 1 },
            { name: 'Maaluuk', resources: 0, influence: 2 },
        ]
    },
    {
        number: 9912,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.NAAZ_ROKHA_ALLIANCE,
        planets: [
            { name: 'Naazir', resources: 2, influence: 1 },
            { name: 'Rokha', resources: 1, influence: 2 },
        ]
    },
    {
        number: 9913,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.NEKRO_VIRUS,
        planets: [
            { name: 'Mordai II', resources: 4, influence: 0 },
        ]
    },
    {
        number: 9914,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.NOMAD,
        planets: [
            { name: 'Arcturus', resources: 4, influence: 4 },
        ]
    },
    {
        number: 9915,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.SARDAKK_NORR,
        planets: [
            { name: 'Tren’Lak', resources: 1, influence: 0 },
            { name: 'Quinarra', resources: 3, influence: 1 },
        ]
    },
    {
        number: 9916,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.TITANS_OF_UL,
        planets: [
            { name: 'Elysium', resources: 4, influence: 1 },
        ]
    },
    {
        number: 9917,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.UNIVERSITIES_OF_JOL_NAR,
        planets: [
            { name: 'Jol', resources: 1, influence: 2 },
            { name: 'Nar', resources: 2, influence: 3 },
        ]
    },
    {
        number: 9918,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.VUILRAITH_CABAL,
        planets: [
            { name: 'Acheron', resources: 4, influence: 0 },
        
        ]},
    {
        number: 9919,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.WINNU,
        planets: [
            { name: 'Winnu', resources: 3, influence: 4 },
        ]
    },
    {
        number: 9920,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.XXCHA_KINGDOM,
        planets: [
            { name: 'Archon Ren', resources: 2, influence: 3 },
            { name: 'Archon Tau', resources: 1, influence: 1 },
        ]
    },
    {
        number: 9921,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.YIN_BROTHERHOOD,
        planets: [
            { name: 'Darien', resources: 4, influence: 4 },
        ]
    },
    {
        number: 9922,
        back: SYSTEM_TILE_BACK.HS,
        faction: FACTION.YSSARIL_TRIBES,
        planets: [
            { name: 'Retillion', resources: 2, influence: 3 },
            { name: 'Shalloq', resources: 1, influence: 2 },
        ]
    },
];

export default SYSTEMS;