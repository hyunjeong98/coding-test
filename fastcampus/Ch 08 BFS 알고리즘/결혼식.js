/*
  [백준 5567] 결혼식

  [문제]
  상근이는 자신의 결혼식에 학교 동기들을 모두 초대하려고 한다. 상근이의 학교 동기는 모두 N명이고, 학번은 1번부터 N번까지이다. 상근이의 학번은 1번이다.
  상근이는 동기들 중 자신과 친구인 사람과 친구의 친구를 결혼식에 초대하기로 했다. 총 몇 명을 초대해야 하는지 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 상근이의 동기의 수 n (2 ≤ n ≤ 500)이 주어진다. 
  둘째 줄에는 리스트의 길이 m (1 ≤ m ≤ 10,000)이 주어진다. 
  셋째 줄부터 m개의 줄에는 친구 관계가 u v가 주어진다. (1 ≤ u, v ≤ n, u ≠ v) u와 v가 친구라는 뜻이다. 

  [출력]
  상근이의 결혼식에 초대하는 동기의 수를 출력한다.

  예제 입력 1
  6
  5
  1 2
  1 3
  3 4
  2 3
  4 5

  예제 출력 1
  3
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = Number(input[0])
const m = Number(input[1])
const graph = Array.from({ length: n + 1 }, () => [])
for (let i = 0; i < m; i++) {
  const [u, v] = input[2 + i].split(' ').map(Number)
  graph[u].push(v)
  graph[v].push(u)
}


function bfs() {
  const visited = new Array(n + 1).fill(-1)
  let count = 0

  const queue = new Queue()
  queue.enqueue(1)
  visited[1] = 0

  while (queue.getLength() != 0) {
    const cur = queue.dequeue()
    if (visited[cur] === 2) continue

    for (const next of graph[cur]) {
      if (visited[next] == -1) {
        visited[next] = visited[cur] + 1
        queue.enqueue(next)
        count++
      }
    }
  }

  return count
}

console.log(bfs())