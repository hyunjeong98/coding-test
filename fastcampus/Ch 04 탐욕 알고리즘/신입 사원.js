/* 문제: 언제나 최고만을 지향하는 굴지의 대기업 진영 주식회사가 신규 사원 채용을 실시한다.
다른 모든 지원자와 비교했을 떄 서류심사 성적과 면접시험 성적 중 적어도 하나가 다른 지원자보다 떨어지지 않는 자만 선발한다는 
원칙을 세웠다. 즉, 어떤 지원자 A의 성적이 다른 어떤 지원자 B의 성적에 비해 서류 심사 성적과 면접 시험 성적이 모두 떨어진다면 A는 결코 
선발되지 않는다는 것이다.
이러한 조건을 만족시키면서, 진영 주식회사가 이번 신입사원 채용에서 선발할 수 있는 신입사원의 최대 인원수를 구하는 프로그램을 작성하시오.
*/

/* 입력: 첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스의 첫째 줄에 지원자의 수 N(1 <= N <= 100,000)이 주어진다.
둘째 줄부터 N개의 줄에는 각 지원자의 서류심사 성적, 면접시험 성적의 순위가 공백을 사이에 두고 한 줄에 주어진다. 
두 성적 순위는 모두 1위부터 N위까지 동석차 없이 결정된다. */

/* 출력: 각 테스트 케이스에 대해서 진영 주식회사가 선발할 수 있는 신입사원의 최대 인원수를 한 줄에 하나씩 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().trim().split('\n')
const T = Number(input[0])
let listIndex = 1
const result = []

for (let t = 0; t < T; t++) {
  const N = Number(input[listIndex++])

  const interviewRanks = new Int32Array(N + 1)
  for (let i = 0; i < N; i++) {
    const [docRank, interviewRank] = input[listIndex++].split(' ').map(Number)
    interviewRanks[docRank] = interviewRank
  }

  let min = N + 1
  let count = 0
  for (let i = 1; i <= N; i++) {
    const currentInterviewRank = interviewRanks[i]
    if (currentInterviewRank < min) {
      min = currentInterviewRank
      count++
    }
  }
  result.push(count)
}

console.log(result.join('\n'))

