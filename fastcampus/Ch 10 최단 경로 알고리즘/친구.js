/**
  [1058번] 친구

  [문제]
  지민이는 세계에서 가장 유명한 사람이 누구인지 궁금해졌다. 가장 유명한 사람을 구하는 방법은 각 사람의 2-친구의 수를 구한 뒤, 그 값이 가장 큰 사람을 구하는 것이다.
  어떤 사람 A가 다른 사람 B의 2-친구가 되려면, 두 사람이 친구이거나, A와 친구이고 B와 친구인 C가 존재해야 한다. 여기서 가장 유명한 사람은 2-친구의 수가 가장 많은 사람이다.
  각 사람의 친구 관계가 주어졌을 때, 가장 유명한 사람의 2-친구의 수를 구하는 프로그램을 작성하시오.
  A와 B가 친구이면, B와 A도 친구이다. 자기 자신은 친구가 아니다.

  [입력]
  첫째 줄에 사람의 수 N이 주어진다. N은 50보다 작거나 같은 자연수이다.
  둘째 줄부터 N개의 줄에 각 사람의 친구 관계가 주어진다. i번째 줄의 j번째 글자가 'Y'라면 i와 j가 친구라는 뜻이고, 'N'이면 친구가 아니라는 뜻이다.

  [출력]
  첫째 줄에 가장 유명한 사람의 2-친구의 수를 출력한다.

  예제 입력 1
  3
  NYY
  YNY
  YYN
  예제 출력 1
  2

  예제 입력 2
  5
  NYNNN
  YNYNN
  NYNYN
  NNYNY
  NNNYN
  예제 출력 2
  4
*/

// 각 거리는 1이라고 했을때 최단거리가 2이하인게 2-친구. 그 줄에 2가 젤 많은 사람이 유명한사람.

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = +input[0]
const INF = 1e9
const graph = []
for (let i = 0; i < n; i++) {
  graph.push(input[1 + i].split('').map((value) => value === 'Y' ? 1 : INF))
  graph[i][i] = 0
}

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j])
    }
  }
}

let max = 0
for (let i = 0; i < n; i++) {
  const count = graph[i].filter((value) => value > 0 && value <= 2).length
  max = Math.max(count, max)
}
console.log(max)