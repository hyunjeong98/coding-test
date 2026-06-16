/*
  백준 4803번 트리
  
  [문제]
  그래프는 정점과 간선으로 이루어져 있다. 두 정점 사이에 경로가 있다면, 두 정점은 연결되어 있다고 한다. 
  연결 요소는 모든 정점이 서로 연결되어 있는 정점의 부분집합이다. 그래프는 하나 또는 그 이상의 연결 요소로 이루어져 있다.
  트리는 사이클이 없는 연결 그래프이다. 트리에는 여러 가지 성질이 있다. 예를 들어, 트리는 정점이 n개, 간선이 n-1개 있다. 
  또, 임의의 두 정점에 대해서 경로가 유일하다.
  그래프가 주어졌을 때, 트리의 개수를 세는 프로그램을 작성하시오.

  [입력]
  입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스의 첫째 줄에는 정점의 개수 n (n ≤ 500)과 간선의 개수 m (m ≤ n(n-1)/2)이 주어진다. 
  그래프의 정점은 1부터 n까지 번호가 매겨져 있다. 이어지는 m개의 줄에는 간선을 나타내는 두 개의 정점이 주어진다. 같은 간선은 여러 번 주어지지 않는다. 
  입력의 마지막 줄에는 0 두개가 주어진다

  [출력]
  입력으로 주어진 각각의 그래프에 대해, 트리의 개수를 세고 형식에 맞춰 출력한다.

  - 트리가 없는 경우: "No trees."
  - 트리가 한 개인 경우: "There is one tree."
  - 트리가 T개인 경우 (T > 1): "A forest of T trees."

(T는 트리의 개수이며, 출력 형식은 예제를 참고한다. Case 번호는 1부터 시작한다.)
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let line = 0
while (true) {
  if (input[line] == '0 0') break

  const [n, m] = input[line].split(' ').map(Number)
  const graph = Array.from({ length: n + 1 }, () => [])
  for (let i = 1; i <= m; i++) {
    const [x, y] = input[line + i].split(' ').map(Number)
    graph[x].push(y)
    graph[y].push(x)
  }

  
  let count = 0
  const visited = new Array(n + 1).fill(false)
  for (let i = 1; i <= n; i++) {
    if (graph[i].length === 0) {
      count++
      continue
    } 

    function isCycle(x, prev) {
      visited[x] = true

      for (const y of graph[x]) {
        if (!visited[y]) {
          if (isCycle(y, x)) return true
        }
        else if (y != prev) return true
      }
      return false
    }

    if (!visited[i]) { // 이제 시작하는 요소
      if (!isCycle(i, 0)) count++
    }
  }

  if (count == 0) {
    console.log('No trees.')
  } else if (count == 1) {
    console.log('There is one tree.')
  } else {
    console.log(`A forest of ${count} trees.`)
  }
  line += m + 1
}

