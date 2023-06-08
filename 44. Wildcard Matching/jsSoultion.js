/**
Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.
Example 3:

Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.

Constraints:

0 <= s.length, p.length <= 2000
s contains only lowercase English letters.
p contains only lowercase English letters, '?' or '*'.
*/
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    let sIdx = 0, pIdx = 0, starIdx = -1, pointer = -1;
    while(sIdx < s.length) {
        // 如果 s[sIdx] 跟 p[pIdx] 的對應字是相同或 p[pIdx] === '?'，s 跟 p 都往下一個找
        if (pIdx < p.length && (s[sIdx] === p[pIdx] || p[pIdx] === '?')) {
            sIdx += 1;
            pIdx += 1;
        // 如果找到 '*'，此時就用 starIdx 紀錄在 p 的位置，pointer 紀錄當下的 s 位置
        } else if (pIdx < p.length && p[pIdx] === '*') {
            starIdx = pIdx;
            pointer = sIdx;
            pIdx += 1; // 因為 '*' 也能代表空句子，所以多個連續 '*' 只看最後一個就好
        // 此表都沒 '*'，但因為 patten 已用光，所以為 false
        } else if (starIdx === -1) {
            return false;
        // 雖然 patten 以找過一輪，但有含 *，所以拿下一位後再度檢查
        } else {
            pIdx = starIdx + 1;
            sIdx = pointer + 1;
            pointer += 1;
        }
    }
    // 當 s 已用盡，但 p 還有剩，只要剩下都是 '*' 就沒問題
    for (let i = pIdx ; i < p.length ; i++) {
        if (p[i] !== '*') return false;
    }
    return true;
};
