import { TECH_COLOR, FACTION } from "../constants";

export type Tech = {
  name: string;
  text: string;
  req: TECH_COLOR[];
  type: TECH_COLOR;
  faction?: FACTION;
}

const TECH: Tech[] = [
  {
    name: "Antimass Deflectors",
    text: "Your ships can move into and through asteroid fields\nWhen other players’ units use SPACE CANNON against your units, apply -1 to the result of each die roll",
    req: [],
    type: TECH_COLOR.BLUE,
  },
  {
    name: "Gravity Drive",
    text: "After you activate a system, apply +1 to the move value of 1 of your ships during this tactical action",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
  },
  {
    name: "Fleet Logistics",
    text: "During each of your turns of the action phase, you may perform 2 actions instead of 1",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
  },
  {
    name: "Light/Wave Deflector",
    text: "Your ships can move through systems that contain other player’s ships",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
  },
  {
    name: "Chaos Mapping",
    text: "Other players cannot activate asteroid fields that contain 1 or more of your ships.\nAt the start of your turn during the action phase, you may produce 1 unit in a system that contains at least 1 of your units that has Production.",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
    faction: FACTION.CLAN_OF_SAAR,
  },
  // {
  //   name: "Wormhole Generator",
  //   text: "At the start of the status phase, place or move a Creuss wormhole token into either a system that contains a planet you control or a non-home system that does not contain another player's ships.",
  //   req: [TECH_COLOR.BLUE],
  //   type: TECH_COLOR.BLUE,
  // },
  {
    name: "Wormhole Generator Ω",
    text: "ACTION: Exhaust this card to place or move a Creuss wormhole token into either a system that contains a planet you control or a non-home system that does not contain another player's ships",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
    faction: FACTION.GHOSTS_OF_CREUSS,
  },
  {
    name: "Spacial Conduit Cylinder",
    text: "You may exhaust this card after you activate a system that contains 1 or more of your units; that system is adjacent to all other systems that contain 1 or more of your units during this activation.",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
    faction: FACTION.UNIVERSITIES_OF_JOL_NAR,
  },
  {
    name: "Lazax Gate Folding",
    text: "During your tactical actions, if you do not control Mecatol Rex, treat its systems as if it has both an α and β wormhole. ACTION: If you control Mecatol Rex, exhaust this card to place 1 infantry from your reinforcements on Mecatol Rex",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
    faction: FACTION.WINNU,
  },
  {
    name: "Dark Energy Tap",
    text: "After you perform a tactical action in a system that contains a frontier token, if you have 1 or more ships in that system, explore that token\nYour ships can retreat into adjacent systems that do not contain other players' units, even if you do not have units or control planets in that system.",
    req: [],
    type: TECH_COLOR.BLUE,
  },
  {
    name: "Sling Relay",
    text: "ACTION: Exhaust this card to produce 1 ship in any system that contains one of your space docks",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
  },
  {
    name: "Aetherstream",
    text: "After you or one of your neighbors activates a system that is adjacent to an anomaly, you may apply +1 to the move value of all of that player's ships during this tactical action",
    req: [TECH_COLOR.BLUE],
    type: TECH_COLOR.BLUE,
    faction: FACTION.EMPYREAN,
  },
  {
    name: "Neural Motivator",
    text: "During the status phase, draw 2 action cards instead of 1.",
    req: [],
    type: TECH_COLOR.GREEN,
  },
  {
    name: "Dacxive Animators",
    text: "After you win a ground combat, you may place 1 infantry from your reinforcements on that planet",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
  },
  {
    name: "Hyper Metabolism",
    text: "During the status phase, gain 3 command tokens instead of 2",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
  },
  // {
  //   name: "X-89 Bacterial Weapon",
  //   text: "ACTION: Exhaust this card and choose 1 planet in a system that contains 1 or more of your ships that have BOMBARDMENT; destroy all infantry on that planet",
  //   req: [TECH_COLOR.GREEN],
  //   type: TECH_COLOR.GREEN,
  // },
  {
    name: "X-89 Bacterial Weapon Ω",
    text: "After 1 or more of your units use BOMBARDMENT against a planet, if at least 1 of your opponent's infantry was destroyed, you may destroy all of your opponent's infantry on that planet.",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
  },
  {
    name: "Bioplasmosis",
    text: "At the end of the status phase, you may remove any number of infantry from planets you control and place them on 1 or more planets you control in the same or adjacent systems.",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.ARBOREC
  },
  {
    name: "Production Biomes",
    text: "ACTION: Exhaust this card and spend 1 token from your strategy pool to gain 4 trade goods and choose 1 other player; that player gains 2 trade goods.",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.EMIRATES_OF_HACAN
  },
  {
    name: "Neuroglaive",
    text: "After another player activates a system that contains 1 or more of your ships, that player removes 1 token from their fleet pool and returns it to their reinforcements.",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.NAALU_COLLECTIVE
  },
  {
    name: "Instinct Training",
    text: "You may exhaust this card and spend 1 token from your strategy pool when another player plays an action card; cancel that action card.",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.XXCHA_KINGDOM
  },
  // {
  //   name: "Yin Spinner",
  //   text: "After 1 or more of your units use Production, place 1 infantry from your reinforcements on a planet you control in that system.",
  //   req: [TECH_COLOR.GREEN],
  //   type: TECH_COLOR.GREEN,
  // },
  {
    name: "Yin Spinner Ω",
    text: "After you produce units, place up to 2 infantry from your reinforcements on any planet you control or in any space area that contains 1 or more of your ships",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.YIN_BROTHERHOOD
  },
  {
    name: "Transparasteel Plating",
    text: "During your turn of the action phase, players that have passed cannot play action cards.",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.YSSARIL_TRIBES
  },
  {
    name: "Mageon Implants",
    text: "ACTION: Exhaust this card to look at another player's hand of action cards.  Choose 1 of those cards and add it to your hand.",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.YSSARIL_TRIBES
  },
  {
    name: "Psychoarchaeology",
    text: "You can use technology specialties on planets you control without exhausting them, even if those planets are exhausted\nDuring the Action Phase, you can exhaust planets you control that have technology specialties to gain 1 Trade Good",
    req: [],
    type: TECH_COLOR.GREEN,
  },
  {
    name: "Bio-Stims",
    text: "You may exhaust this card at the end of your turn to ready 1 of your planets that has a technology specialty or 1 of your other technologies",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
  },
  {
    name: "Voidwatch",
    text: "After a player moves ships into a system that contains 1 or more of your units, they must give you 1 promissory note from their hand, if able",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.EMPYREAN
  },
  {
    name: "Genetic Recombination",
    text: "You may exhaust this card before a player casts votes; that player must cast at least 1 vote for an outcome of your choice or remove 1 token from their fleet pool and return it to their reinforcements",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.MAHACT_GENE_SORCERERS
  },
  {
    name: "Pre-Fab Arcologies",
    text: "After you explore a planet, ready that planet",
    req: [TECH_COLOR.GREEN],
    type: TECH_COLOR.GREEN,
    faction: FACTION.NAAZ_ROKHA_ALLIANCE
  },
  {
    name: "Plasma Scoring",
    text: "When 1 or more of your units use Bombardment or Space Cannon, 1 of those units may roll 1 additional die",
    req: [],
    type: TECH_COLOR.RED,
  },
  // {
  //   name: "Magen Defense Grid",
  //   text: "You may exhaust this card at the start of a round of ground combat on a planet that contains 1 or more of your units that have Planetary Shield; your opponent cannot make combat rolls this combat round.",
  //   req: [TECH_COLOR.RED],
  //   type: TECH_COLOR.RED,
  // },
  {
    name: "Magen Defense Grid Ω",
    text: "At the start of ground combat on a planet that contains 1 or more of your structures, you may produce 1 hit and assign it to 1 of your opponent's ground forces.",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
  },
  {
    name: "Duranium Armor",
    text: "During each combat round, after you assign hits to your units, repair 1 of your damaged units that did not use Sustain Damage during this combat round",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
  },
  {
    name: "Assault Cannon",
    text: "At the start of a space combat in a system that contains 3 or more of your non-fighter ships, your opponent must destroy 1 of their non-fighter ships",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
  },
  {
    name: "Non-Euclidean Shielding",
    text: "When 1 of your units uses Sustain Damage, cancel 2 hits instead of 1.",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
    faction: FACTION.BARONY_OF_LETNEV
  },
  // {
  //   name: "Magmus Reactor",
  //   text: "Your ships can move into supernovas.\nAfter 1 or more of your units use Production in a system that either contains a war sun or is adjacent to a supernova, gain 1 trade good.",
  //   req: [TECH_COLOR.RED],
  //   type: TECH_COLOR.RED,
  // },
  {
    name: "Magmus Reactor Ω",
    text: "Your ships can move into supernovas.\nEach supernova that contains 1 or more of your units gains the PRODUCTION 5 ability as if it were 1 of your units.",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
    faction: FACTION.EMBERS_OF_MUAAT
  },
  {
    name: "Dimensional Splicer",
    text: "At the start of space combat in a system that contains a wormhole and 1 or more of your ships, you may produce 1 hit and assign it to 1 of your opponent's ships.",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
    faction: FACTION.GHOSTS_OF_CREUSS
  },
  {
    name: "Valkyrie Particle Weave",
    text: "After making combat rolls during a round of ground combat, if your opponent produced 1 or more hits, you produce 1 additional hit.",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
    faction: FACTION.SARDAKK_NORR
  },
  {
    name: "AI Development Algorithm",
    text: "When you research a unit upgrade technology, you may exhaust this card to ignore any 1 prerequisite\nWhen 1 or more of your units use Production, you may exhaust this card to reduce the combined cost of the produced units by the number of unit upgrade technologies that you own",
    req: [],
    type: TECH_COLOR.RED,
  },
  {
    name: "Self Assembly Routines",
    text: "After 1 or more of your units use PRODUCTION, you may exhaust this card to place 1 mech from your reinforcements on a planet you control in that system\nAfter 1 of your mechs is destroyed, gain 1 trade good",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
  },
  {
    name: "Supercharge",
    text: "At the start of a combat round, you may exhaust this card to apply +1 to the result of each of your unit's combat rolls during this combat round",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
    faction: FACTION.NAAZ_ROKHA_ALLIANCE
  },
  {
    name: "Vortex",
    text: "ACTION: Exhaust this card to choose another player's non-structure unit in a system that is adjacent to 1 or more of your space docks. Capture 1 unit of that type from that player's reinforcements",
    req: [TECH_COLOR.RED],
    type: TECH_COLOR.RED,
    faction: FACTION.VUILRAITH_CABAL
  },
  {
    name: "Sarween Tools",
    text: "When 1 or more of your units use Production, reduce the combined cost of the produced units by 1",
    req: [],
    type: TECH_COLOR.YELLOW,
  },
  {
    name: "Graviton Laser System",
    text: "You may exhaust this card before 1 or more of your units uses Space Cannon; hits produced by those units must be assigned to non-fighter ships if able",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
  },
  {
    name: "Transit Diodes",
    text: "You may exhaust this card at the start of your turn during the action phase; remove up to 4 of your ground forces from the game board and place them on 1 or more planets you control.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
  },
  {
    name: "Integrated Economy",
    text: "After you gain control of a planet, you may produce any number of units on that planet that have a combined cost equal to or less than that planet’s resource value.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
  },
  {
    name: "L4 Disruptors",
    text: "During an invasion, units cannot use Space Cannon against your units.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.BARONY_OF_LETNEV
  },
  {
    name: "Quantum Datahub Node",
    text: "At the end of the strategy phase, you may spend 1 token from your strategy pool and give another player 3 of your trade goods.  If you do, give 1 of your strategy cards to that player and take 1 of their strategy cards.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.EMIRATES_OF_HACAN
  },
  {
    name: "Inheritance Systems",
    text: "You may exhaust this card and spend 2 resources when you research a technology; ignore all of that technology's prerequisites.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.L1Z1X_MINDNET
  },
  {
    name: "Salvage Operations",
    text: "After you win or lose a space combat, gain 1 trade good; if you won the combat, you may also produce 1 ship in that system of any ship type that was destroyed during the combat.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.MENTAK_COALITION
  },
  {
    name: "Mirror Computing",
    text: "When you spend trade goods, each trade good is worth 2 resources or influence instead of 1.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.MENTAK_COALITION
  },
  {
    name: "E-Res Siphons",
    text: "After another player activates a system that contains 1 or more of your ships, gain 4 trade goods.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.UNIVERSITIES_OF_JOL_NAR
  },
  {
    name: "Hegemonic Trade Policy",
    text: "Exhaust this card when 1 or more of your units use PRODUCTION; swap the resource and influence values of 1 planet you control until the end of your turn.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.WINNU
  },
  {
    name: "Nullification Field",
    text: "After another player activates a system that contains 1 or more of your ships, you may exhaust this card and spend 1 token from your strategy pool; immediately end that player's turn.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.XXCHA_KINGDOM
  },
  {
    name: "Impulse Core",
    text: "At the start of a space combat, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit against your opponent's ships; that hit must be assigned by your opponent to 1 of their non-fighters ships if able.",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.YIN_BROTHERHOOD
  },
  {
    name: "Scanlink Drone Network",
    text: "When you activate a system, you may explore 1 planet in that system which contains 1 or more of your units",
    req: [],
    type: TECH_COLOR.YELLOW,
  },
  {
    name: "Predictive Intelligence",
    text: "At the end of your turn, you may exhaust this card to redistribute your command tokens\nWhen you cast votes during the agenda phase, you may cast 3 additional votes; if you do, and the outcome you voted for is not resolved, exhaust this card",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
  },
  {
    name: "Temporal Command Suite",
    text: "After any player's agent becomes exhausted, you may exhaust this card to ready that agent; if you ready another player's agent, you may perform a transaction with that player",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.NOMAD
  },
  {
    name: "Aerie Hololattice",
    text: "Other players cannot move ships through systems that contain your structures\nEach planet that contains 1 or more of your structures gains the PRODUCTION 1 ability as if it were a unit",
    req: [TECH_COLOR.YELLOW],
    type: TECH_COLOR.YELLOW,
    faction: FACTION.ARGENT_FLIGHT
  },
];

export default TECH;
