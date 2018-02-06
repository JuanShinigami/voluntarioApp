var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");

function SimulacrumVoluntaryViewModel(items) {
    var viewModel = new ObservableArray(items);
    viewModel.addVoluntarySimulacrum = function (datos) {
        console.log("Entre a la peticion");
        return fetch(config.apiUrl + "voluntarySimulacrum/addVoluntarySimulacrum", {
            method: "POST",
            body: JSON.stringify({
                idVoluntario: datos["idVoluntario"],
                idSimulacro: datos["idSimulacro"],
                tiempo_inicio: datos["tiempo_inicio"],
                tiempo_estoy_listo: datos["tiempo_estoy_listo"],
                mensajeVoluntario: datos["mensajeVoluntario"],
                tipoSimulacro: datos["tipoSimulacro"],
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
            return data;
        });
    };

    viewModel.deleteVoluntary = function (datos) {
        return fetch(config.apiUrl + "voluntarySimulacrum/deteleVoluntaryOfSimulacrum", {
            method: "POST",
            body: JSON.stringify({
                idVoluntario: datos["idVoluntario"],
                idSimulacro: datos["idSimulacro"],
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
                return data;
            });
    };

    viewModel.loadSimulacrum = function (idClient) {
        return fetch(config.apiUrl + "voluntarySimulacrum/listSimulacrumClient", {
            method: "POST",
            body: JSON.stringify({
                idClient: idClient
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
                //console.dir(data);
                return data;
            });
    };

    return viewModel;

}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = SimulacrumVoluntaryViewModel;