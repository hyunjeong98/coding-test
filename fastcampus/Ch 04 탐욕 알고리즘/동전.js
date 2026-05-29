/* 문제: 준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.
동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이 때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.
*/

/* 입력: 첫째 줄에 N과 K가 주어진다. (1 <= N <= 10, 1 <= K <= 100,000,000)
둘째 줄부터 N개의 줄에 동전의 가치 Ai가 오름차순으로 주어진다. (1 <= Ai <= 1,000,000,000, A1 = 1, Ai는 Ai-1의 배수)
*/

/* 출력: 첫째 줄에 사용한 동전 개수의 최솟값을 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().trim().split('\n')
const [n, k] = input[0].split(' ').map(Number)

const coins = []
for (let i = 1; i <= n; i++) {
  coins.push(Number(input[i]))
}

let count = 0
let remain = k

// 동전 배열이 빌 때까지 혹은 남은 금액이 0이 될 때까지 반복
while (coins.length > 0 && remain > 0) {
  const curCoin = coins.pop() // 가장 큰 동전을 꺼냄
  
  if (remain >= curCoin) {
    count += Math.floor(remain / curCoin);
    remain %= curCoin;
  }
}
console.log(count)


