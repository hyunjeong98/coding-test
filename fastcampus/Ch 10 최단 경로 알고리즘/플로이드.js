/*
  [11404번] 플로이드

  [문제]
  n(2 ≤ n ≤ 100)개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 m(1 ≤ m ≤ 100,000)개의 버스가 있다. 
  각 버스는 한 번 사용할 때 필요한 비용이 있다.
  모든 도시의 쌍 (A, B)에 대해서 도시 A에서 B로 가는데 필요한 비용의 최솟값을 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 도시의 개수 n이 주어진다.
  둘째 줄에는 버스의 개수 m이 주어진다.
  셋째 줄부터 m+2줄까지 버스의 정보가 주어진다. 먼저 처음 출발하고자 하는 도시의 번호가 주어지고, 그 다음 도착하고자 하는 도시의 번호가 주어지며, 
  그 버스를 탈 때 필요한 비용이 주어진다. 버스의 비용은 100,000보다 작거나 같은 자연수이다.
  시작 도시와 도착 도시를 연결하는 노선은 하나가 아닐 수 있다.

  [출력]
  n개의 줄을 출력해야 한다. i번째 줄에 출력하는 j번째 숫자는 도시 i에서 j로 가는데 필요한 최소 비용이다. 
  만약, i에서 j로 갈 수 없는 경우에는 그 자리에 0을 출력한다.

  예제 입력 1
  5
  14
  1 2 2
  1 3 3
  1 4 1
  1 5 10
  2 4 2
  3 4 1
  3 5 1
  4 5 3
  3 5 10
  3 1 8
  1 4 2
  5 1 7
  3 4 2
  5 2 4

  예제 출력 1
  0 2 3 1 4
  12 0 15 2 5
  8 5 0 1 1
  10 7 13 0 3
  7 4 10 6 0
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = +input[0]
const m = +input[1]
const INF = 1e9
const graph = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(INF) )
for (let i = 0; i < m; i++) {
  const [a, b, cost] = input[2 + i].split(' ').map(Number)
  graph[a][b] = Math.min(graph[a][b], cost)
}

for (let i = 1; i <= n; i++) {
  graph[i][i] = 0
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j])
    }
  }
}

let result = ''
for (let i = 1; i <= n; i++) {
  let row = []
  for (let j = 1; j <= n; j++) {
    if (graph[i][j] == INF) {
      row.push(0)
    } else {
      row.push(graph[i][j])
    }
  }
  result += row.join(' ') + '\n'
}
console.log(result)