
const calculator = [
    [7,8,9,"/"],
    [4,5,6,"*"],
    [1,2,3,"-"],
    [0,'C','+',"="],
]


const buttons = document.querySelectorAll('[data-button]')

let firstNumber;
let secondNumber = [];
let operationSign

const calculatorWrapper = document.createElement('div');
calculatorWrapper.classList.add('wrapper')

const screen = document.createElement('div')
const battery = document.createElement('p');
battery.id = 'batteryScreen'

const input = document.createElement('input');
input.setAttribute('type', 'text')
screen.classList.add('screen')

const table = document.createElement('table');
const tbody = document.createElement('tbody');
const date = new Date();
let percentage = 50;



function chargeBattery(){
    if(date.getHours() > 7 && date.getHours() < 18) {
        if(percentage === 100) {
            return 
        }
        percentage += 1
        battery.innerText = `${percentage}%`
    }
    
}
battery.innerText = `${percentage}%`

setInterval(chargeBattery, 10000)



function populateAndCalculate(){
    calculator.forEach((element) => {
        const tr = document.createElement('tr')

        for(let i = 0; i < element.length ; i++){
            const td = document.createElement('td')
            td.setAttribute('data-button', '')

            td.addEventListener('click', () => {
                if(td.innerText == 'C') {
                    firstNumber = null;
                    secondNumber = [];
                    operationSign = null;
                     return input.value = ''
                }

                if(isNaN(td.innerText) && td.innerText !== '=' ){
                    if(operationSign){
                        return
                    }
                }
                
                if(isNaN(td.innerText) && td.innerText !== '='){

                    operationSign = td.innerText
                }

                if(td.innerText === "+" || td.innerText === '-' || td.innerText === "*"  || td.innerText === "/" ) {
                    firstNumber = parseFloat(input.value)
                } 

                if(firstNumber && !isNaN(td.innerText)) {
                        secondNumber.push(td.innerText)
                }


                if(td.innerText === '='){
                    percentage -= 5;
                    battery.innerText = `${percentage}%`

                    if(percentage <= 0){
                        percentage = 0
                        battery.innerText = 'No Battery'
                        return
                    }

                    if(firstNumber && secondNumber){

                        switch(operationSign) {
                            case '+':
                                input.value = sum(firstNumber, (parseFloat(secondNumber.join(''))))
                                secondNumber = []
                                operationSign = null
                                return
                                
                            case '-':
                                input.value = minus(firstNumber, (parseFloat(secondNumber.join(''))))
                                secondNumber = []
                                operationSign = null
                                return

                                case '*':
                                input.value = product(firstNumber, (parseFloat(secondNumber.join(''))))
                                secondNumber = []
                                operationSign = null
                                return

                            case '/':
                                input.value = divide(firstNumber, (parseFloat(secondNumber.join(''))))
                                secondNumber == 0 ? input.value = "You cant divide by 0" : -1
                                secondNumber = []
                                operationSign = null
                                return
                            }
                            
                    }
                }
                
                input.value += td.innerText 
            })
            td.innerText = element[i]

            tr.append(td)
        }
        tbody.append(tr)
        })
          
    }



populateAndCalculate()


function sum(num1, num2){
    return num1 + num2
}

function minus(num1, num2){
    return num1 - num2
}

function product(num1, num2){
    return num1 * num2
}

function divide(num1, num2){
    return num1 / num2
}



// td.addEventListener('click', () => {

// }}
// )




// calculator.forEach((element) => {
// element.setAttribute('onclick', typingOninput())
// firstNumber = element
// })


document.body.append(calculatorWrapper)
calculatorWrapper.append(screen, table)
screen.append(battery,input)
table.append(tbody)
