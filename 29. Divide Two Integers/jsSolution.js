/**
Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

The integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.

Return the quotient after dividing dividend by divisor.

Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231.

Example 1:

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
Example 2:

Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = -2.33333.. which is truncated to -2.

Constraints:

-231 <= dividend, divisor <= 231 - 1
divisor != 0
*/
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    const isNegative = Math.sign(dividend) !== Math.sign(divisor);
    let absDividend = Math.abs(dividend);
    let absDivisor = Math.abs(divisor);
    let count = 0;

    // 如果被除數大於除數開始處理
    while (absDivisor <= absDividend) {
        let value = absDivisor;
        let multiple = 1;
        // 此地方跑是為了先抓取可以除的最大值，第二次跑就抓取第二大值
        // e.g. 15/2 => 1st: value = 8, 2nd: value = 4, ...
        while (value + value < absDividend) {
            value = value + value;
            multiple = multiple + multiple;
        }
        count = count + multiple; // 把除的倍率先存下
        absDividend = absDividend - value; // 重整被除數
    }

    // 環境限定只能存 [-2**31, 2**31-1] 的值
    if (count > (2**31 - 1)) {
        return isNegative ? - (2**31) : 2**31 - 1;
    }
    return isNegative ? -count : count;
};
