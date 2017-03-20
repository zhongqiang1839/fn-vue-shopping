'use strict';
require("../util/fetch");
import {md5} from './md5function';
const HEADER = {"Content-Type": "application/x-www-form-urlencoded"};

/**
 * 全局 post 请求
 * 基于 fetch promise 规范
 * fetch 与 xmlhttprequest 的兼容
 * 原生 promise 和 Q.promise 的兼容
 * @param url
 * @param body
 * @returns {Promise}
 */
export function post(url, body) {
  let postStr = JSON.stringify(body),
    paramsMD5;
  /*** 构建md5加密串*/
  if (postStr) {
    paramsMD5 = md5(`${postStr}${$.config.md5str}`);
  }

  if (process.env.NODE_ENV === 'development') {
    console.info(`POST: `, url);
    console.info(`Body: `, body);
  }

  return fetch(url, {
      method: 'POST',
      headers: HEADER,
      body: `data=${postStr}&paramsMD5=${paramsMD5}`
  })
    .then(filterJSON)
}


/**
 * zepto ajax实现
 * @param url
 * @returns {Promise}
 */
export function ajaxDefine(url, body, method='GET') {

  let postStr = JSON.stringify(body);

  if (process.env.NODE_ENV === 'development') {
    console.info(`POST: `, url);
    console.info(`Body: `, body);
  }

  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,                                   //跨域到http://www.wp.com，另，http://test.com也算跨域
      type: method,
      headers: HEADER,
      dataType: 'jsonp',                          //指定为jsonp类型
      data: `data=${postStr}`,                    //数据参数
      jsonp: 'callback',                  //数据参数
      success: function (result) {
        resolve(result);
      },
      error: function (msg) {
        reject(msg);
      }
    })
  })

}



/**
 * 全局 get 请求 XMLHttpRequest
 * @param url
 * @returns {Promise}
 */
export function get(url) {

  if (process.env.NODE_ENV === 'development') {
    console.info(`POST: `, url);
  }
  return new Promise((resolve, reject) => {
    //var request = createXMLHTTPRequest();
    var request = new XMLHttpRequest();
    request.open("get",url,true);
    request.onreadystatechange = callback
    request.send(null);
    function callback(){
      if(request.readyState == 4){
        if(request.status==200){
          // var response = eval(request.responseText);
          var response=JSON.parse(request.responseText)
          resolve(response);
        }else{
          reject( "HTTP的响应码：" + request.status + ",响应码的文本信息：" + request.statusText);
        }
      }
    }
  })
}


/**
 * return jsonp 或者 xhr
 * @param url 接口URL
 * @param postStr 请求字符串
 * @param method 请求类型
 * @returns {*}
 */
function buildBaseHeader(url,postStr,method){
  if (process.env.NODE_ENV === 'development') {
    return {
      url: url,                                   //跨域到http://www.wp.com，另，http://test.com也算跨域
      type: method,
      headers: HEADER,
      dataType: 'jsonp',                          //指定为jsonp类型
      data: `data=${postStr}`,                    //数据参数
      jsonp: 'callback'
    }
  } else {
    return {
      url: url,                                    //跨域到http://www.wp.com，另，http://test.com也算跨域
      type: method,
      headers: HEADER,
      data: `data=${postStr}`                      //数据参数
    }
  }
}

function filterJSON(res) {
  return res.json()
}
