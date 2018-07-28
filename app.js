const mqtt = require('mqtt')
const fs = require('fs')
const config = require('./config')
const utils = require('./utils')
const client = mqtt.connect(config.mqttUrl, config.options)

client.on('error', (err) => {
  console.log(err)
  client.end()
})

client.on('connect', () => {
  client.subscribe(config.topic)
  setInterval(() => {
    const modifiedData = JSON.stringify({
      ...config.defaultData,
      rssi: utils.getRandomInteger(config.min, config.max),
      timeStamp: new Date().toUTCString(),
    })
    client.publish(config.topic, modifiedData)
  }, 100)
})

client.on('message', (topic, message) => {
  const data = JSON.parse(message)
  if (config.tempData.length > config.averageMeasurement) {
    config.tempData.shift()
    const averageRssi = (config.tempData.reduce(utils.getSum) / config.averageMeasurement).toFixed(2)
    const averageData = {
      rssi: averageRssi,
      timeStamp: new Date().toUTCString(),
      topic,
    }
    if (!fs.existsSync(config.fileName)) {
      utils.writeFile(config.fileName, averageData)
    } else {
      utils.appendFile(config.fileName, averageData)
    }
  }
  config.tempData.push(data.rssi)
  
  // client.end()
})
