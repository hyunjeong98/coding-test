/**
  [2325번] 개코전쟁

  [문제]
  “앙두레 강”이 개미와 코끼리 결혼식에서 기차를 아름답게 만드는 것을 실패했기 때문에 식장이 아수라장이 되고 결혼이 물거품이 되어버렸다. 
  급기야는 왕국 간에 분쟁으로 이어져 개미왕국은 코끼리왕국을 공격하기로 결정하였다.
  동물나라 지도에서 개미왕국은 1번 정점에 위치해 있고 코끼리왕국은 N번 정점에 위치해 있다. 
  따라서 개미왕국이 1번 정점에서 N번 정점으로 공격을 하러 가는 상황이다. (개미왕국은 최단거리로 이동한다.)
  “앙두레 강”은 자신 때문에 발생한 이 전쟁을 어떻게든 막으려고 한다. 
  협상을 할 시간을 벌기 위해 개미왕국이 코끼리왕국에 도착하는 시간을 최대한 늦추려고 한다.
  도착 시간을 늦추기 위해 “앙두레 강”이 할 수 있는 일은 동물나라의 도로 중 단 하나를 파괴하는 것이다. 
  도로 하나를 파괴했을 때, 개미왕국이 코끼리왕국에 도착하는 최단 경로의 길이가 최대가 되도록 하려고 한다. 
  이때의 최단 경로의 길이를 구하는 프로그램을 작성하시오.
  어떤 도로 하나를 파괴하여 1번 정점에서 N번 정점으로 갈 수 있는 경로가 없어진다면, 그 때의 최단 경로의 길이는 무한대가 된다.
  초기 상태에서는 항상 1번에서 N번으로 가는 경로가 존재한다.

  [입력]
  첫째 줄에 정점의 개수 N(2 ≤ N ≤ 1,000)과 도로의 개수 M(1 ≤ M ≤ 50,000)이 주어진다.
  둘째 줄부터 M개의 줄에 걸쳐 각 도로의 정보 u, v, w가 주어진다. 이는 u와 v를 연결하는 도로의 통행 시간이 w(1 ≤ w ≤ 1,000)라는 뜻이다. 
  도로는 양방향 통행이 가능하다. 두 정점 사이에는 두 개이상의 길이 존재하지 않음.
  한 도로를 파괴하는 것은 양방향 모두 파괴하는 것.

  [출력]
  하나의 도로를 파괴하여 얻을 수 있는 1번 정점에서 N번 정점까지의 최단 경로의 길이 중 최댓값을 출력한다.

  예제 입력 1
  5 7
  1 2 1
  2 3 3
  3 4 5
  4 5 2
  1 3 2
  2 4 6
  3 5 4
  예제 출력 1
  8
*/

const fs = require('fs')
const { PriorityQueue } = require('./priority_queue')
const { Queue } = require('../Ch 08 BFS 알고리즘/queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input[0].split(' ').map(Number)
const graph = Array.from({ length: N + 1 }, () => [])
for (let i = 1; i <= M; i++) {
  const [u, v, w] = input[i].split(' ').map(Number)
  graph[u].push([v, w])
  graph[v].push([u, w])
}

const INF = 1e9

function dijkstra(removed) {
  const distance = new Array(N + 1).fill(INF)
  
  const pq = new PriorityQueue((a, b) => a[1] - b[1])
  pq.enqueue([1, 0]) // 노드, 비용
  distance[1] = 0

  while (pq.size() != 0) {
    const [now, dist] = pq.dequeue()
    
    if (distance[now] < dist) continue

    for (const [node, cost] of graph[now]) {
      // 도로가 파괴된 경우 패스
      if (
        removed && 
        ((node === removed[0] && now === removed[1]) || (now === removed[0] && node === removed[1]))
      ) {
        continue
      }
      
      const wholeCost = dist + cost
      if (wholeCost < distance[node]) {
        distance[node] = wholeCost
        pq.enqueue([node, wholeCost])
      }
    }
  }
   return distance
}

function bfs(distance) {
  const queue = new Queue()
  const visited = new Set()
  queue.enqueue(N)
  const removes = []

  while (queue.getLength() != 0) {
    const now = queue.dequeue()
    if (now === 1) {
      continue
    }

    for (const [node, cost] of graph[now]) {
      const wholeCost = distance[node] + cost
      if (wholeCost === distance[now]) {
        removes.push([node, now])
        if (!visited[node]) {
          queue.enqueue(node)
          visited.add(node)
        }
      }
    }
  }
  return removes
}

// 1. 처음 순수한 최단 경로 찾기 (부모 기록 활성화)
const firstDistance = dijkstra(null)

// 2. 최단 경로에 쓰인 도로들 역추적
const roads = bfs(firstDistance)

// 3. 도로를 하나씩 없애보면서 최댓값 갱신
let maxAns = 0
for (const removed of roads) {
  const distance = dijkstra(removed)
  maxAns = Math.max(maxAns, distance[N])
}

console.log(maxAns)
