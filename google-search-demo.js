const GoogleImages = require('google-images');
const CSE_ID = '016012605685320780615:pie5uyhrtlw';
const API_KEY = 'AIzaSyDz9PoIWN6sw1-a1n4HvJld3UPco1GV7L0';
const client = new GoogleImages(CSE_ID, API_KEY);
const fs = require('fs');
const searchName = 'cute';
client.search(searchName, {
		page: 1,		
		safe: 'off'
	})
	.then(images => {
		/*
		[{
			"url": "http://steveangello.com/boss.jpg",
			"type": "image/jpeg",
			"width": 1024,
			"height": 768,
			"size": 102451,
			"thumbnail": {
				"url": "http://steveangello.com/thumbnail.jpg",
				"width": 512,
				"height": 512
			}
		}]
		 */

		//console.log(images.length);
		//console.log(images);
		let sName = searchName.split(' ').join('_');
		const fileName = `./${sName}.cache`;
		const content = JSON.stringify(images);
		fs.writeFile(fileName, content, 'utf8', function (err) {
		    if (err) {
		        return console.log(err);
		    }
		    console.log(`The file ${fileName} was saved!`);
		}); 		 
	});

// paginate results
//client.search('Steve Angello', {page: 2});

// search for certain size
//client.search('Steve Angello', {size: 'large'});