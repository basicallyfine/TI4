import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';

import { calculator } from '../lib/rolling-calculator';
import { GAME_COLOURS } from '../lib/constants';

import "../styles/components/dice-table.scss";

const RESULT_MODE = {
  AT_LEAST: 'AT_LEAST',
  EXACT: 'EXACT',
};

const _calcs = {};
function getCalculation(input) {
  const dice = input.replace(/[^\d]/g, '');
  if (!_calcs[input]) {
    _calcs[input] = new calculator(...dice.split('')).reroll((/\*$/i).test(input)).calculate();
  }
  console.log(_calcs);
  return _calcs[input];
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
const summariseDice = inputString => _.sortBy(inputString.split(''), (v) => /^\d+$/.test(v) ? Number(v) : Infinity).join('').replace(/([0-9])(?!\1+)/g, '$& ').replace(/[^\d*]+$/, '');

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

  const maxHits = _.chain(inputs).map(i => i.replace(/[^\d]/g, '').length).max().value();
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
      <h2>Dice probability calculator</h2>
      <p>Enter combat values below to see the probability of producing different numbers of hits.</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const focused = event.target.querySelector('input:focus');
          if (focused) focused.blur();
          setInputs(inputs.filter(dice => !!dice.replace(/[^\d*]/g, '')));
        }}
        className="d-flex flex-wrap mt-2 mb-2"
      >
        {inputs.map((dice, index) => (
          <div key={index} className="dice-input input-group input-group-sm flex-nowrap flex-grow-0 flex-shrink-1 mb-0-5 mr-0-5 w-auto">
            <input
              type="text"
              inputMode="tel"
              className="form-control flex-grow-0 flex-shrink-0"
              value={dice}
              placeholder="..."
              style={{ width: `${(Math.max(3, dice.length) * 0.6) + 1.35}em` }}
              autoFocus={index === focus}
              onChange={(e) => {
                const updateInputs = _.clone(inputs);
                updateInputs[index] = e.target.value.replace(/[^\d*]/gi, '').replace(/\*(?=.)/gi, '').toUpperCase();
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
