/*
  백준 2606번 바이러스
  
  [문제]
  신종 바이러스인 웜 바이러스는 네트워크를 통해 전파된다. 
  한 컴퓨터가 웜 바이러스에 걸리면 그 컴퓨터와 네트워크 상에서 연결되어 있는 모든 컴퓨터는 웜 바이러스에 걸리게 된다.
  컴퓨터의 수와 네트워크 상에서 서로 연결되어 있는 정보가 주어질 때,
  1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에는 컴퓨터의 수 N(1 <= N <= 100)이 주어진다.
  둘째 줄에는 네트워크 상에서 서로 연결되어 있는 컴퓨터 쌍의 수 M이 주어진다.
  이어서 M개의 줄에 걸쳐 네트워크 상에서 서로 연결되어 있는 컴퓨터의 번호 쌍이 주어진다.

  [출력]
  1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 첫째 줄에 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const n = Number(input[0])
const m = Number(input[1])
const graph = Array.from({ length: n + 1 }, () => [])
for (let i = 2; i <= m + 1; i++) {
  const [a, b] = input[i].split(' ').map(Number)
  graph[a].push(b)
  graph[b].push(a)
}

const visited = new Array(n + 1).fill(false)
let count = 0

function dfs(graph, v, visited) {
  visited[v] = true
  for (i of graph[v]) {
    if (!visited[i]) {
      count++
      dfs(graph, i, visited)
    }
  }
}

dfs(graph, 1, visited)
console.log(count)


/*
function dfs(graph, v, visited) {
  visited[v] = true
  count++
  for (i of graph[v]) {
    if (!visited[i]) {
      dfs(graph, i, visited)
    }
  }
}

dfs(graph, 1, visited)
console.log(count - 1)
*/
