// Variables initialization
var config = null;
var admin = null;
var firebaseApps = [];

// Acquaring config file and dependencies:
admin = require("firebase-admin");
try {
	config = require('./config/databases.js');
} catch (e) {
	console.log(e);
	console.log("Databases config file missing. Back up process aborted!");
	process.exit(1);
}

// Firebase apps initialization
for (var i = 0; i < config.projectsConfig.length; i++) {
	firebaseAppInit(config.projectsConfig[i]);
}

// Get database copy:
if (!firebaseApps.length > 0) {
	console.log("No databases foud to backup. Back up process aborted!");
	process.exit(1);
}else{
	firebaseApps.forEach(dataFetcher);
}

function firebaseAppInit (item) {
	try{
		var serviceAccount = require(item.keyPath);
		firebaseApps.push([item.projectName,
			admin.initializeApp({
			  credential: admin.credential.cert(serviceAccount),
			  databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com'
			})]
		)
	} catch (e) {
		console.log(e);
		console.log('Project ' + item.projectName + ' couldnt be added to the queue');
	}
}

function dataFetcher (firebaseApp) {
	var db = admin.database(firebaseApp[1]);
	var ref = db.ref();
	ref.once("value", function(snapshot) {
	  console.log(snapshot.val());
		process.exit(0);
	});
}