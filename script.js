const buttons = document.querySelectorAll(".btn");
const display = document.querySelector(".display");

const numberOne = "";
const numberTwo = "";
const maxDisplay = 14;

const clearDisplay = function() {
    display.textContent = "0";
};

const deleteCharacter = function() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") {
        display.textContent = "0";
    }
};

const clearZeros = function() {
    while (display.textContent.startsWith("0")) {
        display.textContent = display.textContent.slice(1);
    }
};

const checkMaxDisplay = function() {
    console.log(display.textContent.length === 14);
    return display.textContent.length === 14;
};

const appendToDisplay = function(num) {
    if (!checkMaxDisplay()) {
        clearZeros();
        display.textContent += num;
    } else {
        display.textContent = display.textContent.slice(1, maxDisplay);
        clearZeros();
        display.textContent += num;
    }
};

buttons.forEach(button => {
  button.addEventListener("click", () => {
    switch (button.id) {
        case "one":
            console.log("1");
            appendToDisplay("1");
            break;
        case "two":
            appendToDisplay("2");
            console.log("2");
            break;
        case "three":
            appendToDisplay("3");
            console.log("3");
            break;
        case "four":
            appendToDisplay("4");
            console.log("4");
            break;
        case "five":
            appendToDisplay("5");
            console.log("5");
            break;
        case "six":
            appendToDisplay("6");
            console.log("6");
            break;
        case "seven":
            appendToDisplay("7");
            console.log("7");
            break;
        case "eight":
            appendToDisplay("8");
            console.log("8");
            break;
        case "nine":
            appendToDisplay("9");
            console.log("9");
            break;
        case "zero":
            appendToDisplay("0");
            console.log("0");
            break;
        case "decimal":
            appendToDisplay(".");
            console.log(".");
            break;
        case "add":
            console.log("add");
            break;
        case "subtract":
            console.log("subtract");
            break;
        case "multiply":
            console.log("multiply");
            break;
        case "divide":
            console.log("divide");
            break;
        case "ac":
            console.log("ac");
            clearDisplay();
            break;
        case "del":
            console.log("del");
            deleteCharacter();
            break;
        case "equals":
            console.log("equals");
            break;
        default:
            console.log("default");
    }
  });
});