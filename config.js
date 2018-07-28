const defaultData = {  
  projectid: '5a0b483fed7dde4ea19ae9',
  addresstype: 'macaddr',
  address: 'CB:75:E8:14:DE:25',
  rssi: '',
  scanRecord: '',
  txPower: -31,
  url: 'https://oef.io/Bk5wZaKp',
  timeStamp: '',
}
const fileName = 'rssi.txt'
const topic = 'rssi'
const averageMeasurement = 10
const min = -75
const max = -100
let tempData = []
const mqttUrl = 'wss://iot.oef.io:8888'
const message = (data) =>{
  return `${data.topic} average of 10 measurements: ${data.rssi} | ${data.timeStamp}`
}

const options = {
  keepalive: 10,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
}

module.exports = {
  defaultData,
  fileName,
  topic,
  averageMeasurement,
  min,
  max,
  tempData,
  mqttUrl,
  message,
  options,
}
