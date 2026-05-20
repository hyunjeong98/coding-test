/* 문제: 온라인 저지에 가입한 사람들의 나이와 이름이 가입한 순서대로 주어진다. 
이 때, 회원들을 나이가 증가하는 순으로, 나이가 같으면 먼저 가입한 사람이 앞에 오는 순서로 정렬하는 프로그램을 작성하시오.
*/

/* 입력: 첫째 줄에 N이 주어진다.
둘째 줄부터 N개의 줄에는 각 회원의 나이와 이름이 공백 한 칸으로 구분되어 주어진다. 
나이는 1보다 크거나 같으며, 200보다 작거나 같은 정수이고, 이름은 알파벳 대소문자로 이루어져 있고, 
길이가 100보다 작거나 같은 문자열이다. 입력은 가입한 순서로 주어진다. */

/* 출력: 첫째 줄부터 N개의 줄에 걸쳐 온라인 저지 회원을 나이 순, 
나이가 같으면 가입한 순으로 나이, 이름을 공백 한 칸으로 구분해 출력한다. */

const fs = require('fs')

const input = fs.readFileSync(0).toString().split('\n')
const n = Number(input[0])

const users = []
for (let i = 1; i <= n; i++) {
  const [age, name] = input[i].split(' ')
  
  users.push({
    age,
    name
  })
}

users.sort((a, b) => a.age - b.age)
let result = ''
users.forEach((user) => result += user.age + ' ' + user.name + '\n')
console.log(result)

