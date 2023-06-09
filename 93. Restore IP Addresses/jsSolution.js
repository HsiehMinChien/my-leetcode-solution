/**
A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

Example 1:

Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
Example 2:

Input: s = "0000"
Output: ["0.0.0.0"]
Example 3:

Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

Constraints:

1 <= s.length <= 20
s consists of digits only.
*/
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const res = [];
    if (!s) return res;
    function dfs(currS, currArr) {
        if (!currS) { // 字串用光
            if (currArr.length === 4) res.push(currArr.join('.')); // 合條件，組成IP後加入結果
            return;
        }
        if (currArr.length > 4) return; // IP 只有四組，超過就不檢查了
        if (currS.length >= 1) { // 個位數 IP
            currArr.push(currS.slice(0, 1));
            dfs(currS.slice(1), currArr);
            currArr.pop();
        }
        if (currS.length >= 2) { // 雙位數 IP
            if (currS.slice(0, 1) !== '0') {
                currArr.push(currS.slice(0, 2));
                dfs(currS.slice(2), currArr);
                currArr.pop();
            }
        }
        if (currS.length >= 3) { // 三位數 IP
            if (currS.slice(0, 1) !== '0' && Number(currS.slice(0, 3)) <= 255) {
                currArr.push(currS.slice(0, 3));
                dfs(currS.slice(3), currArr);
                currArr.pop();
            }
        }
    }
    dfs(s, []);
    return res;
};
