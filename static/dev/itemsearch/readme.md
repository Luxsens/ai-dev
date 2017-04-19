function summary

<!-- function name
	/what it does
		/used on/in
			/source -->

insertLoadingGif(append,path)
	/ insert GiF image to 'append' selector in jQuery and choose image from image path relative to index.html
		/app.js(showbutton()) -- when jump to luxsens.com show loading screen
			/app.js

getState(void)
	/ get param from URL(ex. ?brand=hermes&style=bstyle) and give it to var state(array) ** ?category=categories must be persent or menu won't show up
	### this function will return 
		state = {
			"onStep": category		<-- ?category=categories
			"stepValue": categories	<-- ?category=categories
			"pickattr": blue,		<-- ?pickattr=blue
      		"collectionID":12345 	<-- ?collectionID=12345
      		"brandID": 555			<-- ?brandID=555
      		"styleID": 666			<-- ?styleID=666
      		"lang":ENG               <-- ?lang=ENG
		}
		/app.js(showButton()) -- after the webpage is loaded get all parameter from URL
			/app.js

goSearchLuxsens(lang,_collectionid,_stylesid,_brandid,_pickattr)
	/when get ?endflag=go go search on luxsens with respective parameter
		/app.js(showbutton())
			/app.js

stateMenuHandle(state)
	/get state then process to get lists of respective menu
		/app.js(showbutton())
			/app.js

queryMenuData(menu)
	/get array key = manu from menuData.js(ex. key = "category") 
		/app.js(stateMenuHandle) -- handle when ?category=categories
			/helper.js

queryBrand(style)
	/get all possible brand from selected style. (go search on menuData.js(var inventory)) return arr of possible brand ex. ["hermes/爱马仕""]
		/app.js(stateMenuHandle) -- handle when ?brand=wbrand|bbrand
			/helper.js

queryCollection(style,brand);
	/get all possible collection from selected style/brand. (go search on menuData.js(var inventory)) return arr of possible collection ex. ["hermes birkin/爱马仕 birkin"]
		/app.js(stateMenuHandle) -- handle when ?collection=xxx (anything)
			/helper.js

queryAttr(style,brand,collection)
	/get all possible attr from selected style/brand/collection. (go search on menuData.js(var inventory)) return arr of possible collection ex. ["red,blue"]
		/app.js(stateMenuHandle) -- handle when ?attr=colour
			/helper.js

getStyleID(choice)
	/get id of the selected style from menuData.js return [styleid,stylename] ex. "1554"
		/app.js(clickButton())
			/helper.js

getBrandID(brand)
	/get id of the selected brand from menuData.js return [styleid,stylename] ex. ["1276","hermes"]
		/app.js(clickButton())
			/helper.js

prep(UI);
	/prepare array to use on respective css ex [bag,watch] -> [b,bag,w,watch]
		/app.js(statemenuhandle())
			/helper.js


clickButton(evt, person, state)
	/handle event when click on each items
		/app.js -- when tap on items
			/app.js

hasCollection(style,brand)
	/see if the respective brand has collection(collection != 'other') return true
		/app.js
			/helper.js







