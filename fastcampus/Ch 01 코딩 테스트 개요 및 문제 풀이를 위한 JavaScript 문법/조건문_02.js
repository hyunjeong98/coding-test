/* 문제: 45분 일찍 알람 설정하기 */

/* 입력: 첫째 줄에 두 정수 H와 M이 주어짐 (0 <= H <= 23, 0 <= M <= 59) 
이것은 일어나야 하는 시간 H시 M분을 의미한다.
24시간 표현을 사용한다. 시간을 나타낼 때, 불필요한 0은 사용하지 않는다.
*/

/* 출력: 첫째 줄에 설정해야 하는 알람 시간을 출력한다. */

const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')

let [hour, minute] = input[0].split(' ').map(Number)

if (minute < 45) {
  hour -= 1
  min += 15

  if (hour < 0) {
    hour = 23
  }
} else {
  minute -= 45
}


console.log(`${hour} ${minute}`)
