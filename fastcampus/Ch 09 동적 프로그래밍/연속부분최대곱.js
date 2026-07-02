/**
  [2670] 연속부분최대곱

  [문제]
  N개의 실수가 양의 상관관계 순서로 나열되어 있다. 이 중 한 개 이상의 연속된 수들의 곱이 최대가 되는 부분을 찾아, 
  그 최댓값을 출력하는 프로그램을 작성하시오.
  예를 들어 아래와 같이 8개의 실수가 양의 상관관계 순서로 나열되어 있을 때,
    1.1, 0.9, 1.5, 0.98, 1.4, 0.9, 1.4, 1.2
  3번째 수부터 7번째 수까지의 곱은
    1.5 × 0.98 × 1.4 × 0.9 × 1.4 = 2.59308
  이 되며, 이 값이 최댓값이다.

  [입력]
  첫째 줄은 실수의 개수 N이 주어진다. N은 10,000 이하의 자연수이다. 
  다음 줄부터 N개의 줄에는 한 줄에 한 개씩 실수가 입력되며, 실수는 0.0 이상 9.9 이하이다.

  [출력]
  대합을 첫째 줄에 소수점 아래 셋째 자리까지 반올림하여 출력한다.

  예제 입력 1
  8
  1.1
  0.7
  1.3
  0.9
  1.4
  0.8
  0.7
  1.4

  예제 출력 1
  1.683
 */

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = +input[0]

const dp = []
for (let i = 1; i <= n; i++) {
  dp.push(+input[i])
}

let maxResult = 0
for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i], dp[i - 1] * dp[i])
  maxResult = Math.max(maxResult, dp[i])
}

console.log(maxResult.toFixed(3))