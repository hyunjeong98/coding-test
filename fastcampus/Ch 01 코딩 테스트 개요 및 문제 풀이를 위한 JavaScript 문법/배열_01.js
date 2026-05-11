/* 문제: N개의 정수가 주어졌을 때, 최소값과 최대값을 구하는 프로그램을 작성하시오. */

/* 입력: 첫째 줄에 정수의 개수 N (1 <= N <= 1,000,000)이 주어진다. 
둘째 줄에는 N개의 정수를 공백으로 구분해서 주어진다. 
모든 정수는 -1,000,000보다 크거나 같고, 1,000,000보다 작거나 같은 정수이다.*/

/* 출력: 첫째 줄에 최소값과 최대값을 공백으로 구분해 출력한다.*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')
const n = Number(input[0])
const numbers = input[1].split(' ').map(Number)

let max = -1000001
let min = 100001
for (number of numbers) {
  if (number > max) {
    max = number
  } else if (number < min) {
    min = number
  }
}

console.log(`${min} ${max}`)




