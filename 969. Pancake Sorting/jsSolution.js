/**
Given an array of integers arr, sort the array by performing a series of pancake flips.

In one pancake flip we do the following steps:

Choose an integer k where 1 <= k <= arr.length.
Reverse the sub-array arr[0...k-1] (0-indexed).
For example, if arr = [3,2,1,4] and we performed a pancake flip choosing k = 3, we reverse the sub-array [3,2,1], so arr = [1,2,3,4] after the pancake flip at k = 3.

Return an array of the k-values corresponding to a sequence of pancake flips that sort arr. Any valid answer that sorts the array within 10 * arr.length flips will be judged as correct.

Example 1:

Input: arr = [3,2,4,1]
Output: [4,2,4,3]
Explanation: 
We perform 4 pancake flips, with k values 4, 2, 4, and 3.
Starting state: arr = [3, 2, 4, 1]
After 1st flip (k = 4): arr = [1, 4, 2, 3]
After 2nd flip (k = 2): arr = [4, 1, 2, 3]
After 3rd flip (k = 4): arr = [3, 2, 1, 4]
After 4th flip (k = 3): arr = [1, 2, 3, 4], which is sorted.
Example 2:

Input: arr = [1,2,3]
Output: []
Explanation: The input is already sorted, so there is no need to flip anything.
Note that other answers, such as [3, 3], would also be accepted.

Constraints:

1 <= arr.length <= 100
1 <= arr[i] <= arr.length
All integers in arr are unique (i.e. arr is a permutation of the integers from 1 to arr.length).
*/
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var pancakeSort = function(arr) {
    let currMax = arr.length; // 假定陣列長度k中剛好存在依序的元素，且最大值為 arr.length, e.g. [1, 2, ... , arr.length]
    let result = [];

    function reverseAndRecord(len) {
        // reverse, 所以跑到一半就好 (j<len/2)
        for (let j = 0 ; j < len / 2 ; j++) {
            [arr[j], arr[len-j]] = [arr[len-j], arr[j]];
        }
        result.push(len+1); // 紀錄以哪個基點翻轉 (傳入的len是index, 所以正確是 len+1)
    }

    function flip(index) {
        // 如果目標值不在最小位置，就必須先翻轉一次
        if (index) reverseAndRecord(index);
        // 此次翻轉目的是為了把現在最大值往後塞
        reverseAndRecord(currMax - 1)
    }

    // 每次都取此刻的最大值，然後進行翻轉
    // e.g. 第一次翻轉必定取最大值 (arr.length)，將其翻轉塞到最尾端
    while(currMax > 1) {
        flip(arr.indexOf(currMax)); // 找出當下 currMax 位置再來翻轉
        currMax--;
    }
    return result;
};
