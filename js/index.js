
// Game constants and variables
let inputDir = {x:0, y: 0}
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
let speed = 5
let score = 0
let lastPaintTime = 0
let gridSize = 18
let snakeArr = [
    {x:13, y: 15},
    {x:12, y: 15}
]
let food = {x:12, y:6}
let highScoreVal;
// Game functions
function main(ctime){
    window.requestAnimationFrame(main)
    //console.log(ctime)
    if(((ctime-lastPaintTime)/1000) < (1/speed)){
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}

function isCollide(sarr){
    for(let index = 1; index<sarr.length; ++index)
    {
        if(sarr[0].x === sarr[index].x && sarr[0].y === sarr[index].y)
        {
            return true;
        }
    }
    // Collision into wall
    if(sarr[0].x<0 || sarr[0].x>gridSize || sarr[0].y<0 || sarr[0].y>gridSize)
    {
        return true;
    }
    return false;
}

function gameEngine(){
    musicSound.play()
    // Updating snake and food
    // If snake collides into itself
    speed = 5 + (snakeArr.length)/5;
    if(isCollide(snakeArr)){
        gameOverSound.play()
        musicSound.pause()
        inputDir = {x:0, y:0}
        alert("Game Over! Press any key to play again")
        snakeArr = [{x:13, y: 15}]
        musicSound.play()
        score = 0
    }

    // If snake eats the food then, increase score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        foodSound.play()
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        if(score>highScoreVal){
            highScoreVal = score
            localStorage.setItem("highScore", JSON.stringify(highScoreVal))
            highScoreBox.innerHTML = "High Score: " + highScoreVal;
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let startIndex = 2;
        let endIndex = 16;
        food = {x: Math.round(startIndex + (endIndex-startIndex)*Math.random()), y: Math.round(startIndex + (endIndex-startIndex)*Math.random())}
    }


    // Moving the snake
    for(let bodyIndex = snakeArr.length - 2; bodyIndex>=0; bodyIndex--)
    {
        snakeArr[(bodyIndex+1)] = {...snakeArr[(bodyIndex)]}
    }
    // Trying to make no boundaries for the snake (try the locgic to update from head)
    snakeArr[0].x += inputDir.x
    //snakeArr[0].x %= gridSize
    snakeArr[0].y += inputDir.y
   // snakeArr[0].y %= gridSize

    // Displaying snake and food
    // Displaying snake
    board.innerHTML = ""
    snakeArr.forEach((e, index)=>{

        // Create a new snake Element
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if(index===0)
        {
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);    
    })

    // Displaying Food 
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}






// Main logic
let highScore = localStorage.getItem("highScore");
if(highScore === null || highScore === 'undefined'){
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal))
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScoreVal;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1}
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0
            inputDir.y = -1
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0
            inputDir.y = 1
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1
            inputDir.y = 0
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1
            inputDir.y = 0
            break;

        Default:
            break;
    }
})
