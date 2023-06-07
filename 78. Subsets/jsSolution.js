/**
Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const res = [];
    function dfs(currArr, index) {
        res.push([...currArr]);
        for (let i = index ; i < nums.length ; i++) {
            currArr.push(nums[i]);
            dfs(currArr, i+1);
            currArr.pop();
        }
    }
    dfs([], 0);
    return res;
};
