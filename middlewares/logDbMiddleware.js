// Será un Middleware Particular para las rutas que Crean registros
// Lo colocamos en el router como Segundo parámetro
// Requerimo las funcionalidades del Sistema de Archivos
const fs = require('fs')



// Los MiddleWare son funciones
function logDbMiddleware(req,res, next){
fs.appendFileSync('DBlog.txt', ' - Se creó un registro al ingresar en:' + req.url )
next()
}logDbMiddleware

module.exports = logDbMiddleware