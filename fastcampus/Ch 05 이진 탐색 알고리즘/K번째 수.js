/*
  백준 1300번 K번째 수
  
  [문제]
  세준이는 크기가 N×N인 배열 A를 만들었다. 배열에 들어있는 수 A[i][j]=i×j 이다. 
  이 수를 일차원 배열 B에 넣으면 B의 크기는 N×N이 된다. B를 오름차순 정렬했을 때, B[k]를 구해보자.
  배열 A와 B의 인덱스는 1부터 시작한다.

  [입력]
  첫째 줄에 배열의 크기 N이 주어진다. N은 10^5보다 작거나 같은 자연수이다. 
  둘째 줄에 정수 k가 주어진다. k는 min(10^9, N^2)보다 작거나 같은 자연수이다.
  
  [출력]
  첫째 줄에 B[k]를 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const n = Number(input[0])
const k = Number(input[1])


let start = 1
let end = n * n

let result = 0
while (start <= end) {
  const mid = Math.floor((start + end) / 2)
  let count = 0
  for (let i = 1; i <= n; i++) {
    count += Math.min(Math.floor(mid / i), n)
  }
  
  if (count >= k) {
    result = mid
    end = mid - 1
  } else {
    start = mid + 1
  }
}
console.log(result)