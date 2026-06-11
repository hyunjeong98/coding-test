/*
  백준 6603번 로또
  
  [문제]
  독일 로또는 {1, 2, ..., 49}에서 6개를 고른다.
  로또 번호를 선택하는데 사용되는 가장 유명한 전략은 49가지 수 중 k(k>6)개의 수를 골라 집합 S를 만드는 것이다. 
  그 다음 그 수만 가지고 번호를 선택하는 것이다.
  집합 S와 k가 주어졌을 때, 수를 고르는 모든 방법을 구하는 프로그램을 작성하시오.

  [입력]
  입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스는 한 줄로 이루어져 있다. 
  첫 번째 수는 k (6 < k < 13)이고, 다음 k개 수는 집합 S에 포함되는 수이다. 
  S의 원소는 오름차순으로 주어진다. 입력의 마지막 줄에는 0이 하나 주어진다. 

  [출력]
  각 테스트 케이스마다 수를 고르는 모든 방법을 출력한다. 이때, 사전 순으로 출력한다.
  각 테스트 케이스 사이에는 빈 줄을 하나 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const testCases = []
for (let i = 0; i < input.length; i++) {
  if (input[i] === '0') break
  testCases.push(input[i].split(' ').map(Number))
}
let answer = ''

function dfs(arr, result, depth, start) {
  if (depth === 6) {
    answer += result.join(' ') + '\n'
    return
  }

  for (let i = start; i < arr.length; i++) {
    result.push(arr[i])
    dfs(arr, result, depth + 1, i + 1)
    result.pop()
  }
}

for (const testCase of testCases) {
  const [k, ...s] = testCase
  dfs(s, [], 0, 0)
  answer += '\n'
}

console.log(answer)