/**
You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

Example 1:

Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:

Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104
*/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    const m = matrix[0].length;
    const n = matrix.length;
    // 超出範圍
    if (target < matrix[0][0] || target > matrix[n-1][m-1]) {
        return false;
    }

    function searchRow(rowMatrix) {
        let rowLow = 0;
        let rowHigh = m - 1;
        do {
            const rowMid = Math.floor((rowLow + rowHigh) /2);
            if (
                target === rowMatrix[rowMid]
                || target === rowMatrix[rowLow]
                || target === rowMatrix[rowHigh]
            ) {
                return true;
            }
            if (rowLow === rowHigh) break; // 當 rowLow 等於 rowHigh 就不用檢查了，代表沒有符合的
            if (target > rowMatrix[rowMid]) {
                rowLow = rowMid + 1;
            } else {
                rowHigh = rowMid - 1;
            }
        } while (rowHigh > rowLow)
        return false;
    }

    let low = 0;
    let high = n - 1;
    let mid;
    // Search column
    do {
        mid = Math.floor((low + high) / 2);
        if (
            (matrix[mid][m-1] >= target && matrix[mid][0] <= target)
            || low === high // 當 low === high 時，還是讓系統 check row data 一次
        ) {
            break;
        }
        if (target > matrix[mid][m-1]) {
            low = mid + 1; // mid 列都比 target 小，往下一列取
        }
        if (target < matrix[mid][0]) {
            high = mid - 1; // mid 列都比 target 大，往上一列取
        }
    } while(high >= low)

    return searchRow(matrix[mid]);
};
