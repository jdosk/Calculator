// Document selectors
const buttons = document.querySelectorAll(".btn");
const display = document.querySelector(".display");

// Global Variables
const maxDisplay = 14; // Max digit size to fit the display
let numberOne; // First number for math functions
let numberTwo; // Second number for math functions
let currentOperator; // Current operator to use for math functions
let waitingToOperate = false; // when true will save new entry values to numberTwo

// Clears the current display and sets to 0
const clearDisplay = function() {
    display.textContent = "0";
};

// Deletes the last character, if no characters exist then sets to 0
const deleteCharacter = function() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") {
        display.textContent = "0";
    }
};

// Deletes extra characters to keep within limit of maxDisplay
const setToDisplayLimit = function() {
    while (display.textContent.length > maxDisplay) {
        deleteCharacter();
    }
};

// Removes extra zeros at front on number to clear room in display
const clearZeros = function() {
    while (display.textContent.startsWith("0")) {
        display.textContent = display.textContent.slice(1);
    }
};

// Checks if display is at max limit
const checkMaxDisplay = function() {
    return display.textContent.length === 14;
};

// Adds new value to display, if display is at max limit deletes front value first
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

// Checks for existing decimal and returns true/false
const checkDecimals = function() {
    return display.textContent.includes(".");
}

// sets the first and second numbers, if a operator is called it will operate before clearing second number
// This function will handle multiple operations if equals is not pressed
const getSecondNum = function(operator) {
    // Check if waiting for second number and do accordingly
    if (!waitingToOperate) {
        // Store numberOne, store current operator, clear the display and set waitingToOperate to true
        //    to avoid numberOne being overwritten
        numberOne = display.textContent; 
        clearDisplay();
        waitingToOperate = true;
        currentOperator = operator;
    } else {
        // Store numberTwo, and set the results of the operation to numberOne, then clear display
        numberTwo = display.textContent;
        let result = operate(numberOne, numberTwo, currentOperator);
        numberOne = result;
        currentOperator = operator;
        clearDisplay();
    }
}

// Adds two numbers
const add = function(numOne, numTwo) {
    let x = parseFloat(numOne);
    let y = parseFloat(numTwo);

    return (x + y).toString();
}

// Subtracts two numbers
const subtract = function(numOne, numTwo) {
    let x = parseFloat(numOne);
    let y = parseFloat(numTwo);
    
    return (x - y).toString();
}

// multiplies two numbers
const multiply = function(numOne, numTwo) {
    let x = parseFloat(numOne);
    let y = parseFloat(numTwo);
    
    return (x * y).toString();
}

// divides two numbers. Gives error if numTwo is 0 (cannot divide by 0)
const divide = function(numOne, numTwo) {
    let x = parseFloat(numOne);
    let y = parseFloat(numTwo);

    if (y === 0) {
        alert("ERROR: Cannot Divide by Zero!");
        waitingToOperate = false; // Essentially to reset calculator display
        return "ERROR";
    } else return (x / y).toString();
}

// Calls on necessary operation
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

// Handles necessary math operation and resets necessary variables and displays math output
const equals = function() {
    // Check if currentOperator & numberOne are 
    //    in acceptable state (cant press equals without an operator first)
    if (currentOperator != "" && numberOne != undefined) {
        numberTwo = display.textContent;
        let result = operate(numberOne, numberTwo, currentOperator);
        numberOne = result;
        numberTwo = "";
        display.textContent = result;
        setToDisplayLimit(); // Make sure results fit in display before showing
        currentOperator = ""; // Reset operator so repeated equals presses dont cause errors
        waitingToOperate = false; // Reset so numberOne is new value being stored
    }
}

// Event handler to add on click functions
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // check for dataset value first, and then append to display if exists
    const val = button.dataset.value;
    if (val) {
      appendToDisplay(val);
      return;
    }

    // switch to check the type of non number function to pass
    switch (button.id) {
      case "decimal": // Check if decimals exist before appending
        if (!checkDecimals()) appendToDisplay(".");
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":  // add, subtract, multiply, and divide all call same function
        getSecondNum(button.id);
        break;
      case "ac": // clears display and resets waitingToOperate to fully reset calculator
        clearDisplay();
        waitingToOperate = false;
        break;
      case "del": // Deletes last character
        deleteCharacter();
        break;
      case "equals": // finishes operations
        equals();
        break;
    }
  });
});