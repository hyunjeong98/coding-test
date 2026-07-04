class PriorityQueue {
  constructor(compareFunc) {
    this.compareFunc = compareFunc
    this.heap = []
  }

  size() {
    return this.heap.length
  }

  peek() {
    return this.heap[0] ? this.heap[0] : null
  }

  enqueue(item) {
    this.heap.push(item)
    this.bubbleUp()
  }

  bubbleUp() {
    let index = this.heap.length - 1
    const element = this.heap[index]

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      const parent = this.heap[parentIndex]

      if (this.compareFunc(parent, element) <= 0) break

      this.heap[parentIndex] = element
      this.heap[index] = parent
      index = parentIndex
    }
  }

  dequeue() {
    const first = this.heap[0]
    const last = this.heap.pop()

    if (this.heap.length > 0) {
      this.heap[0] = last
      this.sinkDown()
    }

    return first ? first : null
  }

  sinkDown() {
    let index = 0
    const length = this.heap.length
    const element = this.heap[0]

    while (index > 0) {
      let leftIndex = index * 2 + 1
      let rightIndex = index * 2 + 2
      let left, right
      let swap = null

      if (leftIndex < length) {
        left = this.heap[leftIndex]
        if (this.compareFunc(element, left) > 0) {
          swap = leftIndex
        }
      }

      if (rightIndex < length) {
        right = this.heap[rightIndex]
        if (
          (swap === null && !this.compareFunc(element, right) > 0) || 
          (swap !== null && !this.compareFunc(left, right) > 0)
        ) {
          swap = rightIndex
        }
      }

      if (swap === null) break

      this.heap[index] = this.heap[swap]
      this.heap[swap] = element
      index = swap
    }
  }
}

module.exports = { PriorityQueue }