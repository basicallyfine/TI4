import _ from 'lodash';

import { MAP_SYSTEM_GROUPS } from './map-constants';
import { PLANET_TRAIT } from '../../lib/constants';
import SYSTEMS from '../../lib/data/systems';

const utils = {
    summariseSystems: (systems) => {
        const summary = {
            tiles: systems.length
        };
    
        const planets = _.chain(systems).map('planets').flatten().value();
        
        summary.planets = planets.length;
        summary.resources = _.sumBy(planets, 'resources');
        summary.influence = _.sumBy(planets, 'influence');
        summary.totalValue = _.sumBy(planets, 'resources') + _.sumBy(planets, 'influence');
        summary.efficientValue = _.sumBy(planets, ({ resources, influence }) => _.max([resources, influence]));
        summary.tech = _.sumBy(planets, ({ tech }) => tech ? 1 : 0);
        summary.legendary = _.sumBy(planets, ({ legendary }) => legendary ? 1 : 0);
        summary.traits = {
            [PLANET_TRAIT.BLUE]: _.sumBy(planets, ({ trait }) => trait === PLANET_TRAIT.BLUE ? 1 : 0),
            [PLANET_TRAIT.GREEN]: _.sumBy(planets, ({ trait }) => trait === PLANET_TRAIT.GREEN ? 1 : 0),
            [PLANET_TRAIT.RED]: _.sumBy(planets, ({ trait }) => trait === PLANET_TRAIT.RED ? 1 : 0),
        };
    
        summary.anomalies = _.sumBy(systems, ({ anomaly }) => anomaly ? 1 : 0);
        summary.wormholes = _.sumBy(systems, ({ wormhole }) => wormhole ? 1 : 0);
        summary.nonPlanet = _.sumBy(systems, ({ planets = [] }) => planets.length === 0 ? 1 : 0);
    
        return summary;
    },
    playerSystems: ({ mapPlaceData, mapConfig }) => mapConfig.players.map((player) => {
        player.systems = _.mapValues({
            [MAP_SYSTEM_GROUPS.ADJACENT]: player.position.adjacent,
            [MAP_SYSTEM_GROUPS.SLICE]: _.uniq([...player.position.adjacent, ...player.position.slice]),
            [MAP_SYSTEM_GROUPS.EQUIDISTANT]: _.uniq([...player.position.adjacent, ...player.position.slice, ...player.position.equidistant]),
        }, (places) => {
            const systems = _.uniq(places)
            .map((place) => {
                const system = _.find(SYSTEMS, { number: _.get(mapPlaceData, `${place}.system`) });
                return system;
            })
            .filter(system => system);
            return utils.summariseSystems(systems);
        })
        return player;
    })
};

export default utils;