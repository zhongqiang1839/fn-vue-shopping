/**
 * Created by KE on 16/10/27.
 */
/**
 * 格式化金额, 分离整数小数位
 * @param price
 * @param format
 * @returns {*}
 */

export const intDecimalPrice = function (price,format) {
  let decimal = "";

  if (typeof price != 'string') {  price = price.toString();   };

  switch (parseInt(format)) {
    case 1:
      return ((price.replace(",", "") | 0) + "").replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
      break;
    case 2:
      decimal = price.split(".")[1];
      decimal = decimal === undefined ? "" : decimal;
      return decimal;
      break;
  }
}
/**
 * 格式化电话号码
 * @param value
 * @returns {string}
 */
export const phoneFormat = function (value) {
  var frontLen = 3,   //前面显示位数
    endLen = 4,      //后面显示位数
    len = value.length - frontLen - endLen,
    xing = '';
  for (var i = 0; i < len; i++) {
    xing += '*';
  }
  return value.substr(0, frontLen) + xing + value.substr(value.length - endLen);
}


let format = (value) => {
  return value >= 10 ? value : '0' + value
}
/**
 * 时间格式化
 */
export const dateFilter = (time, type) => {
  let date = new Date(time * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  let result
  switch (type) {
    case 0: // 01-05
      result = `${format(month)}-${format(day)}`
      break
    case 1: // 11:12
      result = `${format(hours)}-${format(minutes)}`
      break
    case 2: // 2015-01-05
      result = `${year}-${format(month)}-${format(day)}`
      break
    case 3: // 2015-01-05 11:12
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`
      break
    case 4:// 2015-01-05 11:12:06
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`
      break
  }
  return result
}
