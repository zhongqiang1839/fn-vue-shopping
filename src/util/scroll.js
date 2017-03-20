// event结构
// {
//    fn:function() // 需要执行的函数
//    position: //执行位置,数字为滚动条距离,字符为top bottom left right move,对应滚动条到哪个底部位置触发
// }

// 滚动条在Y轴上的滚动距离
let _d = document;
export const getScrollTop =function() {
  let bodyScrollTop = 0;
  let documentScrollTop = 0;
  if (_d.body) {
    bodyScrollTop = _d.body.scrollTop;
  }
  if (_d.documentElement) {
    documentScrollTop = _d.documentElement.scrollTop;
  }
  return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
};

// 文档的总高度
export const getScrollHeight = function() {
  let bodyScrollHeight = 0;
  let documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
};

// 浏览器视口的高度
export const getWindowHeight = function() {
  var windowHeight = 0;
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
};
/**
 * Created by yafei.wu on 2016/10/27.
 */
