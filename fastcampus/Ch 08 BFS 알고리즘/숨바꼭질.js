/*
  백준 1697번 숨바꼭질

  [문제]
  수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 
  동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 
  만약 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 
  순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.
  수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

  [입력]
  첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 공백으로 구분되어 주어진다. N과 K는 정수이다.

  [출력]
  수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

  예제 입력 1
  5 17

  예제 출력 1
  4
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [n, k] = input[0].split(' ').map(Number)

const MAX = 100001
const visited = new Array(MAX).fill(0) // 해당 노드까지의 거리

function bfs() {
  const queue = new Queue()
  queue.enqueue(n)
  while (queue.getLength() != 0) {
    const cur = queue.dequeue()
    if (cur == k) {
      return visited[cur]
    }

    for (const next of [cur - 1, cur + 1, cur * 2]) {
      if (next < 0 || next >= MAX) continue
      if (visited[next] == 0) {
        queue.enqueue(next)
        visited[next] = visited[cur] + 1
      }
    }
  }
}

console.log(bfs())