const currValueDisplayer = document.getElementsByClassName("curr-value")[0];
const resultMessage = document.getElementsByClassName("result")[0];
const resultDisplayer = document.getElementById("result-value");
const throwButton = document.getElementsByClassName("button-wrapper")[0];
const resetButton = document.getElementsByClassName("reset-button")[0];
const diceWrapper = document.getElementsByClassName("curr-dices")[0];
const inventory = document.getElementsByClassName("inv-dices")[0];
const resetSelected = function() {
    for (const dice of allDices) {
        dice.id = "";
    }
}
const diceValues = [4, 6, 8];

const createDice = function (value) {
    const dice = document.createElement("span");
    dice.className = "dice";
    dice.innerText = value;

    dice.onclick = (event) => {
        resetSelected();
        event.target.id = "selected";
    };

    return dice;
}

const createInvDice = function (value) {
    const dice = document.createElement("span");
    dice.className = "inv-dice";
    dice.innerText = value;

    dice.onclick = () => {
        inventory.removeChild(dice);
        const value = parseInt( dice.innerText );
        const index = diceValues.indexOf(value);
        if(index >= 0) {
            diceValues.splice(index, 1);
        }
    }

    return dice;
}

for (const defaultValue of diceValues) {
    inventory.appendChild( createInvDice( defaultValue ) );
}

class DiceGame {
    constructor( maxValue ) {
        this.maxValue = maxValue;
        this.lastValue = maxValue;
        this.currentValue = maxValue;
    }

    start() {
        currValueDisplayer.innerText = this.currentValue;
        for (const value of diceValues) {
            diceWrapper.appendChild( createDice(value) );
        }
    }

    display() {
        const start = this.lastValue;
        const end = this.currentValue;
        if (start === end) return;
        const range = end - start;
        let current = start;
        const duration = range < 5 ? 1000 : 500
        const stepTime = Math.abs(Math.floor(duration / range));
        currValueDisplayer.style.transform = "scale(1.1)";
        currValueDisplayer.style.boxShadow = "5px 5px 5px rgb(0, 0, 0, 0.4)";
        const timer = setInterval(function() {
            current += -1;
            this.updateColor( this.getCurrentPercent(current) );
            currValueDisplayer.innerText = current;
            if (current == end) {
                clearInterval(timer);
            }
        }.bind(this), stepTime);
        setTimeout(() => {
            currValueDisplayer.style.transform = "";
            currValueDisplayer.style.boxShadow = "";
        }, duration);
    }

    throwDice(maxDiceValue) {
        this.lastValue = this.currentValue;
        const diceResult = Math.floor(Math.random() * (maxDiceValue-1)) + 1;
        this.currentValue -= diceResult;
        this.updateCurrentDiceResult(diceResult);
        this.display();
        if (this.currentValue === 0) this.win();
        if (this.currentValue < 0) this.lose();
    }

    updateCurrentDiceResult(value) {
        resultDisplayer.style.transform = "scale(1.1)";
        resultDisplayer.innerText = value;
        setTimeout(() => {
            resultDisplayer.style.transform = "";
        }, 400);
    }

    getCurrentPercent(current) {
        return ((this.maxValue - current) / this.maxValue);
    }

    updateColor(percentage) {
        const red = 0 + (Math.floor(139 * percentage));
        const green = 128 - (Math.floor(128 * percentage));
        currValueDisplayer.style.color = `rgb(${red}, ${green}, ${0})`; 
    }

    win() {
        resultMessage.innerText = "You won !";
        this.endGame();
    }

    lose() {
        resultMessage.innerText = "You lost !";
        this.endGame();
    }

    endGame() {
        throwButton.style.display = "none";
        diceWrapper.style.display = "none";
        resetButton.style.display = "block";
        resultMessage.style.display = "block";
    }
}