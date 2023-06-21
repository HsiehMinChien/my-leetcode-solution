/**
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

Example 1:

Input: s = "leetcode"
Output: 0
Example 2:

Input: s = "loveleetcode"
Output: 2
Example 3:

Input: s = "aabb"
Output: -1

Constraints:

1 <= s.length <= 105
s consists of only lowercase English letters.
*/
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    const charToIdxMap = new Map();
    const moreThanOne = new Set();
    for (let i = 0 ; i < s.length ; i++) {
        const c = s[i];
        if (moreThanOne.has(c)) continue;
        if (charToIdxMap.has(c)) {
            charToIdxMap.delete(c);
            moreThanOne.add(c);
        } else {
            charToIdxMap.set(c, i);
        }
    }
    if (charToIdxMap.size === 0) {
        return -1
    } else {
        return charToIdxMap.values().next().value
    }
};
