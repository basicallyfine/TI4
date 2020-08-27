import React, { useState, useEffect, Component } from "react";
import _ from "lodash";
import SwiperCore, { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

import { calculator } from "../lib/rolling-calculator";

// import "swiper/swiper.scss";
// import "swiper/components/effect-cube/effect-cube.scss";
import "swiper/swiper-bundle.css";
import "../styles/components/rolling-calculator.css";

class Calculator extends Component {
  constructor() {
    super();
    this.state = { dice: [] };
    this.setDice = this.setDice.bind(this);
    this.addDie = this.addDie.bind(this);
    this.removeDie = this.removeDie.bind(this);
    this.setCalculation = this.setCalculation.bind(this);
    this.renderCalulation = this.renderCalulation.bind(this);
  }
  componentDidMount() {
    SwiperCore.use([Mousewheel]);
    this.setState({ swiperInit: true });
  }
  setDice(values) {
    const filteredValues = _.chain(values).filter((v) => typeof v === "number").sortBy().value();
    this.setState({
      dice: filteredValues
    }, this.setCalculation);
  }
  addDie(value) {
    this.setDice(this.state.dice.concat(value));
  }
  removeDie(index) {
    const newDice = _.clone(this.state.dice);
    this.setDice(newDice.splice(index, 1));
  }
  async setCalculation() {
    const valueString = _.chain(this.state.dice)
      .filter()
      .sort()
      .value()
      .join(",");
    if (valueString === this.state.valueString) {
      return;
    }

    if (!valueString) {
      this.setState({
        calculator: null,
        valueString
      });
      return
    }

    const calculation = new calculator(
      ...valueString.split(",").map((s) => parseInt(s, 10))
    );

    this.setState({
      calculator: {
        results: calculation.results,
        cumulative: calculation.cumulative,
      },
      valueString,
    });
  }
  formatPercent(float) {
    let rounded = Math.round(float * 100);
    if (rounded === 100) {
      console.log(rounded, float, 1 - float);
      if (float < 1) {
        rounded = '>99';
      }
      if (float > 1) {
        rounded = '100';
      }
    }
    return rounded;
  }
  renderCalulation() {
    if (!this.state.calculator) return null;

    const rows = [];
    for (const hits in this.state.calculator.results) {
      rows.push(
        <tr key={hits}>
          <th>{hits}</th>
          <td>{this.formatPercent(this.state.calculator.cumulative[hits])}%</td>
          <td>{this.formatPercent(this.state.calculator.results[hits])}%</td>
        </tr>
      );
    }

    return (
      <table className="calculation-table mt-2">
        <thead>
          <tr>
            <th>Hits</th>
            <th>At least</th>
            <th>Exactly</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  render() {
    // const diceValueGroups = _.chain(this.state.dice)
    //   .filter()
    //   .groupBy()
    //   .toPairs()
    //   .map(([value, rolls]) => `${value}×${rolls.length}`)
    //   .value();

    const addButtons = [];
    for (let i = 10; i >= 1; i -= 1) {
      addButtons.push((
        <button
          key={i}
          type="button"
          className="btn btn-outline-dark"
          // className="btn btn-secondary"
          onClick={() => { this.addDie(i); }}
        >
          {i}
        </button>
      ));
    }

    return (
      <div className="container rolling-calculator my-2">
        <h1>Set some dice to see some numbers</h1>

        <div className="add-die-button-container">
          <div class="btn-group" role="group">
            {addButtons}
          </div>
        </div>

        <div className="dice-container my-2">
          {this.state.dice.map((value, i) => (
            <div className="die-box" key={i}>{value}</div>
          ))}
        </div>
        {/* diceValueGroups.length > 0 && (
          <h4>Rolling for: {diceValueGroups.join(", ")}</h4>
        ) */}
        {this.renderCalulation()}
      </div>
    );
  }
}

export default Calculator;
