/*
  백준 7490번 0 만들기
  
  [문제]
  1부터 N까지의 수를 오름차순으로 쓴 수열 1 2 3 ... N을 생각하자.
  그리고 '+'나 '-'또는 ''(공백)을 숫자 사이에 삽입하자. 
  (+는 더하기,-는 빼기, 공백은 숫자를 이어 붙이기로 생각한다.)
  이렇게 만든 수식의 값을 계산하고, 그 값이 0이 되는 모든 수식을 찾는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 테스트 케이스가 주어진다.(<10)
  각 테스트 케이스는 자연수 N(1 ≤ N ≤ 9)이 주어진다.

  [출력]
  각 테스트케이스에 대해 ASCII 순서에 따라 0이 되는 수식을 출력한다.
  각 테스트케이스에 대한 출력은 한 줄을 띄워 구분한다.
*/



const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const tc = Number(input[0])
let n = 0
let arr = []

function dfs(result, depth) {
  if (depth == n - 1) {
    let str = ''
    for (let i = 0; i < n - 1; i++) {
      str += arr[i] + result[i]
    }
    str += arr[n - 1] + ''
    let current = eval(str.split(' ').join(''))
    if (current === 0) {
      console.log(str)
    }
    return
  }

  for (let x of [' ', '+', '-']) {
    result.push(x)
    dfs(result, depth + 1)
    result.pop()
  }
}

for (let t = 1; t <= tc; t++) {
  n = Number(input[t])
  arr = []
  for (let i = 1; i <= n; i++) {
    arr.push(i)
  }
  dfs([], 0)
  console.log()
}



