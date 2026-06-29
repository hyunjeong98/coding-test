/*
  백준 7562번 나이트의 이동

  [문제]
  체스판 위에 한 나이트가 놓여져 있다. 나이트가 이동하려고 하는 칸이 주어진다. 
  나이트는 몇 번 움직이면 이 칸으로 이동할 수 있을까?

  [입력]
  입력의 첫째 줄에는 테스트 케이스의 개수가 주어진다.
  각 테스트 케이스는 세 줄로 이루어져 있다. 
  첫째 줄에는 체스판의 한 변의 길이 l(4 ≤ l ≤ 300)이 주어진다. 
  체스판의 크기는 l × l이다. 체스판의 각 칸은 (0, 0)부터 (l-1, l-1)까지 번호가 매겨져 있다. 
  둘째 줄에는 나이트가 현재 있는 칸, 셋째 줄에는 나이트가 이동하려고 하는 칸이 주어진다.

  [출력]
  각 테스트 케이스마다 나이트가 최소 몇 번만에 이동할 수 있는지 출력한다.

  예제 입력 1
  3
  8
  0 0
  7 0
  100
  0 0
  30 50
  10
  1 1
  1 1

  예제 출력 1
  5
  28
  0
*/

const fs = require('fs')
const { Queue } = require('./queue')
const input = fs.readFileSync(0).toString().trim().split('\n')
let testCases = Number(input[0])

let line = 1

const dx = [-2, -2, -1, -1, 1, 1, 2, 2]
const dy = [1, -1, 2, -2, 2, -2, 1, -1]

while (testCases--) {
  const l = Number(input[line])
  const [x, y] = input[line + 1].split(' ').map(Number)
  const [tx, ty] = input[line + 2].split(' ').map(Number)

  const visited = Array.from({ length: l }, () => new Array(l).fill(-1))
  function bfs() {
    if (x == tx && y == ty) return 0

    const queue = new Queue()
    queue.enqueue([x, y])
    visited[x][y] = 0
    
    while(queue.getLength() != 0) {
      const [cx, cy] = queue.dequeue()

      for (let i = 0; i < 8; i++) {
        const nx = cx + dx[i]
        const ny = cy + dy[i]

        if (nx < 0 || nx >= l || ny < 0 || ny >= l) continue
        if (visited[nx][ny] == -1) {
          visited[nx][ny] = visited[cx][cy] + 1

          if (nx === tx && ny === ty) {
            return visited[nx][ny]
          }

          queue.enqueue([nx, ny])
        }
      }
    }
  }
  
  console.log(bfs())
  line += 3
}