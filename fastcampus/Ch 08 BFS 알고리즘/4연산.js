/*
  백준 14395 4연산

  [문제]
  정수 s가 주어진다. 정수 s의 값을 t로 바꾸는 프로그램을 작성하시오. 
  사용할 수 있는 연산은 아래와 같다.
  1. s = s * s; (출력: *)
  2. s = s + s; (출력: +)
  3. s = s - s; (출력: -)
  4. s = s / s; (출력: /) (단, s가 0이 아닐 때만 사용 가능)

  s와 t가 같아지는 최소 연산 횟수를 구하고, 그때의 연산자를 순서대로 출력한다.

  [입력]
  첫째 줄에 s와 t가 주어진다. (1 ≤ s, t ≤ 10^9)

  [출력]
  첫째 줄에 s를 t로 바꾸는 방법을 출력한다. s를 t로 바꾸는 방법이 여러 가지라면, 사전 순으로 앞서는 것을 출력한다. 
  연산자의 사전 순서는 *, +, -, / 이다.
  s와 t가 같은 경우에는 0을, 바꿀 수 없는 경우에는 -1을 출력한다.

  예제 입력 1
  7 392

  예제 출력 1
  +*+

  예제 입력 2
  7 256

  예제 출력 2
  /+***

  예제 입력 3
  4 4

  예제 출력 3
  0

  예제 입력 4
  7 3

  예제 출력 4
  -1
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [s, t] = input[0].split(' ').map(Number)
const operators = ['*', '+', '-', '/']

const visited = new Set([s])
let found = false
function bfs() {
  const queue = new Queue()
  queue.enqueue([s, ''])
  while (queue.getLength() != 0) {
    const [cur, opers] = queue.dequeue()
    if (cur > 10e9) continue
    if (cur == t) {
      console.log(opers)
      found = true
      break
    }

    for (const oper of operators) {
      let next = cur
      if (oper == '*') next *= cur
      if (oper == '+') next += cur
      if (oper == '-') next -= cur
      if (oper == '/' && cur != 0) next = 1

      if (!visited.has(next)) {
        queue.enqueue([next, opers + oper])
        visited.add(next)
      }
    }    
  }
}

if (s == t) console.log(0)
else {
  bfs()
  if (!found) {
    console.log(-1)
  }
}