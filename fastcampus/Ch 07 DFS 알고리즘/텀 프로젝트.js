/*
  백준 9466번 텀 프로젝트
  
  [문제]
  이번 가을학기에 '문제 해결' 강의를 신청한 학생들은 텀 프로젝트를 수행해야 한다.
  프로젝트 팀원 수에는 제한이 없다. 심지어 모든 학생들이 동일한 팀의 팀원인 경우와 같이 한 팀만 있을 수도 있다.
  프로젝트 팀을 구성하기 위해, 모든 학생들은 프로젝트를 함께하고 싶은 학생을 선택해야 한다.(단, 단 한명만 선택할 수 있다.)
  혼자 하고 싶어하는 학생은 자기 자신을 선택하는 것도 가능하다.
  학생들이(S1, S2, ..., Sr)이라 할 때, 
  r = 1이고 S1이 S1을 선택하는 경우나, 
  S1이 S2를 선택하고, S2가 S3, ... , Sr-1이 Sr을 선택하고, Sr이 S1을 선택하는 경우에만 팀이 연결되는 것으로 정의한다.
  어느 프로젝트 팀에도 속하지 않는 학생들의 수를 계산하는 프로그램을 작성하라.

  [입력]
  첫째 줄에 테스트 케이스의 개수 T가 주어진다.
  각 테스트 케이스의 첫째 줄에는 학생의 수 N(1 ≤ N ≤ 100,000)이 주어진다.
  각 테스트 케이스의 둘째 줄에는 선택된 학생들의 번호가 주어진다. 모든 학생은 1부터 N까지 번호가 부여되어 있다.

  [출력]
  각 테스트 케이스마다 한 줄에 출력하고, 각 줄에는 프로젝트 팀에 속하지 않는 학생들의 수를 출력한다.
*/

// 아이디어: 싸이클이 아닌 학생을 찾기!

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let testCases = Number(input[0])



let line = 1
while (testCases--) {
  const n = Number(input[line])
  const arr = [0]
  input[line + 1].split(' ').forEach((x) => arr.push(+x))
  let count = 0
  const visited = new Array(n + 1).fill(false)
  const finished = new Array(n + 1).fill(false);
  let memberCount = 0

  function dfs(x) {
    visited[x] = true
    let next = arr[x]
    
    if (!visited[next]) { // 다음 노드 한번도 방문 안했으면 dfs
      dfs(next)
    } else if (!finished[next]) { // 방문했지만 완료가 안됐으면 (지금 검사하고 있는 경로 중에 있었다면) 사이클임
      memberCount++ // 시작점 학생 추가
      for (let i = next; i != x; i = arr[i]) {
        memberCount++ // 이어진 학생들 추가
      }
    }
    finished[x] = true // x에서 이어진 경로 검사 완료 표시
  }

  for (let i = 1; i <= n; i++) {
    
    if (!visited[i]) {
      dfs(i)
    }

  }

  console.log(n - memberCount) // 전체 학생에서 팀을 이룬 학생 빼기
  line += 2
}

