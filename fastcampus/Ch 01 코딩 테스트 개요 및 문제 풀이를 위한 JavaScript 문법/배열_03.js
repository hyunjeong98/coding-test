/* 문제: 두 자연수 A와 B가 있을때, A%B는 A를 B로 나눈 나머지이다. 예를 들어, 7, 14, 27, 38을 3으로 나눈 나머지는 1, 2, 0, 2이다. 

수 10개를 입력받은 뒤, 이를 42로 나눈 나머지를 구한다. 그 다음 서로 다른 값이 몇 개 있는지 출력하는 프로그램을 작성하시오.
*/

/* 입력: 첫째 줄부터 열 번째 줄까지 한 줄에 하나의 자연수가 주어진다. 주어지는 자연수는 1,000보다 작거나 같고, 음이 아닌 정수이다.*/

/* 출력: 첫째 줄에, 42로 나누었을 때, 서로 다른 나머지가 몇 개 있는지 출력한다.*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')

const remain = input.map((n) => Number(n) % 42)
const remainSet = new Set(remain)

console.log(remainSet.size)