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

function interpolateColours(colour0, colour1, p) {
  const colourP = colour0.map((channel0, i) => channel0 + ((colour1[i] - channel0) * p));
  return `rgba(${colourP.join(',')})`;
}

function rowKey(seed) {
  return (Date.now() + Math.random() + seed).toString();
}

// const summariseDice = inputString => _.chain(inputString.split(''))
//   .groupBy()
//   .toPairs()
//   .map(([groupValue, group]) => group.length === 1 ? groupValue : `${groupValue}×${group.length}`)
//   .value()
//   .join(',\u2009');
const summariseDice = inputString => inputString.split('').sort().join('').replace(/([0-9])(?!\1+)/g, '$& ').replace(/[^\d]+$/, '');

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

const DiceTable = () => {
  const [resultMode, setResultMode] = useState(RESULT_MODE.AT_LEAST);
  const [inputs, setInputs] = useState([]);
  const [focus, setFocus] = useState(null);

  // EXAMPLE CONTENT
  useEffect(() => {
      setInputs([
        // '',
        // '1',
        // '22',
        // '333',
        // '4444',
        // '55555',
        // '666666',
        // '8888',
        // '333',
        // '99999',
      ]);
  }, []);

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

  const maxHits = _.chain(inputs).map('length').max().value();
  const valueRange = { min: Infinity, max: -Infinity };
  const headerCols = [];

  const data = _.chain(inputs).filter().uniqBy(summariseDice).map((dice, inputIndex) => {
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
    return { key: inputIndex, dice, cols, average: getCalculation(dice).average };
  }).value();

  // if (inputs.filter(({ dice }) => dice).length > 0) {
  //   data.push({ dice: '', cols: headerCols.map(() => undefined) });
  // } else {
  //   headerCols.push(1);
  //   data.push({ dice: '', cols: [undefined] });
  // }

  return (
    <div className="container dice-table my-2">
      <h1>Hit probabilities</h1>
      <p>Enter combat values below to see the probability of producing different numbers of hits.</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const focused = event.target.querySelector('input:focus');
          if (focused) focused.blur();
          setInputs(inputs.filter(dice => !!dice.replace(/[^\d]/g, '')));
        }}
        className="d-flex flex-wrap mt-2 mb-2"
      >
        {inputs.map((dice, index) => (
          <div key={index} className="dice-input input-group input-group-sm flex-nowrap flex-grow-0 flex-shrink-1 mb-0-5 mr-0-5 w-auto">
            <input
              type="text"
              inputMode="numeric"
              className="form-control flex-grow-0 flex-shrink-0"
              value={dice}
              placeholder="..."
              style={{ width: `${(Math.max(3, dice.length) * 0.6) + 1.35}em` }}
              autoFocus={index === focus}
              onChange={(e) => {
                const updateInputs = _.clone(inputs);
                updateInputs[index] = e.target.value.replace(/[^\d]/g, '');
                setInputs(updateInputs);
              }}
              onBlur={() => { setFocus(null); }}
              onFocus={() => { setFocus(index); }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-sm btn-outline-dark"
                type="button"
                tabIndex="-1"
                onClick={() => {
                  const updateInputs = _.clone(inputs);
                  updateInputs.splice(index, 1);
                  setInputs(updateInputs);
                }}
              >
                &times;
                </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-sm btn-secondary mb-0-5"
          type="button"
          onClick={() => {
            const updateInputs = _.clone(inputs);
            updateInputs.push('');
            setInputs(updateInputs);
            setFocus(updateInputs.length - 1);
          }}
        >
          + Add values
          </button>
        <input type="submit" style={{ position: 'fixed', left: '100%', top: '-100%' }} />
      </form>
      {focus !== null && inputs.filter(v => v).length === 0 && (
        <p className="mt-n2 text-muted">
          <small>Combat values, eg "<u>688</u>". Enter <u>0</u> for 10.</small>
        </p>
      )}

      {data.length > 0 ? (
        <div className="results-table">
          <p><strong>Probability of <a href="#" onClick={toggleResultMode}>{resultModeLabel}</a> X hits</strong></p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" />
                  {headerCols.map(hits => <th scope="col" className="text-center" key={hits}>{hits}</th>)}
                  <th>Avg. hits</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ dice, cols, average }, rowIndex) => (
                  <tr key={summariseDice(dice)}>
                    <th scope="col">{summariseDice(dice)}</th>
                    {cols.map((value, colIndex) => <td key={colIndex} className="text-center" style={{ backgroundColor: typeof value === 'number' ? interpolateColours([20, 20, 50], [255, 40, 220], (value - valueRange.min) / (valueRange.max - valueRange.min)) : 'transparent' }}>{formatPercent(value)}</td>)}
                    <td className="text-right">{(Math.round(average * 10) / 10).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DiceTable;
