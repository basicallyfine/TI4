class simulator {
    constructor(...dice) {
        this.dice = dice;
    }

    trialRound() {
        let hits = 0;
        for (const hitValue of this.dice) {
            const rollValue = Math.floor(Math.random() * 10) + 1;
            if (rollValue >= hitValue) hits += 1;
        }
        return hits;
    }

    get results() {
        if (!this._results) {
            this.trials();
        }
        if (this.textOutput) {
            const out = [];
            for (const k in this._results) {
                out.push(
                    `${k}: ${((this._results[k] / this._trials) * 100).toFixed(1)}%`
                );
            }
            return out.join("\n");
        }
        return this._results;
    }

    get cumulative() {
        if (!this._cumulative) {
            this.trials();
        }
        if (this.textOutput) {
            const out = [];
            for (const k in this._cumulative) {
                out.push(
                    `>= ${k}: ${((this._cumulative[k] / this._trials) * 100).toFixed(1)}%`
                );
            }
            return out.join("\n");
        }
        return this._cumulative;
    }

    format(text = true) {
        this.textOutput = text;
        return this;
    }

    trials(nTrials = 10000) {
        this._results = {};
        this._cumulative = {};
        this._trials = nTrials;

        for (let i = 0; i <= this.dice.length; i += 1) {
            this._results[i.toString(10)] = 0;
        }

        for (let n = 0; n < nTrials; n += 1) {
            const hits = this.trialRound();

            this._results[hits.toString(10)] += 1;
        }

        for (let i = this.dice.length; i >= 0; i -= 1) {
            this._cumulative[i.toString(10)] = this._results[i.toString(10)];
            if (this._cumulative[(i + 1).toString(10)]) {
                this._cumulative[i.toString(10)] += this._cumulative[
                    (i + 1).toString(10)
                ];
            }
        }

        return this;
    }
}

class calculator {
    constructor(...dice) {
        this.dice = dice.map((input) => {
            let dieValue = parseFloat(input, 10);
            if (dieValue === 0) {
                dieValue = 10;
            }
            return dieValue;
        });
    }
    get results() {
        if (!this._results) {
            this.calculate();
        }
        if (this.textOutput) {
            const out = [];
            for (const k in this._results) {
                out.push(`${k}: ${Math.round(this._results[k] * 100)}%`);
            }
            return out.join("\n");
        }
        return this._results;
    }
    get cumulative() {
        if (!this._cumulative) {
            this.calculate();
        }
        if (this.textOutput) {
            const out = [];
            for (const k in this._cumulative) {
                out.push(`>= ${k}: ${Math.round(this._cumulative[k] * 100)}%`);
            }
            return out.join("\n");
        }
        return this._cumulative;
    }
    format(text = true) {
        this.textOutput = text;
        return this;
    }
    calculate() {
        this._results = {};
        this._cumulative = {};

        const diceP = this.dice.map((value) => (11 - value) / 10);
        for (let i = 0; i < 2 ** this.dice.length; i += 1) {
            const outcome = i.toString(2).padStart(this.dice.length, "0");
            const hits = outcome.replace(/0/g, "").length;
            const outcomeP = this.dice.reduce((accumulator, hitValue, dieIndex) => {
                const p =
                    outcome[dieIndex] === "1"
                        ? (11 - hitValue) / 10
                        : 1 - (11 - hitValue) / 10;
                return accumulator * p;
            }, 1);

            if (!this._results[hits.toString(10)]) {
                this._results[hits.toString(10)] = 0;
            }
            this._results[hits.toString(10)] += outcomeP;
        }

        for (let i = this.dice.length; i >= 0; i -= 1) {
            this._cumulative[i.toString(10)] = this._results[i.toString(10)];
            if (this._cumulative[(i + 1).toString(10)]) {
                this._cumulative[i.toString(10)] += this._cumulative[
                    (i + 1).toString(10)
                ];
            } else {
                this._cumulative[i.toString(10)] = this._results[i.toString(10)];
            }
        }

        return this;
    }
}

export { simulator, calculator };
