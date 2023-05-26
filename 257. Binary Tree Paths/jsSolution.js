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
 * @return {string[]}
 */

var binaryTreePaths = function(root) {
    const pathSet = new Set();
    if (!root) return Array.from(pathSet);
    function getPath(node, currPath) {
        const nexPath = currPath ? `${currPath}->${node.val}` : String(node.val);
        if (!node.left && !node.right) {
            if (!pathSet.has(nexPath)) {
                pathSet.add(nexPath);
            }
            return;
        }
        if (node.left) getPath(node.left, nexPath);
        if (node.right) getPath(node.right, nexPath);
    }
    getPath(root, '');
    return Array.from(pathSet)
};
