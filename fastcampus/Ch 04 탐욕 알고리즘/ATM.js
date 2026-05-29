/* 문제: 인하은행에는 ATM이 1대밖에 없다. 지금 이 ATM앞에 N명의 사람들이 줄을 서있다. 
사람은 1번부터 N번까지 번호가 매겨져 있으며, i번 사람이 돈을 인출하는데 걸리는 시간은 Pi분이다.
사람들이 줄을 서 있는 순서대로 인출하려 한다. 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 구하는 프로그램을 작성하시오.
*/

/* 입력: 첫째 줄에 사람의 수 N(1 <= N <= 1,000)이 주어진다.
둘째 줄에는 각 사람이 돈을 인출하는데 걸리는 시간 Pi가 주어진다. (1 <= Pi <= 1,000)
*/

/* 출력: 첫째 줄에 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().trim().split('\n')
const n = Number(input[0])
const times = input[1].split(' ').map(Number)

// 제일 작은 시간의 사람을 앞으로 보내야 함.
times.sort((a, b) => a - b)

// i번째 사람이 돈뽑을때까지 걸리는 시간은 앞에사람 시간까지 다 더해야함.

let result = 0
let sum = 0
for (let i = 0; i < n; i++) {
  sum += times[i] // 0부터 i까지 더한 값
  result += sum // sum을 누적한 값
}

console.log(result)


