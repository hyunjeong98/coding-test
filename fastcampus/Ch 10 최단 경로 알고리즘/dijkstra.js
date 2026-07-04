const { PriorityQueue } = require('./priority_queue')

function dijkstra(graph, distance, start) {
  const pq = new PriorityQueue('min')

  pq.enqueue(start, 0)
  distance[start] = 0

  while (pq.size() != 0) {
    const { value: now, priority: dist } = pq.dequeue()

    if (distance[now] < dist) continue

    for (const [node, cost] of graph[now]) {

      const wholeCost = dist + cost // node를 거쳐갔을때의 가격
      if (wholeCost < distance[node]) { // 거쳐간 가격이 시작점에서 여기로 바로왔을때보다 싸다면
        distance[node] = wholeCost
        pq.enqueue(node, wholeCost)
      }
    }
  }
}
