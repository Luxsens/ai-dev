document.addEventListener("DOMContentLoaded", function(event) {
  setup();
});

function setup() {
  logger("setup","Start");
  getThenPostMessage();
}

function getThenPostMessage() {
  var key = findGetParameter("key");
  var msg = {
    text: key
  }
  sendMessage(msg)
  closeWindow();
}

//---------------------------------------------------------------------------------

var config = {
  APP_SERVER: "http://lux.rikai-bots.com/ext/api"

  //putsomething else here
};

// var botMsg = {
//   openid: "xxx",
//   text: "no-key",
// }

// function logger(txt, obj) {
//   obj = obj || "."
//   var msg = txt + ": " + JSON.stringify(obj)
//   $('#debug').prepend(msg + "<br/>")
//   console.log(msg)
// }

// function getOpenId() {
//   var openid = findGetParameter('openid')
//   logger('openid', openid)
//   return openid
// }

// function sendMessage(msg) {
//   msg = msg || botMsg;

//   // TODO
//   msg.openid = getOpenId()
//   logger("sendMessage", msg)

//   $.post(config.APP_SERVER, msg)

//   // ignore reply?
//   closeWindow();
// }

// function findGetParameter(parameterName) {
//   var result = null,
//       tmp = [];
//   location.search
//   .substr(1)
//     .split("&")
//     .forEach(function (item) {
//       tmp = item.split("=");
//       if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
//     });
//   return result;
// }

// function closeWindow() {
//   logger("closing")
//   wx.closeWindow();
// }


