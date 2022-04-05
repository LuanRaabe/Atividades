let calculator = () => {
    let operand1 = null;
    let operand2 = null;
    let operation = null;
    const setOperand1 = (data) => {
        operand1 = data;
    }

    const setOperand2 = (data) => {
        operand2 = data;
    }

    const setOperation = (data) => {
        operation = data;
    }
    const clearCalculator = () => {
        operand1 = null;
        operand2 = null;
        operation = null;
    }
    const getResult = () => {
        if (!operand1 || !operand2) return "Defina operadores";
        switch (operation) {
            case "+": return operand1 + operand2;
            case "-": return operand1 - operand2;
            case "*": return operand1 * operand2;
            case "÷": return operand1 / operand2;
            default: return "Defina operação";
        }
    }
    return { setOperand1, setOperand2, setOperation, clearCalculator, getResult };
}

function calculate(operand1, operand2, operator) {
    let calc = calculator();
    calc.setOperand1(Number(operand1));
    calc.setOperand2(Number(operand2));
    calc.setOperation(operator);
    return calc.getResult();
}

module.exports = {calculate};