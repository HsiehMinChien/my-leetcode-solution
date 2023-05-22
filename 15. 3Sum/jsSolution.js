/**
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const result = [];
    if (nums.length < 3) return result;

    nums.sort((a, b) => a - b);

    const target = 0;
    for (let i = 0 ; i < nums.length - 2 ; i++) {
        // 已經 sort 成由小到大的陣列，以總加為 target 的前提下
        // 而最小的 nums[i] 都大於 target 的狀況下，那往後都不用跑了
        if (nums[i] > target) break;
        // 當元素跟上一個一樣時，直接移動到下一個元素
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let j = i+1;
        let k = nums.length - 1;

        while (k > j) {
            const sum = nums[i] + nums[j] + nums[k];
            if (sum === target) {
                result.push([nums[i], nums[j], nums[k]]);

                // 重複元素，直接往下一個找
                while(nums[j] === nums[j+1]) j = j + 1;
                while(nums[k] === nums[k-1]) k = k - 1; 

                k = k - 1; // 已用過，下一個
                j = j + 1; // 已用過，下一個
            } else if (sum > target) {
                k = k - 1;
            } else {
                j = j + 1;
            }
        }
    }
    return result;
};
