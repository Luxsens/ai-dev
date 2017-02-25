"use strict";
//#### menuData.js must be present!!!!! 

//search if brand has collection in menuData
function hasCollection(_style,_brand){//input string
  if(Object.keys(inventory[_style][_brand]).length == 1)return false;
  else return true;
}//end function  

//search if brand has collection in menuData
function hasCollection2(abrand){//input single string
  var len = abrand.length;
    for(var i=0;i<collectionid.length;i++){
      if(collectionid[i][2].length<len){
        //continue
      } else {//checkname
        if(abrand.toLowerCase() == collectionid[i][2].substring(0,len)
          && abrand.length == collectionid[i][2].length){
          return true
        }
      }
    }
    return false
}//end function  

function getBrandID(_brandName){//input string
  for(var i=0; i<brandid.length;i++){//got collectionid from menuData.js
      if(brandid[i][2].toLowerCase() == _brandName){
        return [brandid[i][0],brandid[i][2]];
      }  
  } 
  return ["",""];
}//end function

function getStyleID(_styleName){//input string
  //get var stylesid from menuData.js
  for(var i=0; i<stylesid.length;i++){//got collectionid from menuData.js
      if(stylesid[i][2].toLowerCase() == _styleName){
        return stylesid[i][0];
      } 
  } 
  //if cannot find the style
  return ["",""];
}//end function

//search and get collection id
function getCollectionID(_collectionName){//input string

  for(var i=0; i<collectionid.length;i++){//got collectionid from menuData.js
      if(collectionid[i][2].toLowerCase() == _collectionName){
        return collectionid[i][0];
      } 
  }    
  return ["",""];
}//end function

//get all name of that collection name
function queryCollectionID(_brandName){//input string
  var arr = [];//get only brand 'name'
  for(var i=0; i<collectionid[_brandName].length;i++){//got collectionid from menuData.js
        arr[i] = collectionid[_brandName][i][1];
  } 
  return arr; 
}

function querystylesID(lang){//input string
  var arr = [];//get only brand 'name'
  for(var i=0; i<stylesid.length;i++){//got collectionid from menuData.js
    if(lang == "ENG"){
        arr[i] = stylesid[i][2];
    } else if(lang == "CHN") {
        arr[i] = stylesid[i][3];
    }
  }  
  return arr; 
}

function queryBrand(style){
  var arr = [];
  var query = Object.keys(inventory[style]);
  //get var brandid drom menuData.js
  for(var i=0;i<brandid.length;i++){
    for(var j=0;j<query.length;j++){
      if(query[j] == brandid[i][2]) {
        arr.push(query[j]+'/ '+brandid[i][3])
      }
    }
  }
  return arr; 
}

function queryCollection(style,brand){
  var arr = [];
  var query = Object.keys(inventory[style][brand]);
  //get var brandid drom menuData.js
  for(var i=0;i<collectionid.length;i++){
    for(var j=0;j<query.length;j++){
      if(query[j] == collectionid[i][2]) {
        arr.push(query[j]+'/ '+collectionid[i][3])
      }
    }
  }
  return arr; 
}

function queryCollection2(brand){
  var arr = []; var index = ""; var len = brand.length
  for(var i=0;i<collectionid.length;i++){
    if(brand.toLowerCase() == collectionid[i][2].substring(0,len)) {
        arr.push(collectionid[i][2]+'/ '+collectionid[i][3]);
      }
  }
  return arr
}


function queryAttr(style,brand,collection){
  var arr = [];
  var query = inventory[style][brand][collection];
  //get var brandid drom menuData.js
  arr = query.split(',');
  return arr; 
}


function queryMenuData(menu){
  var arr = [];//get only brand 'name'
    for(var i=0; i<menuData[menu].length;i++){//got collectionid from menuData.js
      arr[i] = menuData[menu][i][0];
    } 
  return arr; 
}

function queryAllBrand(){
  var arr = [];//get only brand 'name'
    for(var i=0;i<brandid.length;i++){
        arr[i] = brandid[i][2]+"/ "+brandid[i][3];
    }
  return arr   
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



function logger(txt, obj) {
  console.log(txt, obj); //give me every thing
}


function prep(arr){//input : array of string
  //This prep will add index
  //[bag,watch] -> [b,bag,w,watch]
  var array = arr.sort();
  var index =""; var result = [];
    for(var i=0;i<array.length;i++){
      if(index !== array[i].substring(0,1)){
        index = array[i].substring(0,1);
        result.push(index);
      }
      result.push(array[i]);
      }
  return result;    
}


    


