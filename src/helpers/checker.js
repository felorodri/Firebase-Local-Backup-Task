/**
	* Created by: Julian Rodriguez
  * Description: Checks how many projects have been already processed to finish the task execution.
  *
  * @param  String errorMessage
  * @return void
*/

function processedProjectsChecker (errorMessage) {
	if (processedProjects != 0 && processedProjects == firebaseApps.length) {
		if (errorMessage.length != 0) console.log(errorMessage);
			console.log('Job done!');
			process.exit(0);
	} 
}

//Module exportation
module.exports = {
  processedProjects: processedProjectsChecker
};