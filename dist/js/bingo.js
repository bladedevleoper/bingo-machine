//Bingo app goes here

/**
 * things to do
 * inside of  randomNumberGenerator() create a conditional to check if the number exists within the usedNumbers array.
 * When the number has been called, mark off the numbers under Number Display.
 * Do an array with 90 numbers, an then the random number will pull the number from the array
 * */

window.addEventListener('domContentLoaded', () => {
    console.log('loaded');
});

const bingoNumber = [];
const usedNumbers = [];


function getNumber() {
    //var generate = Math.round(Math.random() * (90-1));
    var generate = Math.round(Math.random() * (91 - 1));

    console.log(`generated key ${generate}`);

        if ( usedNumbers.includes(generate) ) {
        
            //using a recursive function to call a new value until
            //the new value is not in the used numbers array
            console.log('new number needed as ' + generate );
            return getNumber();
            
        }
        
    var index = bingoNumber.indexOf(generate);
    
    if ( index > -1 ) {
        bingoNumber.splice(index, 1);
    } 

    // const all = document.querySelector('#numbers');
    // var span = all.querySelectorAll('input');
    // console.log(span[0].value);

    //marks off called number on board
    var mark = (generate - 1);
    markCalledNumbers(mark);

    // const all = document.querySelector('#numbers');
    // var span = all.querySelectorAll('input');


    //will mark the called number, had to minus the generate variable by 1 as this isn't the same keys as usedNumber array
    //this will allow for the exact number to be called
    
    

    //console.log('bingo numbers left' + ' ' + bingoNumber);
    return generate;

}


function markCalledNumbers(markNumber)
{
    const all = document.querySelector('#numbers');
    var span = all.querySelectorAll('input');

    span[markNumber].setAttribute('class', 'no-border marked');
   
}

/**
 * Function creates the html for the numbers
 * @param {int} number sets the values
 * 
 */

function createElement(number)
{
    var divNumber = document.querySelector('#numbers');

    
    var div = document.createElement('div');
    div.setAttribute('class', 'display-number');
    var span = document.createElement('input');
    span.setAttribute('class', 'no-border');
    span.setAttribute('value', number);
    div.appendChild(span);
    divNumber.append(div);


}


function displayNumbers()
{

    //generates numbers 1 - 90 check test
    for(let i = 1; i <= 90; i++){
        
         createElement(i);
         bingoNumber.push(i);
    }

}


function randomNumberGenerator(number)
{
    //generates number between 1 and 90
    var generatedNumber = getNumber();
    
    var numberHolder = document.querySelector('#number-holder');
    

    numberHolder.textContent = generatedNumber;
    usedNumbers.push(generatedNumber);
   
}

displayNumbers();
//callNumber();


//timer to call random number
let counter = 0;
var interval = setInterval(() => {
    randomNumberGenerator();
    counter++;
    console.log(counter);
    console.log(usedNumbers);
    console.log(bingoNumber);
 

    //stops setInterval when counter hits 90
    if (counter == 90) {
        clearInterval(interval);
    }


}, 5000);

