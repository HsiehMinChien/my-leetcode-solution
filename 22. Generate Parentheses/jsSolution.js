/**
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]

Constraints:

1 <= n <= 8
*/
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];
    function dfs(left, right, s) {
        if (left > right) return; // 確保字串產生會事先 '(' 再 ')'
        if (left === 0 && right === 0) {
            res.push(s);
            return;
        }
        if (left > 0) dfs(left - 1, right, s + '(');
        if (right > 0) dfs(left, right - 1, s + ')');
    }
    dfs(n, n, '');
    return res;
};
