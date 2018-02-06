var dialogsModule = require("ui/dialogs");
var config = require("../../shared/config");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var Toast = require("nativescript-toast");

var page;
var topmost;
var navigationOptions;

var userView = new UserViewModel([]);

var pageData = new observableModule.fromObject({
	name: "",
	email: "",
	phone: ""
});

exports.loaded = function (args) {
    topmost = frameModule.topmost();
	page = args.object;
    page.bindingContext = pageData;
    pageData.name = '';
    pageData.email = '';
    pageData.phone = '';
}

exports.onSaveUser = function () {
    var userJson = { "name": pageData.name, "email": pageData.email, "phone": pageData.phone };

	if (verifyEmpty(pageData.name) && verifyEmpty(pageData.email) && verifyEmpty(pageData.phone)) {
        pageData.set("isLoading", true);
        userView.add(userJson).catch(function () {
            dialogsModule.alert({
                message: "Ocurrio un error al registrarte, intentalo m\u00E1s tarde.",
                okButtonText: "Aceptar"
            });
            pageData.set("isLoading", false);
        }).then(function (data) {
            console.dir(data);
            if (data.response.flag) {
                dialogsModule.alert({
                    message: "Tu registro fue exitoso y tu folio asignado es: " + data.response.usuario.folio,
                    okButtonText: "Aceptar"
                }).then(function () {
                    navigateTopmost("view/login/login", false, true);
                });
            } else {
                dialogsModule.alert({
                    message: "Ocurrio un error al registrarte, intentalo m\u00E1s tarde.",
                    okButtonText: "Aceptar"
                });
            }
            pageData.set("isLoading", false);
        });
	    
	} else {
		dialogsModule.alert({
			title: "Aviso",
			message: "Es necesario llenar todos los campos",
			okButtonText: "Aceptar"
		}).then(function () {
			console.log("Di en aceptar");
		});
	}
}

exports.back = function () {
    navigateTopmost("view/login/login", false, true);
}

function verifyEmpty(field) {
	var flag = true;
	if (field === "") {
		flag = false;
	}
	return flag;
}

function navigateTopmost(nameModule, backstack, clearHistory) {
    navigationOptions = {
        moduleName: nameModule,
        backstackVisible: backstack,
        clearHistory: clearHistory,
        animated: true,
        transition: {
            name: "slideLeft",
            duration: 380,
            curve: "easeIn"
        }
    };
    topmost.navigate(navigationOptions);
}