/* 문제: 알파벳 소문자로 이루어진 N개의 단어가 들어오면 아래와 같은 조건에 따라 정렬하는 프로그램을 작성하시오.
1. 길이가 짧은 것부터
2. 길이가 같으면 사전 순으로
*/

/* 입력: 첫째 줄에 단어의 개수 N(1 <= N <= 20,000)이 주어진다. 
둘째 줄부터 N개의 줄에는 알파벳 소문자로 이루어진 단어가 한 줄에 하나씩 주어진다. 
주어지는 문자열의 길이는 50을 넘지 않는다. */

/* 출력: 조건에 따라 정렬한 단어를 출력한다. 단, 같은 단어가 여러 번 입력된 경우에는 한 번씩만 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().split('\n')
const n = Number(input[0])

const arr = []
for (let i = 1; i <= n; i++) {
  arr.push(input[i])
}

const set = new Set(arr)
const words = Array.from(set)

function compare(a, b) {
  if (a.length != b.length) return a.length - b.length
  else return a.localeCompare(b)
}

words.sort(compare)


console.log(words.join('\n'))


