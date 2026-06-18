/*
  백준 2668번 숫자고르기
  
  [문제]
  세로 두 줄, 가로로 N개의 칸으로 이루어진 표가 있다. 
  첫째 줄의 각 칸에는 정수 1, 2, ..., N이 차례대로 들어 있고 둘째 줄의 각 칸에는 1이상 N이하의 정수가 들어 있다.
  첫째줄에서 숫자를 적절히 뽑으면, 그 뽑힌 정수들이 이루는 집합과 둘째 줄의 숫자들이 이루는 집합이 일치하도록 할 수 있다.
  이러한 조건을 만족시키도록 정수들을 뽑되, 최대로 많이 뽑는 방법을 찾는 프로그램을 작성하시오.
  예를 들어, N=7인 경우 아래와 같이  표가 주어졌다고 하자.
  1 2 3 4 5 6 7
  3 1 1 5 5 4 6
  이 경우에는 첫째줄에서 1, 3, 5를 뽑는 것이 답이다.

  [입력]
  첫째 줄에 표의 크기 N이 주어진다. (1 <= N <= 100)
  둘째 줄부터 N개의 줄에 표의 정보가 주어진다.

  [출력]
  첫째 줄에 뽑힌 정수들의 개수를 출력하고, 그 다음 줄부터는 뽑힌 정수들을 오름차순으로 한 줄에 하나씩 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = +input[0]
const arr = [0]
for (let i = 1; i <= n; i++) {
  arr.push(+input[i])
}

let maxCnt = 0
const selected = []
const visited = new Array(n + 1).fill(false)
const finished = new Array(n + 1).fill(false)

function dfs(x) {
  visited[x] = true
  const next = arr[x]

  if (!visited[next]) {
    dfs(next)
  } else if (!finished[next]) {
    selected.push(x)
    for (let i = next; i != x; i = arr[i]) {
      selected.push(i)
    }
  }

  finished[x] = true
}

for (let i = 1; i <= n; i++) {
  if (!visited[i]) {
    dfs(i)
  }
}

console.log(selected.length)
selected.sort((a, b) => a - b)
console.log(selected.join('\n'))