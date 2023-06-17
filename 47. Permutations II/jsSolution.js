/**
Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const res = [];
    dfs(nums.sort(), res, new Set());
    return res;
};

function dfs(nums, res, visited) {
    if (nums.length === visited.size) {
        const arr = [];
        for (let i of visited) {
            arr.push(nums[i]);
        }
        res.push(arr);
        return;
    }
    for (let i = 0 ; i < nums.length ; i++) {
        if (nums[i] === nums[i-1] && !visited.has(i-1)) continue;
        if (visited.has(i)) continue;
        console.log(res, visited, i);
        visited.add(i);
        dfs(nums, res, visited);
        visited.delete(i);
    }
}
