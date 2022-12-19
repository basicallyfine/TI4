const { calculator } = require('../lib/rolling-calculator');

module.exports = (args) => {
    const dice = args.replace(/[^0-9]/g, '').split('').map(v => v === '0' ? 10 : Number(v));
    const Calculator = new calculator(...dice);

    console.log(Calculator.reroll(true).cumulative);
};