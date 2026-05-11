/* 문제: 1부터 n까지 합을 구하는 프로그램 */

/* 입력: 첫째 줄에 n이 주어진다. (1 <= n <= 10000)*/

/* 출력: 합 */

const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')
const n = Number(input[0])

let sum = 0
for (let i = 1; i <= n; i++) {
  sum += i
}

console.log(sum)