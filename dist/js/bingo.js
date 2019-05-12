//Bingo app goes here

/**
 * things to do
 * inside of  randomNumberGenerator() create a conditional to check if the number exists within the usedNumbers array.
 * When the number has been called, mark off the numbers under Number Display.
 * Do an array with 90 numbers, an then the random number will pull the number from the array
 * */

 //generate player card when the dom has finished loading
window.addEventListener('domContentLoaded', () => {
    console.log('loaded');
});

const bingoNumber = [];
const usedNumbers = [];


/**
 * generates a random number between 90 and 1, and does a check on the next number if it has been called, if number has been called then repeat with a recursive function until a non used value
 */

function getNumber() {
    
    var generate = Math.round(Math.random() * (91 - 1));

    //console.log(`generated key ${generate}`);

        if ( usedNumbers.includes(generate) ) {
        
            //using a recursive function to call a new value until
            //the new value is not in the used numbers array
            //console.log('new number needed as ' + generate );
            return getNumber();
            
        }
    

    //checks if the value exists in the bingoNumber array
    var index = bingoNumber.indexOf(generate);
    
    //if index is greater than -1 then it will remove the element from the bingoNumber array
    if ( index > -1 ) {
        bingoNumber.splice(index, 1);
    } 


    //marks off called number, but subtract the returned number by one to get the key value to be used in the querySelectorAll('input')
    var mark = (generate - 1);
    markCalledNumbers(mark);

    return generate;

}

/**
 * 
 * @param {int} markNumber the current called number
 * find the number within the querySelectorAll of all inputs and set the class of marked
 */

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

/**
 * Creates bingo bored nad populates with the bingo numbers and populates the bignoNumber array
 */
function displayNumbers()
{

    //generates numbers 1 - 90 check test2
    for(let i = 1; i <= 90; i++){
        
         createElement(i);
         bingoNumber.push(i);
    }

}

/**
 * displayNextNumber gets a number generated from getNumber and then appends the number to the text content of #number-holder, an then pushes the called number to the usedNumbers array
 */

function displayNextNumber()
{
    //generates number between 1 and 90
    var generatedNumber = getNumber();
    
    var numberHolder = document.querySelector('#number-holder');
    

    numberHolder.textContent = generatedNumber;
    usedNumbers.push(generatedNumber);
   
}

displayNumbers();

//timer to call random number
let counter = 0;
var startInterval = () => {

    const stop = document.querySelector('#start');
    stop.textContent = 'Stop Bingo';
    stop.removeAttribute('onlick');
    stop.setAttribute('onlick', 'stopInterval()');
    setInterval(() => {
        displayNextNumber();
        counter++;

        //testing purposes to track calls and numbers left
        //console.log(counter);
        //console.log(usedNumbers);
        //console.log(bingoNumber);

        //stops setInterval when counter hits 90
        if (counter == 90) {
            stopInterval(startInterval);
        }
    
    }, 5000);
}


function generatePlayingCard(int)
{

}

const stopInterval = () => {
    
    clearInterval(startInterval);
    const stop = document.querySelector('#start');
    stop.setAttribute('onlick', 'startInterval()');
    stop.textContent = 'Start Bingo';
}

