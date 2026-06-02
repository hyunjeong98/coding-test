/*
  백준 2085번 나무 자르기
  
  [문제]
  목재절단기는 다음과 같이 동작한다. 먼저, 높이 H를 지정한다. 높이를 H로 지정한 나무들을 절단한다. 
  따라서, 높이가 H보다 큰 나무는 H 위의 부분이 잘릴 것이고, 낮은 나무는 아무렇게 잘리지 않을 것이다. 
  예를 들어, 한 줄에 연속해있는 나무의 높이가 20, 15, 10, 17이라고 하자. 
  상근이가 높이를 15로 지정했다면, 나무를 자른 뒤의 높이는 15, 15, 10, 15가 될 것이고, 
  상근이는 길이가 5인 나무와 2인 나무를 들고 집에 갈 것이다. (5 + 2 = 7)
  절단기에 설정할 수 있는 높이는 양의 정수 또는 0이다.
  상근이는 환경에 매우 관심이 많기 때문에, 나무를 필요한 만큼만 집으로 가져가려고 한다. 
  이때, 적어도 M미터의 나무를 집에 가져가기 위해서 절단기에 설정할 수 있는 높이의 최댓값을 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 나무의 수 N과 상근이가 집에 가져가려고 하는 나무의 길이 M이 주어진다. (1 <= N <= 1,000,000, 1 <= M <= 2,000,000,000)
  둘째 줄에는 나무의 높이가 주어진다. 나무의 높이의 합은 항상 M보다 크거나 같기 때문에, 상근이는 집에 항상 나무를 가져갈 수 있다.
  나무의 높이는 1,000,000,000보다 작거나 같은 양의 정수 또는 0이다.

  [출력]
  절단기에 설정할 수 있는 높이의 최댓값을 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [n, m] = input[0].split(' ').map(Number)
const trees = input[1].split(' ').map(Number)

// 높이를 어떻게 정해야 M에 가깝게 가져갈 수 있을지 파라메트릭 서치로 찾아보자
let start = 0
let end = trees.reduce((a, b) => Math.max(a, b))

let maxHeight = 0
while (start <= end) {
  const mid = Math.floor((start + end) / 2)
  console.log(mid)

  let total = 0
  for (const tree of trees) {
    const h = Math.max(tree - mid, 0)
    total += h
  }
  console.log(total)

  if (total >= m) {
    maxHeight = mid
    start = mid + 1
  } else {
    end = mid - 1
  }
}

console.log(maxHeight)