/*
  백준 10971번 외판원 순회 2
  
  [문제]
  1번부터 N번까지 번호가 매겨져 있는 도시들이 있고, 도시들 사이에는 길이있다. (길이 없을 수도 있다)
  이제 한 외판원이 1번 도시에서 출발해서 나머지 도시들을 거쳐 다시 1번 도시로 돌아오는 순회 여정을 계획하려고 한다.
  단, 한 번 갔던 도시로는 다시 갈 수 없다. (맨 마지막에 시작 도시로 돌아오는 것은 예외)
  이런 여정 중 가장 적은 비용을 들이는 여정을 계획하려고 한다.
  각 도시간에 이동하는데 드는 비용은 행렬 W[i][j]형태로 주어진다.
  W[i][j]는 도시 i에서 도시 j로 가기 위한 비용을 나타낸다.
  W[i][i]는 항상 0이다.
  경우에 따라서 도시 i에서 도시 j로 갈 수 없는 경우도 있으며, 이럴 때는 W[i][j]=0이라고 주어진다.
  N과 비용 정보가 주어졌을 때, 가장 적은 비용을 들이는 외판원의 순회 여정을 계획하는 프로그램을 작성하시오.


  [입력]
  첫째 줄에 도시의 수 N이 주어진다. (2 <= N <= 10)
  다음 N개의 줄에는 비용 행렬이 주어진다. 각 행렬의 원소는 1,000,000 이하의 양의 정수이며, 갈 수 없는 경우는 0이 주어진다.
  W[i][j]는 도시 i에서 도시 j로 가기 위한 비용을 나타낸다.
  항상 순회할 수 있는 경우만 입력으로 주어진다.


  [출력]
  첫째 줄에 외판원의 순회에 필요한 최소 비용을 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const n = Number(input[0])
const matrix = []
for (let i = 1; i <= n; i++) {
  matrix.push(input[i].split(' ').map(Number))
}

const visted = new Array(n).fill(false)
const result = []
let min = 10000000

function dfs(depth) {
  if (depth === n - 1) {
    let totalCost = 0
    let cur = 0
    for (let i = 0; i < n - 1; i++) {
      const nextNode = result[i]
      const cost = matrix[cur][nextNode]
      if (cost == 0) return
      totalCost += cost
      cur = nextNode
    }
    let cost = matrix[cur][0]
    if (cost == 0) return
    totalCost += cost
    min = Math.min(min, totalCost)
    return
  }

  for (let i = 1; i <= n - 1; i++) {
    if (visted[i]) continue
    visted[i] = true
    result.push(i)
    dfs(depth + 1)
    visted[i] = false
    result.pop()
  }
}

dfs(0)
console.log(min)