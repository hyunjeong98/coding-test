/*
  백준 2925번 부등호
  
  [문제]
  두 종류의 부등호 기호 <와 >가 k개 나열된 순서열 A가 있다. 
  우리는 이 부등호 기호 앞뒤에 0 이상 9 이하의 숫자(0부터 9까지의 정수)를 넣어서, 
  모든 부등호 관계를 만족시키려고 한다. 예를 들어, 제시된 부등호 순서열 A가 다음과 같다고 하자.
  A = < < < > < < > < >
  이 상황에서 부등호 기호를 앞뒤에 넣어 수를 만들면 다음과 같다.
  3 < 4 < 5 < 6 > 1 < 2 < 8 > 7 < 9 > 0

  이 상황에서 부등호 기호를 제거한 뒤, 숫자를 모두 붙ㅇ면 하나의 수를 만들 수 있는데
  이 수를 주어진 부등호 관계를 만족시키는 정수라고 한다. 
  그런데 주어진 부등호 관계를 만족하는 정수는 하나 이상 존재한다. 
  예를 들어 2345128790 뿐만 아니라 5689023174도 부등호 관계 A를 만족시킨다.

  제시된 K개의 부등호 순서를 만족하는 (k+1)자리의 정수 중에서 최대값과 최소값을 찾아야 한다.
  선택된 숫자는 모두 달라야 한다.


  [입력]
  첫 줄에 부등호의 개수 k가 주어진다. (2 <= k <= 9)
  다음 줄에는 k개의 부등호 기호가 하나의 공백을 두고 순서열로 주어진다.

  [출력]
  첫째 줄에 부등호 관계를 만족하는 수열 중 최대값을, 둘째 줄에는 최소값을 출력한다.
  첫 자리가 0인 경우도 정수에 포함되어야 한다.
  모든 입력에 답은 항상 존재하며 출력 정수는 하나의 문자영리 되도록 해야한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const k = Number(input[0])
const inequalities = input[1].split(' ')

const visited = new Array(10).fill(false)
const selected = []
let max = new Array(k + 1).fill(0)
let min = new Array(k + 1).fill(9)

function dfs(depth) {
  if (depth === k + 1) {
    const selectedNumber = Number(selected.join(''))
    const maxNumber = Number(max.join(''))
    const minNumber = Number(min.join(''))

    if (selectedNumber > maxNumber) {
      max = [...selected]
    }
    if (selectedNumber < minNumber) {
      min = [...selected]
    }
    return
  }

  for (let i = 0; i < 10; i++) {
    if (visited[i]) continue
    if (depth > 0) {
      const prev = selected[depth - 1]
      const op = inequalities[depth - 1]
      if (op === '<' && prev >= i) continue
      if (op === '>' && prev <= i) continue
    }
    
    visited[i] = true
    selected.push(i)
    dfs(depth + 1)
    visited[i] = false
    selected.pop()
  }
}


dfs(0)
console.log(max.join(''))
console.log(min.join(''))