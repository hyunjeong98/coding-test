/* 문제: 수직선 위에 N개의 좌표 X1, X2, ..., XN이 있다. 이 좌표에 좌표 압축을 적용하려고 한다.
Xi를 좌표 압축한 결과 X'i의 값은 Xi > Xj를 만족하는 서로 다른 좌표의 개수와 같아야 한다.
X1, X2, ..., XN에 좌표 압축을 적용한 결과 X'1, X'2, ..., X'N를 출력하는 프로그램을 작성하시오.
*/

/* 입력: 첫째 줄에 N이 주어진다.
둘째 줄에는 공백 한 칸으로 구분된 X1, X2, ..., XN이 주어진다. */

/* 출력: 첫째 줄에 X'1, X'2, ..., X'N을 공백 한 칸으로 구분해서 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().split('\n')
const n = Number(input[0])

const points = input[1].split(' ').map(Number)
const sortedArr = [...new Set(points)]
sortedArr.sort((a, b) => a - b)

const myMap = new Map()
for (let i = 0; i < sortedArr.length; i++) {
  myMap.set(sortedArr[i], i)
}

const result = points.map((x) => myMap.get(x)).join(' ')

console.log(result)

