let num1 = ''
let num2 = ''
let currentOperation = null;
let shouldResetScreen = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
          return add(+num1, +num2);
        case '-':
          return subtract(+num1, +num2);
        case '×':
          return multiply(+num1, +num2);
        case '÷':
          return divide(+num1, +num2);
      }
}

function clear () {
    displayValue.textContent = '0';
    lastDisplayValue.textContent = '';
    const blankDiv = document.createElement('br');
    lastDisplayValue.appendChild(blankDiv);
    num1 = '';
    num2 = '';
    currentOperation = null;
}

function resetScreen () {
    displayValue.textContent = '';
    shouldResetScreen = false;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function changeDisplay(e) {

    switch(e.target.classList.value) {

        case 'digit-button':
            if (shouldResetScreen) resetScreen();
            if (displayValue.textContent === '0') {
                displayValue.textContent = e.target.textContent
            } else {
                displayValue.textContent += e.target.textContent
            }
            break;
        case 'decimal-button':
            if (displayValue.textContent.includes('.')) return;
            displayValue.textContent += '.'
            break;
        
        case 'operator-button':
                
                if (currentOperation && !shouldResetScreen) {
                    if (currentOperation === '÷' && displayValue.textContent === '0') {
                        alert("You can't divide by 0!")
                        return;
                    }
                    num2 = displayValue.textContent;
                    lastDisplayValue.textContent += `${num2}` + ' =';
                    displayValue.textContent = roundResult(operate(currentOperation, num1, num2));
                }

                num1 = displayValue.textContent;
                currentOperation = e.target.textContent
                shouldResetScreen = true;
                lastDisplayValue.textContent = `${num1}` + ' ' + e.target.textContent + ' ';

                break;
            
        case 'clear-button':
            clear();
            break;

        case 'delete-button':
            if (displayValue.textContent === '0' || shouldResetScreen) return;
            displayValue.textContent = displayValue.textContent.slice(0, displayValue.textContent.length - 1);
            if (displayValue.textContent === '') displayValue.textContent = '0';
            break;
        case 'equal-button':
            if (!currentOperation || shouldResetScreen) return
            if (currentOperation === '÷' && displayValue.textContent === '0') {
                alert("You can't divide by 0!")
                return;
              }
            num2 = displayValue.textContent;
            displayValue.textContent = roundResult(operate(currentOperation, num1, num2));
            lastDisplayValue.textContent = `${num1} ${currentOperation} ${num2} =`
            currentOperation = null;
            break;
    }
    

}

const displayValue = document.querySelector('.current-operation');
const lastDisplayValue = document.querySelector('.last-operation');
const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', changeDisplay));