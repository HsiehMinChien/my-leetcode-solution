/**
Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.

Follow up: Could you use search pruning to make your solution faster with a larger board?
*/
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let result = false;
    function check(x, y, currIndex) {
        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return;
        if (board[x][y] !== word[currIndex]) return;
        if (currIndex === word.length - 1) {
            result = true;
            return;
        }
        board[x][y] = null
        check(x+1, y, currIndex+1);
        check(x, y+1, currIndex+1);
        check(x-1, y, currIndex+1);
        check(x, y-1, currIndex+1);
        board[x][y] = word[currIndex];
    }
    for(let i = 0 ; i < board.length ; i++) {
        for (let j = 0 ; j < board[0].length ; j++) {
            if (board[i][j] === word[0]) {
                check(i, j, 0);
                if (result) return result;
            }
        }
    }
    return result;
};
