const htmlBody = document.body;
const toggler = document.querySelector('.toggle-theme');
const indicator = document.querySelector('.theme-indicator');
const themeIcon = document.querySelector('.theme-icon');
const calculatorBody = document.querySelector('.container');
const buttons = document.querySelectorAll('.button');
toggler.addEventListener('click', () => {
    htmlBody.classList.toggle('dark-theme');
    indicator.classList.toggle('shift');
    toggler.classList.toggle('toggle-theme-dark')
    themeIcon.classList.add('animate-effect')
    buttons.forEach(button => {
        button.classList.toggle('dark-theme-buttons');
    });
    calculatorBody.classList.toggle('calculator-dark-theme');
    if (htmlBody.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    setTimeout(() => {
        themeIcon.classList.remove('animate-effect')
    }, 500);
})

const inputKeys = document.querySelectorAll('.input-key');
const userInput = document.querySelector('.input');
const outputResult = document.querySelector('.output');

const maxInputLength = 20;
const maxOutputLength = 12;

let input = "";
let lastInputKey = "";

function formatInput(input) {
    const operatorSymbols = {
        "*": "x",
        "/": "÷",
        "+": "+",
        "-": "-",
        "(": "(",
        ")": ")",
        "%": "%"
    };

    return input.split("").map(char => {
        if (operatorSymbols.hasOwnProperty(char)) {
            return `<span class="operator">${operatorSymbols[char]}</span>`;
        }
        return char;
    }).join("");
}

inputKeys.forEach(key => {
    const inputKey = key.getAttribute('input-key');
    key.addEventListener('click', () => {
        if (inputKey >= '0' && inputKey <= '9' && input.length >= maxInputLength) {
            return;
        } else if (inputKey === "clear") {
            input = "";
            userInput.innerHTML = "00";
            outputResult.innerHTML = "00";
            lastInputKey = "";
        } else if (inputKey === "backspace") {
            input = input.slice(0, -1);
            if (input === "") {
                userInput.innerHTML = "00";
                outputResult.innerHTML = "00";
                lastInputKey = "";
            } else {
                userInput.innerHTML = formatInput(input);
                lastInputKey = input.charAt(input.length - 1);
            }
        } else if (inputKey === "=") {
            let result = eval(input);
            outputResult.innerHTML = "=" + formatOutput(result);
            lastInputKey = "";
        } else if (inputKey === "%") {
            if (lastInputKey !== "%") {
                input += "/100*";
                userInput.innerHTML = formatInput(input);
                lastInputKey = "%";
            }
        }
        else if (inputKey === ".") {
            if (lastInputKey !== ".") {
                input += input === "" ? "0." : ".";
                userInput.innerHTML = formatInput(input);
                lastInputKey = ".";
            }
        }
        else if (inputKey === "brackets") {
            const openBracketIndex = input.lastIndexOf("(");
            const closeBracketIndex = input.lastIndexOf(")");
            if (openBracketIndex === -1 || (openBracketIndex !== -1 && closeBracketIndex !== -1 && openBracketIndex < closeBracketIndex)) {
                input += "(";
            } else if (openBracketIndex !== -1 && closeBracketIndex === -1 || (openBracketIndex !== -1 && closeBracketIndex !== -1 && openBracketIndex > closeBracketIndex)) {
                input += ")";
            }
            userInput.innerHTML = formatInput(input);
            lastInputKey = "(";
        }

        else {
            if (input === "" && (inputKey === "*" || inputKey === "/" || inputKey === "+" || inputKey === "-")) {
                input += "0" + inputKey;
            } else {
                if (inputKey === "*" || inputKey === "/" || inputKey === "+" || inputKey === "-" || inputKey === "%") {
                    if (lastInputKey === "*" || lastInputKey === "/" || lastInputKey === "+" || lastInputKey === "-" || lastInputKey === "%") {
                        input = input.slice(0, -1);
                    }
                }
                input += inputKey;
            }
            userInput.innerHTML = formatInput(input);
            lastInputKey = inputKey;
        }
    });
});

function formatOutput(result) {
    if (result.toString().length > maxOutputLength) {
        return result.toExponential(maxOutputLength - 6);
    }
    return result;
}
