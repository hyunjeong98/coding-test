/*
  백준 1012번 유기농배추
  
  [문제]
  배추 흰지렁이는 해충으로부터 배추를 보호한다.
  이 지렁이는 인접한 다른 배추로 이동할 수 있어, 그 배추들 역시 보호받을 수 있다.
  한 배추의 상하좌우 네 방향에 다른 배추가 위치한 경우에 서로 인접해있는 것이다.

  배추들이 모여있는 곳에는 배추흰지렁이가 한 마리만 있으면 되므로, 
  서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 배추흰지렁이가 필요한지 알 수 있다. 
  0은 배추가 심어져 있지 않은 땅이고, 1은 배추가 심어져 있는 땅이다.

  [입력]
  입력의 첫 줄에는 테스트 케이스의 개수 T가 주어진다.
  그 다음 줄부터 각 테스트 케이스에 대해 첫째 줄에는 배추를 심은 배추밭의 가로길이 M(1 ≤ M ≤ 50)과 
  세로길이 N(1 ≤ N ≤ 50)이 주어진다. 그리고 배추가 심어져 있는 위치의 개수 K(1 ≤ K ≤ 2500)가 주어진다.
  그 다음 K줄에는 배추의 위치 X(0 ≤ X ≤ M-1), Y(0 ≤ Y ≤ N-1)가 주어진다.

  [출력]
  각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수를 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')


const dx = [-1, 1, 0, 0]
const dy = [0, 0, -1, 1]
function dfs(graph, n, m, x, y) {
  if (x < 0 || x >= n || y < 0 || y >= m) {
    return false
  }
  if (graph[x][y] == 1) {
    graph[x][y] = -1
    for (let i = 0; i < 4; i++) {
      const nx = dx[i]
      const ny = dy[i]
      dfs(graph, n, m, x + nx, y + ny)
    }
    return true
  }
  return false
}

let testCases = Number(input[0])
let line = 1
while (testCases--) {
  const [m, n, k] = input[line].split(' ').map(Number)
  const graph = Array.from({ length: n }, () => Array(m).fill(0))
  for (let i = 1; i <= k; i++) {
    const [x, y] = input[line + i].split(' ').map(Number)
    graph[y][x] = 1
  }
  let count = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (dfs(graph, n, m, i, j)) count++
    }
  }
  console.log(count)
  line += (k + 1)
}


