/**
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]

Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
*/
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const res = [];
    if (!candidates || candidates.length === 0) return res;
    candidates.sort((a, b) => a-b); // 由小到大
    function dfsRecursive(currSum, currArr, index) {
        if (currSum > target) return; // 目前總加已經過大，直接不看了
        if (currSum === target) {
            res.push([...currArr]);
        }
        for (let i = index ; i < candidates.length ; i++) { // 目前總加小於目標
            if (i !== index && candidates[i] === candidates[i-1]) continue; // 相同值跳過
            currArr.push(candidates[i]); // 加入
            dfsRecursive(candidates[i]+currSum, currArr, i+1); // 往下一個數值找
            currArr.pop(); // 都找過後就移除
        }
    }
    dfsRecursive(0, [], 0);
    return res;
};
