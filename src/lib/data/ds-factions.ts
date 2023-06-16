import { FACTION } from "../constants";

import type { System } from "./systems";

export type Faction = {
  key: FACTION;
  name: string;
  code: string;
  pok?: boolean;
  image_name: string;
  complexity?: number;
  hs?: System;
};

const DS_FACTIONS: Faction[] = [
  {
    key: FACTION.ILYXUM,
    name: "Augurs of Ilyxum",
    code: "0",
    image_name: "ILYXUM",
  },
  {
    key: FACTION.CELDAURI,
    name: "Celdauri Trade Confederation",
    code: "1",
    image_name: "CELDAURI",
  },
  {
    key: FACTION.DIH_MOHN,
    name: "Dih-Mohn Flotilla",
    code: "2",
    image_name: "DIH_MOHN",
  },
  {
    key: FACTION.FLORZEN,
    name: "Florzen Profiteers",
    code: "3",
    image_name: "FLORZEN",
  },
  {
    key: FACTION.FREE_SYSTEMS,
    name: "Free Systems Compact",
    code: "4",
    image_name: "FREE_SYSTEMS",
  },
  {
    key: FACTION.GHEMINA,
    name: "Ghemina Raiders",
    code: "5",
    image_name: "GHEMINA",
  },
  {
    key: FACTION.MORTHEUS,
    name: "Glimmer of Mortheus",
    code: "6",
    image_name: "MORTHEUS",
  },
  {
    key: FACTION.KOLLECC,
    name: "Kollecc Society",
    code: "7",
    image_name: "KOLLECC",
  },
  {
    key: FACTION.KORTALI,
    name: "Kortali Tribunal",
    code: "8",
    image_name: "KORTALI",
  },
  {
    key: FACTION.LTOKK_KHRASK,
    name: "L’Tokk Khrask",
    code: "9",
    image_name: "LTOKK_KHRASK",
  },
  {
    key: FACTION.LI_ZHO,
    name: "Li-Zho Dynasty",
    code: "A",
    image_name: "LI_ZHO",
  },
  {
    key: FACTION.MIRVEDA,
    name: "Mirveda Protectorate",
    code: "B",
    image_name: "MIRVEDA",
  },
  {
    key: FACTION.MYKO_MENTORI,
    name: "Myko-Mentori",
    code: "C",
    image_name: "MYKO_MENTORI",
  },
  {
    key: FACTION.NIVYN,
    name: "Nivyn Star Kings",
    code: "D",
    image_name: "NIVYN",
  },
  {
    key: FACTION.OLRADIN,
    name: "Olradin League",
    code: "E",
    image_name: "OLRADIN",
  },
  {
    key: FACTION.ROH_D_HNA,
    name: "Roh D’hna Mechatronics",
    code: "F",
    image_name: "ROH_D_HNA",
  },
  {
    key: FACTION.CYMIAE,
    name: "Savages of Cymiae",
    code: "G",
    image_name: "CYMIAE",
  },
  {
    key: FACTION.AXIS,
    name: "Shipwrights of Axis",
    code: "H",
    image_name: "AXIS",
  },
  {
    key: FACTION.TNELIS,
    name: "Tnelis Syndicate",
    code: "I",
    image_name: "TNELIS",
  },
  {
    key: FACTION.VADEN,
    name: "Vaden Banking Clans",
    code: "J",
    image_name: "VADEN",
  },
  {
    key: FACTION.VAYLERIAN,
    name: "Vaylerian Scourge",
    code: "K",
    image_name: "VAYLERIAN",
  },
  {
    key: FACTION.VELDYR,
    name: "Veldyr Sovereignty",
    code: "L",
    image_name: "VELDYR",
  },
  {
    key: FACTION.RHODUN,
    name: "Zealots of Rhodun",
    code: "M",
    image_name: "RHODUN",
  },
  {
    key: FACTION.ZELIAN,
    name: "Zelian Purifier",
    code: "N",
    image_name: "ZELIAN",
  },
  {
    key: FACTION.BENTOR,
    name: "Bentor Conglomerate",
    code: "O",
    image_name: "BENTOR",
  },
  {
    key: FACTION.KJALENGARD,
    name: "Berserkers of Kjalengard",
    code: "P",
    image_name: "KJALENGARD",
  },
  {
    key: FACTION.CHEIRAN,
    name: "Cheiran Hordes",
    code: "Q",
    image_name: "CHEIRAN",
  },
  { key: FACTION.EDYN, name: "Edyn Mandate", code: "R", image_name: "EDYN" },
  {
    key: FACTION.GHOTI,
    name: "Ghoti Wayfarers",
    code: "S",
    image_name: "GHOTI",
  },
  {
    key: FACTION.GLEDGE,
    name: "Gledge Union",
    code: "T",
    image_name: "GLEDGE",
  },
  { key: FACTION.KYRO, name: "Kyro Sodality", code: "U", image_name: "KYRO" },
  {
    key: FACTION.LANEFIR,
    name: "Lanefir Remnants",
    code: "V",
    image_name: "LANEFIR",
  },
  {
    key: FACTION.NOKAR,
    name: "Nokar Sellships",
    code: "W",
    image_name: "NOKAR",
  },
  {
    key: FACTION.KOLUME,
    name: "The Monks of Kolume",
    code: "X",
    image_name: "KOLUME",
  },
];

export default DS_FACTIONS;
