
var querySQL = require('./query.js')
var chalk = require('chalk')
var mysql = require('mysql');

// module.exports = {
const getRelevo = (idVisita, idRelevo) => {
    //    getRelevo: async function (idVisita, idRelevo) {
    //    const getRelevo = (idVisita, idRelevo) => {

    const connection = mysql.createConnection({
        host: 'seraticsuite.cjmcnfeqjnfn.us-east-1.rds.amazonaws.com',
        user: 'seratic',
        password: 'cl4v3d353r4t1c',
        // database: 'suite_1192_134'
        database: 'lavisa'

    });

    connection.connect(function (err) {
        if (err) { console.log('error' + err) };
        console.log(chalk.blue.inverse("Conectado a la bd Lavisa!"));
    });

    var sqlRelevo = querySQL.getSQLRelevo(idRelevo);

    return new Promise(function (resolve, reject) {

        let idRelevo = null
        let idPedido = null

        connection.query(sqlRelevo, function (error, results, fields) {

            if (error) {
                connection.end();
                console.log(chalk.blue.inverse("Cerrando cx Lavisa!"));
                resolve(false)

            };


            try {
                relevoObject = JSON.parse(JSON.stringify(results))


                if (relevoObject.length === 0) {
                    connection.end();
                    resolve(false)
                }
                else {
                    idRelevo = relevoObject[0].id
                    idPedido = relevoObject[0].idPedido
                    console.log('asignación')
                    //    console.log(idPedido)
                    //    resolve(true)


                    if (idRelevo != null && idPedido === null) {//ojo qque toca cambiar idPedido is null

                        console.log('va a editar visita id=' + idVisita)

                        var sqlGetVisita = querySQL.getVisita(idVisita)
                        var sqlUpdateVisita = querySQL.updateVisita(idVisita)

                        connection.query(sqlGetVisita, function (error, results2, fields) {

                            if (error) {
                                console.log('Error: ' + error)
                                connection.end()
                                resolve(false)
                            }
                            else {// if there is not error in the query

                                visitaObject = JSON.parse(JSON.stringify(results2))
                                fechaFinVisita = visitaObject[0].fechaFin
                                posicionFin = visitaObject[0].posicionFin

                                if(fechaFinVisita === null && posicionFin === null){

                                    connection.query(sqlUpdateVisita, (er3, results3, fields3) => {
                                        if (er3){
                                            console.log('Erro 3:'+ er3)
                                            resolve(false)
                                        }
                                        console.log(chalk.green.inverse(JSON.parse(JSON.stringify(results3))))
                                        console.log(results3.affectedRows)
                                        resolve(true)

                                    })
                                   
                                }
                                else{//if 
                                    resolve(false)
                                }

                                console.log(visitaObject)
                              
                               
                            }

                        });
                    }
                    else {
                        console.log('no tiene la trama')
                        connection.end();
                        resolve(false)
                    }



                }
            } catch (error) {
                connection.end();
                resolve(false)
            }

        });


    });

}

module.exports = {
    getRelevo
}
