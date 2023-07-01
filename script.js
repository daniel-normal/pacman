document.addEventListener('DOMContentLoaded', ()=>{
 const grid = document.querySelector('.grid')
 const displayScore = document.getElementById('score')
 let score = 0
 let shownScore = 0
 const width = 28
 const cells = []
 const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
 ]

//0 = pac-dot
//1 = wall
//2 = ghost's lair
//3 = power pellet
//4 = empty
function drawBoard(){
    for(let i = 0; i < layout.length; i++){
        const cell = document.createElement('div')
        grid.appendChild(cell)
        cells.push(cell)
        if(layout[i] === 0){
            cells[i].classList.add('pacDot')
        } else if(layout[i] === 1){
            cells[i].classList.add('wall')
        } else if(layout[i] === 2){
            cells[i].classList.add('ghost-lair')
        } else if(layout[i] === 3){
            cells[i].classList.add('power-pellet')
        }
    }
}
drawBoard()
//draw pacman
let pacmanCurrentIndex = 490
cells[pacmanCurrentIndex].classList.add('pacman')
//move pacman
function movePacman(e){
    cells[pacmanCurrentIndex].classList.remove('pacman')
    switch(e.keyCode){
        case 37:
            if(pacmanCurrentIndex % width !== 0 && !cells[pacmanCurrentIndex-1].classList.contains('wall') && !cells[pacmanCurrentIndex-1].classList.contains('ghost-lair')){
                pacmanCurrentIndex -= 1
            }

            if(pacmanCurrentIndex - 1 == 363){
                pacmanCurrentIndex = 391
            }
            break;
        case 38:
            if(pacmanCurrentIndex - width > 0 && !cells[pacmanCurrentIndex-width].classList.contains('wall') && !cells[pacmanCurrentIndex-width].classList.contains('ghost-lair')){
                pacmanCurrentIndex -= width
            }
            break;
        case 39:
            if(pacmanCurrentIndex % width < width - 1 && !cells[pacmanCurrentIndex+1].classList.contains('wall') && !cells[pacmanCurrentIndex+1].classList.contains('ghost-lair')){
                pacmanCurrentIndex += 1
            }

            if(pacmanCurrentIndex + 1 == 392){
                pacmanCurrentIndex = 364
            }
            break;
        case 40:
            if(pacmanCurrentIndex + width < width*width && !cells[pacmanCurrentIndex+width].classList.contains('wall') && !cells[pacmanCurrentIndex+width].classList.contains('ghost-lair')){
                pacmanCurrentIndex += width
            }
            break;
    }
    cells[pacmanCurrentIndex].classList.add('pacman')
    console.log(pacmanCurrentIndex)

    eatPacdot()
    eatPowerPellet()
    checkForWin()
    checkForGameOver()
}

document.addEventListener('keyup', movePacman)

function eatPacdot(){
    if(cells[pacmanCurrentIndex].classList.contains('pacDot')){
        score++
        shownScore++
        displayScore.innerHTML = shownScore
        cells[pacmanCurrentIndex].classList.remove('pacDot')
    }
}

function eatPowerPellet(){
    if(cells[pacmanCurrentIndex].classList.contains('power-pellet')){
        score += 10
        shownScore += 10
        displayScore.innerHTML = shownScore
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhost, 10000)
        cells[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}

function unScareGhost(){
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost{
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.isScared = false
    }
}

const ghosts = [
    new Ghost('blinky', 348, 300),
    new Ghost('pinky', 351, 100),
    new Ghost('inky', 376, 200),
    new Ghost('clyde', 379, 250),
    new Ghost('sue', 379, 150)
]

ghosts.forEach(ghost =>{
    cells[ghost.currentIndex].classList.add(ghost.className)
    cells[ghost.currentIndex].classList.add('ghost')
})

ghosts.forEach(ghost =>
    moveGhost(ghost)
)


function moveGhost(ghost){
    const directions = [-1, -width, 1, width]
    let DIRECTION = directions[Math.floor(Math.random()*directions.length)]
    ghost.timerId = setInterval(function(){
        if(!cells[ghost.currentIndex+DIRECTION].classList.contains('wall') && !cells[ghost.currentIndex+DIRECTION].classList.contains('ghost')){
            //ghost can go there
            cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scaredGhost')
            ghost.currentIndex += DIRECTION
            cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        } else{
            if(cells[ghost.currentIndex].classList.contains('ghost-lair')){
                DIRECTION = directions[Math.floor(Math.random()*(directions.length-1))]
            } else{
                DIRECTION = directions[Math.floor(Math.random()*directions.length)]
            }
        }

        if(ghost.isScared){
            cells[ghost.currentIndex].classList.add('scaredGhost')
        }

        if(ghost.isScared && cells[ghost.currentIndex].classList.contains('pacman'))
        {
            shownScore += 100
            displayScore.innerHTML = shownScore
            cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scaredGhost')
            ghost.currentIndex = ghost.startIndex
            cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')          
        }       
            checkForGameOver()
    }, ghost.speed)
}

    function checkForGameOver(){
        if(cells[pacmanCurrentIndex].classList.contains('ghost') && !cells[pacmanCurrentIndex].classList.contains('scaredGhost')){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            displayScore.innerHTML = 'GAME OVER'
        }
    }

    function checkForWin(){
        if(score >= 274){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            displayScore.innerHTML = 'YOU WIN'
        }
    }

})

