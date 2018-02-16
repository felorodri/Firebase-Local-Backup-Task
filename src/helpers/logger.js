// Variables initialization and dependencies
const fs = require('fs');
const checker = require('./checker.js');

/**
	* Created by: Julian Rodriguez
  * Description: Write a given message in a error log adding the timestamp
  *
  * @param  String message
  * @return void
*/

function logger (message) {
	fs.appendFile(appRoot + '/logs/log.txt', ('\n' + new Date()).toString() + ': ' + message, (err) => {  
	  if (err) {
	  	// checker.processedProjects('Error in log function: ' + err)
	  	console.log('Error in log function: ' + err + '\nTask exiting with error state...');
	  	process.exit(1);
	  } else {
	  	checker.processedProjects('');
	  }
	});
}

//Module exportation
module.exports = {
  errorLogger: logger
};