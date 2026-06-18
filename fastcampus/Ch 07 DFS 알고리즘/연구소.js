/*
  백준 14502번 연구소
  
  [문제]
  인체에 치명적인 바이러스를 연구하던 연구소에서 바이러스가 유출되었다. 
  다행히 바이러스는 아직 퍼지지 않았고, 바이러스의 확산을 막기 위해서 연구소에 벽을 세우려고 한다.
  연구소는 크기가 N x M인 직사각형으로 나타낼 수 있으며, 1 x 1 크기의 정사각형으로 나누어져 있다. 
  연구소는 빈 칸, 벽으로 이루어져 있으며, 벽은 칸 하나를 가득 차지한다.
  일부 칸은 바이러스가 존재하며, 이 바이러스는 상하좌우로 인접한 빈 칸으로 모두 퍼져나갈 수 있다. 
  새로 세울 수 있는 벽의 개수는 3개이며, 꼭 3개를 세워야 한다.
  연구소의 지도가 주어졌을 때, 얻을 수 있는 안전 영역 크기의 최댓값을 구하는 프로그램을 작성하시오.
  (안전 영역 = 바이러스가 퍼지지 않은 빈 칸의 구역)


  [입력]
  첫째 줄에 지도의 세로 크기 N과 가로 크기 M이 주어진다. (3 ≤ N, M ≤ 8)
  둘째 줄부터 N개의 줄에 지도의 모양이 주어진다. 
  - 0: 빈 칸
  - 1: 벽
  - 2: 바이러스
  (빈 칸의 개수는 3개 이상이며, 바이러스의 개수는 2개 이상 10개 이하이다.)

  [출력]
  첫째 줄에 얻을 수 있는 안전 영역의 최대 크기를 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [n, m] = input[0].split(' ').map(Number)
const graph = []
for (let i = 1; i <= n; i++) {
  graph.push(input[i].split(' '))
}

const dx = [-1, 1, 0, 0]
const dy = [0, 0, -1, 1]

function copyGraph(original) {
  return original.map((graph) => [...graph])
}

function dfs(graph, x, y) {
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i]
    const ny = y + dy[i]

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue
    if (graph[nx][ny] == 0) {
      graph[nx][ny] = 2
      dfs(graph, nx, ny)
    }
  }
}

function getSafefyArea(graph) {
  const copy = copyGraph(graph)
  
  let count = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (copy[i][j] == 2) {
        dfs(copy, i, j)
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (copy[i][j] == 0) count++
    }
  }
  return count
}


const emptySpaces = []
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (graph[i][j] == 0) emptySpaces.push([i, j])
  }
}

let max = 0
function selectWalls(depth, start) {
  if (depth === 3) {
    max = Math.max(getSafefyArea(graph), max)
    return
  }

  for (let i = start; i < emptySpaces.length; i++) {
    const [x, y] = emptySpaces[i]
    graph[x][y] = 1
    selectWalls(depth + 1, i + 1)
    graph[x][y] = 0
  }
}

selectWalls(0, 0)

console.log(max)