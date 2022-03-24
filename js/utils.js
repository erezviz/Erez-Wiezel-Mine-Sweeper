'use strict'

//!  ------   GET RANDOM INT   ------------
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    //The maximum is exclusive and the minimum is inclusive
}


//TODO  --------------$ EXPAND EMPTY NEIGHBORS $--------------- 
function expandEmptyNegs(board, cellI, cellJ) {

    var negsBlownCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMarked) continue
            if (board[i][j].isMine) continue
            if (!board[i][j].isShown) {

                board[i][j].isShown = true
                negsBlownCount++


                document.querySelector(`.cell-${i}-${j}`).classList.remove('hidden')
            }


        }

    }
    return negsBlownCount
}



//TODO  -------------$  GET MINES RANDOM  $--------------
function getMinesRandom(mineNum) {

    for (var i = 0; i < mineNum; i++) {

        var randIdxI = getRandomInt(0, gBoard.length)
        var randIdxj = getRandomInt(0, gBoard.length)
        gBoard[randIdxI][randIdxj].isMine = true
        gBoard[randIdxI][randIdxj].symbol = MINE
        console.log(i);

    }

}



//TODO -----------  PRINT BOARD  (FOR CONSOLE USE)---------------
function printBoard(board) {
    var boardSymbolValues = []
    for (var i = 0; i < board.length; i++) {
        boardSymbolValues[i] = []
        for (var j = 0; j < board.length; j++) {

            boardSymbolValues[i][j] = board[i][j].symbol
        }
    }
    console.table(boardSymbolValues)
}