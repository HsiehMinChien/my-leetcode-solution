/**
Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]

Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.
*/
/**
 * @param {string} s
 * @return {string[][]}
 */

function isPalindrome(s) {
    let start = 0;
    let end = s.length - 1;
    while(end > start) {
        if (s[start++] !== s[end--]) {
            return false;
        }
    }
    return true;
}

function dfsRecursive(s, temp, result) {
    if (s.length === 0) {
        result.push([...temp]); // 解構，才會變成一個新的 array 塞進 result 內
        return;
    }
    // 取 s 的不同分段來驗證，下面寫法會依序將最短都找到後再接續次短回文來尋找
    for (let i = 1 ; i <= s.length ; i++) {
        // 以i為分界分成兩段
        const preString = s.substring(0, i);
        const postString = s.substring(i);
        // 如果符合回文
        if (isPalindrome(preString)) {
            // 丟進 temp
            temp.push(preString);
            // 剩下字串繼續分析
            dfsRecursive(postString, temp, result);
            // 對應迴圈次數，將所有push的元素都pop掉，為了下一屆段回文而給出一個空temp
            temp.pop();
        }
    }
}

var partition = function(s) {
    const result = [];
    const temp = [];
    dfsRecursive(s, temp, result);
    return result;
};
