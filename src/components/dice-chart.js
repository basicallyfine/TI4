import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';

// import { Chart, curveLinear } from 'react-charts';
import { ResponsiveLine } from '@nivo/line';

import { calculator } from '../lib/rolling-calculator';
import { GAME_COLOURS } from '../lib/constants';

import "../styles/components/dice-chart.scss";

const RESULT_MODE = {
    AT_LEAST: 'AT_LEAST',
    EXACT: 'EXACT',
};

const _calcs = {};
function getCalculation(dice) {
    if (!_calcs[dice]) {
        _calcs[dice] = new calculator(...dice.split('')).calculate();
    }
    return _calcs[dice];
}

const ResultsChart = ({ data, colours = [], ...props } = {}) => (
    <ResponsiveLine
        data={data}
        curve="linear"
        animate={false}
        // enablePoints={false}
        lineWidth={2}
        pointSize={5}
        // pointSymbol={({ size, color }) => (
        //     <svg width={size} height={size} viewBox="8 8 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M0 13.261L5.23729 8L0 2.73904L2.79661 0L8 5.22756L13.2034 0L16 2.73904L10.7627 8L16 13.261L13.2034 16L8 10.7724L2.79661 16L0 13.261Z" fill={color} />
        //     </svg>
        // )}
        // pointColor={{ from: 'seriesColor' }}
        xScale={{
            type: 'point',
            min: 1,
            max: 'auto',
        }}
        yScale={{
            type: 'linear',
            min: 0,
            max: 1,
        }}
        axisLeft={{
            format: '.0%'
        }}
        margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
        colors={colours}
    // axisBottom={{
    //     legend: 'linear scale',
    //     // legendOffset: -12,
    // }}
    />
);

const DiceInput = ({ onUpdate, onRemove, value, colour }) => {
    return (
        <div className="btn-toolbar">
            <input type="tel" className="form-control" />
        </div>
    )
};

const DiceChart = () => {
    const [resultMode, setResultMode] = useState(RESULT_MODE.AT_LEAST);
    const [inputs, setInputs] = useState([]);

    // EXAMPLE CONTENT
    useEffect(() => {
        if (inputs.length === 0) {
            setInputs([
                { key: 'ts1', dice: '699' },
                { key: 'ts2', dice: '888' },
                { key: 'ts3', dice: '5568' },
                { key: 'ts4', dice: '333' },
                { key: 'ts5', dice: '99999' },
            ]);
        }
    });

    const inputComponents = [];

    const toggleResultMode = (e) => {
        e.preventDefault();
        if (resultMode === RESULT_MODE.AT_LEAST) {
            setResultMode(RESULT_MODE.EXACT);
        } else {
            setResultMode(RESULT_MODE.AT_LEAST);
        }
    }

    const resultModeLabel = resultMode === RESULT_MODE.EXACT ? 'exactly' : 'at least';
    
    // {
    //     id: 'fake corp. A',
    //     data: [ { x: 1, y: 0.8 } ],
    // },

    // data={[
    //     {
    //         id: 'fake corp. A',
    //         data: [
    //             { x: 1, y: 0.8 },
    //             { x: 2, y: 0.6 },
    //             { x: 3, y: 0.36 },
    //             { x: 4, y: 0.216 },
    //             { x: 5, y: 0.1296 },
    //             { x: 6, y: 0.07776 },
    //             { x: 7, y: 0 },
    //         ],
    //     },
    // ]}

    const maxHits = _.chain(inputs).map(input => input.dice.length).max().value();
    console.log({ maxHits });
    const chartData = inputs.map(({ key, dice }) => {
        const data = [];
        const result = getCalculation(dice)[resultMode === RESULT_MODE.EXACT ? 'results' : 'cumulative'];
        // for (const hits in result) {
        //     data.push({
        //         x: parseFloat(hits, 10),
        //         y: result[hits]
        //     })
        // };
        for (let x = 0; x <= maxHits; x += 1) {
            data.push({ x, y: result[x.toString(10)] || 0 })
        }
        return { id: key, data };
    });
    // const colours = inputs.map(input => input.colour);

    return (
        <div className="container dice-chart my-2">
            <div className="results-chart-wrapper" >
                <div className="results-chart-contents" >
                    <div className="result-label result-label-top text-center"><strong>Probability of producing <a href="#" onClick={toggleResultMode}>{resultModeLabel}</a> X hits</strong></div>
                    <ResultsChart
                        data={chartData}
                        colours={[
                            GAME_COLOURS.WHITE,
                            GAME_COLOURS.BLUE,
                            GAME_COLOURS.YELLOW,
                            GAME_COLOURS.RED,
                            GAME_COLOURS.GREEN,
                            GAME_COLOURS.PURPLE,
                            GAME_COLOURS.ORANGE,
                            GAME_COLOURS.PINK,
                            GAME_COLOURS.WHITE_2,
                            GAME_COLOURS.BLUE_2,
                            GAME_COLOURS.YELLOW_2,
                            GAME_COLOURS.RED_2,
                            GAME_COLOURS.GREEN_2,
                            GAME_COLOURS.PURPLE_2,
                            GAME_COLOURS.ORANGE_2,
                            GAME_COLOURS.PINK_2,
                        ]}
                    />
                    <div className="result-label result-label-bottom text-center">Hits</div>
                </div>
            </div>
        </div>
    )
};

export default DiceChart;