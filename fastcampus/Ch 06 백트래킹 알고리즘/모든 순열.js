/*
  백준 10974번 모든 순열
  
  [문제]
  N이 주어졌을 때, 1부터 N까지의 수로 이루어진 수열을 모두 구하는 프로그램을 작성하시오.
  [입력]
  첫째 줄에 자연수 N(1 ≤ N ≤ 8)이 주어진다.
  [출력]
  첫째 줄부터 N!개의 줄에 각 순열을 사전순으로 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = Number(input[0])
const arr = [] // n까지의 자연수 배열
for (let i = 1; i <= n; i++) {
  arr.push(i)
}

const visited = new Array(n).fill(false) // 방문한 인덱스 배열
const selected = [] // 선택한 숫자

let result = ''
function dfs(arr, depth) {
  if (depth == arr.length) {
    result += selected.join(' ') + '\n'
    return
  }
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue
    visited[i] = true
    selected.push(arr[i])
    dfs(arr, depth + 1)
    visited[i] = false
    selected.pop()
  }
}
dfs(arr, 0)
console.log(result)