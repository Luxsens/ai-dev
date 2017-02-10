
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

// function logger(txt, obj) {
//   obj = obj || "."
//   console.log(txt, obj)
//   $('#debug').prepend(txt + ": " + JSON.stringify(obj) + "<br/>")
// }

var botMsg = {
  openid: "xxx",
  text: "hi",
}

//
// function closeWindow() {
//   logger("closing")
//   wx.closeWindow();
// }

// function gotReply(res) {
//   logger("gotReply", res)
//   closeWindow();
// }
//
// function sendMessage(msg) {
//   msg = msg || botMsg;
//   msg.openid = findGetParameter('openid')
//   logger("sendMessage", msg)
//   $.post(config.APP_SERVER, msg)
// }

function introAnim() {

  var prompt = findGetParameter('prompt')
  $("#prompt").text(prompt)

  $("#hero-image").animate({
    opacity: 1,
    left: '50px',
    rotateZ: '720deg',
    // translate3d: '100px,0px,100px',
    // scaleX: 2,
    // scaleY: 2,
    // color: '#abcdef',
    // complete: introAnim
  }, 6000, 'ease-out')


  $(".buttons-box").animate({
    opacity: 1,
    translate3d: '0px,50px,0'
  }, 3000, 'ease-out')

}


function setup() {

  introAnim()

  $('.yes-button').tap( function(evt) {
    choose(true)
  })

  $('.no-button').tap( function(evt) {
    choose(false)
  })

}

function choose(flag) {
  var text
  if (flag) {
    text = findGetParameter('yes') || 'yes'
  } else {
    text = findGetParameter('no') || 'no'
  }
  msg = { text: text}
  sendMessage(msg)
  closeWindow()
}


document.addEventListener("DOMContentLoaded", function(event) {
  setup();
});
