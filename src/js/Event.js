//-------------BEGIN MODULE SCOPE VARIABLES-----------//
var eventList = {};    
//-------------END MODULE SCOPE VARIABLES-----------//

//-------------BEGIN PRIVATE FUNCTIONS-----------//
function sendData (fn, data) {
  setTimeout(function(){
    fn(data);
  }, 1);
}
function sendDataSync (fn, data) {
  fn(data);
}
function vistEventList(evt, arg, type, sync) {
  var event   = eventList[evt],
      _sendFn = sync ? sendDataSync : sendData,
      fnList, len, i;
  if (typeof event === 'undefined') {
    console.error('[event.js][' + type + ']: unknow evt=' + evt);
    return false;
  }
  fnList = event.fnList;
  len = fnList.length;  
  switch ( type ) {
    case 'trigger':
      for ( i = len - 1; i >= 0; i-- ) {    
        _sendFn(fnList[i], arg);
      }
      event.dataCached = arg;
    break;
    case 'off':
      for ( i = len - 1; i >= 0; i-- ) {    
        fnList.splice(i, 1);
      }    
    break;
  }
}
//-------------END PRIVATE FUNCTIONS-----------//

//-------------BEGIN PUBLIC FUNCTIONS------------//
function on (evt, fn) {
  if (typeof eventList[evt] === 'undefined') {
    eventList[evt] = {
      dataCached: null,
      fnList: [fn]
    };
  }
  else {
    eventList[evt].fnList.push(fn);
    if (eventList[evt].dataCached !== null) {
      sendData(fn, eventList[evt].dataCached);
    }
  }
}
function off (evt, fn) {
  vistEventList(evt, fn, 'off');
}
function trigger (evt, data, sync) {
  if (typeof eventList[evt] === 'undefined') {
    eventList[evt] = {
      dataCached: null,
      fnList: []
    };
  }  
  vistEventList(evt, data, 'trigger', sync);
}
//-------------END PUBLIC FUNCTIONS------------//
/*
module.exports = {
  on: on, off: off, trigger: trigger
};
*/
export default {on, off, trigger};