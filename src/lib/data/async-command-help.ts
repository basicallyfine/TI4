export type AsyncCommand = {
  command?: string;
  hint?: string;
  help?: string;
  heading?: string;
}

const commands: AsyncCommand[] = [
  {
    command: "/create_game gameName vpCount(optional)",
    hint: "creates game and can set VP count of game, optional",
    heading: "To create game use:",
  },
  {
    command: "/set_game gameName",
    hint: "Map name can only contain a-z A-Z 0-9 symbols",
    heading: "To set active game use:",
    help: "Now automatically sets active map in channels that go: `gameName-map-updates` so in any channel that is named like this, you don't need to set active map, it automatically sets for you so switching between games is much easier.",
  },
  {
    command: "/game set_game_status status gameName(optional)",
    help: `status: open or locked
Status open, means anyone can edit map, can join map as player;
Status locked means, only joined players and map creator can edit map. No more players can join
Game auto locks open map if it's does not have community mode, when any SC card is picked if was open, will get locked.`,
  },
  {
    command: "/game join gameName",
    hint: "join an open map to be able to edit even if map is locked",
  },
  {
    command: "/game leave gameName",
    hint: "leave an open map",
  },
  {
    command: "/game info gameName",
    hint: "information of map, status if open/locked and player list",
  },
  {
    command: "/game add @playerName... gameName",
    hint: "add single or multiple players to game, gameName is optional and can bet set if no activeMap present",
  },
  {
    command: "/game remove  @playerName... gameName",
    hint: "remove single or multiple players to game, gameName is optional and can bet set if no activeMap present",
  },
  {
    command: "/game set_order @playerName1 @playerName2 .....gameName",
    help: "Add all players in order for game",
  },
  {
    command: "/game sc_count",
    hint: "sets game SC count, used if game requires more than 8 Strategy cards, default is 8",
  },
  {
    command: "/game setup display_type(optional) vpCount(optional) player_count_for_map(optional) community_mode(optional) alliance_mode(optional)",
    hint: "sets default display type for game. All (map + player stats), map or player stats, Sets Game VP count (10 default), alliance mode turns off auto planet add to player area when last unit is left on planet",
    help: "player_count_for_map set player map count 6 (default) or 8 for bigger map",
  },
  {
    command: "/game setup community_mode:YES",
    help: "community_mode is for games were multiple players handle single faction",
  },
  {
    command: "/game community_setup player1 role1 channel1",
    heading: "(after `/game setup community_mode:YES`)",
    help: `player1 is dummy player in map or real, role1 is the team role and channel1 is team channel
can setup up to 8 at once`,
  },
  {
    command: "/game replace FACTION_COLOR @replacementPlayer",
    hint: "can replace a player in game (faction/color), only game players can do command",
  },
  {
    command: "/game setup game_custom_name @custom text",
    hint: "can add custom text to game",
  },
  {
    command: "/add_tile setup 0",
    heading: "For easy of setup suggest first command after map creation use",
    help: "This adds a template with positions",
  },
  {
    command: "/add_tile tileName positionOnMap",
    help: `(We using somno template positions on map. from setup template and you see positions.
Also we support TopLeft, TopRight, BottomLeft and BottomRight positions coresponding to TL, TR, BL, BR
Mecatol position is MR)`,
  },
  {
    command: "/add_tile_list tileList",
    hint: "tile list is code from map Generators like TTS uses, example: https://ti4-map-generator.derekpeterson.ca/",
    help: "You can use also tileID, so liek TI4 marks tiles 01 is Jord for example",
  },
  {
    command: "/remove_tile tileName or position",
  },
  {
    command: "/delete_game",
    hint: "deletes your game, only can delete the map you created",
  },
  {
    command: "/show_game gameName(optional) display_type(optional)",
    hint: "displays the game map, display_type can be set to all, map, stats. Displays map + player stats, just map or just player stats",
    help: "If you have active game set, it shows your active game if no game name is defines",
  },
  {
    command: "/add_cc colorList(factionList) tile or position",
    hint: "add's cc to system: colorList can be pink,red,black as example",
  },
  {
    command: "/remove_cc colorList(FactionList) tile or position",
    hint: "remove's cc from system: colorList can be pink,red,black as example/",
  },
  {
    command: "/remove_all_cc confirmation(YES)",
    hint: "need to type in YES, will remove all CC's from active game",
  },
  {
    command: "/add_control faction_or_color tile planetList",
    hint: "need to specify tile and planetList, example /add_control pink 3a arnor,lor",
  },
  {
    command: "/remove_control faction_or_color tile planet",
  },
  {
    command: "/add_units tile unitList faction_or_color add_cc_from_tactics(optional)",
    hint: "add_cc_from_tactics if types yes or y, will remove cc from tactics and add to tile",
    help: `/add_units faction_or_color tile unitList
examples
tile can be tile name or the number of location at bottom right
like 1a, 2b, 3c etc
for units
can do
carrier, dread, fighter, infantry, inf all go in space by default
if you want to place to planet need to do
inf lodor, sd lodor
or any char combination like
lodor, lodo, lod, lo, l
all work to place unit on planet
example
/add_units blue 1c carrier, ff, 2 inf l, sd l, 3 inf
this command would place blue units in tile 1c
carrier, fighter, 3 infantry in space
2 infantry and space dock on lodor planet (or any planet beggining with letter L in that tile)`,
  },
  {
    command: "/remove_units tile unitList faction_or_color",
  },
  {
    command: "/remove_all_units tile faction_or_color",
  },
  {
    command: "/add_damage_unit tile unitList faction_or_color",
  },
  {
    command: "/remove_damage_unit tile unitList faction_or_color",
  },
  {
    command: "/remove_damage_all_unit tile faction_or_color",
  },
  {
    command: "/add_frontier_tokens CONFIRM(YES)",
    hint: "adds frontier tokens to all tiles that can have one",
  },
  {
    help: `Note:
/remove_units and /move_units
priority is move/remove damaged units. If we selecte priority_no_damage (and type in yes or y)
units without damage will be removed/moved to other system
also moves damage to new system by default if option  is not specified

unitList examples and explanation. If dont specify planet, all units go into space
Listing only unit list, so add into command that you want
dn <- sinle dread into space
dread <- same sinle dread into space
3 dn <- 3 dreads added into space
3 dn, 2 destroyers <- 3dread and 2 dd added into space
3 dn, 2 dd, gf quann <- 3 dread and 2dd added into space, 1 gf added onto planet quann
ws, 6 ff, sd quann, 3 inf quann, mech quann <- warsun and 6 fighters added into space, spacedock, 3 infantry and mech added into quann`,
  },
  {
    command: "/move_units systemFrom unitList systemTo unitListTo faction_or_color cc (optional can be no or retreat)",
    help: `Standard fields to add tile/system, unit list same as add, remove, and we have optional field addCC, type anything in to not add cc into moved system
unitListTo <- if you enter 0 or none into as a unit, no unit will spawn in target system :)
Example:
/move_units pink quann 2 dn, dd, gf, gf quann wellon 2 dn, dd, 2 gf wellon
now: add_units, remove_units, move_units command, for planet name, you can use short of existing planet
example
Arnor/Lor, can use a and l, or ar or arno, or lo
Sakulag/Lazar example: s and l, or sa and la
Abyz/Fria like a and f etc
so you don't need full name, can use first letter or few first letters, if system with same starting letter like
Tequran/Torkan, can use te and to 🙂
hope helps speed things up`,
  },
  {
    command: "/add_token tokenName system/tile planetNameOptional",
    hint: "same as add control counter, specify token and planet name is optional",
  },
  {
    command: "/remove_token tokenName system/tile planetNameOptional",
    hint: "same as add control counter, specify token and planet name is optional",
    help: "Attachement tokens can only be added to planets",
  },
  {
    command: "/player stats ....",
    hint: "can set all the major stats for player, when SC is picked, TG's automatically added to user Trade Goods from left on SC TG's",
    help: "faction_or_color tag helps to define for which player you want to set stats. FOR SELF not needed, needed only if you set for other players",
  },
  {
    command: "/player setup faction color hs_tile_position(optional) keleres_hs(options)",
    hint: "needs to set player faction and color",
  },
  {
    command: "/player sc_play faction_color(optional)",
    hint: "plays your SC that you have in game",
  },
  {
    command: "/player sc_pick scNumber",
    hint: "adds your pick to game. Does not generate map",
  },
  {
    command: "/player sc_follow",
    hint: "removes 1 cc from strategy tokens",
  },
  {
    command: "/player send_tg faction",
    hint: "take tg from your existing ones and send(add) to target faction tg",
  },
  {
    command: "/player send_commodities faction",
    hint: "take commodities from your existing ones and send(add) to target faction tg",
  },
  {
    command: "/player pass",
    hint: "passes",
  },
  {
    command: "/player speaker player(optional)",
    hint: "assigns speaker to player",
  },
  {
    command: "/player tech_add techName player(optional)",
    hint: "adds selected tech to player area",
  },
  {
    command: "/player tech_remove techName player(optional)",
    hint: "removes selected tech to player area",
  },
  {
    command: "/player tech_exhaust techName player(optional)",
    hint: "exhausts selected tech to player area",
  },
  {
    command: "/player tech_ready techName player(optional)",
    hint: "refreshes selected tech to player area",
  },
  {
    command: "/player turn player(optional)",
    hint: "pings next player in line. Can do turn for any player",
  },
  {
    command: "/player planet_add planetName1 planetName2..6(optional)",
    hint: "adds planet",
  },
  {
    command: "/player planet_remove planetName1 planetName2..6(optional)",
    hint: "removes planet",
  },
  {
    command: "/player planet_exhaust planetName1 planetName2..6(optional)",
    hint: "exhaust planet",
  },
  {
    command: "/player planet_ready planetName1 planetName2..6(optional)",
    hint: "refreshes planet",
  },
  {
    command: "/player planet_ready_all",
    hint: "refreshes all planets",
  },
  {
    command: "/player planet_exhaust_all",
    hint: "exhaust all planets",
  },
  {
    command: "/player legendary_exhaust_ability planetName1 planetName2..6(optional)",
    hint: "exhaust planet ability (legendary)",
  },
  {
    command: "/player legendary_ready_ability planetName1 planetName2..6(optional)",
    hint: "refreshes planet ability (legendary)",
    help: "Also if you add a planet that another player has it, it auto removes that planet from other player also transfers ability status, if exhausted, you get exhausted",
  },
  {
    command: "/so draw count(optional)",
    hint: "draws a secret or specified number of secrets",
  },
  {
    command: "/so discard soUniqueID",
    hint: "discards given ID Secret objective and shuffles the SO deck. soUniqueID is generated just for player and are unique each time",
  },
  {
    command: "/so info",
    hint: "sents player all private cards for given game",
  },
  {
    command: "/so show soUniqueID player",
    hint: "sends given Secret Objective to player and changes soUniqueID",
  },
  {
    command: "/so show_all player",
    hint: "sends all Secret Objectives to player",
  },
  {
    command: "/so show_all_to_add",
    hint: "shows all Secret Objectives to all players",
  },
  {
    command: "/so show_to_all soUniqueID",
    hint: "displays SO to table and changes soUniqueID",
  },
  {
    command: "/so show_all",
    hint: "displays all SO to table and changes soUniqueID",
  },
  {
    command: "/so deal @player count(optional)",
    hint: "draws a Secret objective for specified player, can specify count",
  },
  {
    command: "/so deal_to_all count(optional)",
    hint: "draws a Secret objective(s) for all game players",
  },
  {
    command: "/ac info",
    hint: "sents player all private cards for given game",
  },
  {
    command: "/ac draw count(optional)",
    hint: "draws a secret or specified number of secrets",
  },
  {
    command: "/ac discard acUniqueID",
    hint: "discards given ID action card and shuffles the ac deck. acUniqueID is generated just for player and are unique each time",
  },
  {
    command: "/ac show acUniqueID player",
    hint: "sends given action card to player and changes acUniqueID",
  },
  {
    command: "/ac show_all player",
    hint: "sends all action cards to player",
  },
  {
    command: "/ac show_to_all acUniqueID",
    hint: "displays ac to table and changes acUniqueID",
  },
  {
    command: "/ac play acUniqueID",
    hint: "displays ac to table that was played and discards",
  },
  {
    command: "/ac shuffle_deck",
    hint: "shuffles Action card deck",
  },
  {
    command: "/ac pick_from_discard acUniqueIDFromDiscardPile",
    hint: "Pick a Action card from discard pile and put in your hand",
  },
  {
    command: "/ac shuffle_back_into_deck acUniqueIDFromDiscardPile",
    hint: "Shuffle Action card from discard pile back into Action card Deck",
  },
  {
    command: "/ac reveal_and_put_into_discard",
    hint: "Reveal top Action card from deck and put into discard pile",
  },
  {
    command: "/ac show_discard_list",
    hint: "Show all discarded Action cards",
  },
  {
    command: "/ac send acUniqueID player",
    hint: "Sends selected AC from your hand to player hand",
  },
  {
    command: "/ac send_random player",
    hint: "Sends random AC from your hand to player hand",
  },
  {
    command: "/ac discard_random",
    hint: "Discards random AC from hand",
  },
  {
    command: "/ac show_remaining_card_count",
    hint: "shows how many AC are left in deck",
  },
  {
    command: "/pn show pnID player",
    hint: "shows given PN to player and changes pnID",
  },
  {
    command: "/pn show_all player",
    hint: "shows all PNs to player and changes pnIDs",
  },
  {
    command: "/pn show_to_all  pnID",
    hint: "shows PNs to all",
  },
  {
    command: "/pn play pnID",
    hint: "plays PN, it showed to all and sent back to owner",
  },
  {
    command: "/pn send pnID player",
    hint: "send PN to selected player. If Alliance or SftT automatically is played into target players play area",
  },
  {
    command: "/pn purge pnID",
    hint: "purge Selected PN from game",
  },
  {
    command: "/agenda draw countOptional",
    hint: 'draw top agendas from deck. Agendas "remain" in deck till you place them. Meaning if you forget to use commands put_top or put_bottom and try reveal agenda, the sent to you will be in deck still :)',
  },
  {
    command: "/agenda put_top agendaID",
    hint: "put given agenda at top. Example you draw A and B agenda. And put A at top, then B at top. You end up with order B, A, to reveal. It's like physically you would do top and next top covers previous one",
  },
  {
    command: "/agenda put_bottom agendaID",
    hint: "puts agenda bottom",
  },
  {
    command: "/agenda look_at_top",
    hint: "shows top agenda, no action possible",
  },
  {
    command: "/agenda look_at_bottom",
    hint: "shows bottom agenda, no action possible",
  },
  {
    command: "/agenda show_discarded",
    hint: "shows discarded agendas and the id's",
  },
  {
    command: "/agenda reveal",
    hint: "reveals agenda to all with ID and automatically puts in discard pile",
  },
  {
    command: "/agenda add_law agendaID optionalTextForElected",
    hint: "add's law to game map and optionalTextForElected is used to define player, or PO or anything, free text can be entered. AgendaID is used from discard pile or when revealed",
  },
  {
    command: "/agenda remove_law agendaID",
    hint: "removes law from game and puts in discard, ID is showed in map",
  },
  {
    command: "/agenda vote_count",
    hint: "lists vote count, only if planets are used in bot",
  },
  {
    command: "/agenda shuffle_deck",
    hint: "shuffles agenda deck",
  },
  {
    command: "/agenda reset_deck",
    hint: "reset agenda deck and discards to new state",
  },
  {
    command: "/agenda reset_draw_state_for_deck",
    hint: "resets player agenda draw state, when player drew cards but did not put top or bottom, it resets draw",
  },
  {
    command: "/agenda shuffle_discard_back_into_deck id",
    hint: "takes discard agenda and shufles back into deck",
  },
  {
    command: "/agenda cleanup confirm:YES",
    hint: "refresh all player planets after agenda phase",
  },
  {
    command: "/status po_reveal_stage1",
    hint: "reveals stage 1 public objective",
  },
  {
    command: "/status po_reveal_stage2",
    hint: "reveals stage 2 public objective",
  },
  {
    command: "/status po_add_custom name vpWorth",
    hint: "adds a custom objective with given name and vp worth, like need law VP, need SO scorable for all, use this",
  },
  {
    command: "/status po_remove_custom objectiveID",
    hint: "removes custom objective",
  },
  {
    command: "/status po_score id",
    hint: "score existing objevtcive",
  },
  {
    command: "/status po_unscore id",
    hint: "unscore if you scored by mistake",
  },
  {
    command: "/status po_shuffle_back id",
    hint: "shuffles given objective back into deck, don't use for custom ones, just remove those",
  },
  {
    command: "/status cleanup confirmYES",
    hint: "cleans up all CC's, all unit damage, resets passed status and SC played and SC player selection :) Also increases round number",
  },
  {
    command: "/status sc_trade_goods scNumber(optional) tgCount(optional)",
    hint: "add's Trade goods to unchoose strategy cards, tgCount is total how much it should be on card, when SC is picked, TG's automatically added to user Trade Goods",
    help: `if not specifying SC and TG, it auto adds +1TG to each unselected SC card
you can also do
/status sc_trade_goods SC TGCount
for single TG adding of TG`,
  },
  {
    command: "/status turn_order",
    hint: "lists turn order with SC, player and passed status. SC is striked through if played",
  },
  {
    command: "/explore planet planetName",
    hint: "explores a planet, handling relic fragments and tokens automatically and discarding others",
  },
  {
    command: "/explore frontier tile",
    hint: "explores a frontier token, handling relic fragments and tokens automatically, discarding others, and removing the frontier token",
  },
  {
    command: "/explore draw_and_discard deck count(optional)",
    hint: "draws a number of explore cards (default 1) from the given deck, and immediately discards them all",
  },
  {
    command: "/explore info deck(optional)",
    hint: "sends list of all cards still in the given explore deck, or in all explore decks if none is given",
  },
  {
    command: "/explore discard_from_deck ids",
    hint: "discards explore cards with given ids (comma separated)",
  },
  {
    command: "/explore shuffle_into_deck ids",
    hint: "discards explore cards with given ids (comma separated)",
  },
  {
    command: "/explore use id",
    hint: "use discarded explore card",
  },
  {
    command: "/explore remove ids",
    hint: "removes explore cards with given ids (comma separated) from the game",
  },
  {
    command: "/explore shuffle_back_into_deck ids",
    hint: "adds explore cards (including purged) with given ids (comma separated) to the deck",
  },
  {
    command: "/explore send_fragment type player count(optional)",
    hint: "sends a number of relic fragments (default 1) of the specified type to another player",
  },
  {
    command: "/explore reset confirmYES",
    hint: "completely resets explore decks, adding all known cards to their decks and shuffling them. useful if you have a game that started before explores were added",
  },
  {
    command: "/explore relic_draw",
    hint: "draws a relic",
  },
  {
    command: "/explore relic_exhaust relic",
    hint: "exhaust specified relic",
  },
  {
    command: "/explore relic_ready",
    hint: "refreshes specified relic",
  },
  {
    command: "/explore relic_purge",
    hint: "purges relic",
  },
  {
    command: "/explore relic_show_remaining",
    hint: "shows remaining relics in deck",
  },
  {
    command: "/explore relic_shuffle_back relicID",
    hint: "shuffle relic back into deck",
  },
  {
    command: "/explore relic_add_back_into_deck relicID",
    hint: "add relic back into deck",
  },
  {
    command: "/explore relic_draw_specific relic",
    hint: "draws a specific relic, can be used to draw relic you already have or variant",
    help: `if need to add Enigmatic Device, please use
/explore relic_draw_specific Enigmatic Device
Its workaround for that single explore`,
  },
  {
    command: "/special mahact_cc_to_fs color",
    hint: "add's any color CC to fleet supply",
  },
  {
    command: "/special mahact_cc_from_fs color",
    hint: "removes any color CC from fleet supply",
  },
  {
    command: "/special diplo_system tile",
    hint: "add's cc for diplomacy SC",
  },
  {
    command: "/special make_secret_into_po soID",
    hint: "makes scored Secret objective into public objective. To remove Secret as Public, use /status po_remove_custom poID",
  },
  {
    command: "/special adjust_round_number",
    hint: "set round number for game (default increases when using /status cleanup command)",
  },
  {
    command: "/special swap_systems tileID tileIDTo",
    hint: "swaps two tiles (ghost hero)",
  },
  {
    command: "/special search_warrant",
    hint: "execute command to enable/disable visible Secret objectives",
  },
  {
    command: "/special sleeper_token planet...",
    hint: "adds or removes sleeper token on planet. If no sleeper is present adds, if exists, removes token",
  },
  {
    command: "/special ion_token_flip tile",
    hint: "flip existing ION wormhole token in system/tile",
  },
  {
    command: "/special system_info tile",
    hint: "Shows unit info in given tile",
  },
  {
    command: "/special stellar_converter tile",
    hint: "Use Stellar Converter on it. Add token and remove all units and planet from player area",
  },
  {
    command: "/special rise_of_a_messiah",
    hint: "Adds one infantry to each planet you control, except DMZ and Stellar Converted ones",
  },
  {
    command: "/leaders unlock leaderID",
    hint: "unlock leader",
  },
  {
    command: "/leaders lock leaderID",
    hint: "lock leader",
  },
  {
    command: "/leaders exhaust leaderID trade_goods",
    hint: "exhaust leader and can add trade good to leader (like arturo for nomad)",
  },
  {
    command: "/leaders ready leaderID",
    hint: "refresh leader",
  },
  {
    command: "/leaders purge leaderID",
    hint: "purges leader",
  },
  {
    command: "/leaders hero_play",
    hint: "set leader as active. Will be purged after executing /status cleanup. Just for letnev and nomad",
  },
  {
    command: "/leaders hero_unplay",
    hint: "set leader as inactive if you made active by mistake",
  },
  {
    command: "/leaders reset",
    hint: "resets all leaders for faction",
  },
  {
    command: "/custom agenda_remove_from_game id",
    hint: "remove agenda from game deck (before game start)",
  },
  {
    command: "/custom so_remove_from_game id",
    hint: "remove SO from game deck (before game start)",
  },
  {
    command: "/custom ac_remove_from_game id",
    hint: "remove AC from game deck (before game start)",
  },
  {
    command: "/help documentation",
    hint: "show documentation file",
  },
  {
    command: "/help setup_templates",
    hint: "show setup_templates file",
  },
  {
    command: "/help list_tiles",
    hint: "lists all tiles, use starting number id to add to map",
  },
  {
    command: "/help list_games",
    hint: "lists all available maps that are created",
  },
  {
    command: "/help list_planets",
    hint: "lists all available planets",
  },
  {
    command: "/help list_units",
    hint: "lists all possible units",
  },
  {
    command: "/milty start sliceCount factionCount anomalies_can_touch < initializes milty draft",
    help: `sliceCount - slice count to generate (default is player count + 2, max 9)
factionCount - faction count to randomize (default is player count + 2, max 25)
anomalies_can_touch - if set to true, red boarder tiles can touch in slice`,
  },
  {
    command: "/fow add_custom_adjacent_tiles primary_tile adjacent_tiles",
    hint: "add custom adjacent tiles for game, primary tile a1 example, secondary ones separated in comma, like 2b,2d,2e",
  },
  {
    command: "/fow remove_custom_adjacent_tiles primary_tile",
  },
  {
    command: "/fow remove_all_custom_adjacent_tiles",
  },
];

export default commands;
