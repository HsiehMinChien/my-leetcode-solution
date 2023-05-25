/**
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
Example 2:

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
Example 3:

Input: numCourses = 1, prerequisites = []
Output: [0]

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= numCourses * (numCourses - 1)
prerequisites[i].length == 2
0 <= ai, bi < numCourses
ai != bi
All the pairs [ai, bi] are distinct.
*/
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    const nodeInDegree = Array(numCourses).fill(0); // 先做好 inDegree 的基本
    const reqToPreMap = {};

    // 將對應的 node 的 inDegree 填入
    for (let i = 0 ; i < prerequisites.length ; i++) {
        const [req, pre] = prerequisites[i];
        if (req in reqToPreMap) {
            reqToPreMap[req].push(pre);
        } else {
            reqToPreMap[req] = [pre];
        }
        nodeInDegree[pre] += 1;
    }

    // 準備 stack 跟 result
    const stack = [];
    const result = []

    // 先把 inDegree = 0 (沒關聯性的) 拿出，當作原點
    for (let i = 0 ; i < numCourses ; i++) {
        if (nodeInDegree[i] === 0) {
            stack.push(i);
            result.unshift(i);
        }
    }

    let count = 0;

    // 每個原點開始跑檢驗
    while(stack.length) {
        count += 1;
        const lastNode = stack.pop();
        const preList = reqToPreMap[lastNode] ?? [];

        // 此 node 對應的 pre node list
        for (let i = 0 ; i < preList.length ; i++) {
            const pre = preList[i];
            nodeInDegree[pre] -= 1; // 檢查過就移除 inDegree
            if (nodeInDegree[pre] === 0) { // 當變成無關聯時，塞入檢查堆疊中
                stack.push(pre);
                result.unshift(pre);
            }
        }
    }

    return count === numCourses ? result : [];
};
