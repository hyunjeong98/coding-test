/* 문제: 구구단 출력 */

/* 입력: 첫째 줄에 n이 주어진다. (1 <= n <= 9)*/

/* 출력: 구구단 형식으로 출력 */

const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')
const n = Number(input[0])

for (let i = 1; i <= 9; i++) {
  console.log(`${n} * ${i} = ${n * i}\n`)
}

