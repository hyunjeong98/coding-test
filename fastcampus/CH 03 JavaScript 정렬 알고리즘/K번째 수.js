/* 문제: 수 N개 A1, A2, ..., AN이 주어진다. A를 오름차순 정렬했을 때, 앞에서부터 K번째 있는 수를 구하는 프로그램을 작성하시오. */

/* 입력: 첫째 줄에 수의 개수 N(1 <= N <= 1,000,000)과 K(1 <= K <= N)가 주어진다. 
둘째에는 Ai(1 <= Ai <= 1,000,000,000)가 주어진다.
*/

/* 출력: A를 오름차순 정렬했을 때, 앞에서부터 K번째 있는 수를 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().split('\n')
const [n, k] = input[0].split(' ').map(Number)
const numbers = input[1].split(' ').map(Number)

numbers.sort((a, b) => a - b)

console.log(numbers[k - 1])
