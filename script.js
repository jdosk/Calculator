const buttons = document.querySelectorAll(".btn");
const display = document.querySelector(".display");

const maxDisplay = 14;
let numberOne;
let numberTwo;
let currentOperator;
let waitingToOperate = false;

const clearDisplay = function() {
    display.textContent = "0";
};

const deleteCharacter = function() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") {
        display.textContent = "0";
    }
};

const setToDisplayLimit = function() {
    while (display.textContent.length > maxDisplay) {
        deleteCharacter();
    }
};

const clearZeros = function() {
    while (display.textContent.startsWith("0")) {
        display.textContent = display.textContent.slice(1);
    }
};

const checkMaxDisplay = function() {
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

const checkDecimals = function() {
    return display.textContent.includes(".");
}

const getSecondNum = function(operator) {
    if (!waitingToOperate) {
        numberOne = display.textContent;
        clearDisplay();
        waitingToOperate = true;
        currentOperator = operator;
    } else {
        numberTwo = display.textContent;
        let result = operate(numberOne, numberTwo, currentOperator);
        numberOne = result;
        currentOperator = operator;
        clearDisplay();
    }
}

const add = function(numOne, numTwo) {
    let x = parseFloat(numOne);
    let y = parseFloat(numTwo);

    return (x + y).toString();
}

const subtract = function(numOne, numTwo) {
    let x = parseFloat(numOne);
    let y = parseFloat(numTwo);
    
    return (x - y).toString();
}

const multiply = function(numOne, numTwo) {
    let x = parseFloat(numOne);
    let y = parseFloat(numTwo);
    
    return (x * y).toString();
}

const divide = function(numOne, numTwo) {
    let x = parseFloat(numOne);
    let y = parseFloat(numTwo);

    if (y === 0) {
        alert("ERROR: Cannot Divide by Zero!");
        waitingToOperate = false;
        return "ERROR";
    } else return (x / y).toString();
}

const operate = function(num1, num2, operator) {
    switch (operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
    }
}

const equals = function() {
    if (currentOperator != "" && numberOne != undefined) {
        numberTwo = display.textContent;
        let result = operate(numberOne, numberTwo, currentOperator);
        numberOne = result;
        numberTwo = "";
        display.textContent = result;
        setToDisplayLimit();
        currentOperator = "";
        waitingToOperate = false;
    }
}

/*
buttons.forEach(button => {
  button.addEventListener("click", () => {
    switch (button.id) {
        case "one":
            appendToDisplay("1");
            break;
        case "two":
            appendToDisplay("2");
            break;
        case "three":
            appendToDisplay("3");
            break;
        case "four":
            appendToDisplay("4");
            break;
        case "five":
            appendToDisplay("5");
            break;
        case "six":
            appendToDisplay("6");
            break;
        case "seven":
            appendToDisplay("7");
            break;
        case "eight":
            appendToDisplay("8");
            break;
        case "nine":
            appendToDisplay("9");
            break;
        case "zero":
            appendToDisplay("0");
            break;
        case "decimal":
            if (checkDecimals()) {
                break;
            } else appendToDisplay(".");
            break;
        case "add":
            getSecondNum("add");
            break;
        case "subtract":
            getSecondNum("subtract");
            break;
        case "multiply":
            getSecondNum("multiply");
            break;
        case "divide":
            getSecondNum("divide");
            break;
        case "ac":
            clearDisplay();
            waitingToOperate = false;
            break;
        case "del":
            deleteCharacter();
            break;
        case "equals":
            equals();
            break;
        default:
            console.log("default");
    }
  });
});
*/

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const val = button.dataset.value;
    if (val) {
      appendToDisplay(val);
      return;
    }

    switch (button.id) {
      case "decimal":
        if (!checkDecimals()) appendToDisplay(".");
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        getSecondNum(button.id);
        break;
      case "ac":
        clearDisplay();
        waitingToOperate = false;
        break;
      case "del":
        deleteCharacter();
        break;
      case "equals":
        equals();
        break;
    }
  });
});