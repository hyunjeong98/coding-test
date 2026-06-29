/*
  [백준 3190] 뱀

  [문제]
  'Dummy' 라는 도스게임이 있다. 이 게임에는 뱀이 나와서 기어다니는데, 사과를 먹으면 뱀의 길이가 늘어난다. 
  뱀이 기어다니다가 벽 또는 자기자신의 몸과 부딪히면 게임이 끝난다.
  게임은 N×N 정사각 보드 위에서 진행되고, 몇몇 칸에는 사과가 놓여져 있다. 보드의 상하좌우 끝에는 벽이 있다. 
  게임이 시작할때 뱀은 맨위 맨좌측에 위치하고 뱀의 길이는 1 이다. 뱀은 처음에 오른쪽을 향한다.
  뱀은 매 초마다 이동을 하는데 다음과 같은 규칙을 따른다.
    1. 먼저 뱀은 몸길이를 늘려 머리를 다음칸에 위치시킨다.
    2. 만약 이동한 칸에 사과가 있다면, 그 칸에 있던 사과가 없어지고 꼬리는 움직이지 않는다.
    3. 만약 이동한 칸에 사과가 없다면, 몸길이를 줄여 꼬리가 위치한 칸을 비운다. 즉, 꼬리가 위치한 칸이 이동한다.
  사과의 위치와 뱀의 이동경로가 주어질 때 이 게임이 몇 초에 끝나는지 계산하라.

  [입력]
  첫째 줄에 보드의 크기 N이 주어진다. (2 ≤ N ≤ 100)
  둘째 줄에 사과의 개수 K가 주어진다. (0 ≤ K ≤ 100)
  다음 K개의 줄에는 사과의 위치가 주어지는데, 첫 번째 정수는 행, 두 번째 정수는 열 위치를 의미한다. 사과의 위치는 모두 다르며, 1행 1열에는 사과가 없다.
  다음 줄에는 뱀의 방향 변환 횟수 L 이 주어진다. (1 ≤ L ≤ 100)
  다음 L개의 줄에는 뱀의 방향 변환 정보가 주어지는데, 정수 X와 문자 C로 이루어져 있으며. 
  게임 시작 시간으로부터 X초가 끝난 뒤에 왼쪽(C가 'L') 또는 오른쪽(C가 'D')으로 90도 회전시킨다는 뜻이다. 
  X는 10,000 이하의 양의 정수이며, 방향 변환 정보는 X가 증가하는 순으로 주어진다.

  [출력]
  첫째 줄에 게임이 몇 초에 끝나는지 출력한다.

  예제 입력 1
  6
  3
  3 4
  2 5
  5 3
  3
  3 D
  15 L
  17 D

  예제 출력 1
  9
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input[0])
const K = Number(input[1])

// 보드판 생성 (0: 빈칸, 1: 뱀의 몸, 2: 사과)
const board = Array.from({ length: N }, () => new Array(N).fill(0))

let line = 2
for (let i = 0; i < K; i++) {
  const [x, y] = input[line++].split(' ').map(Number)
  board[x - 1][y - 1] = 2
}

const L = Number(input[line++])
const directionChanges = new Map()
for (let i = 0; i < L; i++) {
  const [X, C] = input[line++].split(' ')
  directionChanges.set(Number(X), C)
}

let sec = 0
let cx = 0
let cy = 0

const queue = new Queue() // 큐에 들어가있는게 뱀이 차지하고 있는 좌표들.
queue.enqueue([0, 0])
board[0][0] = 1

let index = 0
const dx = [0, 1, 0, -1]
const dy = [1, 0, -1, 0]

// 자기 몸에 부딪히거나, 벽에 부딪힐때만 나오면 됨.
while (true) {
  const nx = cx + dx[index]
  const ny = cy + dy[index]

  // 이동할 칸이 벽이거나 몸이면 sec++ 해주고 break
  if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] == 1) {
    sec++
    break
  }

  // 이동한 칸에 사과가 있으면 꼬리는 그대로 없으면 dequeue해서 꼬리 당기기
  if (board[nx][ny] !== 2) {
    const [tx, ty] = queue.dequeue()
    board[tx][ty] = 0
  }

  // 머리 이동 (다음 칸 enqueue)
  queue.enqueue([nx, ny])
  board[nx][ny] = 1
  cx = nx
  cy = ny

  // 1초 카운트 더해주기
  sec++
  
  // 회전시킬거있는지 확인해서 다음 방향 정하기
  if (directionChanges.has(sec)) {
    const nextDirection = directionChanges.get(sec)
    index = nextDirection == 'D' ? (index + 1) % 4 : (index + 3) % 4
  }
}

console.log(sec)