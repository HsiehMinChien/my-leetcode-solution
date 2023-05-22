/**
Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

Example 1:

Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
Example 2:

Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
Explanation: Note that the values of nums are not necessairly unique.

Constraints:

1 <= nums.length <= 5 * 104
-5 * 104 <= nums[i] <= 5 * 104
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const mergeFun = (left, right) => {
    const result = [];
    while(left.length && right.length) {
        if (left[0] > right[0]) {
            result.push(right.shift());
        } else {
            result.push(left.shift())
        }
    }
    return [...result, ...left, ...right];
}
var sortArray = function(nums) {
    if (nums.length < 2) return nums;
    const mid = Math.floor((nums.length)/2);
    const leftNums = nums.slice(0, mid);
    const rightNums = nums.slice(mid);
    return mergeFun(sortArray(leftNums), sortArray(rightNums));
};
