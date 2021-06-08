const GAME_COLOURS = {
    WHITE: '#FFFFFF',
    WHITE_2: '#828282',
    BLUE: '#1B91FF',
    BLUE_2: '#00529C',
    GREEN: '#00BE4C',
    GREEN_2: '#006328',
    YELLOW: '#FFE600',
    YELLOW_2: '#837704',
    ORANGE: '#FFA800',
    ORANGE_2: '#835804',
    RED: '#FF4A31',
    RED_2: '#973C30',
    PINK: '#FF5FDC',
    PINK_2: '#AB009A',
    PURPLE: '#A107FF',
    PURPLE_2: '#6500B4',
};

const FACTIONS = [
    // BASE GAME
    { code: 'AR', name: 'The Arborec', },
    { code: 'BL', name: 'The Barony of Letnev', },
    { code: 'CS', name: 'The Clan of Saar', },
    { code: 'EM', name: 'The Embers of Muaat', },
    { code: 'EH', name: 'The Emirates of Hacan', },
    { code: 'EP', name: 'The Empyrean', },
    { code: 'FS', name: 'The Federation of Sol', },
    { code: 'GC', name: 'The Ghosts of Creuss', },
    { code: 'LM', name: 'The L1Z1X Mindnet', },
    { code: 'MC', name: 'The Mentak Coalition', },
    { code: 'NC', name: 'The Naalu Collective', },
    { code: 'NV', name: 'The Nekro Virus', },
    { code: 'SN', name: 'Sardakk N’orr', },
    { code: 'UJ', name: 'The Universities of Jol-Nar', },
    { code: 'WN', name: 'The Winnu', },
    { code: 'XK', name: 'The Xxcha Kingdom', },
    { code: 'YB', name: 'The Yin Brotherhood', },
    { code: 'YT', name: 'The Yssaril Tribes', },
    // POK
    { code: 'AF', name: 'The Argent Flight', pok: TRUE },
    { code: 'MG', name: 'The Mahact Gene-Sorcerers', pok: TRUE },
    { code: 'NR', name: 'The Naaz-Rokha Alliance', pok: TRUE },
    { code: 'NM', name: 'The Nomad', pok: TRUE },
    { code: 'TU', name: 'The Titans of Ul', pok: TRUE },
    { code: 'VR', name: 'The Vuil’Raith Cabal', pok: TRUE },
];

export {
    GAME_COLOURS,
    FACTIONS,
}