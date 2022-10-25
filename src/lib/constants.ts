const URL = {
    ASSETS_BUCKET: 'https://s3-ap-southeast-2.amazonaws.com/com.basicallyfine.public-assets/'
};

const GAME_COLOURS = {
    WHITE: '#FFFFFF',
    WHITE_2: '#828282',
    BLUE: '#1B91FF',
    BLUE_2: '#00529C',
    GREEN: '#00BE4C',
    GREEN_2: '#006328',
    YELLOW: '#FFE600',
    YELLOW_2: '#837704',
    ORANGE: '#FF9922',
    ORANGE_2: '#835804',
    RED: '#FF4A31',
    RED_2: '#973C30',
    PINK: '#FF5FDC',
    PINK_2: '#AB009A',
    PURPLE: '#A107FF',
    PURPLE_2: '#6500B4',
};

enum FACTION {
    ARBOREC,
    ARGENT_FLIGHT,
    BARONY_OF_LETNEV,
    CLAN_OF_SAAR,
    EMBERS_OF_MUAAT,
    EMIRATES_OF_HACAN,
    EMPYREAN,
    FEDERATION_OF_SOL,
    GHOSTS_OF_CREUSS,
    L1Z1X_MINDNET,
    MAHACT_GENE_SORCERERS,
    MENTAK_COALITION,
    NAALU_COLLECTIVE,
    NAAZ_ROKHA_ALLIANCE,
    NEKRO_VIRUS,
    NOMAD,
    SARDAKK_NORR,
    TITANS_OF_UL,
    UNIVERSITIES_OF_JOL_NAR,
    VUILRAITH_CABAL,
    WINNU,
    XXCHA_KINGDOM,
    YIN_BROTHERHOOD,
    YSSARIL_TRIBES,
    COUNCIL_KELERES,
};

enum SYSTEM_TILE_BACK {
    BLUE = 'Blue-backed system',
    RED = 'Red-backed system',
    HS = 'Home system',
    SPECIAL = 'Special system',
};

enum TECH_COLOR {
    RED = 'Warfare',
    BLUE = 'Propulsion',
    GREEN = 'Biotic',
    YELLOW = 'Cybernetic'
};

enum PLANET_TRAIT {
    BLUE = 'Cultural',
    RED = 'Hazardous',
    GREEN = 'Industrial'
};

enum ANOMALY {
    SUPERNOVA = 'Supernova',
    ASTEROID_FIELD = 'Asteroid Field',
    NEBULA = 'Nebula',
    GRAV_RIFT = 'Gravity Rift'
};

enum WORMHOLE {
    A = 'α Wormhole',
    B = 'β Wormhole'
};

enum UNIT_NAME {
    CARRIER = 'Carrier',
    CRUISER = 'Cruiser',
    DESTROYER = 'Destroyer',
    DREADNOUGHT = 'Dreadnought',
    FIGHTER = 'Fighter',
    INFANTRY = 'Infantry',
    PDS = 'PDS',
    SPACE_DOCK = 'Space dock',
    WAR_SUN = 'War sun',
    FLAGSHIP = 'Flagship',
    MECH = 'Mech',
};

enum UNIT_TYPE {
    SHIP,
    GROUND_FORCE,
    STRUCTURE,
};

export {
    URL,
    GAME_COLOURS,
    SYSTEM_TILE_BACK,
    TECH_COLOR,
    FACTION,
    PLANET_TRAIT,
    ANOMALY,
    WORMHOLE,
    UNIT_NAME,
    UNIT_TYPE,
};
