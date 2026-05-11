/* 문제: N번째 줄에는 별 N개 찍기 */

/* 입력: 첫째 줄에 n이 주어진다. (1 <= n <= 100)*/

/* 출력: 첫째 줄부터 N번째 줄까지 별 출력 */

const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')
const n = Number(input[0])


for (let i = 1; i <= n; i++) {
  let stars = ''
  for (let j = 1; j <= i; j++ ) {
    stars += '*'
  }
  console.log(stars)
}

