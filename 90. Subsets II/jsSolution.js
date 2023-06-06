/**
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const res = [];
    nums.sort((a,b)=>a-b);
    function dfs(currArr, temp, index) {
        res.push([...temp])
        for (let i = index ; i < currArr.length ; i++) {
            if (i !== index && currArr[i] === currArr[i-1]) continue;
            temp.push(currArr[i]);
            dfs(currArr, temp, i+1);
            temp.pop();
        }
    }
    dfs(nums, [], 0);
    return res;
};
