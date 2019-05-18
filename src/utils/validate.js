/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-21 14:17:43
 * @LastEditTime: 2019-05-18 17:09:55
 * @LastEditors: Please set LastEditors
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 检验手机
export function isPoneAvailable($poneInput) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test($poneInput)) {
    return false
  } else {
    return true
  }
}

// 检验字符长度
export function isStringLength(message, MaxLenght) {
  if (message) {
    var txtval = message.split('')
    return txtval.length > MaxLenght ? 1 : 2
  } else {
    return 0
  }
}

// 检验密码
export function isPassword(str) {
  var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  if (!reg.test(str)) {
    return false
  } else {
    return true
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
