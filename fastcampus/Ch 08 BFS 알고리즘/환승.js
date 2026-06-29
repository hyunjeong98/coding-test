/*
  [백준 5214] 환승

  [문제]
  아주 먼 미래에 사람들이 가장 많이 사용하는 대중교통은 하이퍼튜브이다. 하이퍼튜브 하나는 역 K개를 서로 연결한다. 
  1번 역에서 N번 역으로 가려고 한다. 이때, 최소 몇 개의 역을 거쳐서 갈 수 있는지 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 역의 수 N과 한 하이퍼튜브가 연결하는 역의 수 K, 하이퍼튜브의 개수 M이 주어진다. (1 ≤ N ≤ 100,000, 1 ≤ K, M ≤ 1,000)
  둘째 줄부터 M개의 줄에는 하이퍼튜브의 정보가 한 줄에 하나씩 주어진다. 하이퍼튜브가 연결하는 역의 번호가 공백으로 구분되어 주어진다.

  [출력]
  첫째 줄에 1번 역에서 N번 역으로 가는데 거쳐야 하는 역의 개수의 최솟값을 출력한다. 만약, 갈 수 없는 경우에는 -1을 출력한다.

  예제 입력 1
  9 3 5
  1 2 3
  1 4 5
  3 6 7
  5 6 7
  6 8 9

  예제 출력 1
  4
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [n, k, m] = input[0].split(' ').map(Number) // 역의 수 N과 한 하이퍼튜브가 연결하는 역의 수 K, 하이퍼튜브의 개수 M
const graph = Array.from({ length: n + m + 1 }, () => [])
for (let i = 1; i <= m; i++) {
  const row = input[i].split(' ').map(Number)
  for (const x of row) {
    graph[x].push(n + i)
    graph[n + i].push(x)
  }
}

function bfs() {

  const visited = new Array(n + m + 1).fill(-1)

  const queue = new Queue()
  queue.enqueue(1)
  visited[1] = 1

  while (queue.getLength() != 0) {
    const cur = queue.dequeue()
    for (const next of graph[cur]) {
      if (visited[next] == -1) {
        visited[next] = visited[cur] + 1

        if (next == n) {
          return (visited[n] + 1) / 2
        }

        queue.enqueue(next)
      }
    }
  }

  return -1
}

console.log(bfs())