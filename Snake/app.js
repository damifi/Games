document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10    //width of the board
    let currentIndex = 0 //position of the snake
    let mouseIndex = 0  //position of the mouse
    let currentSnake = [2,1,0] // div in the grid with value 2 represents the head, 0 represents the tail, 1 represents body parts

    let direction = 1 // snakes goes 1 div
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //function to start and restart the game
    function startGame() {
        //resetting the game state
        //remove all snakes from the divs so there is no snake at the beginning of this function
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        //remove the mouse class from the div
        squares[mouseIndex].classList.remove('mouse')
        score = 0
        //generate random mouse location
        randomMouse()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        //add snake classes to the divs in which the snake is currently in
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    //moveOutcomes handles all possible outcomes of the snake
    function moveOutcomes() {
        //snake collides with a border or with itself
        if (
            //currentSnake[0] represents the head of the snake
            (currentSnake[0] + width >= (width*width) && direction === width) || //the snake hits the bottom of the board
            (currentSnake[0] % width === width -1 && direction === 1) || //the snake hits the right wall of the board
            (currentSnake[0] % width === 0 && direction === -1) || // the snake hits the left wall of the board
            (currentSnake[0] - width < 0 && direction === -width) || //the snake hits the top of the board
            squares[currentSnake[0] + direction].classList.contains('snake') // the snake hits itself
        ) {
            return clearInterval(interval) //clear the interval of the game
        }

        //remove the last element of the array of the snake (the tail) and return it
        const tail = currentSnake.pop()
        //remove the class of snake from the div holdint the tail
        squares[tail].classList.remove('snake')
        //add the current head + its direction at the beginning of the array
        currentSnake.unshift(currentSnake[0] + direction)

        //snake collides with mouse
        if (squares[currentSnake[0]].classList.contains('mouse')) {
            // remove the mouse class from the div
            squares[currentSnake[0]].classList.remove('mouse')
            //make the snake longer by adding the snake class to the div with the tail of the snake
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            //move the mouse to a random location
            randomMouse()
            //increase the score of the player
            score++
            scoreDisplay.innerText = score
            clearInterval(interval)
            //increase the interval time of the game as the snake grows
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }
    //configure what functions happen when pressing keys (keycodes)
    //input: e: event(key pressed on keyboard)
    function control(e) {
        //removing snake from a square
        squares[currentIndex].classList.remove('snake')

           //movement of the snake
        if(e.keyCode === 39) {
            direction = 1 // move the snake to the right if right arrow is pressed
        } else if (e.keyCode === 38) {
            direction = -width // move the snake up one width if the up arrow is pressed
        } else if (e.keyCode === 37) {
            direction = -1 // move the snake to the left if left arrow is pressed
        } else if (e.keyCode === 40) {
            direction = width // if down arrow is pressed move the snake down one width
        }


    }

    //generate a random position on the board for the mouse
    function randomMouse() {
        do{
            mouseIndex = Math.floor(Math.random() * squares.length)
        } while(squares[mouseIndex].classList.contains('snake')) //move the mouse to a random position, aslong as it is not on a div with snake
        squares[mouseIndex].classList.add('mouse')
      }
 

    //event listener to execute the control function every time a key is pressed
    document.addEventListener('keyup', control)
    //link the button in the html file with an event listener to start the game
    startBtn.addEventListener('click', startGame)

})