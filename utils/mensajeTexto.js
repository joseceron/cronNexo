
const request = require('request');
// node_xj = require("xls-to-json")
// const xlsx = require('tfk-json-to-xlsx')

const postMensaje = (data, callback) => {

var movil = '"'+ data[0].movil + '"'
var msn = 'Relevos sin dirección Lavisa' + data[0].mensaje


    request.post('/gettrackstest/', (req, res, next) => {

        return request({
            method: 'POST',
            url: 'http://contactos1.latinapps.co:8074/apploadermovil/licenses/enviarMensaje',
            body: {
                "movil": data[0].movil,                
                "mensaje":  msn
            },
            json: true,
        }, (error, resp, body) => {
            if (!error) {
                callback('', 'Mensaje de texto enviado')
            } else {
                console.log('Error mensaje' + error)
                // res.send(null)
                callback('error', '')
            }
        })
    })
}

module.exports = {
    postMensaje
}