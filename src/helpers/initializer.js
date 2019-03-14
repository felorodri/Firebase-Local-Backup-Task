// Variables initialization and dependencies
// var firebaseApps = [];
const admin = require("firebase-admin");
const logger = require('./logger.js');

/**
	* Created by: Julian Rodriguez
  * Description: Innitialize a Firebase app with a given project configuration settings.
  *
  * @param  JSON item
  * @return void
*/

function appInitializer (item) {
	try{
		var serviceAccount = require(item.keyPath);
		firebaseApps.push([item.projectName,
			admin.initializeApp({
			  credential: admin.credential.cert(serviceAccount),
			  databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com'
			})]
		)
		console.log('Project ' + item.projectName + ' added to backup queue');
	} catch (e) {
		var logMessage = e.toString() + '\nProject ' + item.projectName + ' couldnt be added to the queue.';
		logger.errorLogger(logMessage);
		console.log('Project ' + item.projectName + ' couldnt be added to the queue. Check the log for more info!');
	}
}

//Module exportation
module.exports = {
  firebaseAppInit: appInitializer
};