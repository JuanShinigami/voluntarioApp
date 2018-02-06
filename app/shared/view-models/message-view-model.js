var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");
var Toast = require("nativescript-toast");
var toast;

function MessageViewModel(items) {

    var viewModel = new ObservableArray(items);

    // Peticiones
    viewModel.addMessage = function (datos) {
        return fetch(config.apiUrl + "message/addMessage", {
            method: "POST",
            body: JSON.stringify({
                mensajeCreador: datos['idUser'],
                idSimulacrogrupo: datos['idSimulacrum'],
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

    viewModel.searchMessages = function (idUser) {
        return fetch(config.apiUrl + "message/searchMessage", {
            method: "POST",
            body: JSON.stringify({
                idVoluntario: idUser,
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


    return viewModel;

}

function handleErrors(response) {
    if (!response.ok) {
        viewToast(response.statusText);
        throw Error(response.statusText);

    }
    return response;
}

function viewToast(message) {
    toast = Toast.makeText(message, "long");
    toast.show();
}

module.exports = MessageViewModel;