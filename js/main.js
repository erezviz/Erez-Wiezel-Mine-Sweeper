'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''
const GAME_OVER = '☠️'
const GAME_WON = '😎'
const GAME_ON = '😃'
var gTimerIntervalId
var gBoard
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = {
        SIZE: 4,
        MINES: 1
    }
    //TODO  -------------$  INITIALIZE GAME  $--------------
function initGame() {
    if (gTimerIntervalId) clearInterval(gTimerIntervalId)

    gBoard = createBoard(gLevel.SIZE)
    getminesRandom(gLevel.MINES)


    printBoard(gBoard)
    renderBoard(gBoard, '.board-container')
    printBoard(gBoard)

}


//TODO ---------- 
// first test: we have a mat!
// var test = createBoard(gLevel.SIZE)
// console.log('expect a 4x4 table of objects\t');
// console.table(test)
//TODO ---------- CHECK WIN ------------
function checkWin() {
    // var elMines = document.querySelectorAll('.mine')
    // var minesFlagged = 0
    // for(var i = gLevel.MINES; i>0; i--){
    //     if(elMines.classList.contains('flagged')){
    //         minesFlagged++
    //     }
    // }
    console.log('gGame.markedCount', gGame.markedCount);
    console.log('gLevel.MINES', gLevel.MINES);
    console.log('gLevel.SIZE x gLevel.SIZE', gLevel.SIZE * gLevel.SIZE);
    console.log('shownCount', gGame.shownCount);
    if (gGame.markedCount === gLevel.MINES &&
        (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES === gGame.shownCount) {
        clearInterval(gTimerIntervalId)
        document.querySelector('.game-btn').innerText = GAME_WON
        console.log('you Won!');
    }
}
//TODO ------------ RESTART GAME  -----------------
function restartGame(elBtn) {
    elBtn.innerText = GAME_ON
    gGame.isOn = false
    gGame.secsPassed = 0
    gGame.markedCount = 0
    gGame.shownCount = 0
    initGame()




}
//TODO -----------  PRINT BOARD  (FOR CONSOLE USE)---------------
function printBoard(board) {
    var boardSym = []
    for (var i = 0; i < board.length; i++) {
        boardSym[i] = []
        for (var j = 0; j < board.length; j++) {

            boardSym[i][j] = board[i][j].symbol

        }

    }
    console.table(boardSym)
}

// second test: we have mine neighbors!!
// var test = createBoard(gLevel.SIZE)
// console.log('expected: 0,1;1,0;1,1 have minesaroundcount of: 2. Actual: \t');
// console.table(test)
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
            var cell = board[i][j]




            var negsMineCount = setMineNegsCount(i, j, board)

            if (negsMineCount !== 0 && !cell.isMine) {

                cell.minesAroundCount = negsMineCount
                cell = negsMineCount
            } else if (negsMineCount === 0 && !cell.isMine) {

                cell = EMPTY
            }
            if (cell.isMine) {

                console.log('in mine if');
                cell.minesAroundCount = negsMineCount

                cell = MINE

            }
        }


    }




    // console.table(board)
    return board
}

//TODO  -------------$  GET MINES RANDOM  $--------------
function getminesRandom(mineNum) {

    for (var i = mineNum; i > 0; i--) {

        var randIdxI = getRandomInt(0, gBoard.length - 1)
        var randIdxj = getRandomInt(0, gBoard.length - 1)
        gBoard[randIdxI][randIdxj].isMine = true
        gBoard[randIdxI][randIdxj].symbol = MINE

    }

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
//TODO  --------------  COPY BOARD  ---------------
function copyBoard(board) {
    var newBoard = [];
    for (var i = 0; i < board.length; i++) {
        newBoard[i] = [];
        for (var j = 0; j < board[0].length; j++) {
            newBoard[i][j] = board[i][j];
        }
    }
    return newBoard;
}

//TODO  -------------$  RENDER BOARD  $--------------
function renderBoard(board, selector) {

    var strHTML = `<table><tbody>`;
    for (var i = 0; i < board.length; i++) {

        strHTML += `<tr>`
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


            strHTML += `<td onmouseup="cellMarked(event,this)"onclick="cellClicked(this,${i},${j})" class="${className}" >${cellTxt}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody></table>`
    var elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

//TODO  -------------$  CELL CLICKED  $--------------
function cellClicked(elCell, cellI, cellJ) {
    if (gBoard[cellI][cellJ].isShown) return
    if (gBoard[cellI][cellJ].isMarked) return
    if (elCell.classList.contains('flagged')) return
    if (gGame.shownCount === 0) gGame.isOn = true
    if (gBoard[cellI][cellJ].isMine) {
        gameOver()
        gGame.isOn = false
    }
    gameTimer()
    gGame.shownCount++
        checkWin()
    console.log('gGame.shownCount in cellClicked', gGame.shownCount);
    gBoard[cellI][cellJ].isShown = true
    elCell.classList.remove('hidden')


}
//TODO  -------------  TIMER  --------------
function gameTimer() {
    if (gTimerIntervalId) return
    if (gGame.isOn) {


        gTimerIntervalId = setInterval(function() {

            document.querySelector('.timer').innerText = ++gGame.secsPassed

        }, 1000);
    }
}

//TODO  -------------  CELL MARKED  --------------
function cellMarked(ev, elCell) {
    elCell.addEventListener("contextmenu", ev => ev.preventDefault())

    if (ev.button === 2) {

        elCell.classList.toggle('flagged')
        if (elCell.classList.contains('flagged')) {
            gGame.markedCount++
                checkWin()
        } else {
            gGame.markedCount--
                checkWin()
        }
    }
    // console.log(gGame.markedCount);

}

//TODO ----------- GAME OVER ----------------
function gameOver() {
    console.log(gTimerIntervalId);
    clearInterval(gTimerIntervalId)
    var elMines = document.querySelectorAll('.mine')
    document.querySelector('.game-btn').innerText = GAME_OVER
    for (var i = 0; i <= gLevel.MINES; i++) {
        elMines[i].classList.remove('hidden')
        console.log(elMines[i].classList.remove('hidden'));

    }

}



//!  ------   GET RANDOM INT   ------------
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    //The maximum is exclusive and the minimum is inclusive
}