const fs = require('fs')
const config = require('./config')

const getRandomInteger = (min, max) => {
  return Math.random() * (max - min) + min;
}
  
const writeFile = (fileName, data) => {
  fs.writeFile(fileName, config.message(data), (err) => {
    if (err) {
      console.error(err)
    }
  })
}
  
const appendFile = (fileName, data) => {
  fs.appendFile(fileName, `\n${config.message(data)}`, (err) => {
    if (err) { console.error(err) }
  })
}
  
const getSum = (total, num) => {
  return total + num
}

module.exports = {
  getRandomInteger,
  writeFile,
  appendFile,
  getSum,
}