export const pad0 = n => (n < 10 ? `0${n}` : n)

export const toDate = val => {
  if (val instanceof Date) return val
  else return new Date(val)
}

export const fmtDate = val => {
  const d = toDate(val)
  return `${d.getFullYear()}-${pad0(d.getMonth() + 1)}-${pad0(d.getDate())}`
}

export const fmtDateTime = val => {
  const d = toDate(val)
  return `${fmtDate(d)} ${pad0(d.getHours())}:${pad0(d.getMinutes())}`
}

export const addDays = (days, date) => {
  const n = new Date()
  const d = toDate(
    date || new Date(n.getFullYear(), n.getMonth(), n.getDate(), 10)
  )
  d.setDate(d.getDate() + days)
  return toDate(d)
}

export const wxPay = (id, cb) => {
  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', pay, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', pay)
      document.attachEvent('onWeixinJSBridgeReady', pay)
    }
  } else {
    pay()
  }
  function pay() {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: 'wx2421b1c4370ec43b', //公众号名称，由商户传入
        timeStamp: '1395712654', //时间戳，自1970年以来的秒数
        nonceStr: 'e61463f8efa94090b1f366cccfbbb444', //随机串
        package: 'prepay_id=u802345jgfjsdfgsdg888',
        signType: 'MD5', //微信签名方式：
        paySign: '70EA570631E4BB79628FBCA90534C63FF7FADD89' //微信签名
      },
      res => {
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          cb(cb)
        }
      }
    )
  }
}
