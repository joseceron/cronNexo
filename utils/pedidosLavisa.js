var mysql = require('mysql');
var getPedidos = require('./getPedidosLavisa.js')
var mensajeTexto = require('./mensajeTexto.js')
var querySQL = require('./query.js')
var chalk = require('chalk')

var connection = mysql.createConnection({
    host: 'seraticsuite.cjmcnfeqjnfn.us-east-1.rds.amazonaws.com',
    user: 'seratic',
    password: 'cl4v3d353r4t1c',
    database: 'suite_1192_134'

});

let numeros = [
    { "movil": "942408419" },
    { "movil": "937665960" },
]

connection.connect(function (err) {
    if (err) throw err;
    console.log(chalk.blue.inverse("Conectado a la bd Lavisa!"));
});

const ajustarPedidos = (idRelevo) => {
    getPedidos.getPedidos('', (err, relevosSinDireccion, relevosSinFechaFin, relevosSinGpsFinal) => {

        if (err) { return console.log(chalk.red.inverse(err)) }


        if (relevosSinDireccion.length > 0) {
            console.log('relevos sin dirección: ' + relevosSinDireccion.length)

            numeros.forEach(numero => {

                let mensaje = []

                mensaje.push({
                    "movil": numero.movil,
                    "mensaje": JSON.stringify(relevosSinDireccion)
                })

                mensajeTexto.postMensaje(mensaje, (err, resp) => {
                    if (err) { return console.log(err) }
                    console.log(resp)
                })

            });



        }

        if (relevosSinGpsFinal.length > 0) {
            console.log('relevos sin GPS Fin: ' + relevosSinGpsFinal.length)
            relevosSinGpsFinal.forEach(relevo => {
                setGpsFinal(relevo.idVisita)
            });
        }

        if (relevosSinFechaFin.length > 0) {
            console.log('relevos sin fechaFin: ' + relevosSinFechaFin.length)
        }
        console.log(chalk.blue.inverse("Cerrando cx Lavisa!"));
        connection.end();
    })

}


const setGpsFinal = (idVisita) => {

    var sql = querySQL.updateGpsFin + idVisita

    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;

        console.log('gps actualizado: ', results.affectedRows)

    });

}


module.exports = {
    ajustarPedidos
}