/* 문제: 숫자 세개가 주어졌을때, 가장 작은 수, 그 다음 수, 가장 큰 수를 출력하는 프로그램을 작성하시오. */

/* 입력: 숫자 세 개가 주어진다. 이 숫자는 1보다 크거나 같고, 1,000,000보다 작거나 같다. 이 숫자는 모두 다르다.
*/

/* 출력: 가장 작은 수, 그 다음 수, 가장 큰 수를 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().split('\n')

const numbers = input[0].split(' ').map(Number)

numbers.sort((a, b) => a - b)

console.log(numbers.join(' '))
