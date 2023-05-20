/**
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums is a non-decreasing array.
-109 <= target <= 109
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    do {
        const mid = Math.floor((start+end)/2);
        // Check target
        if (nums[mid] === target) {
            let newStart = mid;
            let newEnd = mid;
            while (nums[newStart-1] === target) {
                newStart = newStart - 1;
            }
            while (nums[newEnd+1] === target) {
                newEnd = newEnd + 1;
            }
            return [newStart, newEnd];
        }
        if (nums[start] === target) {
            let newEnd = start;
            while (nums[newEnd+1] === target) {
                newEnd = newEnd + 1;
            } 
            return [start, newEnd];
        }
        if (nums[end] === target) {
            let newStart = end;
            while(nums[newStart-1] === target) {
               newStart = newStart - 1;
            } 
            return [newStart, end];
        }
        // Update start or end
        if (nums[mid] > target) {
            end = mid - 1;
        }
        if (nums[mid] < target) {
            start = mid + 1;
        }
    } while (end > start) 
    return [-1, -1];
};
