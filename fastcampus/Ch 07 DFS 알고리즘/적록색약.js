/*
  백준 10026번 적록색약
  
  [문제]
  적록색약은 빨간색과 초록색의 차이를 거의 느끼지 못한다.
  크기가 N×N인 그리드의 각 칸에 R(빨강), G(초록), B(파랑) 중 하나를 색칠해 그림을 만들었다.
  그림은 몇개의 구역으로 나뉘어져 있는데, 구역은 같은 색으로 이루어져 있다.
  또, 같은 색상이 상하좌우로 인접해 있는 경우에 두 글자는 같은 구역에 속한다.
  그림이 입력으로 주어졌을 때, 적록색약인 사람이 봤을 때와 아닌 사람이 봤을 때 구역의 개수를 구하는 프로그램을 작성하시오.


  [입력]
  첫째 줄에 N이 주어진다. (1 ≤ N ≤ 100)
  둘째 줄부터 N개의 줄에 그림이 주어진다.

  [출력]
  적록색약인 사람이 봤을 때와 아닌 사람이 봤을 때 구역의 개수를 공백으로 구분해 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = +input[0]
const graph = []
for (let i = 1; i <= n; i++) {
  graph.push(input[i].split(''))
}

const dx = [-1, 1, 0, 0]
const dy = [0, 0, -1, 1]


function dfs(x, y) {
  if (!visited[x][y]) {
    visited[x][y] = true
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue
      if (graph[x][y] === graph[nx][ny]) {
        dfs(nx, ny)
      }
    }
    return true
  }
  return false
}
let result1 = 0
let visited = Array.from({ length: n }, () => new Array(n).fill(false))
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if(dfs(i, j)) result1++
  }
}
console.log(result1)

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] == 'G') graph[i][j] = 'R'
  }
}
let result2 = 0
visited = Array.from({ length: n }, () => new Array(n).fill(false))
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if(dfs(i, j)) result2++
  }
}
console.log(result2)
