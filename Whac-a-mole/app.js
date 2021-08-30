//select all divs with class name of square from html file and call them sqaure
const square = document.querySelectorAll('.square')
//same for mole
const mole = document.querySelectorAll('.mole')
//use query selector to find the id of timeleft(# used for id instead of . for class names)
const timeLeft = document.querySelector('#time-left')
//for score use let as is will change during the game
let score = document.querySelector('#score')

//start the game
let result = 0
let currentTime = timeLeft.textContent

//select random square on the grid
function randomSquare() {
    //for all grid based games, remove any class from divs
    square.forEach(className => {
        className.classList.remove('mole')
    })
    //random position on the grid
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')

    //assign id of randomPosition to hitPosition
    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition) {
            result = result + 1
            score.textContent = result
        }
    })
})

//function to move the mole
function moveMole() {
    let timerId = null
    // every 1000 milliseconds the randomsquare function is called 
    timerId = setInterval(randomSquare, 1000)
}

moveMole()

//count down the timer by one incrementally and show the new time in the browser
function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    // if timer reaches zero: game over
    if(currentTime === 0) {
        clearInterval(timerId)
        alert('GAME OVER! Your score is ' + result)
    }
}

let timerId = setInterval(countDown, 1000)