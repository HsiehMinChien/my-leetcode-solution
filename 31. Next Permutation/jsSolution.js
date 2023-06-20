/**
A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.

Example 1:

Input: nums = [1,2,3]
Output: [1,3,2]
Example 2:

Input: nums = [3,2,1]
Output: [1,2,3]
Example 3:

Input: nums = [1,1,5]
Output: [1,5,1]

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 100
*/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 排序大體上是為了排程降冪，只是此題是問每個步驟的樣子會長成什麼樣子
var nextPermutation = function(nums) {
    let k, l;
    for (k = nums.length - 2; k >= 0; k--) {
        if (nums[k+1] > nums[k]) break; // 右邊大於左邊
    }
    if (k < 0) { // 代表 nums 目前是升冪，反轉後就變成降冪
        nums.reverse();
    } else {
        for (l = nums.length - 1; l > k; l--) { // 從右邊開始找出大於index k 的數值
            if (nums[l] > nums[k]) break;
        }
        [nums[l], nums[k]] = [nums[k], nums[l]]; // 互換
        // 於 k+1 index 插入 n-k-1 個元素，插入元素是 ...nums.slice(k+1).reverse()
        nums.splice(k+1, nums.length-k-1, ...nums.slice(k+1).reverse())
    }
};
