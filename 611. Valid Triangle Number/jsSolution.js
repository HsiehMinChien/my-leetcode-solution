/**
Given an integer array nums, return the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

Example 1:

Input: nums = [2,2,3,4]
Output: 3
Explanation: Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
Example 2:

Input: nums = [4,2,3,4]
Output: 4

Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 1000
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
    let count = 0;

    if (nums.length < 3) return count;

    nums.sort((a, b) => a-b); // 先 sort 後讓大小排列

    for (let c_index = nums.length - 1 ; c_index >= 2 ; c_index--) {
        let a_index = 0;
        let b_index = c_index - 1;
        while (b_index > a_index) {
            // 三角形 a + b > c
            if (nums[a_index] + nums[b_index] > nums[c_index]) {
                count = count + b_index - a_index; // 在 a 與 b 之間都符合 (因為 a + b 是此區間最小值，但都 > c，所以這之間都符合)
                b_index -= 1;
            } else {
                a_index += 1;
            }
        }
    }
    return count;
};
