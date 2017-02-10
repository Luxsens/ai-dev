// redir page

// http://fanbot.rikai-bots.com/static/redir?text=viplist&prompt=viplist&openid=$OPENID

var config = {
  APP_SERVER: "http://fanbot.rikai-bots.com/ext/api",
  // APP_SERVER: "http://localhost:6520/ext/api",
};


function setPrompt() {
  var prompt = findGetParameter('prompt');
  $('#prompt').text(prompt);
}

function setup() {
  showDebug();
  setPrompt();
  var text = findGetParameter('text');
  var msg = {
    text: text
  };

  $('#continue').tap( function() {
    closeWindow();
  });

  // make sure we get response before close?
  logger("ready to close");
  sendMessage(msg, closeWindow);
  logger("done");
  setTimeout(closeWindow, 7000 );
}

Zepto(function($){
  logger('doc ready');
  setup();
});

// document.addEventListener("DOMContentLoaded", function(event) {
//   setup();
// });
