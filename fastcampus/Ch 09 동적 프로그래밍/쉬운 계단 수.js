/**
  [10844] 쉬운 계단 수

  [문제]
  45656이란 수를 보자.
  이 수는 인접한 모든 자릿수의 차이가 1이다. 이런 수를 계단 수라고 한다.

  N이 주어졌을 때, 길이가 N인 계단 수가 총 몇 개 있는지 구하는 프로그램을 작성하시오. 
  0으로 시작하는 수는 계단 수가 아니다.

  [입력]
  첫째 줄에 N이 주어진다. N은 1보다 크거나 같고, 100보다 작거나 같은 자연수이다.

  [출력]
  첫째 줄에 정답을 1,000,000,000으로 나눈 나머지를 출력한다.

  예제 입력 1
  1

  예제 출력 1
  9
  
  (※ 길이가 1인 계단 수는 1, 2, 3, 4, 5, 6, 7, 8, 9 총 9개입니다.)

  예제 입력 2
  2

  예제 출력 2
  17
*/



const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = +input[0]

const dp = Array.from({ length: N + 1 }, () => new Array(10).fill(0))

dp[1] = dp[1].fill(1)
dp[1][0] = 0


for (let n = 2; n <= N; n++) {
  for (let i = 0; i <= 9; i++) {
    if (i > 0) {
      dp[n][i] += dp[n - 1][i - 1]
    }
    if (i < 9) {
      dp[n][i] += dp[n - 1][i + 1]
    }

    dp[n][i] %= Number(1e9)
  }
}

console.log(dp[N].reduce((prev, curr) => (prev + curr) % Number(1e9)))