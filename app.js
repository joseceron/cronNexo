var cleanSercorisac = require('./utils/cleanSercorisac.js')
var pedidoLavisa = require('./utils/pedidosLavisa.js')
var Scheduled = require("scheduled");

var chalk = require('chalk')


var myJob = new Scheduled({
    id: "minuteTaskEven",
    pattern: "*/1 14-23 * * 1-5", // Tarea a ejecutar cada dos minutos
    task: function(){
        console.log("Job Lavisa distribuidora");
        pedidoLavisa.ajustarPedidos()
    }
}).start();

 
// var jobSercorisac = new Scheduled({
//     id: "minuteTaskEven",
//     pattern: "*/60 14-23 * * MON-FRY", // Tarea a ejecutar cada dos minutos
//     task: function(){
//         console.log("Job Sercorisacn en integrado");
//         cleanSercorisac.iniciar()
//     }
// }).start();


