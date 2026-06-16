/*
  백준 1240번 노드사이의 거리
  
  [문제]
  N(2 ≤ N ≤ 1,000)개의 노드로 이루어진 트리가 주어지고
  M(M ≤ 1,000) 개의 두 노드 쌍을 입력 받을 때 두 노드 사이의 거리를 출력하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 노드의 개수 N과 노드 쌍의 개수 M이 입력되고 다음 N-1개의 줄에 트리 상에 연결된 두 점과 거리를 입력받는다.
  그 다음 M개의 줄에 걸쳐 두 노드 쌍이 입력된다.

  [출력]
  M개의 줄에 차례대로 두 노드 사이의 거리를 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [n, m] = input[0].split(' ').map(Number)
const graph = Array.from({ length: n + 1 }, () => [])
for (let i = 1; i < n; i++) {
  const [a, b, cost] = input[i].split(' ').map(Number)
  graph[a].push([b, cost])
  graph[b].push([a, cost])
}


for (let i = 0; i < m; i++) {
  const [x, y, cost] = input[n + i].split(' ').map(Number)
  const visited = new Array(n + 1).fill(false)
  const distance = new Array(n + 1).fill(-1)
  function dfs(x, dist) {
    if (visited[x]) return
  
    visited[x] = true
    distance[x] = dist
  
    for (let [y, cost] of graph[x]) {
      dfs(y, cost + dist)
    }
  }
  dfs(x, 0)
  console.log(distance[y])
}