var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");
var Toast = require("nativescript-toast");
var toast;

function SismoGroupViewModel(items) {
    var viewModel = new ObservableArray(items);
    viewModel.addSimulacrumGroup = function (datos) {
        //console.dir(datos);
        return fetch(config.apiUrl + "simulacrumGroup/addSimulacrumGroup", {
            method: "POST",
            body: JSON.stringify({
                ubicacion: datos["ubicacion"],
                latitud: datos["latitud"],
                longitud: datos["longitud"],
                fecha: datos["fecha"],
                hora: datos["hora"],
                idVoluntarioCreador: datos["idVoluntarioCreador"],
                tiempoPreparacion: datos['tiempoPreparacion'],
                tipoSimulacro: datos['tipoSimulacro'],
                estatus: "Creada",
                token: "token"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.dir(data);
                return data;
            });
    };

    viewModel.load = function (idClient) {
        return fetch(config.apiUrl + "simulacrumGroup/searchSimulacrumDetail", {
            method: "POST",
            body: JSON.stringify({
                token: "token",
                id: idClient
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            });
        
    };

    viewModel.countVoluntary = function (idSimulacrum) {
        return fetch(config.apiUrl + "simulacrumGroup/countVoluntary", {
            method: "POST",
            body: JSON.stringify({
                token: "token",
                idSimulacro: idSimulacrum
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            });

    };


    viewModel.delete = function (idSimulacrum) {
        return fetch(config.apiUrl + "voluntarySimulacrum/deletelistVoluntary", {
            method: "POST",
            body: JSON.stringify({
                token: "token",
                idSimulacro: idSimulacrum
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            });

    };

    viewModel.empty = function() {
        while (viewModel.length) {
           viewModel.pop();
        }
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        viewToast(response.statusText);
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

function viewToast(message) {
    toast = Toast.makeText(message, "long");
    toast.show();
}

module.exports = SismoGroupViewModel;