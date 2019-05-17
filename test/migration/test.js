 
require('dotenv').config({path: '../../.env'})

const asyncPool = require('tiny-async-pool')


var started = new Date();
console.timestamp = function () {
  var now = new Date();
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift(now - started, 'ms');
  console.log(args.join(' '));
}

function delay(ms) {
	console.timestamp('start delay', ms);
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			console.timestamp('finished delay', ms);
			resolve(ms);
		}, ms);
	});	
}


var ids = [1000,3000,2500,1500,500,2000]
asyncPool(2, ids, delay).then(() => console.log("FINISHED"))

