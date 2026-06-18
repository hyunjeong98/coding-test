/*
  백준 14888번 연산자 끼워넣기

  [문제]
  N개의 수로 이루어진 수열 A1, A2, ..., AN이 주어진다. 또, 수와 수 사이에 끼워넣을 수 있는 N-1개의 연산자가 주어진다. 
  연산자는 덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(÷)으로만 이루어져 있다.
  우리는 수의 순서는 바꾸지 않고, 수 사이에 연산자를 하나씩 넣어서 만들 수 있는 수식 중 결과가 최대인 것과 최소인 것을 구하는 프로그램을 작성하시오.
  연산자를 계산할 때는 우선 순위를 무시하고 앞에서부터 진행해야 한다. 
  또, 나눗셈은 정수 나눗셈으로 몫만 취한다. 
  음수를 양수로 나눌 때는 C++14의 기준을 따른다. 즉, 양수로 바꾼 뒤 몫을 취하고, 그 몫을 음수로 바꾼 것과 같다.
  N개의 수와 N-1개의 연산자가 주어졌을 때, 만들 수 있는 식의 결과가 최대인 것과 최소인 것을 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 수의 개수 N(2 ≤ N ≤ 11)이 주어진다.
  둘째 줄에는 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 100)
  셋째 줄에는 합이 N-1인 4개의 정수가 주어지는데, 차례대로 덧셈(+)의 개수, 뺄셈(-)의 개수, 곱셈(×)의 개수, 나눗셈(÷)의 개수이다.

  [출력]
  첫째 줄에 만들 수 있는 식의 결과의 최댓값을, 둘째 줄에는 최솟값을 출력한다. 
  연산자를 어떻게 끼워넣어도 항상 결과가 -10억보다 크거나 같고, 10억보다 작거나 같은 결과만 나온다. 
  또한, 앞에서부터 계산했을 때, 중간에 계산되는 식의 결과도 항상 -10억보다 크거나 같고 10억보다 작거나 같다.

  예제 입력 1
  2
  5 6
  0 0 1 0

  예제 출력 1
  30
  30
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const n = +input[0]
const numbers = input[1].split(' ').map(Number)
// + - * /
const operators = input[2].split(' ').map(Number)
let [add, sub, mul, div] = operators

let max = -Infinity
let min = Infinity

function dfs(index, value) {
  if (index === n) {
    min = Math.min(min, value)
    max = Math.max(max, value)
    return
  }

  if (add > 0) {
    add--
    dfs(index + 1, value + numbers[index])
    add++
  }

  if (sub > 0) {
    sub--
    dfs(index + 1, value - numbers[index])
    sub++
  }

  if (mul > 0) {
    mul--
    dfs(index + 1, value * numbers[index])
    mul++
  }

  if (div > 0) {
    div--
    dfs(index + 1, ~~(value / numbers[index]))
    div++
  }
}

dfs(1, numbers[0])

console.log(max)
console.log(min)