// Default variables initialization
const DEFAULT_KEY_FOLDER = appRoot + '/config/keys/';
const DEFAULT_BACKUP_FOLDER = appRoot + '/backups/';
const DEFAULT_MAX_BACKUP_FILES = 60;

// Array of projects
var projects = [
	{
	  projectName: '<your-project-name>',
	 	backupPath: DEFAULT_BACKUP_FOLDER,
	  keyPath: DEFAULT_KEY_FOLDER + '<firebase-auth-private-key-path>',
	  maxBackupNumber: DEFAULT_MAX_BACKUP_FILES
	}
];

//Module exportation
module.exports = {
  projectsConfig: projects
};