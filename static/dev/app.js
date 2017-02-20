"use strict";


$(document).ready(function(event){

  //document.addEventListener("DOMContentLoaded", function(event) {
  logger("Start setting up page",".....")
  setup();
  
//})

})
function setup() {
  //action time
  showButtons();
}


//#############################################################################


//show UI menu
function showButtons() {

  var _state = getURLState();
  var state = [_state["state0"],_state["state1"]];
  var lang = _state["lang"];
  var collectionID = _state["collectionID"];
  var pickattr = _state["pickattr"];
  var brandID = _state["brandID"];
  var styleID = _state["styleID"]

  if(state[0] == "end" && lang == "CHN")
  {
      insertLoadingGif();
      location.replace(
        "http://chs.luxsens.com/m/index.php/view/product/list.html/+attr/item_collection/" + collectionID 
        + "/item_style/" + styleID 
        + "/item_brand/" + brandID 
        + "/+category/45/+searching/" + pickattr
      )
       
  } else if(state[0] == "end" && lang == "ENG") {
      insertLoadingGif();
      location.replace(
        "http://www.luxsens.com/m/index.php/view/product/list.html/+attr/item_collection/" + collectionID 
        + "/item_style/" + styleID 
        + "/item_brand/" + brandID 
        + "/+category/45/+searching/" + pickattr
      )
  }  

  stateMenuHandle(state,lang);
}//end show button  

function getURLState(){

  //navigation variable = [where user are: value]
  var state = [];

  //get ID from JSON file
  var styleID = findGetParameter("styleID");        
    if(styleID.length === undefined) {styleID = ""}         
      logger("found styleID", styleID)
  var brandID = findGetParameter("brandID");        
    if(brandID.length === undefined) {brandID = ""}       
      logger("found brandID", brandID)
  var collectionID = findGetParameter("collectionID");
    if(collectionID.length === undefined) {collectionID = ""} 
      logger("found collectionID", collectionID)
  var pickattr = findGetParameter("pickattr");    
    if(pickattr.length === undefined) {pickattr = ""}          
      logger("found pickattr", attr)  

  //get parameter from user
  var category = findGetParameter("category");                                                              logger("found category", category)
  var style = findGetParameter("style");        
    if(style.length === undefined) {style = "none"}         
      logger("found style", style)
  var brand = findGetParameter("brand");          
    if(brand.length === undefined) {brand = "none"}           
      logger("found brand", brand)
  var collection = findGetParameter("collection");
    if(collection.length === undefined) {collection = "none"} 
      logger("found collection", collection)
  var attr = findGetParameter("attr");            
    if(attr.length === undefined) {attr = "none"}              
      logger("found attr", attr)

  //always false except get "true" from click
  var endf = findGetParameter("endflag");         
    if(endf.length === undefined) {endf = "false"}            
      logger("found endflag", endf)
  var lang = findGetParameter("lang");         
    if(lang.length === undefined) {lang = "ENG"}            
      logger("found language", lang)

  if(endf === "go")                 {state[0] = "end"; state[1]="end";
  } else if(style === "none")       {state[0] = "category"; state[1] = category;
  } else if(brand === "none")       {state[0] = "style"; state[1] = style;
  } else if(collection === "none")  {state[0] = "brand"; state[1] = brand;
  } else if(attr === "none")        {state[0] = "collection";state[1] = collection;
  } else if(endf === "false")       {state[0] = "attr"; state[1]=attr;
  } else { //error
    alert("Error#0 : Oops,We are lost here. please start over");
  }  
    //get state status
    logger("type of state", typeof state);
    logger("state [0]", state[0] + " : state[1]" +state[1]);
    logger("language", lang);

    var result = {
      "state0": state[0],
      "state1":state[1],
      "lang":lang ,
      "pickattr": pickattr,
      "collectionID":collectionID,
      "brandID": brandID,
      "styleID": styleID
    };
    return result
}

//on each state, Select UI/ menu to show
function stateMenuHandle(state,lang){

  var _case = 999;
  var UI;

    if(state[0]=="end"){
          _case = 3;
      } else if(state[0]=="category"){
          _case = 0;
      } else if(state[0]=="style"){
          _case = 1;    
      // } else if(state[0]=="collection") {
      //     _case = 2;
      // } 
      // } else if(state[0]=="category"){
      //     _case = 0;
    }

  switch(_case){
    case 0: //When select categories
      UI = queryMenuDataID(state[1],lang)
      break;
    case 1: //Only bag has this option
      UI = queryStylesID(lang);
      break;

    case 2:
      UI = queryCollectionID(state[1]);
      break;

    case 3:
      UI = [];// don't load anything, wait for redirecting
      break;

    case 9: //error
        alert("Error#9: can't handle!! selection, please start over")
      break;   
  }

  //logger("buttons :",buttons);
  //person = lists of items on menuData.js files
  //.map create new array then process with respective value
    UI.map(function(person) {
      var html = "<li class='button-big'>" + person + "</li>";
      var elem = $(html).appendTo('ul')

      elem.tap( function(evt) {
        clickButton(evt, person, state,lang)
      })//end elem
    })//end buttons
}



 


function clickButton(evt, person, state,lang) {
  //convert to lower case
  var person = person.toLowerCase(); 
  //check status
  var text = "state type: " + state[0] + "/ value :" + state[1] + "/ select :" + person;
  logger("log", text);

  //get URL address
  var now = location.href;

  //##################################
  //navigation step using if condition  --> improve to switch case
  //##################################
  //
  // Note : becareful all in lower case
  
  //S0/S1
  //
  //?categories = category
  //?lang= "ENG"/"CHN"
  //
  // state0:|    category      |      brand      |       Collection       |     attr           |    
  //        |                                                      
  // path1 B|?styleID=xxxx      ?brandID=xxxx               
  // state1:|?style=bstyle      ?brand=bbrand     ?collectionID=xxxx       ?attr = colour
  //        |---> Style ------> Brand ----------> Collection ------------> Attribute ---------> webpage
  //        |
  // path2 W|                   ?brandID=xxxx
  // state1:|?style=wstyle      ?brand=wbrand     ?collectionID=xxxx       ?attr = all
  //        |---> Watch ------> (     ) --------> Collection ------------> Attribute ---------> webpage
  //
  //        
  // person:| What customers click                        

//customerJourney(now,action,goto)







  //1) #bag/watch start at "Categories" menu, show all categories Luxsens has
  if(state[0] == "category" && (person === "bag"||person == "手袋")) {
    //1.1) if click bag goto bag style --> set styles=bstyle --> go to 2)
    location.assign(now.concat("&style=bstyle"))
  } else if(state[0] == "category" && (person === "watch"||person == "钟表")) {
    //1.2) if click watch goto watch style --> since watch has no style set styles=wstyle then go to brand 
    // --> set brand=wbrand --> go to 4)
    location.assign(now.concat("&style=wstyle&styleID=&brand=wbrand"))
  }

  // //2) #backpack/cluthes/etc. now on style=bstyle customer select any prefered bag style --> store data on bagstyles = "value" then go to bag brand
  // // --> set brand=bbrand -->go to 3)
  // if(state[0] == "style") {
  //   var style = person.toLowerCase();
  //   var _styleID = getStyleID(style,lang);// ex. [123456,"Cluth"]
  //   location.assign(now.concat("&styleID=" + _styleID[0]).toString() +"&brand=bbrand")
  // }

  // //3) #Hermes/gucci/etc.. now on bag brand brand = bbrand if any of the bag has collection go to that collection 
  // //--> set collection=*respective collection --> go to xxx)
  // if(state[1] == "bbrand") {
  //   var brand = person.toLowerCase();
  //   var _brandID = getBrandID(brand,lang);// ex. [123456,"hermes"]
  //   //if it has a collection go to collection 
  //   if(hasCollection(brand)) {// search for bag collection -- helper.js
  //     location.assign(now.concat("&brandID=" + _brandID[0].toString()) +"&collection=" + _brandID[1].toString()) // improve to paste collection here
  //     } else {// no brand ID
  //     //if that bag doesn't has collection --> set collection = others --> then go to attribute --> set attr= colour go to 5)
  //     location.assign(now.concat("&brandID=" + _brandID[0].toString()) +"&collection=others"+"&attr=colour")
  //     }
  // }

  // //4) #Cartier/Rolex.. now on watch brand if it has collection go to that collection
  // //--> set collection=*respective collection --> go to 5)
  // if(state[1] == "wbrand") {
  // var brand = person.toLowerCase();
  // var _brandID = getBrandID(brand,lang  );// ex. [123456,"hermes"]
  // //if it has a collection go to collection 
  // if(hasCollection(brand)) {// search for bag collection -- helper.js
  //   location.assign(now.concat("&brandID=" + _brandID[0].toString()) +"&collection=" + _brandID[1].toString()) // improve to paste collection here
  //   } else {// no brand ID
  //   //if that watch doesn't has collection --> set collection = others --> then go to attribute --> set colour= others --> go to Luxsens
  //   location.assign(now.concat("&brandID=" + _brandID[0].toString()) +"&collection=others"+"&attr=others"+"&pickattr="+"&endflag=go")
  //   }
  // }

  // //4.5 #city/red sun/loli/.... now we are on collection --> go to attr //&& findGetParameter("brand") == "bbrand"
  // if(state[0] == "collection" && findGetParameter("brand") == "bbrand") {
  //   //var collection = person.toLowerCase();
  //   var _collectionID = getCollectionID(state[1],person);
  //   location.assign(now.concat("&collectionID=" + _collectionID[0].toString() + "&attr=colour"));
  // } else if(state[0] == "collection" && findGetParameter("brand") == "wbrand") {
  //   //var collection = person.toLowerCase();
  //   var _collectionID = getCollectionID(state[1],person);
  //   location.assign(now.concat("&collectionID=" + _collectionID[0].toString() + "&attr=others" + "&pickattr="+"&endflag=go"));
  // } 
  
  // // 5) #red/blue/green now on attribute if it is bag collection send bag attribute and endflag
  // // --> set attr=colour and get pickcolour=*respective colour then end flag=end
  // // go to luxsens page
  // if(state[0] == "attr") {
  //   location.assign(now.concat("&pickattr=" + decodeURIComponent(person)+"&endflag=go"))
  // } 
  
}

// function customerJourney(now,action,goto){

// }

function insertLoadingGif(){
  // imply loading gif
  var html = "<div class='prompt'>" + "<img src='../images/layout/loading.gif'>" + "</img>" + "</div>";
  var elem = $(html).appendTo('ul')

}


