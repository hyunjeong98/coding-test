/*
  [백준 16953] A → B

  [문제]
  정수 A를 B로 바꾸려고 한다. 가능한 연산은 다음과 같은 두 가지이다.
    1. 2를 곱한다.
    2. 1을 수의 가장 오른쪽에 추가한다. 
  A를 B로 바꾸는데 필요한 연산의 최솟값에 1을 더한 값을 출력하시오. 만들 수 없는 경우에는 -1을 출력한다.

  [입력]
  첫째 줄에 A, B (1 ≤ A < B ≤ 10^9)가 주어진다.

  [출력]
  A를 B로 바꾸는데 필요한 연산의 최솟값에 1을 더한 값을 출력한다. 만들 수 없는 경우에는 -1을 출력한다.

  예제 입력 1
  2 162

  예제 출력 1
  5

  [힌트/설명]
  2 → 4 → 8 → 81 → 162 (최솟값 4에 1을 더해서 5)

  예제 입력 2
  4 42

  예제 출력 2
  -1
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [a, b] = input[0].split(' ').map(Number)
const visited = new Set()

function bfs() {
  const queue = new Queue()
  queue.enqueue([a, 1])
  visited.add(a)

  while (queue.getLength() != 0) {
    const [cur, cnt] = queue.dequeue()

    for (const next of [cur * 2, cur * 10 + 1]) {
      if (next > b) continue
      if (next == b) return cnt + 1

      if (!visited.has(next)) {
        queue.enqueue([next, cnt + 1])
        visited.add(next)
      }
      
    }
  }
  return -1
}

console.log(bfs())
