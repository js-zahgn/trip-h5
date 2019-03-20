import Vue from 'vue'
import { pad0, toDate, fmtDate, fmtDateTime } from './index'

Vue.filter('day', t => {
  let n = toDate(t)
  return `${pad0(n.getMonth() + 1)}月${pad0(n.getDate())}日`
})

Vue.filter('week', d => {
  let n = new Date(d).getDay()
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekday[n]
})

Vue.filter('time', t => {
  let n = toDate(t)
  return `${pad0(n.getHours())}:${pad0(n.getMinutes())}`
})

Vue.filter('dateTime', fmtDateTime)

Vue.filter('money', num => {
  num = num.toString().replace(/\$|\,/g, '')
  if (isNaN(num)) num = '0'
  let sign = num == (num = Math.abs(num))
  num = Math.floor(num * 100 + 0.50000000001)
  let cents = num % 100
  num = Math.floor(num / 100).toString()
  if (cents < 10) cents = '0' + cents
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      ',' +
      num.substring(num.length - (4 * i + 3))
  return (sign ? '' : '-') + num + '.' + cents
})
