function setup() {
  logger("setting up","Page");
  showButtons(); 
}

$(window).on("load",function(event) {
  setup();
})

//###############################################################
function getState(){

  var styleID = findGetParameter("styleID");          if(styleID.length === undefined) {styleID = ""}           logger("found styleID", styleID)
  var brandID = findGetParameter("brandID");          if(brandID.length === undefined) {brandID = ""}           logger("found brandID", brandID)
  var collectionID = findGetParameter("collectionID");if(collectionID.length === undefined) {collectionID = ""} logger("found collectionID", collectionID)
  var pickattr = findGetParameter("pickattr");        if(pickattr.length === undefined) {pickattr = ""}         logger("found pickattr", pickattr)  

  var category = findGetParameter("category");        if(category.length === undefined) {category = "none"}     logger("found category", category);
  var style = findGetParameter("style");          if(style.length === undefined) {style = "none"}           logger("found style", style)
  var brand = findGetParameter("brand");          if(brand.length === undefined) {brand = "none"}           logger("found brand", brand)
  var collection = findGetParameter("collection");if(collection.length === undefined) {collection = "none"} logger("found collection", collection)
  var attr = findGetParameter("attr");            if(attr.length === undefined) {attr = "none"}             logger("found attr", attr)
  //always false except get "true" from click
  var endf = findGetParameter("endflag");         if(endf.length === undefined) {endf = "false"}            logger("found endflag", endf)
  var lang = findGetParameter("lang");            if(lang.length === undefined) {lang = "ENG"}              logger("found lang", lang)
  var flow = findGetParameter("flow");            if(flow.length === undefined) {flow = "none"}            logger("found flow", flow)

  var state = whereAreWe(category,style,brand,collection,attr,endf,flow);

    //get state status
    logger("type of state", typeof state);
    logger("user's on: ",state["onStep"] + " | value: " + state["stepValue"]);

    //pass other parameter to use on another function
    var helper = {
      "pickattr": pickattr,
      "collectionID":collectionID,
      "brandID": brandID,
      "styleID": styleID,
      "lang":lang,
      "flow":flow
    };

    $.extend(state,helper); return state
}

//on each state, Select UI/ menu to show
function stateMenuHandle(_state){

  var onStep = _state["onStep"];
  var stepValue = _state["stepValue"];
  var flow = _state["flow"];

  // state = {
  //     "onStep": category       <-- ?category=categories
  //     "stepValue": categories  <-- ?category=categories
  //     "pickattr": blue,        <-- ?pickattr=blue
  //     "collectionID":12345     <-- ?collectionID=12345
  //     "brandID": 555           <-- ?brandID=555
  //     "styleID": 666           <-- ?styleID=666
  //     "lang":ENG               <-- ?lang=ENG
  //     "flow":flow              <-- ?flow=BSCAL
  //   }

  var UI = processUI(onStep,stepValue,flow);
  logger("ui",UI)
  UI = prep(UI);
  
    UI.map(function(choice) {

    //##################### UI building start here ######################
      if(choice.length === 1){
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
    //##################### UI building end here ######################
      
      //add tap properties
      $(elem).on("tap",function(evt){  
        clickButton(evt, choice, _state)
      })//end elem
    })//end buttons
}

//show UI menu
function showButtons() {

  var _state = getState();
  var onStep = _state["onStep"]; var stepValue = _state["stepValue"];
  var collectionID = _state["collectionID"];
  var pickattr = _state["pickattr"];
  var brandID = _state["brandID"];
  var styleID = _state["styleID"];
  var lang = _state["lang"];
  var flow = _state["flow"];

  var link="#";
    
  if(onStep != "end"){  
    insertSkipButton("#sweetbox");//<!-- <div class="skip-button"></div> -->
    var link = skipThrow(onStep,stepValue,lang,flow);
    $(".skip-button").on("tap",function(evt){
        location.assign(link);
    })
  }  

  if(onStep !== "end"){ 
      stateMenuHandle(_state);
    } else {
      insertLoadingGif('#shownitem','images/loading.gif');
      goSearchLuxsens(lang,collectionID,styleID,brandID,pickattr);
    }  
  
}//end show button  


function clickButton(evt, choice, _state) {
  //somehow state is not static?
  var onStep = _state["onStep"];
  var stepValue = _state["stepValue"];
  var flow = _state["flow"];

  logger("state",onStep + "/ " + stepValue);

  //get EN word from choice
  var choice = choice.split(' |')[0].toLowerCase(); 

  //check status
  logger("selected choice :", choice);

  //get URL address
  var now = location.href;

//######################################################################################################
                                //  navigation step using if condition  //
//######################################################################################################

//###########################################################################################
//# regular process -- BSCAL  Brands --> Styles --> Collection --> attr --> Luxsens Search #
//###########################################################################################
  if(flow == "BSCAL"){

  //3) onStep collection
    if(onStep == "collection") {  
      var _collectionID = getCollectionID(choice);//return 12345
      sessionStorage.setItem("pickcollection",choice);
      //skip attr just go to search page    
      location.assign(now.concat("&collectionID=" + _collectionID + "&attr=other" + "&pickattr="+"&endflag=go"));
    }

  //2) onStep style
    if(onStep === "style") {
      var _styleID = getStyleID(choice);// ex. [123456,"Cluth"]
      var brand = sessionStorage.pickbrand;
      var style = sessionStorage.pickstyle;
      sessionStorage.setItem("pickstyle",choice);// remember pick style
      location.assign(now.concat("&styleID="+_styleID +"&collection=" + brand));
    }
    

  // 1) start : show all brands
    if(onStep === "brand") {
      var _brandID = getBrandID(choice);// ex. [123456,"hermes"]
      sessionStorage.setItem("pickbrand",choice);// remember pick brand --> "hermes"
      
      //if it is a watch 
      if(stepValue == "wbrand")
        if(hasCollection2(choice)) { //1 has a collection go to collection
        sessionStorage.setItem("pickstyle","wrist watches") 
        location.assign(now.concat("&brandID=" + _brandID[0] +"&style=none&styleID=1568"+"&collection=" + _brandID[1])) 

        } else { //2 if it does not have collection --> skip attr --> go to Luxsens  
        location.assign(now.concat("&brandID=" + _brandID[0] +"&style=none&styleID=1568&collection=other&collectionID=&attr=other&pickattr=&endflag=go")) 
      }

      //if it is a bag
      if(stepValue == "bbrand"){
        if(hasStyle(choice)) { //1 has a style go to that style
        location.assign(now.concat("&brandID=" + _brandID[0] +"&style=bstyle"));

        } else if(hasCollection2(choice)) { //2 if it does not have style --> goto collection 
        location.assign(now.concat("&brandID=" + _brandID[0] +"&style=watch&styleID=1568"+"&collection=" + _brandID[1]));
        
        } else { //if don't have style&collection --> skip attr -->go to luxsens
        location.assign(now.concat("&brandID=" + _brandID[0] +"&collection=other&collectionID=&style=all&styleID=&attr=other&pickattr=&endflag=go")) 
        }
      }
      
    }
  }  

//###########################################################################################
//# All brands flow -- BSCAL  Brands --> Collection --> attr --> Luxsens Search #
//###########################################################################################
  if(flow == "allbrand"){

  //3) onStep collection
    if(onStep == "collection") {  
      var _collectionID = getCollectionID(choice);//return 12345
      sessionStorage.setItem("pickcollection",choice);
      //skip attr just go to search page    
      location.assign(now.concat("&collectionID=" + _collectionID + "&attr=other" + "&pickattr="+"&endflag=go"));
    }

  //2) onStep style
    if(onStep === "style") {
      var _styleID = getStyleID(choice);// ex. [123456,"Cluth"]
      var brand = sessionStorage.pickbrand;
      var style = sessionStorage.pickstyle;
      sessionStorage.setItem("pickstyle",choice);// remember pick style
      location.assign(now.concat("&styleID="+_styleID +"&collection=" + brand));
    }
    

  // 1) start : show all brands
    if(onStep === "brand"  && stepValue == "allbrand") {
      var _brandID = getBrandID(choice);// ex. [123456,"hermes"]
      sessionStorage.setItem("pickbrand",choice);// remember pick brand --> "hermes"
      
      if(hasStyle(choice)) { //1 has a style go to that style
        location.assign(now.concat("&brandID=" + _brandID[0] +"&style=astyle"));

        } else if(hasCollection2(choice)) { //2 if it does not have style --> goto collection 
        location.assign(now.concat("&brandID=" + _brandID[0] +"&style=none&styleID=1568"+"&collection=" + _brandID[1]));
        
        } else { //if don't have style&collection --> skip attr -->go to luxsens
        location.assign(now.concat("&brandID=" + _brandID[0] +"&collection=other&collectionID=&style=all&styleID=&attr=other&pickattr=&endflag=go")) 
        }
      }
    }

      //###########################################################################################################
      //# Category process -- CSBCAL Categories --> Styles --> Brands --> Collection --> attr --> Luxsens Search #
      //###########################################################################################################
  if(flow == "CSBCAL"){

  //3) onStep collection
    if(onStep == "collection") {  
      var _collectionID = getCollectionID(choice);//return 12345
      sessionStorage.setItem("pickcollection",choice);
      //skip attr just go to search page    
      location.assign(now.concat("&collectionID=" + _collectionID + "&attr=other" + "&pickattr="+"&endflag=go"));
    }    

  // 1) start : show all brands
    if(onStep === "brand") {
      var _brandID = getBrandID(choice);// ex. [123456,"hermes"]
      sessionStorage.setItem("pickbrand",choice);// remember pick brand --> "hermes"
      var brand = sessionStorage.pickbrand;
      var style = sessionStorage.pickstyle;
      
      if(stepValue == "bbrand") { //1 has a collection go to that collection
        if(hasCollection(style,brand)){
          location.assign(now.concat("&brandID=" + _brandID[0] +"&collection=" + _brandID[1]));
        } else { //if don't have collection --> skip attr -->go to luxsens
          location.assign(now.concat("&brandID=" + _brandID[0] +"&collection=other&collectionID=&attr=other&pickattr=&endflag=go")) 
        }
      } else if(stepValue == "wbrand") { //1 has a collection go to that collection
        if(hasCollection2(brand)){
          location.assign(now.concat("&brandID=" + _brandID[0] +"&style=none&styleID=1568&collection=" + _brandID[1]));
        } else { //if don't have collection --> skip attr -->go to luxsens
          location.assign(now.concat("&brandID=" + _brandID[0] +"&style=none&styleID=1568&collection=other&collectionID=&attr=other&pickattr=&endflag=go")) 
        }
      }
    }

    //2) onStep style
    if(onStep === "style") {
      var _styleID = getStyleID(choice);// ex. [123456,"Cluth"]
      sessionStorage.setItem("pickstyle",choice);// remember pick style
        location.assign(now.concat("&styleID="+_styleID +"&brand=bbrand"));
    }

    // 1) start : show 2 categories
    if(onStep == "category") {
      if(choice == "bag"){
        location.assign(now.concat("&style=bstyle"));
      } else if(choice == "watch") { //2 if it does not have style --> goto collection 
        sessionStorage.setItem("pickstyle","wrist watches")
        location.assign(now.concat("&style=none&styleID=1568&brand=wbrand"));
      }  
    }
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

function insertLoadingGif(id,path){
  var html = "<div class='prompt'>" + "<img src='" + path +"''>" + "</img>" + "</div>";
  $(html).appendTo(id);
}

function insertSkipButton(id){
  var html = "<div class='skip-button'>SKIP</div>";
  $(html).prependTo(id); 
}

function skipThrow(onStep,stepValue,lang,flow){
  var prefix = "www"; var link="#";
  if(lang == "CHN") prefix = "chs";

  if(flow == "BSCAL"){
      if(onStep == "brand" && stepValue == "bbrand"){
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+category/72"

    } else if(onStep == "brand" && stepValue == "wbrand"){ 
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+category/73" 

    } else if(onStep == "style"){//get all items in that Brands except watch
      var b_id = findGetParameter("brandID");  
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+attr/item_brand/"+b_id+"/+category/72"

    } else if(onStep == "collection"){//bags get all collection on styles&brands -- watch get all collection
      var b_type = findGetParameter("brand"); 
      var b_id = findGetParameter("brandID");
      if(findGetParameter("styles") != "none") var s_id = findGetParameter("styleID");
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+attr/item_style/"+s_id+"/item_brand/"+b_id+"/+category/45"  
    }
  }  

  if(flow == "allbrand"){
      if(onStep == "brand"){
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+category/45"

    } else if(onStep == "style"){//get all items in that Brands except watch
      var b_id = findGetParameter("brandID");  
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+attr/item_brand/"+b_id+"/+category/72"

    } else if(onStep == "collection"){//bags get all collection on styles&brands -- watch get all collection
      var b_type = findGetParameter("brand"); 
      var b_id = findGetParameter("brandID");
      if(findGetParameter("styles") != "none") var s_id = findGetParameter("styleID");
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+attr/item_style/"+s_id+"/item_brand/"+b_id+"/+category/45"  
    }
  }  

  if(flow == "CSBCAL"){
     if(onStep == "category"){
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+category/45"

    } else if(onStep == "style"){//get all items in that Brands except watch
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+category/72"  

    } else if(onStep == "brand"){
      var s_id = findGetParameter("styleID");
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+attr"+"/item_style/"+s_id+"+category/45"

    } else if(onStep == "collection"){//bags get all collection on styles&brands -- watch get all collection
      var b_type = findGetParameter("brand"); 
      var b_id = findGetParameter("brandID");
      if(findGetParameter("styles") != "none") var s_id = findGetParameter("styleID");
      link = "http://" + prefix + ".luxsens.com/m/index.php/view/product/list.html/+attr/item_style/"+s_id+"/item_brand/"+b_id+"/+category/45"  
    }
  }  

   return link   
}      

function processUI(onStep,stepValue,flow){

  var _case = 666; //fail case  
  var UI; 
    //becareful of load order, the first page must be on the buttom
    if(onStep =="end"){
          _case = 4 // wait for redirect, do nothing
    }
      //###########################################################################################
      //# regular process -- BSCAL  Brands --> Styles --> Collection --> attr --> Luxsens Search #
      //###########################################################################################

  if(flow == "BSCAL"){
      if( onStep =="attr") {
        _case = 040; //show attr

    } else if( onStep =="collection") {
        _case = 030; //got brand and style, g for collection

    } else if( onStep =="style") {
        _case = 020; //go to search style of that brands 

    } else if( onStep =="brand" && stepValue == "wbrand") {
        _case = 011; //go to possible watches brand include Chanel/Lv/etc.           

    } else if( onStep =="brand" && stepValue == "bbrand") {
        _case = 010; //go to handle bags brand 

    } else{
        _case = 27; //unreachable
    }
  }    

      //###########################################################################################
      //# all brand process -- Brands --> Styles --> Collection --> attr --> Luxsens Search #
      //###########################################################################################   
    if(flow == "allbrand"){
      if(onStep =="attr") {
          _case = 040; //show attr

      //} else if( onStep =="collection" && findGetParameter("styleID") == 1568) {
      //    _case = 031; //got brand and style, go for collection

      } else if( onStep =="collection") {
          _case = 030; //got brand and style, go for collection

      } else if( onStep =="style") {
          _case = 021; //go to search style of that brands 

      } else if( onStep =="brand") {
          _case = 012; //go to possible watches brand include Chanel/Lv/etc.           
      } else{
          _case = 27; //unreachable
      }
    }

      //###########################################################################################################
      //# Category process -- CSBCAL Categories --> Styles --> Brands --> Collection --> attr --> Luxsens Search #
      //###########################################################################################################

  if(flow == "CSBCAL"){
      if( onStep =="attr") {
        _case = 040; //show attr

    } else if( onStep =="collection") {
        _case = 030; //got brand and style, g for collection

    } else if( onStep =="brand" && stepValue == "wbrand") {
        _case = 011; //go to possible watches brand include Chanel/Lv/etc.           

    } else if( onStep =="brand" && stepValue == "bbrand") {
        _case = 010; //go to handle bags brand 

    } else if( onStep =="style") {
        _case = 022; //go to search style of that brands 

    } else if( onStep =="category") {
        _case = 000; //show categories   

    } else {
        _case = 27; //unreachable
    }
  }      

  switch(_case){
    case 4:
      UI = {};

    case 031:
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      var brand = sessionStorage.pickbrand;
      UI = queryCollection2(brand); 
      break;  

    case 030:
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      var style = sessionStorage.pickstyle;
      var brand = sessionStorage.pickbrand;
      UI = queryCollection(style,brand);
      break;

    case 022: //simply show array in menuData.js; key =stepValue
      UI = queryMenuData('bstyle');
      break;  

    case 021: //obtain brand; query all possible style according to that brand.
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      var brand = sessionStorage.pickbrand;
      UI = queryStyles2(brand);
      break;  

    case 020: //obtain brand; query all possible style according to that brand.
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      var brand = sessionStorage.pickbrand;
      UI = queryStyles(brand);
      break;

    case 012: //show all brands that has wrist watches
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      UI = queryAllBrand();  
      break;

    case 011: //show all brands that has wrist watches
      //Note:case sensitive. in database first letter is capitalize ex. "Backpack"
      UI = queryBrand('wrist watches');
      break;  

    case 010: //simply show array in menuData.js; key =stepValue
      UI = queryMenuData('bbrand');
      break;

    case 000: //simply show array in menuData.js; key =stepValue
      UI = queryMenuData('categories');
      break;  

    case 27: //lost
        alert("Error#27: how did you get here, buddy?, please start over.")
      break;    

    case 666: //error
        alert("Error#666: can't handle!! selection, please start over.")
      break;   
  }
  return UI;
}
