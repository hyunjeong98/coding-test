/* 문제: A + B */

/* 입력: 첫째 줄에 테스트 케이스 T. T는 최대 1,000,000.
T줄에는 각각 두 정수 A와 B가 주어짐
*/

/* 출력: 각 케이스마다 합을 한줄에 하나씩 출력*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')
const t = Number(input[0])

let result = ''
for (let i = 1; i <= t; i++) {
  const [a, b] = input[i].split(' ').map(Number)
  result += `${a + b}\n`
}

console.log(result)



