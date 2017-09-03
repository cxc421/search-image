import Event from './Event';
import * as EventType from './EventType';
//------------ BEGIN MODEL SCOPE VARIABLES ------------//
const MAX_LOAD_NUM = 5;
const imgQuene = [];
let curLoadingNum = 0;
//------------ END MODEL SCOPE VARIABLES ------------//

//--------BEGIN PRIAVTE FUNCTION ------------//
function checkCanLoad () {
	if (curLoadingNum < MAX_LOAD_NUM && imgQuene.length > 0) {
		const toLoadImg = imgQuene.find((obj)=>{
			return !obj.loading;
		});
		if (toLoadImg) {
			Event.trigger(EventType.CAN_LOAD_IMG_CHANGE, toLoadImg.imgId);
			toLoadImg.loading = true;
			curLoadingNum++;
			console.log('Trigger imgId = ' + toLoadImg.imgId);
		}
	}
};
//--------END PRIVATE FUNCTION ------------//

//--------BEGIN PUBLIC FUNCTION ------------//
const genNewImgId = (()=>{
	let newId = 0;
	return () => {
		return (newId++);
	};
})();
function subscribe (newImgId) {
	imgQuene.push({
		imgId: newImgId,
		loading: false
	});
	checkCanLoad();
}
function finish (imgId) {
	const idx = imgQuene.findIndex((obj)=>{
		return imgId === obj.imgId;
	});
	if (idx >= 0) {		
		imgQuene.splice(idx, 1);
		curLoadingNum--;
		checkCanLoad();
		console.log('Finish imgId = ' + imgId);
	}
	else {
		console.error('[ImgLazyLoadCenter]: finish error!');
		console.error(`imgId=${imgId}`);
		console.error(`imgQuene=${JSON.stringify(imgQuene)}`);
	}
}
//--------END PUBLIC FUNCTION ------------//

export default {genNewImgId, subscribe, finish};