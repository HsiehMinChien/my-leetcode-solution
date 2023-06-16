/**
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

Example 1:

Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
Example 2:

Input: n = 1
Output: 1

Constraints:

1 <= n <= 9
*/
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
    const mat = [...new Array(n)].map(e => new Array(n).fill('.'));
    const result = [];
    function helper(row, currMat) {
        if (row === n) {
            result.push(currMat.map(e => e.join('')));
            return;
        }
        for (let j = 0 ; j < n ; j++) {
            if (isSafe(row, j, currMat, n)) {
                currMat[row][j] = 'Q';
                helper(row+1, currMat);
                currMat[row][j] = '.';
            }
        }
    }
    helper(0, mat);
    return result.length ?? 0;
};

function isSafe(i, j, mat, len) {
    // 驗證左下到右上的斜線
    let x = i-1; // 假定為x
    let y = j-1; // 假定為y
    while(x >= 0 && x < len && y >= 0 && y < len) {
        if (mat[x][y] === 'Q') return false; // 代表有其他Queen
        x = x - 1;
        y = y - 1;
    }
    // 驗證右下到左上的斜線
    x = i-1;
    y = j+1;
    while(x >= 0 && x < len && y >= 0 && y < len) {
        if (mat[x][y] === 'Q') return false; // 代表有其他Queen
        x = x - 1;
        y = y + 1;
    }
    // 驗證 column
    x = i-1;
    y = j;
    while(x >= 0 && x < len && y >= 0 && y < len) {
        if (mat[x][y] === 'Q') return false; // 代表有其他Queen
        x = x - 1;
    }
    return true; // 行經路徑沒其他 Queen
}
