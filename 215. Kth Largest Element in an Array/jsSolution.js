/**
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

You must solve it in O(n) time complexity.

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 使用 Quick select 來解
var findKthLargest = function(nums, k) {
    const targetIndex = nums.length - k;
    let left = 0;
    let right = nums.length - 1;

    function swap(i, j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    function povitHelper(pivot, start, end) {
        // 先把標的移至最後
        swap(pivot, end);

        let nextPivot = start;
        let j = start;

        while(end > j) {
            // 將小於等於標的的值移到最左
            if (nums[end] >= nums[j]) {
                swap(nextPivot, j);
                nextPivot++;
            }
            j++;
        }
        swap(nextPivot, end); // 將標的換到 i 的位置
        return nextPivot;
    }

    while(right >= left) {
        // 於 left 和 right 之間取一個 pivot 點
        const pivot = Math.floor(Math.random() * (right - left + 1)) + left;
        const nextPovit = povitHelper(pivot, left, right);
        if (nextPovit === targetIndex) { // 等於就是答案
            return nums[targetIndex];
        } else if (nextPovit > targetIndex) { // 標的大於目標，目標在標的左邊
            right = nextPovit - 1;
        } else { // 標的小於目標，目標在標的右邊
            left = nextPovit + 1;
        }
    }
};
