import {
    FACTION,
    SYSTEM_TILE_BACK,
} from '../constants';

import type { System } from './systems';

export type Faction = {
    key: FACTION;
    name: string;
    code: string;
    pok?: boolean;
    image_name: string;
    complexity?: number;
};

const FACTIONS: Faction[] = [
    {
        key: FACTION.ARBOREC,
        name: 'The Arborec',
        code: '0',
        image_name: 'arborec',
        complexity: 3,
    },
    {
        key: FACTION.ARGENT_FLIGHT,
        name: 'The Argent Flight',
        code: '1',
        pok: true,
        image_name: 'argent',
        complexity: 1,
    },
    {
        key: FACTION.BARONY_OF_LETNEV,
        name: 'The Barony of Letnev',
        code: '2',
        image_name: 'barony',
        complexity: 1,
    },
    {
        key: FACTION.CLAN_OF_SAAR,
        name: 'The Clan of Saar',
        code: '3',
        image_name: 'saar',
        complexity: 2,
    },
    {
        key: FACTION.EMBERS_OF_MUAAT,
        name: 'The Embers of Muaat',
        code: '4',
        image_name: 'muaat',
        complexity: 3,
    },
    {
        key: FACTION.EMIRATES_OF_HACAN,
        name: 'The Emirates of Hacan',
        code: '5',
        image_name: 'hacan',
        complexity: 1,
    },
    {
        key: FACTION.EMPYREAN,
        name: 'The Empyrean',
        code: '6',
        pok: true,
        image_name: 'empyrean',
        complexity: 1,
    },
    {
        key: FACTION.FEDERATION_OF_SOL,
        name: 'The Federation of Sol',
        code: '7',
        image_name: 'sol',
        complexity: 1,
    },
    {
        key: FACTION.GHOSTS_OF_CREUSS,
        name: 'The Ghosts of Creuss',
        code: '8',
        image_name: 'ghosts',
        complexity: 2,
    },
    {
        key: FACTION.L1Z1X_MINDNET,
        name: 'The L1Z1X Mindnet',
        code: '9',
        image_name: 'l1',
        complexity: 1,
    },
    {
        key: FACTION.MAHACT_GENE_SORCERERS,
        name: 'The Mahact Gene-Sorcerers',
        code: 'A',
        pok: true,
        image_name: 'mahact',
        complexity: 3,
    },
    {
        key: FACTION.MENTAK_COALITION,
        name: 'The Mentak Coalition',
        code: 'B',
        image_name: 'mentak',
        complexity: 3,
    },
    {
        key: FACTION.NAALU_COLLECTIVE,
        name: 'The Naalu Collective',
        code: 'C',
        image_name: 'naalu',
        complexity: 2,
    },
    {
        key: FACTION.NAAZ_ROKHA_ALLIANCE,
        name: 'The Naaz-Rokha Alliance',
        code: 'D',
        pok: true,
        image_name: 'nra',
        complexity: 1,
    },
    {
        key: FACTION.NEKRO_VIRUS,
        name: 'The Nekro Virus',
        code: 'E',
        image_name: 'nekro',
        complexity: 3,
    },
    {
        key: FACTION.NOMAD,
        name: 'The Nomad',
        code: 'F',
        pok: true,
        image_name: 'nomad',
        complexity: 1,
    },
    {
        key: FACTION.SARDAKK_NORR,
        name: 'Sardakk N’orr',
        code: 'G',
        image_name: 'sardakk',
        complexity: 2,
    },
    {
        key: FACTION.TITANS_OF_UL,
        name: 'The Titans of Ul',
        code: 'H',
        pok: true,
        image_name: 'titans',
        complexity: 2,
    },
    {
        key: FACTION.UNIVERSITIES_OF_JOL_NAR,
        name: 'The Universities of Jol-Nar',
        code: 'I',
        image_name: 'jol-nar',
        complexity: 1,
    },
    {
        key: FACTION.VUILRAITH_CABAL,
        name: 'The Vuil’Raith Cabal',
        code: 'J',
        pok: true,
        image_name: 'cabal',
        complexity: 3,
    },
    {
        key: FACTION.WINNU,
        name: 'The Winnu',
        code: 'K',
        image_name: 'winnu',
        complexity: 2,
    },
    {
        key: FACTION.XXCHA_KINGDOM,
        name: 'The Xxcha Kingdom',
        code: 'L',
        image_name: 'xxcha',
        complexity: 1,
    },
    {
        key: FACTION.YIN_BROTHERHOOD,
        name: 'The Yin Brotherhood',
        code: 'M',
        image_name: 'yin',
        complexity: 1,
    },
    {
        key: FACTION.YSSARIL_TRIBES,
        name: 'The Yssaril Tribes',
        code: 'N',
        image_name: 'yssaril',
        complexity: 1,
    },
    {
        key: FACTION.COUNCIL_KELERES,
        name: 'The Council Keleres',
        code: 'O',
        pok: true,
        image_name: 'keleres',
        complexity: 2,
    },
];

export default FACTIONS;