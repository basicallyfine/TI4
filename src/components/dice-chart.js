import React from 'react';

// import { Chart, curveLinear } from 'react-charts';
import { ResponsiveLine } from '@nivo/line';

import "../styles/components/dice-chart.css";

const ResultsChart = ({ data }) => (
    <div className="results-chart-wrapper" >
        <div className="results-chart-contents" >
            <ResponsiveLine
                data={data}
                curve="linear"
                animate={false}
                enablePoints={false}
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
                colors={['#fff']}
                // axisBottom={{
                //     legend: 'linear scale',
                //     // legendOffset: -12,
                // }}
            />
            <div className="result-label-bottom text-center"><strong>Hits</strong> <small>(at least)</small></div>
        </div>
    </div>
);

const DiceChart = () => {
    return (
        <div className="container dice-chart my-2">
            <ResultsChart
                data={[
                    {
                        id: 'fake corp. A',
                        data: [
                            { x: 1, y: 0.8 },
                            { x: 2, y: 0.6 },
                            { x: 3, y: 0.36 },
                            { x: 4, y: 0.216 },
                            { x: 5, y: 0.1296 },
                            { x: 6, y: 0.07776 },
                            { x: 7, y: 0 },
                        ],
                    },
                ]}
            />
        </div>
    )
};

export default DiceChart;