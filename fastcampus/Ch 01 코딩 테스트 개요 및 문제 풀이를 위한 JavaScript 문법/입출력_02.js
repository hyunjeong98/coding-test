const fs = require('fs')
const input = fs.readFileSync(0, 'utf8').split('\n')

const a = input[0]
const b = input[1]

const numA = Number(a)

console.log(numA * Number(b[2]))
console.log(numA * Number(b[1]))
console.log(numA * Number(b[0]))
console.log(numA * Number(b))
