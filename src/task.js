// Acquaring config file and dependencies:
var config = null;
var firebase = require("firebase");

try {
	config = require('./config/databases.js');
} catch (e) {
	console.log(e);
	console.log("Databases config file missing. Back up process aborted!");
	process.exit(1);
}

firebase.initializeApp(config.projectsConfig[0].firebaseConfig);









// console.log(database);
// console.log(config.projectsConfig[0].firebaseConfig);
// process.exit(0);