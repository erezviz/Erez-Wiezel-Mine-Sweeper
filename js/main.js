'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''
const GAME_OVER = '☠️'
const GAME_WON = '😎'
const GAME_ON = '😃'


var gIntervalId = undefined
var gBoard
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = {
        SIZE: 4,
        MINES: 2
    }
    //TODO  -------------$  INITIALIZE GAME  $--------------
function initGame() {

    clearInterval(gIntervalId)


    gBoard = createBoard(gLevel.SIZE)
    getMinesRandom(gLevel.MINES)


    printBoard(gBoard)
    renderBoard(gBoard, '.board-container')
    printBoard(gBoard)
    console.log(gLevel.MINES);

}

//TODO -------  LEVEL SELECTOR  ----------

function levelSelector(level) {
    if (level === gLevel.SIZE) return
    if (gGame.isOn && gGame.secsPassed) return
    switch (level) {
        case 4:
            gLevel.SIZE = 4
            gLevel.MINES = 2
            break
        case 8:
            gLevel.SIZE = 8
            gLevel.MINES = 12
            break
        case 12:
            gLevel.SIZE = 12
            gLevel.MINES = 32
            break

    }

    initGame()

}


//TODO ----------$ CHECK WIN $------------
function checkWin() {
    console.log('marked', gGame.markedCount);
    console.log('shown', gGame.shownCount);
    console.log('glevel size squared - mines', (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES);
    if (gGame.markedCount === gLevel.MINES &&
        (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES === gGame.shownCount) {
        clearInterval(gIntervalId)
        gGame.isOn = false
        document.querySelector('.game-btn').innerText = GAME_WON


    }
}
//TODO ------------ RESTART GAME  -----------------
function restartGame(elBtn) {

    elBtn.innerText = GAME_ON

    clearInterval(gIntervalId)

    gGame.isOn = false
    gGame.secsPassed = 0
    gGame.markedCount = 0
    gGame.shownCount = 0
    document.querySelector('.marked-count').innerText = gGame.markedCount
    document.querySelector('.timer').innerText = gGame.secsPassed
    initGame()
}



//TODO  -------------$  CREATE BOARD  $--------------
function createBoard(SIZE) {

    var board = []
    for (var i = 0; i < SIZE; i++) {

        board[i] = []
        for (var j = 0; j < SIZE; j++) {

            board[i][j] = {
                    minesAroundCount: 0,
                    isShown: false,
                    isMine: false,
                    isMarked: false,
                    symbol: EMPTY
                }
                // var cell = board[i][j]

            // var negsMineCount = setMineNegsCount(i, j, board)

            // if (negsMineCount !== 0 && !cell.isMine) {

            //     cell.minesAroundCount = negsMineCount
            //     cell = negsMineCount
            // } else if (negsMineCount === 0 && !cell.isMine) {

            //     cell = EMPTY
            // }
            // if (cell.isMine) {

            //     cell.minesAroundCount = negsMineCount
            //     cell = MINE
            // }
        }


    }

    return board
}



//TODO  -------------$  SET MINE NEIGHBORS COUNT  $--------------
function setMineNegsCount(cellI, cellJ, board) {
    var mineNegsCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue

            if (board[i][j].isMine) mineNegsCount++

        }
    }

    return mineNegsCount
}

//TODO  -------------$  RENDER BOARD  $--------------
function renderBoard(board, selector) {

    var strHTML = `<table><tbody>`;
    for (var i = 0; i < board.length; i++) {

        strHTML += `<tr class="row">`
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            var cellTxt = EMPTY

            var className = `cell cell-${i}-${j}`
            var negsMineCount = setMineNegsCount(i, j, board)

            if (negsMineCount !== 0 && !cell.isMine) {

                cell.symbol = negsMineCount
                cell.minesAroundCount = negsMineCount
                cellTxt = negsMineCount
            } else if (negsMineCount === 0 && !cell.isMine) {

                cellTxt = EMPTY
            }
            if (cell.isMine) {


                cell.minesAroundCount = negsMineCount
                className += ' mine'
                cellTxt = MINE

            }

            var hidden = ''
            if (!cell.isShown) hidden = ' hidden'
            className += hidden


            strHTML += `<td data-i="${i}" data-j="${j}" onmouseup="cellMarked(event,this,${i},${j})"onclick="cellClicked(this,${i},${j})" class="${className}" >${cellTxt}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody></table>`
    var elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}



//TODO  -------------$  CELL CLICKED  $--------------
function cellClicked(elCell, cellI, cellJ) {
    if (gGame.shownCount === 0) gGame.isOn = true

    if (gBoard[cellI][cellJ].isShown) return

    if (gBoard[cellI][cellJ].isMarked) return

    if (elCell.classList.contains('flagged')) return

    if (gGame.isOn) {

        gGame.shownCount++

            if (gBoard[cellI][cellJ].isMine) {
                gameOver()


            }
        if (elCell.innerText === EMPTY) {
            console.log('im empty');

            var negsBlown = expandEmptyNegs(gBoard, cellI, cellJ)
            gGame.shownCount += negsBlown
            console.log('negs blown', negsBlown);
        }
        if (gGame.isOn && gGame.shownCount === 1) {
            console.log('in timer interval');
            gIntervalId = setInterval(gameTimer, 1000)
        }


        gBoard[cellI][cellJ].isShown = true
        elCell.classList.remove('hidden')
        checkWin()
    } else {
        return
    }



}
//TODO  -------------  TIMER  --------------
function gameTimer() {

    document.querySelector('.timer').innerText = ++gGame.secsPassed
}

//TODO  -------------  CELL MARKED  --------------
function cellMarked(ev, elCell) {
    elCell.addEventListener("contextmenu", ev => ev.preventDefault())



    if (gGame.isOn) {

        if (ev.button === 2) {

            elCell.classList.toggle('flagged')
            if (elCell.classList.contains('flagged')) {
                gGame.markedCount++
                    gBoard[+elCell.dataset.i][+elCell.dataset.j].isMarked = true

                document.querySelector('.marked-count').innerText = gGame.markedCount
                checkWin()
            } else {
                gGame.markedCount--
                    document.querySelector('.marked-count').innerText = gGame.markedCount
                gBoard[+elCell.dataset.i][+elCell.dataset.j].isMarked = false
                checkWin()
            }
        }
    }


}

//TODO ----------- GAME OVER ----------------
function gameOver() {
    clearInterval(gIntervalId)
    gGame.isOn = false
    var elMines = document.querySelectorAll('.mine')
    document.querySelector('.game-btn').innerText = GAME_OVER
    for (var i = 0; i <= gLevel.MINES; i++) {
        elMines[i].classList.remove('hidden')


    }

}