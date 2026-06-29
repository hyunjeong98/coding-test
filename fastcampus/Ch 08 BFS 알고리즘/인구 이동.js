/*
  [백준 16234] 인구 이동

  [문제]
  N×N 크기의 땅이 있고, 땅은 1×1 크기의 칸으로 나누어져 있다. 각각의 땅에는 나라가 하나씩 존재하며, r행 c열에 있는 나라에는 A[r][c]명이 살고 있다. 
  인구 이동은 하루 동안 다음과 같이 진행되고, 더 이상 인구 이동이 없을 때까지 지속된다.
    - 국경선을 공유하는 두 나라의 인구 차이가 L명 이상, R명 이하라면, 두 나라가 공유하는 국경선을 오늘 하루 동안 연다.
    - 국경선이 열려 있어 인접한 칸만을 이용해 이동할 수 있다면, 그 나라들을 오늘 하루 동안 '연합'이라고 한다.
    - 연합을 이루고 있는 각 칸의 인구수는 (연합의 인구수) / (연합을 이루고 있는 국가의 개수)가 된다. 편의상 소수점은 버린다.
    - 연합을 해체하고, 모든 국경선을 닫는다.

  각 나라의 인구수가 주어졌을 때, 인구 이동이 몇 번 발생하는지 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 N, L, R이 주어진다. (1 ≤ N ≤ 50, 1 ≤ L ≤ R ≤ 100)
  둘째 줄부터 N개의 줄에 각 나라의 인구수가 주어진다. r행 c열에 주어지는 정수는 A[r][c]의 값이다. (0 ≤ A[r][c] ≤ 100)
  인구 이동이 발생하는 일수가 2,000번 이하인 입력만 주어진다.

  [출력]
  인구 이동이 몇 번 발생하는지 첫째 줄에 출력한다.

  예제 입력 1
  2 20 50
  50 30
  20 40

  예제 출력 1
  1
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, L, R] = input[0].split(' ').map(Number)
const graph = []
for (let i = 1; i <= N; i++) {
  graph.push(input[i].split(' ').map(Number))
}

const dx = [-1, 1, 0, 0]
const dy = [0, 0, 1, -1]

function bfs(x, y, visited) {
  const group = []
  const queue = new Queue()
  queue.enqueue([x, y])
  visited[x][y] = true
  group.push([x, y])
  let sum = graph[x][y]

  while (queue.getLength() != 0) {
    const [x, y] = queue.dequeue()

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue

      if (!visited[nx][ny]) {
        const sub = Math.abs(graph[nx][ny] - graph[x][y])
        if (L <= sub && sub <= R) {
          group.push([nx, ny])
          queue.enqueue([nx, ny])
          visited[nx][ny] = true
          sum += graph[nx][ny]
        }
      }
    }
  }

  if (group.length > 1) {
    const avg = Math.floor(sum / group.length)
    for (const [gx, gy] of group) {
      graph[gx][gy] = avg
    }
    return true
  }

  return false
}

let count = 0
while (true) {
  let isMoved = false
  const visited = Array.from({ length: N }, () => new Array(N).fill(false))
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        if (bfs(i, j, visited)) {
          isMoved = true
        }
      }
    }
  }


  if (!isMoved) break

  count++
}

console.log(count)