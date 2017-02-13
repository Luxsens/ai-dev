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

  // var category = "categories";
  // var style = "";
  // var brand = "";
  // var collection = "";
  // var colour = "";
  var state = "";

  var category = findGetParameter("category"); logger("found category", category)
  var style = findGetParameter("style"); logger("found style", style)
  var brand = findGetParameter("brand"); logger("found brand", brand)
  var collection = findGetParameter("collection"); logger("found collection", collection)
  var colour = findGetParameter("colour"); logger("found colour", colour)

  if (style == "") {
    state = category;
  } else if(brand == "") { state = style;
  } else if(collection == "") { state = brand; 
  } else if(colour == "") { state = collection;
  } else {state = colour}
  logger("state", typeof state)

  var buttons = menuData[state]
  


  //person = lists of JSON files
  buttons.map(function(person) {
    logger("button", person)
    var html = "<li class='button-big'>" + person + "</li>";
    var elem = $(html).appendTo('ul')

    elem.tap( function(evt) {
      clickButton(evt, person, state)
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

function clickButton(evt, person, state) {
  // var target = evt.target
  // target.classList.add('active');
  var text = "state " + state + " select " + person
  logger("tapped", text)

  // var msg = {
  //   text: text
  // }
  // sendMessage(msg)
  // closeWindow();
}


document.addEventListener("DOMContentLoaded", function(event) {
  setup();
});
