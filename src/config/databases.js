//An array of project configurations
const DEFAULT_KEY_FOLDER = './config/keys/';
const DEFAULT_BACKUP_FOLDER = './backups/';
const DEFAULT_MAX_BACKUP_FILES = 60;
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