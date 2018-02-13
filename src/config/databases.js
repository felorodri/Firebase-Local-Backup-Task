//An array of project configurations
const projects = [{
  projectName: '<your-project-name>',
  drivePath: '<your-gdrive-path-for-cloud-auto-backup>',
  firebaseConfig: {
  	apiKey: '<your-key>',
  	authDomain: '<your-project-authdomain>',
  	databaseURL: '<your-database-URL>',
  	projectId: '<your-project-id>',
  	storageBucket: '<your-storage-bucket>',
	  messagingSenderId: '<your-messaging-sender-id>'
  }
}];

//Module exportation
module.exports = {
  projectsConfig: projects
};