"use strict";
//#### menuData.js must be present!!!!! 

//search if brand has collection in menuData
function hasCollection(_brand){//input string
  for(var i in collectionid){//got collectionid from menuData.js
    if(i == _brand){
        return true //return array
    }
  } 
  return false;
}//end function  

function getBrandID(_brandName,lang){//input string
  for(var i=0; i<brandid.length;i++){//got collectionid from menuData.js
    if(lang == "ENG") { 
      if(brandid[i][2] == _brandName){
        return [brandid[i][0],brandid[i][2]];
      } 
    } else if(lang == "CHN"){
      if(brandid[i][3] == _brandName){
        return [brandid[i][0],brandid[i][2]];
      } 
    }  
  } 
  return ["null","null"];
}//end function

function getStyleID(_styleName,lang){//input string
  for(var i=0; i<stylesid.length;i++){//got collectionid from menuData.js
    if(lang == "ENG")  {
      if(stylesid[i][2].toLowerCase() == _styleName){
        return [stylesid[i][0],stylesid[i][2]];
      } 
    } else if(lang == "CHN"){ 
      if(stylesid[i][3] == _styleName){
        return [stylesid[i][0],stylesid[i][2]];
      }   
    }
  } 
  return ["null","null"];
}//end function

//search and get collection id
function getCollectionID(_brandName,_collectionName){//input string
  var arr = collectionid[_brandName];
  for (var i = 0; i < collectionid[_brandName].length; i++) {
      if(arr[i][1] == _collectionName){
        return arr[i];
      }
  }    
  return ["null","null"];
}//end function

//get all name of that collection name
function queryCollectionID(_brandName){//input string
  var arr = [];//get only brand 'name'
  for(var i=0; i<collectionid[_brandName].length;i++){//got collectionid from menuData.js
        arr[i] = collectionid[_brandName][i][1];
  } 
  return arr; 
}

function queryStylesID(lang){//input string
    var arr = []; 
    $.getJSON("JSON/styles.json", function(json) {

      
        for(var i=1; i<json.length-1;i++){
          if(lang == "ENG"){
            arr[i-1] = json[i][2];
          } else if(lang == "CHN") {
            arr[i-1] = json[i][3];
          }
        }  
    })    
  return arr; 
}

function queryMenuDataID(menu,lang){//input string
  var arr = [];
  if(lang == "ENG") {
    for(var i=0; i<menuData[menu].length;i++){//got collectionid from menuData.js
      arr[i] = menuData[menu][i][0];
    } 
  } else if(lang == "CHN") {
    for(var i=0; i<menuData[menu].length;i++){//got collectionid from menuData.js
      arr[i] = menuData[menu][i][1];
    } 
  }  
  return arr; 
}


function findGetParameter(parameterName) {//get parameter from url
  var result = {},
      tmp = [];
  location.search //got ?parameter=value&... as a string
  .substr(1)//got parameter=value&...
    .split("&")//got array of parameter=value1, parameter=value2, ...
    .forEach(function (item) {
      tmp = item.split("=");//got parameter,value
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);//got string exactly
    });
  return result;
}

// function closeWindow() {
//   logger("closing");
//   wx.closeWindow();
// }

function logger(txt, obj) {
  console.log(txt, obj); //give me every thing

  //$('#debug').prepend(txt + ": " + JSON.stringify(obj) + "<br/>");
}

// function sendMessage(msg, callback) {
//   msg = msg || defaultMsg;
//   msg.openid = findGetParameter('openid');
//   logger("sendMessage", msg);
//   $.post(config.APP_SERVER, msg, callback);
// }

// tricky this takes "true" as a string
// since gets from the URL param
// function showDebug(force) {
//   if (typeof force == "boolean") {
//     console.error("showDebug should take string", force);
//     force = "" + force;
//   }
//   var flag = force || findGetParameter('debug');
//   logger('debug:', flag);
//   console.log(typeof flag);
//   // CAREFUL!!! not a boolean
//   if (flag === 'true') {
//     logger('debug show:', flag);
//     $('#debug').show();
//   } else {
//     logger('debug hide', flag);
//     $('#debug').hide();
//   }
// }
