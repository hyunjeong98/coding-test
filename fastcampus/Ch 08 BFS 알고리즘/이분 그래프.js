/*
  백준 1707번 이분 그래프

  [문제]
  그래프의 정점의 집합을 둘로 분할하여, 각 집합에 속한 정점끼리는 서로 인접하지 않도록 분할할 수 있을 때, 
  그러한 그래프를 이분 그래프(Bipartite Graph)라 부른다.
  그래프가 입력으로 주어졌을 때, 이 그래프가 이분 그래프인지 아닌지 판별하는 프로그램을 작성하시오.

  [입력]
  입력은 여러 개의 테스트 케이스로 구성되어 있으며, 첫째 줄에 테스트 케이스의 개수 K가 주어진다.
  각 테스트 케이스의 첫째 줄에는 정점의 개수 V와 간선의 개수 E가 빈 칸을 사이에 두고 주어진다. 각 정점에는 1부터 V까지 번호가 매겨져 있다.
  이어서 둘째 줄부터 E개의 줄에 걸쳐 간선에 관한 정보가 주어지는데, 각 줄에는 간선으로 연결된 두 정점의 번호가 빈 칸을 사이에 두고 주어진다. 
  간선은 방향이 없다. (1 ≤ K ≤ 5, 2 ≤ V ≤ 20,000, 1 ≤ E ≤ 20,000)

  [출력]
  K개의 줄에 걸쳐 입력으로 주어진 그래프가 이분 그래프이면 YES, 아니면 NO를 순서대로 출력한다.

  예제 입력 1
  2
  3 2
  1 3
  2 3
  4 4
  1 2
  2 3
  3 4
  4 2

  예제 출력 1
  YES
  NO
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
let testCases = Number(input[0])

function bfs(x, graph, visited) {
  const queue = new Queue()
  queue.enqueue(x)
  visited[x] = 0

  while (queue.getLength() != 0) {
    const cur = queue.dequeue()

    for (const next of graph[cur]) {
      if (visited[next] == -1) {
        visited[next] = (visited[cur] + 1) % 2
        queue.enqueue(next)
      }
    }
  }
}

function isBipartite(graph, visited) {
  for (let x = 1; x < visited.length; x++) {
    for (const y of graph[x]) {
      if (visited[y] == visited[x]) return false
    }
  }
  return true
}

let line = 1
while (testCases--) {
  const [v, e] = input[line].split(' ').map(Number)
  const graph = Array.from({ length: v + 1 }, () => [])
  for (let i = 1; i <= e; i++) {
    const [a, b] = input[line + i].split(' ').map(Number)
    graph[a].push(b)
    graph[b].push(a)
  }

  const visited = new Array(v + 1).fill(-1)
  for (let i = 1; i <= v; i++) {
    if (visited[i] == -1) bfs(i, graph, visited)
  }
  
  if (isBipartite(graph, visited)) {
    console.log('YES')
  } else {
    console.log('NO')
  }
  

  line += e + 1
}