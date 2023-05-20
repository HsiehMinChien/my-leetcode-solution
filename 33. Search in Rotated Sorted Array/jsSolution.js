/**
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1
 
Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-104 <= target <= 104
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    do { // 為了給第 nums.length = 1 而做成 do ... while
        const mid = Math.floor((left+right)/2);
        // Check target
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[left] === target) {
            return left;
        }
        if (nums[right] === target) {
            return right;
        }
        // Re-assign left or right
        if (nums[mid] > nums[left]) { // Patten 1, max value locate at left area.
            if (nums[mid] > target && nums[left] < target) {
                right = mid-1; // 為了 nums.length = 2 取 mid 的下一位
            } else {
                left = mid+1; // 為了 nums.length = 2 取 mid 的下一位
            }
        } else { // Patten 2, max value locate at right area.
            if (nums[mid] < target && nums[right] > target) {
                left = mid+1; // 為了 nums.length = 2 取 mid 的下一位
            } else {
                right = mid-1; // 為了 nums.length = 2 取 mid 的下一位
            }
        }
    } while(right > left)

    return -1;
};
