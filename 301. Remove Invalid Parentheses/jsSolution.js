/**
Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

Return a list of unique strings that are valid with the minimum number of removals. You may return the answer in any order.

Example 1:

Input: s = "()())()"
Output: ["(())()","()()()"]
Example 2:

Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]
Example 3:

Input: s = ")("
Output: [""]

Constraints:

1 <= s.length <= 25
s consists of lowercase English letters and parentheses '(' and ')'.
There will be at most 20 parentheses in s.
*/
/**
 * @param {string} s
 * @return {string[]}
 */
function isValid(s) {
    let count = 0;
    for (const c of s) {
        if (c === ')') {
            if (count === 0) return false;
            count--;
        }
        if (c === '(') {
            count++;
        }
    }
    return count === 0;
}

var removeInvalidParentheses = function(s) {
    if (!s) return [''];
    const res = [], visited = new Set(), queue = [s];
    let hasValidString = false;
    while(queue.length) {
        const currS = queue.shift();
        if (isValid(currS)) {
            res.push(currS);
            // 因為問題是在說要找出刪減最小字串的行動，所以當有合格的字串出現時候，就不需要再跑後續的了
            hasValidString = true;
        }
        if (hasValidString) continue;
        for(let i = 0 ; i < currS.length ; i++) {
            if (currS[i] !== '(' && currS[i] !== ')') {
                continue;
            }
            const nextS = currS.substring(0,i) + currS.substring(i+1);
            if (!visited.has(nextS)) {
                visited.add(nextS);
                queue.push(nextS);
            }
        }
    }
    return res;
};
