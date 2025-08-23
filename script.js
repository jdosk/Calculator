const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    switch (button.id) {
        case "one":
            console.log("one");
            break;
        case "two":
            console.log("two");
            break;
        case "three":
            console.log("three");
            break;
        case "four":
            console.log("four");
            break;
        case "five":
            console.log("five");
            break;
        case "six":
            console.log("six");
            break;
        case "seven":
            console.log("seven");
            break;
        case "eight":
            console.log("eight");
            break;
        case "nine":
            console.log("nine");
            break;
        case "zero":
            console.log("zero");
            break;
        case "decimal":
            console.log("decimal");
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
            break;
        case "del":
            console.log("del");
            break;
        case "equals":
            console.log("equals");
            break;
        default:
            console.log("default");
    }
  });
});