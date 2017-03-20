
/**
 * 生成device_id
 * 同一手机，不同浏览器，是不同设备
 * 帆布指纹识别 http://saternet.iteye.com/blog/2164816
 */
export default function getDeviceId(){
  function byte2Hex(b) {
    if(b < 0x10) {
      return "0" + b.toString(16);
    } else {
      return b.toString(16);
    }
  }
  function bin2hex(str) {
    var result = "";
    for (let i = 0; i < str.length; i++ ) {
      var c = str.charCodeAt(i);
      result += byte2Hex(c>>8 & 0xff); // 高字节
      result += byte2Hex(c & 0xff);   // 低字节
    }
    return result;
  }

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var txt = 'http://security.tencent.com/';
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.textBaseline = "tencent";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125,1,62,20);
  ctx.fillStyle = "#069";
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText(txt, 4, 17);

  var b64 = canvas.toDataURL().replace("data:image/png;base64,","");
  var bin = atob(b64);
  var crc = bin2hex(bin.slice(-16,-12));
  //console.log(crc);

  return crc;
}

