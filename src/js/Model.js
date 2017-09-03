import $ from 'jquery';
import Event from './Event';
import * as EventType from './EventType';
import defaultImages from './defaultImages';
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
	return defaultImages;
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
