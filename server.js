const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

const staticPath = path.join(__dirname, '/public');
const cachePath = path.join(__dirname, '/cache_img');

const CSE_ID = '016012605685320780615:pie5uyhrtlw';
const API_KEY = 'AIzaSyDz9PoIWN6sw1-a1n4HvJld3UPco1GV7L0';	
const GoogleImages = require('google-images');
const client = new GoogleImages(CSE_ID, API_KEY);
const CACHE_EXPIRE_TIME = 1000 * 60 * 60 * 24;

const searchCache = {};

function googleSearch (searchName, page, callback) {
	const cacheName = searchName + '-' + page;
	if (searchCache.hasOwnProperty(cacheName)) {
		console.log('By Cache');
		callback(searchCache[cacheName].images);
	}
	else {
		console.log('By Google');
		client
			.search(searchName, {
				page: page,		
				safe: 'off'
			})
			.then(images => {			
				if (Array.isArray(images)) {
					callback(images);
				}
				else {
					callback([]);
				}			
				searchCache[cacheName] = {
					images: images,
					time  : Date.now()
				};
				saveImageToFile(cacheName, images);
			});
	}
}

function saveImageToFile(cacheName, images) {
	const content = JSON.stringify(images);
	const fileName =  path.join( cachePath,  cacheName + '.cache' );
	fs.writeFile(fileName, content, 'utf8', function (err) {
	    if (err) {
	        return console.log(err);
	    }
	    console.log(`The file ${fileName} was saved!`);
	}); 	
}

function checkCacheOutdated () {
	var curTime = Date.now();
	for (let prop in searchCache) {
		if (curTime - searchCache[prop].time >= CACHE_EXPIRE_TIME) {
			console.log('Delete: ' + prop);
			delete searchCache[prop];
		}
	}
}

app.use(cors());
app.use(express.static(staticPath));
app.get('/img_search', function(req, res) {
	const {name, page} = req.query;
	googleSearch(name, page, (images)=>{
		res.json(images);
	});
});
app.get('*', function(req, res){
  res.status(404).send('Unkown request');
});
app.listen(4000, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('listening port = ' + 4000 );
	}  
});

setInterval(checkCacheOutdated, CACHE_EXPIRE_TIME);

