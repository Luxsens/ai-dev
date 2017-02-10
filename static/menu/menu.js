
var config = {

  APP_SERVER: "http://fanbot.rikai-bots.com/ext/api",
  // APP_SERVER: "http://localhost:6901/ext/api",

  buttons: [

    {
      color: "#ff0000",
      label: "red",
      text: "picked red"
    },

    {
      color: "#00FF00",
      label: "green",
      text: "picked green"
    },

    {
      color: "#0000FF",
      label: "blue",
      text: "picked blue"
    }

  ]

}

function logger(txt, obj) {
  obj = obj || "."
  $('#debug').prepend(txt + ": " + JSON.stringify(obj) + "<br/>")
}

var botMsg = {
  openid: "xxx",
  text: "hi",
}

function getOpenId() {
  var openid = findGetParameter('openid')
  logger('openid', openid)
  return openid

  // http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
  // var some = new URLSearchParams(window.location.search)
  // var openid = some.get('openid');
  // logger("openid", openid);
  // return openid;
}


function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search
  .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

function closeWindow() {
  logger("closing")
  wx.closeWindow();
}

function gotReply(res) {
  logger("gotReply", res)
  closeWindow();
}

function sendMessage(msg) {
  msg = msg || botMsg;

  // TODO
  msg.openid = getOpenId()
  logger("sendMessage", msg)

  $.post(config.APP_SERVER, msg)

  // ignore reply?
  closeWindow();
}

function introAnim() {
  $("#hero-image").animate({
    opacity: 1,
    left: '50px',
    rotateZ: '360deg',
    // translate3d: '100px,0px,100px',
    // scaleX: 2,
    // scaleY: 2,
    // color: '#abcdef',
    // complete: introAnim
  }, 3000, 'ease-out')
}


function setup() {
  logger("setup")
  introAnim();

  config.buttons.map(function(btn) {
    logger("button", btn)
    // append li into the ul
    // var elem = $("#items").append("li")
    var html = "<li>" + btn.label + "</li>";
    var elem = $(html).appendTo('ul')

    elem.tap( function(evt) {
      clickButton(evt, btn)
    })
  })

}

function clickButton(evt, btn) {
  var target = evt.target
  logger("tapped", btn)
  if (target.classList.contains(btn.label)) {
    target.classList.remove(btn.label);
  }
  else {
    if (btn.label == 'red') {
      target.classList.add('red');
    }
    if (btn.label == 'green') {
      target.classList.add('active');
    }
    if (btn.label == 'blue') {
      target.classList.add('blue');
    }
  }
  //target.classList.add('active');
  sendMessage(btn)
}


document.addEventListener("DOMContentLoaded", function(event) {
  setup();
});
