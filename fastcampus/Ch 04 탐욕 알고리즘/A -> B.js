/* 문제: 정수 A를 B로 바꾸려고 한다. 가능한 연산은 다음과 같은 두 가지 이다.
1. 2를 곱한다.
2. 1을 수의 가장 오른쪽에 추가한다.
A를 B로 바꾸는데 필요한 연산의 최솟값을 구하는 프로그램을 작성하시오.
*/

/* 입력: 첫째 줄에 A와 B가 주어진다. (1 <= A < B <= 10^9) */

/* 출력: A를 B로 바꾸는데 필요한 연산의 최솟값을 출력한다. 만약, 바꿀 수 없다면 -1을 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().trim().split('\n')
let [a, b] = input[0].split(' ').map(Number)

let count = 1

while (b > a) {
  if (b % 10 === 1) {
    b = Math.floor(b / 10)
  } else if (b % 2 === 0) {
    b /= 2
  } else {
    break
  }
  count++
}

if (b === 1) {
  console.log(count)
} else {
  console.log(-1)
}