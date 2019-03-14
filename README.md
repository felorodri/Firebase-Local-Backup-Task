# Firebase Local Backup NodeJS Task
A nodeJS firebase automatic backup task for multiple Univalle projects

Para ejecutar:
git clone
npm install
ir a la consola de firebase, en el proyecto ir a Settings > Configuración del proyecto > Cuentas de servicio
Hacer click en generar nueva clave privada
Mover el archivo descargado a la capeta config/keys
En config/databases.js modificar el el array de projects o agregar un nuevo objeto y modificar el nombre del proyecto y el key path o name
ejecutar node task.js