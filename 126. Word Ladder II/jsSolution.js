/**
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words [beginWord, s1, s2, ..., sk].

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"
Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

Constraints:

1 <= beginWord.length <= 5
endWord.length == beginWord.length
1 <= wordList.length <= 500
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.
The sum of all shortest transformation sequences does not exceed 105.
*/
function getNextWords(word, wordSet) {
    const res = [];
    for (let i = 0; i < word.length; i++) {
        const currentCode = word.charCodeAt(i);
        for (let c = 97; c <= 127; c++) {
            if (c !== currentCode) {
                const charsList = word.split('');
                charsList[i] = String.fromCharCode(c);
                const newWord = charsList.join('');
                if (wordSet.has(newWord)) {
                    res.push(newWord);
                }
            }
        }
    }
    return res;
}

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    wordSet.add(beginWord);

    if (!wordSet.has(endWord)) return [];

    const distanceMap = new Map();
    const wordMap = new Map();

    const queue = [endWord];
    const visited = new Set();
    visited.add(endWord);
    let reached = false;
    let distance = 0;
    distanceMap.set(endWord, distance);

    // 做 BFS，將對應的字一一找出，塞進 wordMap 跟 distanceMap 中
    while(queue.length) {
        const size = queue.length;
        distance += 1;
        for (let i = 0; i < size; i++) {
            const word = queue.shift();
            for (const w of getNextWords(word, wordSet)) {
                if (!wordMap.has(w)) wordMap.set(w, []);
                wordMap.get(w).push(word);

                if (visited.has(w)) continue;
                if (w === beginWord) reached = true;

                distanceMap.set(w, distance);

                queue.push(w);
                visited.add(w);
            }
        }
    }

    if (!reached) return [];

    const res = [];
    dfs(res, [beginWord], beginWord, endWord, wordMap, distanceMap);
    return res;
};

function dfs(res, tempWords, word, endWord, wordMap, distanceMap) {
    if (word === endWord) {
        res.push([...tempWords]);
        return;
    }
    for (const nextWord of wordMap.get(word)) {
        if (distanceMap.get(word) === distanceMap.get(nextWord) + 1) {
            tempWords.push(nextWord);
            dfs(res, tempWords, nextWord, endWord, wordMap, distanceMap);
            tempWords.pop();
        }
    }
}
