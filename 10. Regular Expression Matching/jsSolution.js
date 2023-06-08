/**
Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".

Constraints:

1 <= s.length <= 20
1 <= p.length <= 20
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
*/
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    if (!p) return !s; // 如果 patten 沒了，就檢查字串是否有剩
    // 當 s 沒有了，但還有 pattan，要再檢查一下 patten，因為有種撞況是 s 是符合 p[0]+p[1] 的，因遞歸後被檢查完畢了
    const isFisrtCharMatch = Boolean(s) && (s[0] === p[0] || p[0] === '.');
    if (p[1] === '*') { // 當第二個 patten 為 '*'
        // 如果首字元是 match，那用 p[0]+p[1] 繼續往下個字元比對(因為'*'可代表 0-N 個同字母, e.g. a* === a, aa, aaa...)
        // 如果首字元不 match，則放棄 p[0]+p[1]，取剩下patten來比對
        return (isFisrtCharMatch && isMatch(s.slice(1), p)) || isMatch(s, p.slice(2));
    }
    // 如果第一個字元 match，那就往下比對，否則就false
    return isFisrtCharMatch ? isMatch(s.slice(1), p.slice(1)) : false;
};
