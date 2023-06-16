/**
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

Example 1:

Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]

Constraints:

1 <= n <= 9
*/
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
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
    return result;
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
