/*
  백준 18353번 병사 배치하기
  
  [문제]
  N명의 병사가 무작위로 나열되어 있다. 각 병사는 특정한 값의 전투력을 보유하고 있으며, 
  병사를 배치할 때는 전투력이 높은 병사가 앞쪽에 오도록 내림차순으로 배치하고자 한다.
  다시 말해 앞쪽에 있는 병사의 전투력이 항상 뒤쪽에 있는 병사의 전투력보다 높아야 한다.
  또한 배치 과정에서 특정한 위치에 있는 병사를 열외시키는 방법을 이용한다. 
  그러면서도 남아있는 병사의 수가 최대가 되도록 하고 싶다.
  예를 들어, N=7인 병사들의 전투력이 다음과 같다고 하자.
  병사번호 [1, 2, 3, 4, 5, 6, 7]
  전투력 [15, 11, 4, 8, 5, 2, 4]
  이때, 병사 번호 3과 6의 병사를 열외시키면, 다음과 같이 병사의 수가 내림차순의 형태가 되며 5명이 된다.
  병사번호 [1, 2, 4, 5, 7]
  전투력 [15, 11, 8, 5, 4]
  병사가 남아있는 수가 최대가 되도록 하기 위해서 열외해야 하는 병사의 수를 출력하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에 N(1 <= N <= 2,000)이 주어진다.
  둘째 줄에 각 병사의 전투력이 공백으로 구분되어 주어진다. 전투력은 10,000,000보다 작거나 같은 자연수이다.

  [출력]
  첫째 줄에 남아있는 병사의 수가 최대가 되도록 하기 위해서 열외해야 하는 병사의 수를 출력한다.
*/

function lowerBound(arr, target, start, end) {
  while (start < end) {
    const mid = Math.floor((start + end) / 2)
    if (target <= arr[mid]) end = mid
    else start = mid + 1
  }
  return end
}

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const n = Number(input[0])
const soldiers = input[1].split(' ').map(Number)

soldiers.reverse()

const arr = [0]

for (x of soldiers) {
  if (x > arr[arr.lenght - 1]) {
    arr.push(x)
  } else {
    const index = lowerBound(arr, x, 0, arr.length)
    arr[index] = x
  }
}

console.log(n - (arr.length - 1))
