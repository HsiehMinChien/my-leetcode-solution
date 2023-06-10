/**
Given a string s, partition s such that every 
substring of the partition is a palindrome.
Return the minimum cuts needed for a palindrome partitioning of s.

Example 1:

Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
Example 2:

Input: s = "a"
Output: 0
Example 3:

Input: s = "ab"
Output: 1

Constraints:

1 <= s.length <= 2000
s consists of lowercase English letters only.
*/
/**
 * @param {string} s
 * @return {number}
 */
function isPalindrome(start, end, s) {
    while(start < end) {
        if (s[start++] !== s[end--]) return false;
    }
    return true;
}
function rec(s, i, res) {
    if (i === s.length) return 0; // 不用切，0
    if (res[i] !== -1) return res[i]; // 如果有，代表跑過，不用再跑
    let min = Number.MAX_VALUE;
    for (let j = i ; j < s.length ; j++) {
        if (isPalindrome(i, j, s)) { // 有發現回文的字串再進行切割
            const cuts = 1 + rec(s, j+1, res); // 1 刀加上剩餘長度切數
            min = Math.min(min, cuts); // 取最小切數
        }
    }
    res[i] = min; // 紀錄這個長度的切數
    return res[i];
}
var minCut = function(s) {
    return rec(s, 0, Array(s.length).fill(-1)) - 1; // 總切數為求得值 -1
};
