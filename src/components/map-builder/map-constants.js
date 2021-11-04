import { URL } from '../../lib/constants';

const MAP_PLACES = {
    MAP_00: 'MAP_00',
    MAP_01: 'MAP_01',
    MAP_02: 'MAP_02',
    MAP_03: 'MAP_03',
    MAP_04: 'MAP_04',
    MAP_05: 'MAP_05',
    MAP_06: 'MAP_06',
    MAP_07: 'MAP_07',
    MAP_08: 'MAP_08',
    MAP_09: 'MAP_09',
    MAP_10: 'MAP_10',
    MAP_11: 'MAP_11',
    MAP_12: 'MAP_12',
    MAP_13: 'MAP_13',
    MAP_14: 'MAP_14',
    MAP_15: 'MAP_15',
    MAP_16: 'MAP_16',
    MAP_17: 'MAP_17',
    MAP_18: 'MAP_18',
    MAP_19: 'MAP_19',
    MAP_20: 'MAP_20',
    MAP_21: 'MAP_21',
    MAP_22: 'MAP_22',
    MAP_23: 'MAP_23',
    MAP_24: 'MAP_24',
    MAP_25: 'MAP_25',
    MAP_26: 'MAP_26',
    MAP_27: 'MAP_27',
    MAP_28: 'MAP_28',
    MAP_29: 'MAP_29',
    MAP_30: 'MAP_30',
    MAP_31: 'MAP_31',
    MAP_32: 'MAP_32',
    MAP_33: 'MAP_33',
    MAP_34: 'MAP_34',
    MAP_35: 'MAP_35',
    MAP_36: 'MAP_36'
};

const MAP_PLACE_POSITION = {
    MAP_00: { left: '50.0%', top: '50.0%', zIndex: 199 },
    MAP_01: { left: '50.0%', top: '35.7%', zIndex: 198 },
    MAP_02: { left: '63.6%', top: '42.9%', zIndex: 197 },
    MAP_03: { left: '63.6%', top: '57.1%', zIndex: 196 },
    MAP_04: { left: '50.0%', top: '64.3%', zIndex: 195 },
    MAP_05: { left: '36.4%', top: '57.1%', zIndex: 194 },
    MAP_06: { left: '36.4%', top: '42.9%', zIndex: 193 },
    MAP_07: { left: '50.0%', top: '21.4%', zIndex: 192 },
    MAP_08: { left: '63.6%', top: '28.6%', zIndex: 191 },
    MAP_09: { left: '77.3%', top: '35.7%', zIndex: 190 },
    MAP_10: { left: '77.3%', top: '50.0%', zIndex: 189 },
    MAP_11: { left: '77.3%', top: '64.3%', zIndex: 188 },
    MAP_12: { left: '63.6%', top: '71.4%', zIndex: 187 },
    MAP_13: { left: '50.0%', top: '78.6%', zIndex: 186 },
    MAP_14: { left: '36.4%', top: '71.4%', zIndex: 185 },
    MAP_15: { left: '22.7%', top: '64.3%', zIndex: 184 },
    MAP_16: { left: '22.7%', top: '50.0%', zIndex: 183 },
    MAP_17: { left: '22.7%', top: '35.7%', zIndex: 182 },
    MAP_18: { left: '36.4%', top: '28.6%', zIndex: 181 },
    MAP_19: { left: '50.0%', top: '7.1%', zIndex: 180 },
    MAP_20: { left: '63.6%', top: '14.3%', zIndex: 179 },
    MAP_21: { left: '77.3%', top: '21.4%', zIndex: 178 },
    MAP_22: { left: '90.9%', top: '28.6%', zIndex: 177 },
    MAP_23: { left: '90.9%', top: '42.9%', zIndex: 176 },
    MAP_24: { left: '90.9%', top: '57.1%', zIndex: 175 },
    MAP_25: { left: '90.9%', top: '71.4%', zIndex: 174 },
    MAP_26: { left: '77.3%', top: '78.6%', zIndex: 173 },
    MAP_27: { left: '63.6%', top: '85.7%', zIndex: 172 },
    MAP_28: { left: '50.0%', top: '92.9%', zIndex: 171 },
    MAP_29: { left: '36.4%', top: '85.7%', zIndex: 170 },
    MAP_30: { left: '22.7%', top: '78.6%', zIndex: 169 },
    MAP_31: { left: '9.1%', top: '71.4%', zIndex: 168 },
    MAP_32: { left: '9.1%', top: '57.1%', zIndex: 167 },
    MAP_33: { left: '9.1%', top: '42.9%', zIndex: 166 },
    MAP_34: { left: '9.1%', top: '28.6%', zIndex: 165 },
    MAP_35: { left: '22.7%', top: '21.4%', zIndex: 164 },
    MAP_36: { left: '36.4%', top: '14.3%', zIndex: 163 },
};

const SYSTEM_PNG_URL = `${URL.ASSETS_BUCKET}ti4/map/systems/png/`;

const MAP_OPTION = {
    THREE_PLAYER: 'P3',
    FOUR_PLAYER: 'P4',
    FIVE_PLAYER_HYPERLANES: 'P5H',
    SIX_PLAYER: 'P6',
};

const MAP_CONFIG = {
    [MAP_OPTION.THREE_PLAYER]: {
        name: 'Three player',
        systems: {
            blue: 18,
            red: 6,
        },
        players: [
            {
                label: 'A',
                position: {
                    hs: MAP_PLACES.MAP_34,
                    adjacent: [MAP_PLACES.MAP_35, MAP_PLACES.MAP_17, MAP_PLACES.MAP_33],
                    slice: [MAP_PLACES.MAP_35, MAP_PLACES.MAP_17, MAP_PLACES.MAP_33, MAP_PLACES.MAP_18, MAP_PLACES.MAP_06, MAP_PLACES.MAP_16],
                    equidistant: [MAP_PLACES.MAP_07, MAP_PLACES.MAP_01, MAP_PLACES.MAP_05, MAP_PLACES.MAP_15]
                }
            },
            {
                label: 'B',
                position: {
                    hs: MAP_PLACES.MAP_22,
                    adjacent: [MAP_PLACES.MAP_21, MAP_PLACES.MAP_09, MAP_PLACES.MAP_23],
                    slice: [MAP_PLACES.MAP_21, MAP_PLACES.MAP_09, MAP_PLACES.MAP_23, MAP_PLACES.MAP_08, MAP_PLACES.MAP_02, MAP_PLACES.MAP_10],
                    equidistant: [MAP_PLACES.MAP_07, MAP_PLACES.MAP_01, MAP_PLACES.MAP_03, MAP_PLACES.MAP_11]
                }
            },
            {
                label: 'C',
                position: {
                    hs: MAP_PLACES.MAP_28,
                    adjacent: [MAP_PLACES.MAP_29, MAP_PLACES.MAP_13, MAP_PLACES.MAP_27],
                    slice: [MAP_PLACES.MAP_29, MAP_PLACES.MAP_13, MAP_PLACES.MAP_27, MAP_PLACES.MAP_14, MAP_PLACES.MAP_04, MAP_PLACES.MAP_12],
                    equidistant: [MAP_PLACES.MAP_05, MAP_PLACES.MAP_15, MAP_PLACES.MAP_03, MAP_PLACES.MAP_11]
                }
            },
        ],
    },
    [MAP_OPTION.FOUR_PLAYER]: {
        name: 'Four player',
        systems: {
            blue: 20,
            red: 12,
        },
        players: [
            {
                label: 'A',
                position: {
                    hs: MAP_PLACES.MAP_36,
                    adjacent: [MAP_PLACES.MAP_35, MAP_PLACES.MAP_18, MAP_PLACES.MAP_07, MAP_PLACES.MAP_19],
                    slice: [MAP_PLACES.MAP_35, MAP_PLACES.MAP_18, MAP_PLACES.MAP_07, MAP_PLACES.MAP_19, MAP_PLACES.MAP_20, MAP_PLACES.MAP_01],
                    equidistant: [MAP_PLACES.MAP_08, MAP_PLACES.MAP_34, MAP_PLACES.MAP_17, MAP_PLACES.MAP_06]
                }
            },
            {
                label: 'B',
                position: {
                    hs: MAP_PLACES.MAP_23,
                    adjacent: [MAP_PLACES.MAP_22, MAP_PLACES.MAP_09, MAP_PLACES.MAP_10, MAP_PLACES.MAP_24],
                    slice: [MAP_PLACES.MAP_22, MAP_PLACES.MAP_09, MAP_PLACES.MAP_10, MAP_PLACES.MAP_24, MAP_PLACES.MAP_21, MAP_PLACES.MAP_02],
                    equidistant: [MAP_PLACES.MAP_08, MAP_PLACES.MAP_03, MAP_PLACES.MAP_11, MAP_PLACES.MAP_25]
                }
            },
            {
                label: 'C',
                position: {
                    hs: MAP_PLACES.MAP_27,
                    adjacent: [MAP_PLACES.MAP_28, MAP_PLACES.MAP_13, MAP_PLACES.MAP_12, MAP_PLACES.MAP_26],
                    slice: [MAP_PLACES.MAP_28, MAP_PLACES.MAP_13, MAP_PLACES.MAP_12, MAP_PLACES.MAP_26, MAP_PLACES.MAP_29, MAP_PLACES.MAP_04],
                    equidistant: [MAP_PLACES.MAP_14, MAP_PLACES.MAP_03, MAP_PLACES.MAP_11, MAP_PLACES.MAP_25]
                }
            },
            {
                label: 'D',
                position: {
                    hs: MAP_PLACES.MAP_32,
                    adjacent: [MAP_PLACES.MAP_33, MAP_PLACES.MAP_16, MAP_PLACES.MAP_15, MAP_PLACES.MAP_31],
                    slice: [MAP_PLACES.MAP_33, MAP_PLACES.MAP_16, MAP_PLACES.MAP_15, MAP_PLACES.MAP_31, MAP_PLACES.MAP_05, MAP_PLACES.MAP_30],
                    equidistant: [MAP_PLACES.MAP_14, MAP_PLACES.MAP_34, MAP_PLACES.MAP_17, MAP_PLACES.MAP_06]
                }
            },
        ]
    },
    [MAP_OPTION.FIVE_PLAYER_HYPERLANES]: {
        name: 'Five player (Hyperlanes)',
        systems: {
            blue: 15,
            red: 10,
        },
        players: [
            {
                label: 'A',
                position: {
                    hs: MAP_PLACES.MAP_34,
                    adjacent: [MAP_PLACES.MAP_35,MAP_PLACES.MAP_17,MAP_PLACES.MAP_33],
                    slice: [MAP_PLACES.MAP_35,MAP_PLACES.MAP_17,MAP_PLACES.MAP_33,MAP_PLACES.MAP_06],
                    equidistant: [MAP_PLACES.MAP_18,MAP_PLACES.MAP_16]
                }
            },
            {
                label: 'B',
                position: {
                    hs: MAP_PLACES.MAP_19,
                    adjacent: [MAP_PLACES.MAP_36,MAP_PLACES.MAP_07,MAP_PLACES.MAP_20],
                    slice: [MAP_PLACES.MAP_36,MAP_PLACES.MAP_07,MAP_PLACES.MAP_20,MAP_PLACES.MAP_01],
                    equidistant: [MAP_PLACES.MAP_18,MAP_PLACES.MAP_08]
                }
            },
            {
                label: 'C',
                position: {
                    hs: MAP_PLACES.MAP_22,
                    adjacent: [MAP_PLACES.MAP_21,MAP_PLACES.MAP_09,MAP_PLACES.MAP_23],
                    slice: [MAP_PLACES.MAP_21,MAP_PLACES.MAP_09,MAP_PLACES.MAP_23,MAP_PLACES.MAP_02],
                    equidistant: [MAP_PLACES.MAP_08,MAP_PLACES.MAP_10]
                }
            },
            {
                label: 'D',
                position: {
                    hs: MAP_PLACES.MAP_25,
                    adjacent: [MAP_PLACES.MAP_24,MAP_PLACES.MAP_11,MAP_PLACES.MAP_26],
                    slice: [MAP_PLACES.MAP_24,MAP_PLACES.MAP_11,MAP_PLACES.MAP_26,MAP_PLACES.MAP_03],
                    equidistant: [MAP_PLACES.MAP_10,MAP_PLACES.MAP_13]
                }
            },
            {
                label: 'E',
                position: {
                    hs: MAP_PLACES.MAP_31,
                    adjacent: [MAP_PLACES.MAP_32,MAP_PLACES.MAP_15,MAP_PLACES.MAP_30],
                    slice: [MAP_PLACES.MAP_32,MAP_PLACES.MAP_15,MAP_PLACES.MAP_30,MAP_PLACES.MAP_05],
                    equidistant: [MAP_PLACES.MAP_13,MAP_PLACES.MAP_16]
                }
            },
        ],
        hyperlanes: [MAP_PLACES.MAP_04,MAP_PLACES.MAP_12,MAP_PLACES.MAP_27,MAP_PLACES.MAP_28,MAP_PLACES.MAP_29,MAP_PLACES.MAP_14]
    },
    [MAP_OPTION.SIX_PLAYER]: {
        name: 'Six player',
        systems: {
            blue: 18,
            red: 12,
        },
        players: [
            {
                label: 'A',
                position: {
                    hs: MAP_PLACES.MAP_34,
                    adjacent: [MAP_PLACES.MAP_35,MAP_PLACES.MAP_17,MAP_PLACES.MAP_33],
                    slice: [MAP_PLACES.MAP_35,MAP_PLACES.MAP_17,MAP_PLACES.MAP_33,MAP_PLACES.MAP_06],
                    equidistant: [MAP_PLACES.MAP_18,MAP_PLACES.MAP_16]
                }
            },
            {
                label: 'B',
                position: {
                    hs: MAP_PLACES.MAP_19,
                    adjacent: [MAP_PLACES.MAP_36,MAP_PLACES.MAP_07,MAP_PLACES.MAP_20],
                    slice: [MAP_PLACES.MAP_36,MAP_PLACES.MAP_07,MAP_PLACES.MAP_20,MAP_PLACES.MAP_01],
                    equidistant: [MAP_PLACES.MAP_18,MAP_PLACES.MAP_08]
                }
            },
            {
                label: 'C',
                position: {
                    hs: MAP_PLACES.MAP_22,
                    adjacent: [MAP_PLACES.MAP_21,MAP_PLACES.MAP_09,MAP_PLACES.MAP_23],
                    slice: [MAP_PLACES.MAP_21,MAP_PLACES.MAP_09,MAP_PLACES.MAP_23,MAP_PLACES.MAP_02],
                    equidistant: [MAP_PLACES.MAP_08,MAP_PLACES.MAP_10]
                }
            },
            {
                label: 'D',
                position: {
                    hs: MAP_PLACES.MAP_25,
                    adjacent: [MAP_PLACES.MAP_24,MAP_PLACES.MAP_11,MAP_PLACES.MAP_26],
                    slice: [MAP_PLACES.MAP_24,MAP_PLACES.MAP_11,MAP_PLACES.MAP_26,MAP_PLACES.MAP_03],
                    equidistant: [MAP_PLACES.MAP_10,MAP_PLACES.MAP_12]
                }
            },
            {
                label: 'E',
                position: {
                    hs: MAP_PLACES.MAP_28,
                    adjacent: [MAP_PLACES.MAP_29,MAP_PLACES.MAP_13,MAP_PLACES.MAP_27],
                    slice: [MAP_PLACES.MAP_29,MAP_PLACES.MAP_13,MAP_PLACES.MAP_27,MAP_PLACES.MAP_04],
                    equidistant: [MAP_PLACES.MAP_12,MAP_PLACES.MAP_14]
                }
            },
            {
                label: 'F',
                position: {
                    hs: MAP_PLACES.MAP_31,
                    adjacent: [MAP_PLACES.MAP_32,MAP_PLACES.MAP_15,MAP_PLACES.MAP_30],
                    slice: [MAP_PLACES.MAP_32,MAP_PLACES.MAP_15,MAP_PLACES.MAP_30,MAP_PLACES.MAP_05],
                    equidistant: [MAP_PLACES.MAP_14,MAP_PLACES.MAP_16]
                }
            },
        ]
    }
};

const TILE_DISPLAY_TYPE = {
    TEXT: 'text',
    IMAGE: 'image',
    SVG: 'svg',
};

export {
    MAP_PLACES,
    MAP_PLACE_POSITION,
    SYSTEM_PNG_URL,
    MAP_OPTION,
    MAP_CONFIG,
    TILE_DISPLAY_TYPE,
}
