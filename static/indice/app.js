"use strict";

/* url params

  debug - true/false
  category - music/sports etc.
  prompt - top message
*/

function gotReply(res) {
  logger("gotReply", res)
  closeWindow();
}

function introAnim() {
  $("#hero-image").animate({
    opacity: 1,
    left: '50px',
    rotateZ: '360deg',
  }, 3000, 'ease-out');
}

function showButtons() {

  var category = findGetParameter("category")
  logger("found category", category)
  var buttons = menuData[category]


  buttons.map(function(person) {
    logger("button", person)
    var html = "<li class='button-big'>" + person + "</li>";
    var elem = $(html).appendTo('ul')

    elem.tap( function(evt) {
      clickButton(evt, person, category)
    })
  })
}

function showPrompt(prompt) {
  prompt = findGetParameter("prompt") || prompt
  $("#prompt").text(prompt)
}

function setup() {
  showDebug()
  showPrompt("Please select")
  logger("setup")
  // introAnim();
  showButtons()
}

function clickButton(evt, person, category) {
  // var target = evt.target
  // target.classList.add('active');
  // var text = "category " + category + " person " + person
  // logger("tapped", text)

  // var msg = {
  //   text: text
  // }
  // sendMessage(msg)
  // closeWindow();
}


document.addEventListener("DOMContentLoaded", function(event) {
  setup();
});
