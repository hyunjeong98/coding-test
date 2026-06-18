/*
  백준 15686번 치킨 배달
  
  [문제]
  크기가 N×N인 도시가 있다. 도시는 1×1크기의 칸으로 나누어져 있다.
  도시의 각 칸은 빈 칸, 치킨집, 집 중 하나이다.
  도시의 칸은 (r, c)와 같은 형태로 나타내고, r행 c열 또는 위에서부터 r번째 칸, 왼쪽에서부터 c번째 칸을 의미한다.
  r과 c는 1부터 시작한다.
  도시에는 각 치킨집의 치킨 거리가 있다. 치킨 거리는 집과 가장 가까운 치킨집 사이의 거리이다.
  도시의 치킨 거리는 모든 집의 치킨 거리의 합이다.
  임의의 두칸 (r1, c1)과 (r2, c2) 사이의 거리는 |r1-r2| + |c1-c2|로 구한다.
  도시에 있는 치킨집 중에서 최대 M개를 고르고, 나머지 치킨집은 모두 폐업시켜야 한다.
  어떻게 고르면, 도시의 치킨 거리가 가장 작게 될지 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 N(2 ≤ N ≤ 50)과 M(1 ≤ M ≤ 13)이 주어진다.
  둘째 줄부터 N개의 줄에 도시의 정보가 주어진다.
  도시의 정보는 0, 1, 2로 이루어져 있고, 0은 빈 칸, 1은 집, 2는 치킨집을 의미한다. 집의 개수는 2N개를 넘지 않으며, 
  적어도 1개는 존재한다. 치킨집의 개수는 M보다 크거나 같고, 13보다 작거나 같다.

  [출력]
  첫째 줄에 폐업시키지 않을 치킨집을 최대 M개 골랐을 때, 
  도시의 치킨 거리의 최솟값을 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [n, m] = input[0].split(' ').map(Number)
const house = []
const chickens = []
for (let i = 1; i <= n; i++) {
  input[i].split(' ').forEach((value, j) => {
    if (value === '1') {
      house.push([i, j + 1])
    } else if (value === '2') {
      chickens.push([i, j + 1])
    }
  })
}

let min = Infinity
const selected = []
function dfs(depth, start) {
  if (depth === m) {
    let sum = 0
    for (let [hx, hy] of house) {
      let tempMin = Infinity
      for (let i of selected) {
        const [cx, cy] = chickens[i]
        tempMin = Math.min(tempMin, Math.abs(hx - cx) + Math.abs(hy - cy))
      }
      sum += tempMin
    }
    min = Math.min(min, sum)
    return
  }

  for(let i = start; i < chickens.length; i++) {
    selected.push(i)
    dfs(depth + 1, i + 1)
    selected.pop()
  }
}

dfs(0, 0)

console.log(min)
