"use strict";

// var defaultMsg = {
//   text: "test",
//   openid: "testid"
// };

function findGetParameter(parameterName) {//a,b,c,d
  var result = {},
      tmp = [];
  location.search //got ?parameter=value&... as a string
  .substr(1)//got parameter=value&...
    .split("&")//got array of parameter=value1, parameter=value2, ...
    .forEach(function (item) {
      tmp = item.split("=");//got parameter,value
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);//got string exactly
    });
  return result;
}

// function closeWindow() {
//   logger("closing");
//   wx.closeWindow();
// }

function logger(txt, obj) {
  //obj = obj || ".";
  console.log(txt, obj);
  //$('#debug').prepend(txt + ": " + JSON.stringify(obj) + "<br/>");
}

// function sendMessage(msg, callback) {
//   msg = msg || defaultMsg;
//   msg.openid = findGetParameter('openid');
//   logger("sendMessage", msg);
//   $.post(config.APP_SERVER, msg, callback);
// }

// tricky this takes "true" as a string
// since gets from the URL param
// function showDebug(force) {
//   if (typeof force == "boolean") {
//     console.error("showDebug should take string", force);
//     force = "" + force;
//   }
//   var flag = force || findGetParameter('debug');
//   logger('debug:', flag);
//   console.log(typeof flag);
//   // CAREFUL!!! not a boolean
//   if (flag === 'true') {
//     logger('debug show:', flag);
//     $('#debug').show();
//   } else {
//     logger('debug hide', flag);
//     $('#debug').hide();
//   }
// }
