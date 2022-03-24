'use strict'
//!  ------   GET RANDOM INT   ------------
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    //The maximum is exclusive and the minimum is inclusive
}


//!  ------   GET RANDOM INT INCLUSIVE  ------------
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    //The maximum is inclusive and the minimum is inclusive
}


//!  ------   GET RANDOM COLOR  ------------
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
} // function returns a random color. Can be used for any css color aspect (i.e. BG, color)


//!  ------   GET SUM COLS  ------------
function getSumCols(mat, colIdx) {
    var sumOfCols = 0
    for (var i = 0; i < mat.length; i++) {
        sumOfCols += mat[i][colIdx]
    } // function returns the sum of the column by a a given column index. 
    return sumOfCols

}

//!  ------   GET SUM ROW  ------------
function sumRow(mat, rowIdx) {
    var rowToSum = mat[rowIdx]
    var sumOfRows = 0
    for (var i = 0; i < rowToSum.length; i++) {
        sumOfRows += rowToSum[i]

    }
    return sumOfRows
        // function returns the sum of the row by the given index
}


//!  ------   IS MAT SYMMETRIC  ------------
function isMatSymmetric(mat) {
    for (var i = 0; i < mat.length - 1; i++) {
        for (var j = i + 1; j < mat[i].length; j++) {

            if (mat[i][j] !== mat[j][i]) return false
        }
    }
    return true
        // function returns boolean in regard to the symmetry of given mat.
}



//!  ------   DRAW NUM  ------------

//!   NOTE: THIS FUNCTION REQUIRES GET RANDOM INT FUNCTION AS WELL
function drawNum(nums) {

    var idx = getRandomInt(0, nums.length)
    var num = nums[idx]
    nums.splice(idx, 1)
        // THE SAME
        // var num = nums.splice(idx, 1)[0]
    return num
        // function draws a number randomely from an array of numbers, 
        // then splices it out, so as not to use it again. 
}

//!  ------   GET MAT \ CREATE BOARD ------------
function getMat(rows, cols) {
    var mat = []
    for (var i = 0; i < rows; i++) {
        mat[i] = []
        for (var j = 0; j < cols; j++) {
            mat[i][j] = i + ',' + j //  <= This must be changed to work with your code correctly
        }
    }
    return mat
} // function returns a 5x5 matrice (easily changed), 

//[[0,0],[0,1],[0,2],
//[[1,0],[1,1],[1,2],
//[[2,0],[2,1],[2,2]

//?  ------   PRINT BOARD------------ 
// function renderBoard(board, selector) {
//     var strHTML = '<table border="0"><tbody>';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {
//             var cell = board[i][j].minesAroundCount
//             var className = `cell cell-${i}-${j}`
//             strHTML += `<td onclick="cellClicked(this,${i},${j})" class="${className}" >${cell}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'
//     var elContainer = document.querySelector(selector)
//     elContainer.innerHTML = strHTML
// } // Function prints a matrix to the DOM as a table with tbody and td cells. 
//  func param: mat --> 

//!  ------   GET EMPTY CELLS ------------
function getEmptyCells(board) {
    var cells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (!cell.gameElement && cell.type === FLOOR) {
                cells.push({ i, j });
            }
        }
    }
    return cells;
}


// TODO -------------   RENDER BOARD  $$$NEEDS CHANGING$$$ ------------------
function renderBoard(board, selector) {

    var strHTML = ''


    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            // var cell = drawNum(gNums)

            strHTML += `<td onclick="cellClicked(this,${i},${j})" class="cell" ></td>`

        }
        strHTML += '</tr>'
    }

    var elBoard = document.querySelector(`.${selector}`)
    elBoard.innerHTML = strHTML
}


//TODO  -------------- COUNT NEIGHBORS ---------------  
function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;

            if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
        }
    }
    return neighborsCount;
}

//TODO  -------------- COPY MAT ---------------  
function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
} // function returns a copy of the sent mat


//TODO  -------------- FIND NEIGHBORS --------------- 
function findNeighbors(mat, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;

            // Write here code for action on neighbors
        }

    }
}