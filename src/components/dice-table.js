import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';

// import { Chart, curveLinear } from 'react-charts';
import { ResponsiveLine } from '@nivo/line';

import { calculator } from '../lib/rolling-calculator';
import { GAME_COLOURS } from '../lib/constants';

import "../styles/components/dice-table.css";

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

function formatPercent(float) {
  if (float === undefined) return '-';
  let rounded = Math.round(float * 100);
  if (rounded === 100) {
    if (float < 1) {
      rounded = '>99';
    }
    if (float > 1) {
      rounded = '100';
    }
  }
  return `${rounded}%`;
}

function interpolateColours (colour0, colour1, p) {
  const colourP = colour0.map((channel0, i) => channel0 + ((colour1[i] - channel0) * p));
  return `rgba(${colourP.join(',')})`;
}

function rowKey(seed) {
  return (Date.now() + Math.random() + seed).toString();
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
    // useEffect(() => {
    //     if (inputs.length === 0) {
    //         setInputs([
    //             { dice: '699' },
    //             { dice: '888' },
    //             { dice: '8888' },
    //             { dice: '333' },
    //             { dice: '99999' },
    //         ]);
    //     }
    // });

    const rows = [];

    const toggleResultMode = (e) => {
        e.preventDefault();
        if (resultMode === RESULT_MODE.AT_LEAST) {
            setResultMode(RESULT_MODE.EXACT);
        } else {
            setResultMode(RESULT_MODE.AT_LEAST);
        }
    }

    const resultModeLabel = resultMode === RESULT_MODE.EXACT ? 'exactly' : 'at least';

    const maxHits = _.chain(inputs).map(input => input.dice.length).max().value();
    const valueRange = { min: Infinity, max: -Infinity };
    const headerCols = [];

    const data = inputs.map(({ key, dice }, inputIndex) => {
        const result = getCalculation(dice)[resultMode === RESULT_MODE.EXACT ? 'results' : 'cumulative'];
        const cols = [];
        for (let i = (resultMode === RESULT_MODE.EXACT ? 0 : 1); i <= maxHits; i += 1) {
          const value = result[i.toString(10)];
          if (value > valueRange.max) valueRange.max = value;
          if (value < valueRange.min) valueRange.min = value;
          cols.push(value);

          if (inputIndex === 0) {
            headerCols.push(i);
          }
        }
        return { key, dice, cols };
    });

    if (inputs.filter(({ dice }) => dice).length > 0) {
      data.push({ dice: '', cols: headerCols.map(() => undefined) });
    } else {
      headerCols.push(1);
      data.push({ dice: '', cols: [undefined] });
    }

    return (
        <div className="container dice-table my-2">
            <h1>Dice probabilities</h1>
            <p>Enter combat values into the table to see the probability of producing different numbers of hits. Enter 0 for 10.</p>
            <div className="table-responsive">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const focused = event.target.querySelector('input:focus');
                  if (focused) focused.blur();
                  setInputs(inputs.filter(({ dice }) => dice));
                }}
              >
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" />
                    {headerCols.map(hits => <th scope="col" className="text-center" key={hits}>{hits}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data.map(({ dice, cols }, rowIndex) => (
                    <tr key={rowIndex}>
                      <th scope="row" className="dice-input-th" style={{ minWidth: `${(dice.length * 0.81) + 2.2}em` }}>
                        <input
                          value={dice}
                          className="dice-input form-control"
                          type="tel"
                          placeholder="..."
                          onChange={(e) => {
                            const updateInputs = _.clone(inputs);
                            if (!updateInputs[rowIndex]) {
                              updateInputs[rowIndex] = {};
                            }
                            updateInputs[rowIndex].dice = e.target.value.replace(/[^\d]/g, '');
                            if (!_.last(updateInputs).dice) {
                              updateInputs.pop();
                            }
                            setInputs(updateInputs);
                          }}
                          onBlur={({ target }) => {
                            const table = target.parentNode.parentNode.parentNode;
                            setTimeout(() => {
                              if (table && !table.querySelector('input:focus')) {
                                setInputs(inputs.filter(({ dice }) => dice));
                              }
                            }, 100);
                          }}
                        />
                      </th>
                      {cols.map((value, colIndex) => <td key={colIndex} className="text-center" style={{ backgroundColor: typeof value === 'number' ? interpolateColours([20,20,50], [255,40,220], (value - valueRange.min) / (valueRange.max - valueRange.min)) : 'transparent'}}>{formatPercent(value)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
              <input type="submit" style={{ position: 'fixed', left: '100%', top: '-100%' }} />
              </form>
            </div>
            <p className="mt-0"><small>Probability of <a href="#" onClick={toggleResultMode}>{resultModeLabel}</a> X hits</small></p>
        </div>
    )
};

export default DiceChart;
