// Variables initialization and dependencies
var config = null;
var firebaseApps = [];
global.processedProjects = 0;
const admin = require("firebase-admin");
const fs = require('fs');
const util = require('util');

// Acquaring config file:
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
}else{
	firebaseApps.forEach(function(item, index){
		if (config.projectsConfig[index].maxBackupNumber > 0) {
			dataFetcher(config.projectsConfig[index], item, index)
		} else {
			var logMessage = '\nNo backup placed for project ' + config.projectsConfig[index].projectName + '. Check the max buckup number in your project settings!';
			console.log(logMessage);
			processedProjects++;
			logger(logMessage);
		}
	});
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
		var logMessage = e.toString() + '\nProject ' + item.projectName + ' couldnt be added to the queue.';
		logger(logMessage);
		console.log('Project ' + item.projectName + ' couldnt be added to the queue. Check the log for more info!');
	}
}

function dataFetcher (projectConfig, item, index) {
	var db = admin.database(item[1]);
	var ref = db.ref();
	ref.once('value')
    .then(function (snapshot) {
    	try {
    		const dbData = snapshot.val();
    		var folderName = projectConfig.backupPath + projectConfig.projectName;
	      if (!fs.existsSync(folderName)){
	          fs.mkdirSync(folderName);
	      }
	      var existingFiles = fs.readdirSync(folderName);
				if (existingFiles.length >= projectConfig.maxBackupNumber) {
					var numberToRemove = Math.abs(existingFiles.length - projectConfig.maxBackupNumber) + 1;
					var backupsToRemove = [];
					var backupsData = [];
					var timestampsArray = [];
		      for (var i = 0; i < existingFiles.length; i++) {
			      var backupStats = fs.statSync(folderName + '/' + existingFiles[i]);
						var mtime = new Date(util.inspect(backupStats.mtime));
						backupsData.push({
							fileName: existingFiles[i],
							timestamp: mtime.getTime() 
						});
						timestampsArray.push(mtime.getTime());
		      }
		      timestampsArray.sort(function(a, b){return b-a});
		      for (var k = 0; k < numberToRemove; k++) {
		      	for (var j = 0; j < backupsData.length; j++) {
		      		if (backupsData[j].timestamp == timestampsArray[k]) {
		      			backupsToRemove.push(backupsData[j].fileName);
		      			break;
		      		}
		      	}
		      }
		      for (var l = 0; l < backupsToRemove.length; l++) {
		      	fs.unlinkSync(projectConfig.backupPath + projectConfig.projectName + '/' + backupsToRemove[l]);
		      }
				}	      
	      // var fileName = projectConfig.projectName + '_' + new Date().getTime().toString() + '.json'; // Using timestamp
	      var fileName = projectConfig.projectName + '_' + ((new Date().toString()).replace(/ /gi, '_').replace(/:/gi, '-')) + '.json'; // Using date string
				fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(dbData, null, 4));
				console.log('New backup saved for project ' + projectConfig.projectName + '!');
				processedProjects++;
				processedProjectsChecker('');
    	} catch (e) {
    		var logMessage = e.toString() + '\nProject ' + projectConfig.projectName + ' backup couldnt be written on disk.';
    		processedProjects++;
    		logger(logMessage);
    		console.log('Project ' + projectConfig.projectName + ' db backup couldnt be written on disk. Check the log for more info!');
    	}
    })
    .catch(function (err){
    	var logMessage = err.toString() + '\nProject ' + projectConfig.projectName + ' data couldnt be fetched.';
    	processedProjects++;
    	logger(logMessage);
    	console.log( 'Project ' + projectConfig.projectName + ' data couldnt be fetched.Check the log for more info!');
    });
}

function logger (message) {
	fs.appendFile('./logs/log.txt', ('\n' + new Date()).toString() + ': ' + message, (err) => {  
	  if (err) processedProjectsChecker('Error in log function: ' + err);
	  processedProjectsChecker('');
	});
}

function processedProjectsChecker (errorMessage) {
	if (processedProjects != 0 && processedProjects == firebaseApps.length) {
		if (errorMessage.length != 0) console.log(errorMessage);
			console.log('Job done!');
			process.exit(0);
	} 
}