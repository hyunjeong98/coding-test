const fs = require('fs')
const input = fs.readFileSync(0, 'utf8').split('\n')

const [A, B] = input[0].split(' ').map((e) => Number(e))


const result = `${A + B}\n${A - B}\n${A * B}\n${Number.parseInt(A / B)}\n${A % B}`

console.log(result)