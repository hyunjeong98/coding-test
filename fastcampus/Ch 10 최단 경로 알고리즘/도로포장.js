/**
  [1162번] 도로포장

  [문제]
  준영이의 고향은 n번 정점에 있고, 준영이는 현재 1번 정점에 있다.
  도로를 따라서 이동할 수 있는데, 각 도로를 이동할 때는 시간이 걸린다. 준영이는 도로 중 k개 이하의 도로를 포장할 수 있는 능력이 있다. 
  도로를 포장하면 그 도로를 이동하는데 걸리는 시간은 0이 된다.
  준영이가 고향에 도달하는데 걸리는 최소 시간을 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 n(1 ≤ n ≤ 10,000), m(1 ≤ m ≤ 50,000), k(1 ≤ k ≤ 20)가 주어진다. n은 정점의 수, m은 도로의 수, k는 포장할 수 있는 도로의 수이다.
  다음 m개의 줄에는 도로의 정보 u, v, w가 주어진다. u와 v는 도로가 연결하는 두 정점이고, w(1 ≤ w ≤ 1,000,000)는 그 도로를 통과하는데 걸리는 시간이다. 도로는 양방향이다.

  [출력]
  첫째 줄에 준영이가 고향에 도달하는데 걸리는 최소 시간을 출력한다.

  예제 입력 1
  4 4 1
  1 2 10
  2 4 10
  1 3 1
  3 4 100

  예제 출력 1
  1
*/
const fs = require('fs')
const { PriorityQueue } = require('./priority_queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [n, m, k] = input[0].split(' ').map(Number)
const INF = 1e9
const graph = Array.from({ length: n + 1 }, () => [])
for (let i = 0; i < m; i++) {
  const [u, v, w] = input[i + 1].split(' ').map(Number)
  graph[u].push([v, w])
  graph[v].push([u, w])
}

const distance = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(INF))

const pq = new PriorityQueue((a, b) => a[1] - b[1])
pq.enqueue([1, 0, 0]) // node, dist, paved
distance[1][0] = 0 // distance[노드][포장횟수]

while (pq.size() != 0) {
  const [now, dist, paved] = pq.dequeue()

  if (distance[now][paved] < dist) continue

  for (const [node, cost] of graph[now]) {
    // 포장하지 않는 경우
    const wholeCost = dist + cost
    if (wholeCost < distance[node][paved]) {
      distance[node][paved] = wholeCost
      pq.enqueue([node, wholeCost, paved])
    }

    // 이번도로 포장하는 경우
    if (paved < k && dist < distance[node][paved + 1]) {
      distance[node][paved + 1] = dist
      pq.enqueue([node, dist, paved + 1])
    }
  }
}

let minTime = INF;
for (let i = 0; i <= k; i++) {
  if (distance[n][i] < minTime) {
    minTime = distance[n][i];
  }
}
console.log(minTime);

