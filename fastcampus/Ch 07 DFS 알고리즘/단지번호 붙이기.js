/*
  백준 2667번 단지 번호 붙이기
  
  [문제]
  정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다.
  연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려고 한다.
  여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다.
  대각선상에 집이 있는 경우는 연결된 것이 아니다.
  지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.

  [입력]
  첫번째 줄에는 지도의 크기 N이 주어진다. (5 ≤ N ≤ 25)
  그 다음 N줄에는 각각 N개의 자료(0혹은 1)가 입력된다.

  [출력]
  첫째 줄에는 총 단지수를 출력한다.
  그리고 각 단지내 집의 수를 오름차순으로 정렬하여 한 줄에 하나씩 출력하여야 한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = Number(input[0])

const graph = []
for (let i = 1; i <= n; i++) {
  const arr = input[i].split('').map(Number)
  graph.push(arr)
}

const dx = [-1, 1, 0, 0]
const dy = [0, 0, -1, 1]


function dfs(x, y) {
  if (x < 0 || x >= n || y < 0 || y >= n) {
    return 0
  }

  if (graph[x][y] == 1) {
    graph[x][y] = -1
    let result = 1
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]
      result += dfs(nx, ny)
    }
    return result
  }

  return 0
}

const answer = []
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const result = dfs(i, j)
    if (result > 0) {
      answer.push(result)
    }
  }
}

answer.sort((a, b) => a - b)

console.log(answer.length + '\n' + answer.join('\n'))
