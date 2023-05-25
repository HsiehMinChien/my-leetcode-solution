/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    const arr = [];
    treeToArr(root, arr);
    return JSON.stringify(arr);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    const arr = JSON.parse(data);
    const dummy = new TreeNode();
    arrToTree(dummy, arr, 0, true);
    return dummy.left;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

function treeToArr(node, arr) {
    if (!node) {
        arr.push(null);
        return;
    }
    arr.push(node.val);
    treeToArr(node.left, arr);
    treeToArr(node.right, arr);
}

function arrToTree(node, arr, index, isLeft) {
    if (index === arr.length) {
        return index;
    }
    if (arr[index] === null) {
        return index;
    }
    const nextNode = new TreeNode(arr[index]);
    if (isLeft) {
        node.left = nextNode;
    } else {
        node.right = nextNode;
    }
    index = arrToTree(nextNode, arr, index + 1, true);
    index = arrToTree(nextNode, arr, index + 1, false);
    return index;
}
