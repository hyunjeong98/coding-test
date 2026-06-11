/*
  백준 2961번 도영이가 만든 맛있는 음식
  
  [문제]
  지금 도영이의 앞에는 재료가 N개 있다. 도영이는 각 재료의 신맛 S와 쓴맛 B를 알고 있다. 
  여러 재료를 이용해서 요리를 만들 때, 그 음식의 신맛은 사용한 재료의 신맛의 곱, 쓴맛은 합이다.
  시거나 쓴 음식을 좋아하는 사람은 많지 않다. 도영이는 재료를 적절히 섞어서 요리의 신맛과 쓴맛의 차이를 작게 만드려고 한다.
  또, 물을 요리라고 할 수 없기 때문에, 재료는 적어도 하나 사용해야 한다.
  재료의 신맛과 쓴맛이 주어졌을 때, 요리의 신맛과 쓴맛의 차이를 가장 작게 만드는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 재료의 개수 N(1 ≤ N ≤ 10)이 주어진다. 
  다음 N개의 줄에는 재료의 신맛과 쓴맛이 공백으로 구분되어 주어진다. 
  모든 재료를 사용해서 요리를 만들었을 때, 그 요리의 신맛과 쓴맛은 모두 1,000,000,000보다 작거나 같은 양의 정수이다.

  [출력]
  첫째 줄에 신맛과 쓴맛의 차이가 가장 작게 만드는 요리의 신맛과 쓴맛의 차이를 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = Number(input[0])
const ingredients = []
for (let i = 1; i <= n; i++) {
  ingredients.push(input[i].split(' ').map(Number))
}

// 신맛은 곱, 쓴맛은 합

const result = []
let minValue = Infinity

function dfs(depth, start) {
  if (depth > 0) {
    console.log(result)
    const totalTaste = result.reduce((acc, cur) => [acc[0] * cur[0], acc[1] + cur[1]], [1, 0])
    const sub = Math.abs(totalTaste[0] - totalTaste[1])
    minValue = Math.min(sub, minValue)

    if (depth === n) return
  }

  for (let i = start; i < n; i++) {
    result.push(ingredients[i])
    dfs(depth + 1, i + 1)
    result.pop()
  }
}

dfs(0, 0)
console.log(minValue)