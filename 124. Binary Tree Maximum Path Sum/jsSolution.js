/**
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

Example 1:

Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
Example 2:

Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

Constraints:

The number of nodes in the tree is in the range [1, 3 * 104].
-1000 <= Node.val <= 1000
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
    let max = -Infinity;
    function recursive(node) {
        if (!node) return 0;
        const left = recursive(node.left),
        right = recursive(node.right),
        allSum = node.val + left + right,
        leftSum = node.val + left,
        rightSum = node.val + right;
        // 找出所經路徑的最大值來更新，之前(max)、現在這個點(node.val)、全部(allSum)、左樹(leftSum)或右樹(rightSum)
        max = Math.max(max, node.val, allSum, leftSum, rightSum);
        // 經過路徑，要不就從此node開始(node.val)，或者是左樹(lefSum)或右樹(rightSum)
        return Math.max(node.val, leftSum, rightSum);
    }
    recursive(root);
    return max;
};
