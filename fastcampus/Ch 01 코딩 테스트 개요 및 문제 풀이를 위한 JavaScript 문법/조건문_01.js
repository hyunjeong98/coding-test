/* 문제: 시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 
70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오. */

/* 입력: 첫째 줄에 시험 점수가 주어진다. 시험 점수는 0보다 크거나 같고, 100보다 같거나 작은 정수이다. */

const fs = require('fs')
const input = fs.readFileSync(0).toString()
const score = Number(input)

if (score >= 90) {
  console.log('A')
} else if (score >= 80) {
  console.log('B')
} else if (score >= 70) {
  console.log('C')
} else if (score >= 60) {
  console.log('D')
} else {
  console.log('F')
}