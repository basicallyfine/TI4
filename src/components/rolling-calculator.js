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

const DieActionButton = ({ onClick, children } = {}) => (
  <button className="die-action-button" type="button" onClick={onClick}>
    {children}
  </button>
);

const DieBox = ({ onUpdate, onRemove, value } = {}) => {
  // const [value, setValue] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSwiperChange = (swiper) => {
    // setValue(swiper.activeIndex);
    onUpdate(swiper.activeIndex);
  };

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(value || 0, 0);
    }
  }, [value, swiperInstance]);

  const dieValues = [];
  for (let i = 1; i <= 10; i += 1) {
    dieValues.push(<SwiperSlide key={i}>{i}</SwiperSlide>);
  }

  return (
    <div className={`die-box ${value === null ? "inactive" : "active"}`}>
      <Swiper
        // spaceBetween={0.25}
        // slidesPerView={1.75}
        direction="vertical"
        // cssMode={false}
        mousewheel
        // cubeEffect
        onSlideChange={handleSwiperChange}
        // onSwiper={(swiper) => console.log(swiper)}
        // onScroll={(...stuff) => console.log("onScroll", stuff)}
        // onScrollCapture={(...stuff) => console.log("onScrollCapture", stuff)}
        onInit={(swiper) => {
          setSwiperInstance(swiper);
        }}
      >
        <SwiperSlide>
          {value === null ? (
            <DieActionButton
              disabled={!(swiperInstance && swiperInstance.slideNext)}
              onClick={() => {
                swiperInstance.slideTo(1);
              }}
            >
              <FaPlusCircle />
            </DieActionButton>
          ) : (
            <DieActionButton>
              <FaMinusCircle onClick={onRemove} />
            </DieActionButton>
          )}
        </SwiperSlide>
        {dieValues}
      </Swiper>
    </div>
  );
};

class Calculator extends Component {
  constructor() {
    super();
    this.state = { dice: [null] };
    this.setDice = this.setDice.bind(this);
    this.setCalculation = this.setCalculation.bind(this);
    this.renderCalulation = this.renderCalulation.bind(this);
  }
  componentDidMount() {
    SwiperCore.use([Mousewheel]);
    this.setState({ swiperInit: true });
  }
  setDice(values) {
    const filteredValues = _.filter(values, (v) => typeof v === "number");
    if (_.last(filteredValues)) {
      filteredValues.push(null);
    }
    this.setState({
      dice: filteredValues
    });

    this.setCalculation();
  }
  setCalculation() {
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
        cumulative: calculation.cumulative
      },
      valueString
    });
  }
  renderCalulation() {
    if (!this.state.calculator) return null;

    const rows = [];
    for (const hits in this.state.calculator.results) {
      rows.push(
        <tr key={hits}>
          <th>{hits}</th>
          <td>{Math.round(this.state.calculator.cumulative[hits] * 100)}%</td>
          <td>{Math.round(this.state.calculator.results[hits] * 100)}%</td>
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
    const diceBoxes = [];
    if (this.state.swiperInit) {
      for (let i = 0; i < this.state.dice.length; i += 1) {
        diceBoxes.push(
          <DieBox
            key={i}
            value={this.state.dice[i]}
            onUpdate={(value) => {
              const newValues = _.clone(this.state.dice);
              while (newValues[i] === undefined) {
                newValues.push(null);
              }
              newValues[i] = value;
              this.setDice(newValues);
            }}
            onRemove={() => {
              const newValues = _.clone(this.state.dice);
              newValues.splice(i, 1);
              this.setDice(newValues);
            }}
          />
        );
      }
    }

    const diceValueGroups = _.chain(this.state.dice)
      .filter()
      .groupBy()
      .toPairs()
      .map(([value, rolls]) => `${value}×${rolls.length}`)
      .value();

    return (
      <div className="container rolling-calculator my-2">
        <h1>Set some dice to see some numbers</h1>
        <div className="dice-container my-2">{diceBoxes}</div>
        {diceValueGroups.length > 0 && (
          <h4>Rolling for: {diceValueGroups.join(", ")}</h4>
        )}
        {this.renderCalulation()}
      </div>
    );
  }
}

export default Calculator;
