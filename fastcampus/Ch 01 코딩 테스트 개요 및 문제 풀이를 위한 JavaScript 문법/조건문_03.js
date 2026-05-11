/* 문제: 오븐구이 끝나는 시각 구하기 */

/* 입력: 첫째 줄에는 현재시각이 시와 분을 빈칸을 두고 순서대로 주어짐.
두번째 줄에는 요리하는 데 필요하는 시간이 분 단위로 주어짐.
*/

/* 출력: 첫째 줄에 종료되는 시각의 시와 분을 출력 */

const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')

let [currentHour, currentMinute] = input[0].split(' ').map(Number)
let minutes = Number(input[1])

minutes += currentHour * 60 + currentMinute

const todayMinutes = minutes % (60 * 24)

const hour = Number.parseInt(todayMinutes / 60)
const minute = todayMinutes % 60

console.log(`${hour} ${minute}`)
