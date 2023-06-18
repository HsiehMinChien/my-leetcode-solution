/**
Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

Example 1:

Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:

Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
 
Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] is a lowercase English letter.
1 <= words.length <= 3 * 104
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
All the strings of words are unique.
*/
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const res = [];
    const buildTrie = () => {
        const root = {};
        for (const w of words) {
            let node = root;
            for (const c of w) {
                if (!node[c]) node[c] = {};
                node = node[c];
            }
            node.word = w;
        }
        return root;
    };
    function search(node, x, y) {
        if (node.word) { // 有找到字串
            res.push(node.word);
            node.word = null;
        }
        // 超出邊界
        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return;
        const c = board[x][y];
        if (!node[c]) return; // 沒對應的字
        board[x][y] = null; // 此次已看過，不能重複使用，所以先蓋掉
        for (const [dx, dy] of dirs) {
            // 把對應此字的 node 跟新x,y值帶入做下一層搜尋
            search(node[c], x+dx, y+dy);
        }
        board[x][y] = c; // 回存
    }
    const root = buildTrie();
    for(let i = 0 ; i < board.length ; i++) {
        for(let j = 0; j < board[0].length ; j++) {
            search(root, i, j);
        }
    }
    return res;
};
