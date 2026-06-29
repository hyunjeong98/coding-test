/*
  백준 18405 경쟁적 전염

  [문제]
  N×N 크기의 시험관이 있다. 시험관은 특정한 위치에 바이러스가 존재할 수 있으며, 모든 바이러스는 1번부터 K번까지의 바이러스 종류 중 하나에 속한다.
  시험관에 존재하는 모든 바이러스는 1초마다 상, 하, 좌, 우의 방향으로 증식해 나간다. 단, 매 초마다 번호가 낮은 종류의 바이러스부터 먼저 증식한다. 
  또한 증식하는 과정에서 특정한 칸에 이미 어떠한 바이러스가 존재한다면, 그 곳에는 다른 바이러스가 들어갈 수 없다.
  시험관의 크기와 바이러스의 위치 정보가 주어졌을 때, S초가 지난 후에 (X, Y) 위치에 존재하는 바이러스의 종류를 출력하는 프로그램을 작성하시오. 
  만약 S초가 지난 후에 해당 위치에 바이러스가 존재하지 않는다면, 0을 출력한다. (시험관의 가장 왼쪽 위 위치는 (1, 1)이다.)

  [입력]
  첫째 줄에 자연수 N, K가 공백으로 구분되어 주어진다. (1 ≤ N ≤ 200, 1 ≤ K ≤ 1,000)
  둘째 줄부터 N개의 줄에 걸쳐 시험관의 정보가 주어진다. 각 행은 N개의 원소로 구성되며, 해당 위치에 존재하는 바이러스의 번호가 공백으로 구분되어 주어진다. 바이러스가 존재하지 않는 경우 0이 주어진다.
  N+2번째 줄에는 S, X, Y가 공백으로 구분되어 주어진다. (0 ≤ S ≤ 10,000, 1 ≤ X, Y ≤ N)

  [출력]
  S초 뒤에 (X, Y) 위치에 존재하는 바이러스의 번호를 출력한다. 만약 바이러스가 존재하지 않는다면 0을 출력한다.

  예제 입력 1
  3 3
  1 0 2
  0 0 0
  3 0 0
  2 3 2

  예제 출력 1
  3

  예제 입력 2
  3 3
  1 0 2
  0 0 0
  3 0 0
  1 2 2

  예제 출력 2
  0
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [n, k] = input[0].split(' ').map(Number)
const graph = []
const viruses = []
for (let i = 1; i <= n; i++) {
  const row = input[i].split(' ').map(Number) 
  graph.push(row)
  for (let j = 0; j < n; j++) {
    if (row[j] !== 0) {
      viruses.push([row[j], 0, i - 1, j]) // 바이러스 종류, 현재 시간, x좌표, y좌표
    }
  }
}
viruses.sort((a, b) => a[0] - b[0])

const [s, x, y] = input[n + 1].split(' ').map(Number)

const queue = new Queue()
for (let i = 0; i < viruses.length; i++) {
  queue.enqueue(viruses[i])
}

const dx = [-1, 1, 0, 0]
const dy = [0, 0, 1, -1]
while (queue.getLength() != 0) {
  const [virus, time, cx, cy] = queue.dequeue()

  if (time == s) {
    break
  }
  for (let i = 0; i < 4; i++) {
    const nx = cx + dx[i]
    const ny = cy + dy[i]

    if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue
    if (graph[nx][ny] == 0) {
      graph[nx][ny] = virus
      queue.enqueue([virus, time + 1, nx, ny])
    }
  }
}

console.log(graph[x - 1][y - 1])

