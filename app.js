var cleanSercorisac = require('./utils/cleanSercorisac.js')
var pedidoLavisa = require('./utils/pedidosLavisa.js')
var Scheduled = require("scheduled");

var chalk = require('chalk')

let cronLavisa = "*/10 8-19 * * MON-FRI"
let cronSercorisac = "*/60 8-19 * * MON-FRI"

 
var myJob = new Scheduled({
    id: "minuteTaskEven",
    pattern: "*/10 9-16 * * 1-5", // Tarea a ejecutar cada dos minutos
    task: function(){
        console.log("Job Lavisa distribuidora");
        pedidoLavisa.ajustarPedidos()
    }
}).start();

 
var jobSercorisac = new Scheduled({
    id: "minuteTaskEven",
    pattern: "*/60 8-19 * * MON-FRI", // Tarea a ejecutar cada dos minutos
    task: function(){
        console.log("Job Sercorisacn en integrado");
        cleanSercorisac.iniciar()
    }
}).start();


