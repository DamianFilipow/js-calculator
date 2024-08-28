import { useState } from 'react'
import { evaluate } from 'mathjs'


function Calculator() {

    const [display, setDisplay] = useState({
        result: '',
        current: '0',
        lastChar: '',
    })


    const isInvalid = (s, regexs) => {
        return regexs.some(regex => regex.test(s))
    }

    const handleClear = () => {
        setDisplay({
            result: '0',
            current: '0',
            lastChar: '',
        })
    }

    const handleEquals = () => {
        try {
            const evaluatedValue = display.result ? evaluate(display.result + display.current) : evaluate(display.current)
            setDisplay(d => ({
                ...d,
                result: evaluatedValue.toString(),
                current: evaluatedValue.toString(),
                lastChar: '=',
            }))
        } catch (error) {
            setDisplay({
                result: "Error",
                current: "Error",
                lastChar: '',
            });
        }
    }

    const handleDecimal = (newResult) => {

        const dotRegex = [/(?<=\.)\d*\./, /[\.\+\*\-\/]\./];

        if (isInvalid(newResult, dotRegex)) {
            return newResult.slice(0, -1)
        }

        return newResult
    }

    const handleOperator = (newResult, operator) => {

        const operatorRegex = [/\.[\+\*\/\-]/]

        const replaceRegex = [/[\*\+\/][\+\/\*]/]

        const doubleOperator = /[-\*\+\/][-\*\+\/]{2}/;

        const isDoubleOperator = doubleOperator.test(newResult)

        if (isInvalid(newResult, operatorRegex)) {
            return newResult.slice(0, -1)
        }

        else if (isInvalid(newResult, replaceRegex) || isDoubleOperator) {

            if(isDoubleOperator) {
                return newResult.slice(0, -3) + operator
            }
            console.log(newResult)
            return newResult.slice(0, -2) + operator
        }

        return newResult
    }

    const handleAppend = (event) => {

        const operators = ['*', '-', '+', '/']

        const newValue = event.target.innerText;

        let newDisplay = display.current === '0' || display.current === 'Error' || display.lastChar === '=' ? newValue : display.current + newValue; 

        if (newValue === '.') {
            newDisplay = handleDecimal(newDisplay)
        }

        else if (operators.includes(newValue)) {
            console.log('operator detected')
            newDisplay = handleOperator(newDisplay, newValue)
        }

        setDisplay(d => ({
            ...d,
            current: newDisplay,
            lastChar: newValue
        }))
    }

    return(
        <div className='calculator'> 
            <input id='display' readOnly value={display.current} />
            <div id='clear' className='button' onClick={handleClear}>AC</div>
            <div id='equals' className='button' onClick={handleEquals}>=</div>
            <div className='numbers'>
                <div id='one' className='number-button button' onClick={handleAppend}>1</div>
                <div id='two' className='number-button button' onClick={handleAppend}>2</div>
                <div id='three' className='number-button button' onClick={handleAppend}>3</div>
                <div id='four' className='number-button button' onClick={handleAppend}>4</div>
                <div id='five' className='number-button button' onClick={handleAppend}>5</div>
                <div id='six' className='number-button button' onClick={handleAppend}>6</div>
                <div id='seven' className='number-button button' onClick={handleAppend}>7</div>
                <div id='eight' className='number-button button' onClick={handleAppend}>8</div>
                <div id='nine' className='number-button button' onClick={handleAppend}>9</div>
                <div id='zero' className='number-button button' onClick={handleAppend}>0</div>
                <div id='decimal' className='number-button button' onClick={handleAppend}>.</div>
                <div id='subtract' className='button ari-button' onClick={handleAppend}>-</div>
                <div id='add' className='button ari-button' onClick={handleAppend}>+</div>
                <div id='divide' className='button ari-button' onClick={handleAppend}>/</div>
                <div id='multiply' className='button ari-button' onClick={handleAppend}>*</div>
            </div>
        </div>
    )
}

export default Calculator