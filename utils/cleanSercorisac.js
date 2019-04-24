var mysql = require('mysql');
var querySQL = require('./query.js')
var chalk = require('chalk')





// let query= 'SELECT id FROM `visita` v WHERE `fechaInicio` > "2019-04-16" AND sucursal = 4'
// connection.query(query, function (error, results, fields) {
const iniciar = () => {
    var connection = mysql.createConnection({
        host: 'seraticsuite.cjmcnfeqjnfn.us-east-1.rds.amazonaws.com',
        user: 'seratic',
        password: 'cl4v3d353r4t1c',
        database: 'suite_1142_104'
    
    });
    
    connection.connect(function (err) {
        if (err) throw err;
        console.log(chalk.blue.inverse("Conectado a la bd integrador!"));
    });

    //Obtener relevos sin detalle pedido
    connection.query(querySQL.getIdRelevos(), function (error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {

            var idsJSON = JSON.parse(JSON.stringify(results))
            var idsArray = []
            console.log('Ids a borrar: ', results.length)

            idsJSON.forEach(row => {
                idsArray.push(row.id)
            });

            querySQL.deleteDatosRelevo(idsArray, (err, sqlBorrarDatosRelevo, sqlBorrarRelevos) => {

                if (err) { return console.log(chalk.red.inverse(err)) }

                borrarDatosRelevo(sqlBorrarDatosRelevo, sqlBorrarRelevos)
            })

        }
        else {
            console.log(chalk.yellow.inverse('No hay relevos sin detalle pedido para borrar'))
            console.log(chalk.blue.inverse("Cerrando cx integrador"));
            connection.end();
        }

    });
}

const borrarDatosRelevo = (sqlBorrarDatosRelevos, sqlBorrarRelevos) => {
    console.log('Inicio borrar datos relevo')

    connection.query(sqlBorrarDatosRelevos, function (error, results, fields) {
        if (error) throw error
        var respJSON = JSON.stringify(results)
        console.log(chalk.green.inverse('Resultado de borrar datos relevos: ', respJSON))
        borrarRelevos(sqlBorrarRelevos)
    });

}

const borrarRelevos = (sqlBorrarRelevos) => {
    console.log('Inicio borrar relevos')

    connection.query(sqlBorrarRelevos, function (error, results, fields) {
        if (error) throw error
        var respJSON = JSON.stringify(results)
        console.log(chalk.green.inverse('Resultado de borrar Relevos: ', respJSON))

    });
    console.log(chalk.blue.inverse("Cerrando cx integrador"));
    connection.end();
}



module.exports = {
    iniciar
}


