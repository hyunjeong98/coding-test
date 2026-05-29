/*
  백준 1493번 박스 채우기
  
  [문제]
  세준이는 length * width * height 크기의 직육면체 모양의 박스를 가지고 있다. 
  그리고 세준이는 이 박스를 큐브를 이용하여 채우려고 한다.
  큐브는 정육면체 모양이며, 한 변의 길이는 2의 제곱꼴이다. (1, 2, 4, 8, 16, 32 ...)
  세준이가 가지고 있는 박스의 종류와 큐브의 종류와 개수가 주어졌을 때, 세준이가 박스를 채우는데 필요한 큐브의 최소 개수를 구하는 프로그램을 작성하시오.
  
  [입력]
  첫째 줄에 세 자연수 length, width, height가 주어진다. (1 <= length, width, height <= 10^6)
  둘째 줄에 박스의 종류 N(1 <= N <= 100)이 주어진다.
  셋째 줄부터 N개의 줄에 큐브의 종류 Ai와 개수 Bi가 i가 증가하는 순서대로 주어진다. (1 <= Ai <= 1000, 1 <= Bi <= 1000000)
  
  [출력]
  세준이가 박스를 채우는데 필요한 큐브의 최소 개수를 출력한다. 만약 박스를 채울 수 없다면 -1을 출력한다.
*/

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let [length, width, height] = input[0].split(' ').map(Number)
const n = Number(input[1])

const cubes = new Array(20).fill(0)
for (let i = 2; i < 2 + n; n++) {
  const [a, b] = input[i].split(' ').map(Number)
  cubes[a] = b
}


let currentFilledCount = 0
let totalUsedCubes = 0
for (let i = 19; i >= 0; i--) {
  currentFilledCount *= 8

  const cubeLen = 2 ** i

  // 1. 총 공간에 몇개 들어갈지 체크
  const maxCount = Math.floor(length / cubeLen) * Math.floor(width / cubeLen) * Math.floor(height / cubeLen) 

  // 2. 필요한 개수
  const needed = maxCount - currentFilledCount

  // 3. 필요한 개수랑 주어진 큐브 개수 중 작은 수만큼 사용
  const used = Math.min(needed, cubes[i])

  currentFilledCount += used
  totalUsedCubes += used
}

if (currentFilledCount === length * width * height) {
  console.log(totalUsedCubes)
} else {
  console.log(-1)
}

