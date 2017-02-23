"use strict";//edit col/colour
 
function setup() {
  logger("setting up","Page");
  showButtons();
}

$(window).on("load",function(event) {
  setup();
})

//###############################################################
function getState(){

  //navigation variable 
  var state = {};

  var styleID = findGetParameter("styleID");          if(styleID.length === undefined) {styleID = ""}           logger("found styleID", styleID)
  var brandID = findGetParameter("brandID");          if(brandID.length === undefined) {brandID = ""}           logger("found brandID", brandID)
  var collectionID = findGetParameter("collectionID");if(collectionID.length === undefined) {collectionID = ""} logger("found collectionID", collectionID)
  var pickattr = findGetParameter("pickattr");        if(pickattr.length === undefined) {pickattr = ""}         logger("found pickattr", pickattr)  

  var category = findGetParameter("category"); logger("found category", category)
  var style = findGetParameter("style");          if(style.length === undefined) {style = "none"}           logger("found style", style)
  var brand = findGetParameter("brand");          if(brand.length === undefined) {brand = "none"}           logger("found brand", brand)
  var collection = findGetParameter("collection");if(collection.length === undefined) {collection = "none"} logger("found collection", collection)
  var attr = findGetParameter("attr");            if(attr.length === undefined) {attr = "none"}             logger("found attr", attr)
  //always false except get "true" from click
  var endf = findGetParameter("endflag");         if(endf.length === undefined) {endf = "false"}            logger("found endflag", endf)
  var lang = findGetParameter("lang");            if(lang.length === undefined) {lang = "ENG"}              logger("found lang", lang)

  if(endf == "go")                     {state["onStep"] = "end"; 
                                        state["stepValue"]="end";
  } else if(attr !== "none")            {state["onStep"] = "attr";
                                        state["stepValue"] = attr;
  } else if(collection !== "none")      {state["onStep"] = "collection"; 
                                        state["stepValue"] = collection;
  } else if(brand !== "none")           {state["onStep"] = "brand"; 
                                        state["stepValue"] = brand;
  } else if(style !== "none")           {state["onStep"] = "style"; 
                                        state["stepValue"] = style;
  } else if(category == "categories")  {state["onStep"] = "category"; 
                                        state["stepValue"] = category;
  } else { //error
    alert("Error#0 : Oops,We are lost here. please start over");
  }  

    //get state status
    logger("type of state", typeof state);
    logger("user's on: ",state["onStep"] + " | value: " + state["stepValue"]);

    //pass other parameter to use on another function
    var helper = {
      "pickattr": pickattr,
      "collectionID":collectionID,
      "brandID": brandID,
      "styleID": styleID,
      "lang":lang
    };

    $.extend(state,helper);

    return state
}

//on each state, Select UI/ menu to show
function stateMenuHandle(_state){

  var onStep = _state["onStep"];
  var stepValue = _state["stepValue"];

  // state = {
  //     "onStep": category       <-- ?category=categories
  //     "stepValue": categories  <-- ?category=categories
  //     "pickattr": blue,        <-- ?pickattr=blue
  //     "collectionID":12345     <-- ?collectionID=12345
  //     "brandID": 555           <-- ?brandID=555
  //     "styleID": 666           <-- ?styleID=666
  //     "lang":ENG               <-- ?lang=ENG
  //   }

  var _case = 666;
  var UI; 

    //becareful of load order, because of different source location
    if(onStep =="end"){
          _case = 4
      } else if( onStep =="attr") {
          _case = 3
      } else if( onStep =="collection") {
          _case = 2
      } else if( onStep =="brand") {
          _case = 1
      } else if( stepValue =="categories" ||  stepValue =="bstyle"){
          _case = 0;
      }

  switch(_case){
    case 4: // wait for redirect, do nothing
      
    case 3://show colour
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      var style = sessionStorage.pickstyle;
      var brand = sessionStorage.pickbrand;
      var collection =  sessionStorage.pickcollection
      UI = queryAttr(style,brand,collection);
      break;

    case 2://show collection
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      var style = sessionStorage.pickstyle;
      var brand = sessionStorage.pickbrand;
      UI = queryCollection(style,brand);
      break;

    case 1://show brand
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      var style = sessionStorage.pickstyle
      UI = queryBrand(style);
      break;

    case 0://show category&style
      UI = queryMenuData(stepValue);
      break;

    case 666: //error
        alert("Error#666: can't handle!! selection, please start over")
      break;   
  }

   //may omit depends on UI
   var UI = prep(UI);
  
    UI.map(function(choice) {

    //##################### UI building start here ######################
      if(choice.length == 1){
        var html = "<li class='item-divider'>" + choice + "</li>";
        var elem = $(html).appendTo('ul')
      } else {
      var html = 
      "<li><label class='label-radio item-content'>" +
          "<div class='item-inner'>" +
            "<div class='item-title'>" + choice +  "</div>" +
          "</div>" +
          "</label>" +
      "</li>"
      var elem = $(html).appendTo('ul')
      }

      //add tap properties
      elem.tap( function(evt) {
        clickButton(evt, choice, _state)
      })//end elem
    })//end buttons
}


//show UI menu
function showButtons() {

  var _state = getState();
  var collectionID = _state["collectionID"];
  var pickattr = _state["pickattr"];
  var brandID = _state["brandID"];
  var styleID = _state["styleID"];
  var lang = _state["lang"]

  if(_state["onStep"] == "end")
  {
      insertLoadingGif('ul','images/loading.gif');
      goSearchLuxsens(lang,collectionID,styleID,brandID,pickattr);

  } 

  if(_state["onStep"] == "style"||_state["onStep"] == "brand" 
    || _state["onStep"] == "collection" || _state["onStep"] == "attr") {
    
    toggleSkip(["onStep"],lang);
    
  } 

  stateMenuHandle(_state);
}//end show button  


function clickButton(evt, choice, _state) {
  //somehow state is not static?
  var onStep = _state["onStep"];
  var stepValue = _state["stepValue"];

  logger("state",onStep + "/ " + stepValue);

  //get EN word from choice
  var choice = choice.split('/')[0].toLowerCase(); 

  //check status
  logger("selected choice :", choice);

  //get URL address
  var now = location.href;

  //##################################
  //navigation step using if condition  
  //##################################
  

  // 5) #red/blue/green now on attribute if it is bag collection send bag attribute and endflag
  // --> set attr=colour and get pickcolour=*respective colour then end flag=end
  // go to luxsens page
  if(onStep == "attr") {
    location.assign(now.concat("&pickattr=" + choice +"&endflag=go"))
  } 
  
  //4 #city/red sun/loli/.... now we are on collection --> go to attr //&& findGetParameter("brand") == "bbrand"
  if(onStep == "collection") {  
    var _collectionID = getCollectionID(choice);
    sessionStorage.setItem("pickcollection",choice);
      if(findGetParameter("brand") == "bbrand"){// on bag collection
        
        location.assign(now.concat("&collectionID=" + _collectionID + "&attr=colour"));
      }else if(findGetParameter("brand") == "wbrand") {//watch

        location.assign(now.concat("&collectionID=" + _collectionID + "&attr=other" + "&pickattr="+"&endflag=go"));

    }
  }
  
  // 3) #Hermes/gucci/etc.. now on bag brand brand = bbrand if any of the bag has collection go to that collection 
  // --> set collection=*respective collection --> go to xxx)
  if(onStep === "brand") {
    var _brandID = getBrandID(choice);// ex. [123456,"hermes"]
    sessionStorage.setItem("pickbrand",choice);// remember pick brand
    //if it has a collection go to collection 
    if(hasCollection(sessionStorage.pickstyle,choice)) {
      location.assign(now.concat("&brandID=" + _brandID[0] +"&collection=" + _brandID[1])) 
    } else { //if it does not have collection
      if(stepValue == "bbrand"){//bags --> go pick colour
        sessionStorage.setItem("pickcollection","other");
        location.assign(now.concat("&brandID=" + _brandID[0] +"&collection=other&collectionID=&attr=colour")) 
      } else if(stepValue == "wbrand") {//watch --> go to luxsens
        //sessionStorage.clear();
        location.assign(now.concat("&brandID=" + _brandID[0] +"&collection=other&collectionID=&attr=other&pickattr=&endflag=go")) 
      }
    }
  }

  //2) #backpack/cluthes/etc. now on style=bstyle customer select any prefered bag style --> store data on bagstyles = "value" then go to bag brand
  // --> set brand=bbrand -->go to 3)
  if(onStep === "style") {
    var _styleID = getStyleID(choice);// ex. [123456,"Cluth"]
    sessionStorage.setItem("pickstyle",choice);// remember pick style
    location.assign(now.concat("&styleID="+_styleID+"&brand=bbrand"))
  }

  //1) #bag/watch start at "Categories" menu, show all categories Luxsens has
  if(onStep == "category" && choice == "bag") {
    //1.1) if click bag goto bag style --> set styles=bstyle --> go to 2)
    location.assign(now.concat("&style=bstyle"))
  } else if(onStep == "category" && choice == "watch") {
    //1.2) if click watch goto watch style --> since watch has no style set styles=wstyle then go to brand
    sessionStorage.setItem("pickstyle","wrist watches"); 
    location.assign(now.concat("&style=wstyle&styleID=1568&brand=wbrand"))
  }

}

//#############################################################################
function goSearchLuxsens(lang,_collectionid,_stylesid,_brandid,_pickattr){
  if(_pickattr == "all"){
    _pickattr = "";
  }
      if(lang == "CHN")
  {
      location.replace(
        "http://chs.luxsens.com/m/index.php/view/product/list.html/+attr/item_collection/" + _collectionid
        + "/item_style/" + _stylesid
        + "/item_brand/" + _brandid
        + "/+category/45/+searching/" + _pickattr
      )
       
  } else if(lang == "ENG") {
      location.replace(
        "http://www.luxsens.com/m/index.php/view/product/list.html/+attr/item_collection/" + _collectionid 
        + "/item_style/" + _stylesid
        + "/item_brand/" + _brandid 
        + "/+category/45/+searching/" + _pickattr
      )
  }  
}
function insertLoadingGif(append,path){
  var html = "<div class='prompt'>" + "<img src='" + path +"''>" + "</img>" + "</div>";
  var elem = $(html).appendTo(append);
}

function toggleSkip(onStep,lang){
  var elm = $('<div class="skip-button">SKIP</div>').prependTo('body');
  if(lang == "ENG"){
  var link="http://www.luxsens.com";
      if(onStep = "style"){link = "http://www.luxsens.com/m/index.php/view/product/list.html/+category/72"}
       else if(onStep = "brand" && findGetParameter("brand") == "bbrand"){ 
          var id = findGetParameter("styleID");   
          link = "http://www.luxsens.com/m/index.php/view/product/list.html/+category/72/+attr/item_style/"+id
       } //show all bags
       else if(onStep = "brand" && findGetParameter("brand") == "wbrand"){
          var id = findGetParameter("styleID");   
          link = "http://www.luxsens.com/m/index.php/view/product/list.html/+category/73"
          //http://www.luxsens.com/m/index.php/view/product/list.html/+category/73
       } //show all bags with respective style
       else if(onStep = "collection" && findGetParameter("brand") == "bbrand"){
          var s_id = findGetParameter("styleID");  
          var b_id = findGetParameter("brandID");  
          link = "http://www.luxsens.com/m/index.php/view/product/list.html/+category/72/+attr/item_style/"+ s_id + "/item_brand/" + b_id
       }
       else if(onStep = "collection" && findGetParameter("brand") == "wbrand"){ 
          var b_id = findGetParameter("brandID");  
          link = "http://www.luxsens.com/m/index.php/view/product/list.html/+category/72/+attr/item_style/"+ s_id + "/item_brand/" + b_id
       
       }
       else if(onStep = "attr" ){
          var s_id = findGetParameter("styleID");  
          var b_id = findGetParameter("brandID");
          var c_id = findGetParameter("collectionID");  
          link = "http://www.luxsens.com/m/index.php/view/product/list.html/+attr/item_collection/"+c_id+"/item_style/"+s_id+"/item_brand/"+b_id+"/+category/45"
       }  
      //show all brand
        $(".skip-button").on("tap",function(){
          $(".skip-button").off("tap");
          $("li").remove();
          insertLoadingGif('ul','images/loading.gif');
          location.replace(link);
        })
  }
  if(lang == "CHN"){
  var link="http://chs.luxsens.com";
      if(onStep = "style"){link = "http://chs.luxsens.com/m/index.php/view/product/list.html/+category/72"}
       else if(onStep = "brand" && findGetParameter("brand") == "bbrand"){ 
          var id = findGetParameter("styleID");   
          link = "http://chs.luxsens.com/m/index.php/view/product/list.html/+category/72/+attr/item_style/"+id
       } //show all bags
       else if(onStep = "brand" && findGetParameter("brand") == "wbrand"){
          var id = findGetParameter("styleID");   
          link = "http://chs.luxsens.com/m/index.php/view/product/list.html/+category/73"
          //http://www.luxsens.com/m/index.php/view/product/list.html/+category/73
       } //show all bags with respective style
       else if(onStep = "collection" && findGetParameter("brand") == "bbrand"){
          var s_id = findGetParameter("styleID");  
          var b_id = findGetParameter("brandID");  
          link = "http://chs.luxsens.com/m/index.php/view/product/list.html/+category/72/+attr/item_style/"+ s_id + "/item_brand/" + b_id
       }
       else if(onStep = "collection" && findGetParameter("brand") == "wbrand"){ 
          var b_id = findGetParameter("brandID");  
          link = "http://chs.luxsens.com/m/index.php/view/product/list.html/+category/72/+attr/item_style/"+ s_id + "/item_brand/" + b_id
       
       }
       else if(onStep = "attr" ){
          var s_id = findGetParameter("styleID");  
          var b_id = findGetParameter("brandID");
          var c_id = findGetParameter("collectionID");  
          link = "http://chs.luxsens.com/m/index.php/view/product/list.html/+attr/item_collection/"+c_id+"/item_style/"+s_id+"/item_brand/"+b_id+"/+category/45"
       }  
      //show all brand
        $(".skip-button").on("tap",function(){
          $(".skip-button").off("tap");
          $("li").remove();
          insertLoadingGif('ul','images/loading.gif');
          location.replace(link);
        })
  }      
}
