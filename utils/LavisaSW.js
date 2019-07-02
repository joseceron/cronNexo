const request = require('request');
var easydate = require('easydate')

var dayStart = easydate('d') - 7
var currentDateStart = easydate('Y/M/') + dayStart + ' 00:00:00'
var currentDateFinish = easydate('Y/M/d') + ' 23:59:59'

// var currentDateStart = '2019/04/14 00:00:00'
// var currentDateFinish = '2019/04/15 23:59:59'


const getPedidos = (idRelevo, callback) => {
   
  

    const url = 'http://34.224.125.60:8028/GestorVisitas/restApi/reportePedidoDetallado.action?codCuenta=1&codCampana=1&fechaInicio='
        + currentDateStart + '&fechaFin=' + currentDateFinish + '&idUsuarioInvoca=1000&codActividad=3&filtroSend=0&codsEstado=1,2,3,4,5,6,7'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Error obteniendo pedidos',  undefined, undefined, undefined)
        }

       
        if (body === undefined) {
            callback('Lavisa: 0 pedidos obtenidos!',  undefined, undefined, undefined)
        }

        else {            
            var pedidos = JSON.parse(JSON.stringify(body))
            // console.log('Body: ' + JSON.stringify(body))

            dataUtilPedidos = []
            relevosSinDireccion = []
            relevosSinFechaFin = []
            relevosSinGpsFinal = []

            pedidos.forEach(pedido => {

                if (pedido.DIRECCIONENTREGA === '') {
                    // console.log('Dirección entrega vacio')
                    relevosSinDireccion.push({
                        "idRelevo": pedido.idRelevo
                    })
                }

                if (pedido.gpsFinal === '') {
                    // console.log('Gps Final vacio')
                    relevosSinGpsFinal.push({
                        "idRelevo": pedido.idRelevo,
                        "idVisita": pedido.idVisita
                        // "fechaInicio": pedido.fechaInicioVisita,
                        // "fechaFin": pedido.fechaHoraFin,
                        // "gpsInicial": pedido.gpsInicial,
                        // "gpsFinal": pedido.gpsFinal

                    })
                }

                if (pedido.fechaHoraFin === null) {
                //   console.log('Fecha Fin vacio')
                    relevosSinFechaFin.push({
                        "idRelevo": pedido.idRelevo,
                        // "fechaInicio": pedido.fechaInicioVisita,
                        // "fechaFin": pedido.fechaHoraFin,
                        // "gpsInicial": pedido.gpsInicial,
                        // "gpsFinal": pedido.gpsFinal

                    })
                }
            });

            // console.log('callback')
            // callback('', JSON.stringify(dataUtilPedidos))
            callback('', relevosSinDireccion, relevosSinFechaFin, relevosSinGpsFinal)
        }

    })
}


module.exports = {

    getPedidos

}
