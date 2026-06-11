const n = 8
const queens = [] // 현재 체스판에 놓인 퀸 말들의 위치 정보

function isPossible(x, y) {
  for (const [a, b] of queens) {
    if (a == x || b == y) return false
    if (Math.abs(a - x) == Math.abs(b - y)) return false
  }
  return true
}

let count = 0
function dfs(row) {
  if (row == n) count += 1
  for (let i = 0; i < n; i++) {
    if (!isPossible(row, i)) continue
    queens.push([row, i])
    dfs(row + 1)
    queens.pop()
  }
}

dfs(0)
console.log(count)