function jsonP ({ url, params, callbackName }) {

  const getUrl = () => {
    let dataStr = ''
    for (const key in params) {
      dataStr += `${key}=${params[key]}&`
    }
    dataStr += `callback=${callbackName}`
    return `${url}?${dataStr}`
  }
  return new Promise((reslove, reject) => {
    callbackName = callbackName || Math.random().toString.replace(',', '')
    let script = document.createElement('script')
    script.src = getUrl()
    document.body.appendChild(script)
    window[callbackName] = data => {
      reslove(data)
      document.body.removeChild(script)
    }
  })
}