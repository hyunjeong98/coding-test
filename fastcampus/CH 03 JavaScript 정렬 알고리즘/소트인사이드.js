/* 문제: 수가 주어지면, 그 수의 각 자리수를 내림차순으로 정렬해보자.
*/

/* 입력: 첫째 줄에 정렬하려고 하는 수 N이 주어진다. N은 1,000,000,000보다 작거나 같은 자연수이다. */

/* 출력: 첫째 줄에 자리수를 내림차순으로 정렬한 수를 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().trim().split('\n')
const arr = input[0].split('').map(Number)

arr.sort((a, b) => b - a)

console.log(arr.join(''))

