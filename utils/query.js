var easydate = require('easydate')

// var currentDateStart = easydate('Y-M-d') + ' 00:00:00'
var currentDateStart = '2017-01-01 00:00:00'
var currentDateFinish = easydate('Y-M-d') + ' 23:59:59'

//query para obtener relevos sin detalle pedido
var sql = 
'SELECT  r.id FROM `relevo` r '
+ 'JOIN `visita` v ON v.id = r.idVisita ' 
+ 'WHERE v.sucursal = 4 AND ' 
+ 'r.fechaHora BETWEEN "' + currentDateStart + '" AND "' + currentDateFinish +
'" AND r.id NOT IN '
+ '( SELECT DISTINCT (dp2.idRelevo) FROM `detallepedido` dp2 '
+ 'JOIN `relevo` r2 ON r2.id = dp2.idRelevo '
+ 'JOIN `visita` v2 ON v2.id = r2.idVisita '
+ 'WHERE v2.sucursal=4 AND '
+ 'r2.fechaHora BETWEEN "' + currentDateStart + '" AND "' + currentDateFinish +
'")'

var borrarDatosRelevos = 'DELETE FROM `datosrelevo`  WHERE idRelevo in ('
var borrarRelevos = 'DELETE FROM `relevo`  WHERE id in ('
var updateGpsFin = 'UPDATE `visita` SET posicionFin = posicionInicio WHERE id ='



const getIdRelevos = () =>{
    return sql
}

const deleteDatosRelevo = (ids, callback) => {
    if (ids === 0) {callback('El id deb ser diferente de 0',false,false)}

    else if (ids === null) {callback('El id no puede ser null',false,false)}

    else{
        callback(
            '', 
            borrarDatosRelevos + ids + ')' , 
            borrarRelevos      + ids + ')' )
    }

}

const getSQLRelevo = (idRelevo) => {

var sqlRelevo = 
'SELECT  r.id, r.codActividad, r.idPedido FROM `relevo` r '
+ ' WHERE r.id =' + idRelevo;

return sqlRelevo;
}



const updateVisita = (idVisita) => {
   
    var sql = 'UPDATE `visita` v SET v.fechaFin = ADDTIME(v.fechaInicio, \'00:10:00.00\'), v.posicionFin=v.posicionInicio '
    
    + 'WHERE v.id = '+ idVisita 
    return sql
}

const getVisita = (idVisita) => {
    var sql = 'SELECT v.fechaFin, v.posicionInicio, v.posicionFin FROM `visita` v '
    + ' WHERE v.id=' + idVisita

    return sql
}


module.exports = {
    getIdRelevos,
    deleteDatosRelevo,
    sql,
    updateGpsFin,
    borrarDatosRelevos,
    borrarRelevos,   
    getSQLRelevo,
    updateVisita,
    getVisita
   
}
