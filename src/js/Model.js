import $ from 'jquery';
import Event from './Event';
import * as EventType from './EventType';
//-------------- BEGIN MODULE SCOPE VARIABLES ------------//
const gData = {
	isSearching      : false,
	imageList        : getDemoList(),
	searchName       : '',
	page             : 1,
	curSelectImgIndex: 0,
	showSlide        : false,
};
//-------------- END MODULE SCOPE VARIABLES ------------//

//-------------- BEGIN PRIVATE METHOD ----------------//
function getDemoList () {
	return [{"type":"image/gif","width":439,"height":439,"size":1574203,"url":"https://media.giphy.com/media/3o8doNAGKZXsrsgzW8/giphy.gif","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkxmaDhINvTOtfYyFtSv3WDF146rsbxY73yoAGTHAfhcVN5_yQHeILeLw","width":127,"height":127},"description":"Cute-Bird GIFs - Find & Share on GIPHY","parentPage":"https://giphy.com/search/cute-bird"},{"type":"image/gif","width":200,"height":200,"size":28059,"url":"https://media1.giphy.com/media/100QWMdxQJzQC4/200_s.gif","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN_XpgffnLKf12lH3nT5JEghLMC9YS85ikUMr7WnQ4MHfGbpa72Ba5fFM","width":104,"height":104},"description":"Cute GIFs - Find & Share on GIPHY","parentPage":"https://giphy.com/search/cute"},{"type":"image/gif","width":200,"height":200,"size":7478,"url":"https://media0.giphy.com/media/3oEjHICDl30tEYF5Oo/200_s.gif","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX6Zh1N3GYN9i6BeawoIDjVniPPU-0S3TW_dQvetSB9GlVrjuz6SEXLas","width":104,"height":104},"description":"Cute GIFs - Find & Share on GIPHY","parentPage":"https://giphy.com/search/cute"},{"type":"image/jpeg","width":3840,"height":2160,"size":288886,"url":"http://shoise.com/wp-content/uploads/2017/02/plain-cute-pictures-pertaining-to-unique.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5aNbpzyJQ_kqiGkbDYDbUUwhitKnq_pLIiwRY1Dq9VjG9XEdj_qzALnhK","width":150,"height":84},"description":"Cute Pictures | Shoise.com","parentPage":"http://shoise.com/cute-pictures/"},{"type":"image/jpeg","width":1920,"height":1200,"size":197379,"url":"https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Cute-Puppy-Wallpaper-PIC-WPD0012481.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qNrZriT_EtEoE0ID0oNPNTEN4Cb8j_73jgnJ5A52htFJuqvu2jW9eeW0","width":150,"height":94},"description":"Best Cute Images Free Download - wallpaper.wiki","parentPage":"https://wallpaper.wiki/best-cute-images-free-download.html"},{"type":"image/gif","width":450,"height":450,"size":6059060,"url":"https://media.giphy.com/media/100QWMdxQJzQC4/giphy.gif","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7B0ygv9elx_tMG47-lUtp5MD9_kN9g5nCIJLLnCFnuupSuyA5kTblaw","width":127,"height":127},"description":"Cute GIFs - Find & Share on GIPHY","parentPage":"https://giphy.com/search/cute"},{"type":"image/jpeg","width":640,"height":1136,"size":24709,"url":"http://shoise.com/wp-content/uploads/2017/02/delightful-cute-pictures-inside-unique.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7H0gmmNYBo6pPk-yaiNjtS3yWgjHoF8YD9gl5O95rNF4TQgl66wzdzpk","width":85,"height":150},"description":"Cute Pictures | Shoise.com","parentPage":"http://shoise.com/cute-pictures/"},{"type":"image/jpeg","width":720,"height":720,"size":29719,"url":"http://i.imgur.com/FpYJAGQ.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUysd17WJUAsV1NjebUqLo8mGz4XCLU4kiYpbFP0XClkQ4OEWEcya4fV5y","width":140,"height":140},"description":"Cute and Offensive - Album on Imgur","parentPage":"http://imgur.com/gallery/5Pc4T"},{"type":"image/jpeg","width":550,"height":700,"size":67696,"url":"http://shoise.com/wp-content/uploads/2017/02/creative-cute-pictures-on-unique.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92S1ciUP1xXCU4SDP5eoQ0Ez81TyKr5draqscEA6-8iJXvk5Ei6dq-U-j","width":110,"height":140},"description":"Cute Pictures | Shoise.com","parentPage":"http://shoise.com/cute-pictures/"},{"type":"image/jpeg","width":1024,"height":768,"size":223257,"url":"https://www.pixelstalk.net/wp-content/uploads/2015/12/cute-wallpapers-for-girl-girly-background.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Cyb5O3TkYc06LdxVodP1876yEu0vk6UtJ0m7PZr9SG4Wh1fdksyqAHs","width":150,"height":113},"description":"Cute Girly Wallpapers HD free download | PixelsTalk.Net","parentPage":"https://www.pixelstalk.net/cute-girly-wallpapers-hd-free-download/"}];
}
function updateSearchStatus(type) {
	switch (type) {
		case 'RUN_SEARCH':
		break;
		case 'STOP_SEARCH':
		break;
	}
}
function updateImageList(newList) {
	gData.imageList = newList.slice();
	Event.trigger(EventType.IMGLIST_CHANGE, newList);
}
function setSlideStatus (newStatus) {
	gData.showSlide = newStatus;
	Event.trigger(EventType.SLIDE_STATUS_CHANGE, newStatus, true);	
}
function setSelectIdx (newIdx) {
	gData.curSelectImgIndex = newIdx;
	Event.trigger(EventType.SELECT_INDEX_CHANGE, newIdx, true);		
}
function resetPage() {
	gData.page = 1;	
}
function setSearchName(searchName) {
	gData.searchName = searchName; 
}
function makeRequest() {
  const url = `http://127.0.0.1:4000/img_search?name=${gData.searchName}&page=${gData.page}`;
  $.ajax({
    url: url,
    type: 'GET',
    success: (json) => {
      console.log('success');
      const newImgList = gData.imageList.slice();
      newImgList.push(...json);
			updateImageList(newImgList);
			if (gData.page < 50 && json.length >= 10) {				
				gData.page += 10;
				makeRequest();
			}
    },
    error: function () {
      console.error('Failed');
    }
  });	
}
function resetRequestStatus() {
	
}
//------------- END PRIVATE METHOD ----------------//


//-------------- BEGIN PUBLIC METHOD ----------------//
function startNewSearch (searchName) {
	if (!searchName || searchName === '') {
		console.error('[Model][startNewSearch]: Empty searchName');
		return false;
	}
	updateImageList([]);
	resetPage();
	setSearchName(searchName);
	//resetRequestStatus();
	setSelectIdx(0);
	makeRequest();
}
function makeNextSearch () {
	//if (canMakeNextRequest()) {
		//updatePage();
		//makeRequest();
	//}
}
function getData() {
	return gData;
}
function toggleSlideDisplay({show}) {
	if (show === undefined) {
		console.error('[Model][toggleSlideDisplay]: wrong parameter');
		return false;
	}
	setSlideStatus(!!show);
}
function updateSelectIndex (idx) {
	if (idx < 0 || idx >= gData.imageList.length ) {
		console.log('[Model][updateSelectIndex]: wrong index = ' + idx);
		return false;
	}
	setSelectIdx(+idx);
}
//-------------- END PUBLIC METHOD ----------------//

//---------------BEGIN INITIALIZATION-------------//
(()=>{

})();
//---------------END INITIALIZATION-------------//

export default {startNewSearch, makeNextSearch, getData, toggleSlideDisplay, updateSelectIndex};
