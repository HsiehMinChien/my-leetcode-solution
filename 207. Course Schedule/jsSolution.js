/**
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.
*/
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinishByDFS = function(numCourses, prerequisites) {
    const reqToPreMap = {};
    const currVisiting = {};
    // 設置 reqToPreMap 對應值
    for(let i = 0 ; i < prerequisites.length ; i++) {
        const [req, pre] = prerequisites[i];
        if (req in reqToPreMap) {
            reqToPreMap[req].push(pre);
        } else {
            reqToPreMap[req] = [pre];
        }
    }
    function dfs(node) {
        // 如果此 node 正在訪問，那就會產生錯誤
        if (currVisiting[node]) {
            return false;
        }
        // 如果這個 node 有對應的 pre，就要檢查
        if (reqToPreMap[node]) {
            currVisiting[node] = true; // 檢查中，代表正在訪問此 node
            for(let pre of reqToPreMap[node]) { // 相對應的 pre 都帶入檢查
                if (!dfs(pre)) {
                    return false;
                }
            }
            currVisiting[node] = false; // 檢查完畢，排除正在訪問清單
            reqToPreMap[node] = undefined; // 檢查過了就清除 (如不清除會超時)
        }
        return true;
    }
    // 將每個 key (req) 提出和檢查
    for (let req in reqToPreMap) {
        if (!dfs(req)) {
            return false;
        }
    }
    return true;
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinishByTopologicalSorting = function(numCourses, prerequisites) {
    const nodeInDigree = Array(numCourses).fill(0); // 用於檢查node的關聯性
    const preToReqMap = {}; // 紀錄 node 與其對應的 pre node 的 map

    for (let i = 0 ; i < prerequisites.length ; i++) {
        const [req, pre] = prerequisites[i];
        if (pre in preToReqMap) {
            preToReqMap[pre].push(req);
        } else {
            preToReqMap[pre] = [req];
        }
        nodeInDigree[req] += 1;
    }

    const stack = [];

    for (let i = 0 ; i < nodeInDigree.length ; i++) {
        if (nodeInDigree[i] === 0) { // 表示此 node 沒有前置作業需求，可當起點
            stack.push(i);
        }
    }

    let count = 0;

    while (stack.length) {
        const lastNode = stack.pop();
        const preList = preToReqMap[lastNode] ?? [];
        count += 1;
        
        // 提取此 node 的所有 pre node
        for (let i = 0 ; i < preList.length ; i++) {
            const pre = preList[i];
            nodeInDigree[pre] -= 1; // 消除相關聯
            if (nodeInDigree[pre] === 0) { // 當此 node 也沒任何關聯時，塞進 stack 做檢查
                stack.push(pre);
            }
        }
    }

    return count === numCourses; // 如果所有 node 最後都可以消除到沒有任何關聯，表示不存在環路
};
