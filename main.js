let buttonsList = document.getElementsByTagName("button");

for(let i = 0; i < buttonsList.length; i++) {
    let button = buttonsList[i];
    button.innerHTML = button.id;
}

let screen = document.getElementById('screen');

let lastButtonWasOperator = false;

let numberButtons = document.getElementsByClassName('number');
for(let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        screen.value += numberButtons[i].id;
        lastButtonWasOperator = false;
    });
}

// mathCase = screen.value
function replaceLastOperator(mathCase, newOperator) {
    let fixed = '';
    for (let i = 0; i < mathCase.length-1; i++) {
        fixed += mathCase[i];
    }
    fixed += newOperator;
    return fixed;
}

function deleteButton(mathCase) {
    let newValue = '';
    for(let i = 0; i < mathCase.length-1; i++) {
        newValue += mathCase[i];
    }
    return newValue;
}

let lastResultPanel = document.getElementById("lastResult");

function calculate(mathCase) {
    let result = eval(mathCase); // extremely safe
    lastResultPanel.innerHTML = `last result <b>${result}</b>`;
    return result;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

let operatorButtons = document.getElementsByClassName('operator');
for(let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        let currentB = operatorButtons[i];

        if (currentB.id == "+" || 
            currentB.id == "-" || 
            currentB.id == "/" ||
            currentB.id == "*" ||
            currentB.id == ".") 
            {
                if (lastButtonWasOperator == true) {
                    screen.value = replaceLastOperator(screen.value, currentB.id);
                } else {
                    screen.value += currentB.id;
                    lastButtonWasOperator = true;
                }
            }


        if (currentB.id == "C" ||
            currentB.id == "CE") 
            {
                screen.value = '';
            }

        if (currentB.id == 'Delete') {
            screen.value = deleteButton(screen.value);
        }

        if (currentB.id == '%') {
            document.getElementById('calculatorTitle').style.color = getRandomColor();
        }

        if (currentB.id == '1/x') {
            screen.value = 1/eval(screen.value);
            lastResultPanel.innerHTML = `last result: <b>${screen.value}</b>`;
        }

        if (currentB.id == 'x^2') {
            screen.value = Math.pow(eval(screen.value), 2);
            lastResultPanel.innerHTML = `last result: <b>${screen.value}</b>`;
        }

        if (currentB.id == 'sqr(x)') {
            screen.value = Math.sqrt(eval(screen.value));
            lastResultPanel.innerHTML = `last result: <b>${screen.value}</b>`;
        }

        if (currentB.id == '+/-') {
            screen.value = -1*eval(screen.value);
            lastResultPanel.innerHTML = `last result: <b>${screen.value}</b>`;
        }
    });
}

let historyPanel = document.getElementById('history');

let resultButton = document.getElementsByClassName("result");
resultButton[0].addEventListener('click', () => {
    let scrV = screen.value;
    let result = calculate(screen.value);
    if (result !== undefined) {
        screen.value = calculate(screen.value);
    } else if (result == undefined) {
        screen.value = '';
        screen.placeholder = 'undefined';
    }

    if (historyPanel.value.length == 0) {
        historyPanel.value += `${scrV} = ${result}`;
    } else {
        historyPanel.value += `\n${scrV} = ${result}`;
    }
});
