"use strict";

/* url params

  debug - true/false
  category - music/sports etc.
  prompt - top message
*/

// function gotReply(res) {
//   logger("gotReply", res)
//   closeWindow();
// }

function introAnim() {
  $("#hero-image").animate({
    opacity: 1,
    left: '50px',
    rotateZ: '360deg',
  }, 3000, 'ease-out');
}

function showButtons() {

  // var brand = "";
  // var collection = "";
  // var colour = "";
  //var state;

  var category = findGetParameter("category"); logger("found category", category)
  var styles = findGetParameter("styles");if(styles.length === undefined) {styles = "none"}logger("found style", styles)
  var brand = findGetParameter("brand");if(brand.length === undefined) {brand = "none"}logger("found brand", brand)
  var collection = findGetParameter("collection");if(collection.length === undefined) {collection = "none"}logger("found collection", collection)
  var col = findGetParameter("colour");if(col.length === undefined) {col = "none"} logger("found colour", col)
  var endf = findGetParameter("endflag");if(endf.length === undefined) {endf = "false"}logger("found endflag", endf)



  //navigating URL
  var state;
  //if all end then go to the page
  if(endf == "go") {
    state == "end";

    if(findGetParameter("bagbrand").length !== undefined) {
    var bag = findGetParameter("bagbrand"); 
    location.replace("http://www.luxsens.com/m/index.php/view/product/list.html/+attr//+category/45/+searching/" + bag);
    } else if(findGetParameter("watchbrand").length !== undefined) {
    var watch = findGetParameter("watchbrand"); 
    location.replace("http://www.luxsens.com/m/index.php/view/product/list.html/+attr//+category/45/+searching/" + watch);
    } 

  //http://www.luxsens.com/m/index.php/view/product/list.html/+attr//+category/45/+searching/balenciaga

  // else sort by navigation
  } else if(styles === "none") {state = category
  } else if(brand === "none") {state = styles
  } else if(collection === "none") {state = brand
  } else if(col === "none") {state = collection
  } else if(col !== "none") {state = col
  } 

  logger("type of state", typeof state)
  logger("value", state)

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

// function showPrompt(prompt) {
//   prompt = findGetParameter("prompt") || prompt
//   $("#prompt").text(prompt)
// }

function setup() {
  //showDebug()
  //showPrompt("Please select")
  logger("setup")
  // introAnim();
  showButtons()
}

function clickButton(evt, person, state) {
  // var target = evt.target
  // target.classList.add('active');
  //var params = params.concat(person + "&");
  //logger("throw param", params)
  var text = "state " + state + " select " + person
  var now = location.href;

  logger("tapped", text)

  //navigation step using if condition
  
  //Categories
  if(findGetParameter("category") == "categories" && person === "Bag") {
    location.assign(now.concat("&styles=bstyle"))
  } else if(findGetParameter("category") == "categories" && person === "Watch") {
    location.assign(now.concat("&styles=wstyle&brand=wbrand"))
  }

  //style --> bag style --> go to bag brand
  if(findGetParameter("styles") == "bstyle") {
    location.assign(now.concat("&bagstyles=" + decodeURIComponent(person)) +"&brand=bbrand")
  }


  //brand --> bag --> go to collection
  if(findGetParameter("brand") == "bbrand" && person == "Balenciaga") {
    location.assign(now.concat("&bagbrand=" + decodeURIComponent(person)) +"&collection=balenciagacollect")
  } else if(findGetParameter("brand") == "bbrand") {
    location.assign(now.concat("&bagbrand=" + decodeURIComponent(person)) +"&collection=others" +"&colour=colour")
  } 

  //brand --> watch --> go to collection
  if(findGetParameter("brand") == "wbrand" && person === "Rolex") {
    location.assign(now.concat("&watchbrand=" + decodeURIComponent(person)) +"&collection=rolexcollect")
  } else if(findGetParameter("brand") == "wbrand") {
    location.assign(now.concat("&watchbrand=" + decodeURIComponent(person)) +"&collection=others"+"&colour=others"+"&pickcolour=none"+"&endflag=go")
  } 

  //bag collection -- > attribute
  if(findGetParameter("collection").length != undefined && findGetParameter("brand") === "bbrand") {
    location.assign(now.concat("&colour=colour" + "&pickcolour=" + person + "&endflag=go"))
  } 
  
  

    

  // var msg = {
  //   text: text
  // }
  // sendMessage(msg)
  // closeWindow();
}


document.addEventListener("DOMContentLoaded", function(event) {
  setup();
});
