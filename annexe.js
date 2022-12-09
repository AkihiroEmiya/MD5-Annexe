const wrapper = document.getElementsByClassName("wrapper")[0];
const allDices = document.getElementsByClassName("dice");
const starter = document.getElementById("start-game");
const app = document.getElementsByClassName("app")[0];
const diceItem = document.getElementsByClassName("inv-dice");
const addDiveValue = document.getElementById("add-dice-value");
const addButton = document.getElementsByClassName("add-button")[0];
const saveButton = document.getElementsByClassName("saver")[0];
const diceInvWrapper = document.getElementsByClassName("dice-inv-wrapper")[0];
const diceChanger = document.getElementsByClassName("change-dice")[0];
let game;

const currentDiceMaxValue = function() {
    const currDice = document.getElementById("selected");
    return parseInt(currDice.innerText);
}

starter.onclick = () => {
    const startValue = parseInt( document.getElementById("start-value").value );
    if(isNaN(startValue)) {
        console.error("Incorrect input for start value");
        return;
    }
    if(startValue < 0) {
        console.error("Start value cannot be lower than 0");
        return;
    }
    game = new DiceGame( startValue );
    wrapper.style.display = "none";
    app.style.display = "flex";
    game.start();
}

throwButton.onclick = () => {
    game.throwDice( currentDiceMaxValue() );
}

resetButton.onclick = () => {
    document.location.reload();
}

addButton.onclick = () => {
    const newDiceValue = parseInt(addDiveValue.value);
    if (isNaN(newDiceValue)) return;
    if (newDiceValue <= 0) return;
    if(diceValues.indexOf(newDiceValue) >= 0) return; 
    addDiveValue.value = "";
    diceValues.push(newDiceValue);
    console.log(diceValues);
    inventory.appendChild( createInvDice( newDiceValue ) );
}

diceChanger.onclick = () => {
    diceInvWrapper.style.display = "flex";
}

saveButton.onclick = () => {
    diceInvWrapper.style.display = "none";
}

