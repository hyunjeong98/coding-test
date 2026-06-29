/*
  [백준 2638] 치즈

  [문제]
  N×M 크기의 모눈종이 위에 아주 얇은 치즈가 놓여 있다. (모눈종이의 크기는 최대 100×100이다.) 이 치즈는 냉동보관을 해야만 하는데 실온에 놓이면 공기와 접촉하여 녹게 된다. 
  온도가 실온에 해당되는 냉동고 바깥의 공기와 2변 이상 접촉한 치즈는 한 시간 만에 녹아 없어져 버린다. 
  예를 들어 5행 5열 크기의 모눈종이 위에 치즈가 모양으로 놓여 있을 때, 바깥 공기와 2변 이상 접촉한 치즈들은 한 시간 뒤에 녹아 없어진다.
  단, 치즈 내부에 있는 공간은 치즈로 밀폐되어 있어서 공기가 잘 통하지 않으므로, 이 공간에 있는 공기는 치즈가 녹는 데 영향을 주지 않는다. 그러나 치즈가 녹아 없어짐에 따라 이 내부 공기가 외부 공기와 접촉하게 되면 이 공기도 녹이는 데 영향을 주게 된다.
  모눈종이의 맨 가장자리에는 치즈가 놓이지 않는 것으로 가정한다. 입력으로 모눈종이 위에 놓인 치즈의 형태가 주어질 때, 모눈종이 위의 치즈가 모두 녹아 없어지는 데 걸리는 정확한 시간을 구하는 프로그램을 작성하시오.

  [입력]
  첫째 줄에는 모눈종이의 크기를 나타내는 두 개의 정수 N, M (5 ≤ N, M ≤ 100)이 주어진다. 
  둘째 줄부터 N개의 줄에는 모눈종이 위의 격자에 치즈가 있는 부분은 1로, 치즈가 없는 부분은 0으로 표시된다. 각 0과 1은 하나의 공백으로 분리되어 주어진다.

  [출력]
  출력으로는 입력으로 주어진 치즈가 모두 녹아 없어지는 데 걸리는 정확한 시간을 단 한 줄에 출력한다.

  예제 입력 1
  8 9
  0 0 0 0 0 0 0 0 0
  0 0 0 1 1 0 0 0 0
  0 0 0 1 1 0 1 1 0
  0 0 1 1 1 1 1 1 0
  0 0 1 1 1 1 1 0 0
  0 0 1 1 0 1 1 0 0
  0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0

  예제 출력 1
  2
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input[0].split(' ').map(Number)
const board = []
for (let i = 1; i <= N; i++) {
  board.push(input[i].split(' ').map(Number))
}

let cheeseCount = 0
for (const row of board) {
  cheeseCount += row.filter((v) => v == 1).length
}

const dx = [-1, 1, 0, 0]
const dy = [0, 0, 1, -1]
let result = 0

function bfs() {
  const visited = Array.from({ length: N }, () => new Array(M).fill(false))
  const queue = new Queue()
  queue.enqueue([0, 0]) // x, y좌표
  visited[0][0] = true

  while (queue.getLength() != 0) {
    const [cx, cy] = queue.dequeue()

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i]
      const ny = cy + dy[i]

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
        continue
      }

      if (board[nx][ny] >= 1) {
        board[nx][ny]++
      } else {
        if (!visited[nx][ny]) {
          visited[nx][ny] = true
          queue.enqueue([nx, ny])
        }
      }
    }
  }

}

function melt() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] >= 3) {
        board[i][j] = 0
        cheeseCount--
      } else if (board[i][j] == 2) {
        board[i][j] = 1
      }
    }
  }
}

while (cheeseCount > 0) {
  bfs()
  melt()
  result++
}

console.log(result)