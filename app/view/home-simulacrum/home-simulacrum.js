var dialogsModule = require("ui/dialogs");
var config = require("../../shared/config");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var sound = require("nativescript-sound");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var Toast = require("nativescript-toast");
var alarmList = new ObservableArray();
var pruebaShini = [];
var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
var page;
var marcha = 0; 
var cro = 0; 
var textCro = "";

var marcha1 = 0; 
var cro1 = 0; 
var textCro1 = "";

var dateIni;
var hourIni;

var cont;
var alarm;
var toast;

var refreshIntervalId;


var pageData = new observableModule.fromObject({
    alarmList: alarmList,
    cronometro1: "00:00:00",
    cronometro: "00:00:00",
    initial: true,
    evacuate: false,
    end: false,
    classButtonPrimary: "button-primary",
    classButtonSuccess: "button-success-disabled",
    classButtonInfo: "button-info-disabled"
});

exports.onNavigatingTo = function (args) {
    alarm = sound.create("~/sounds/alarm2.mp3");
    var listaGlobal = appSettings.getString("simulacrumArray");
    var arrayTest = JSON.parse(listaGlobal);
    pageData.set("alarmList", arrayTest);
    page = args.object;
    page.bindingContext = pageData;
    
}

exports.start = function () {
    
    
    viewToast("En unos momentos se iniciará el simulacro. ¡Debe estar atento!.");
    pageData.initial = false;
    pageData.classButtonPrimary = "button-primary-disabled";
    
    var x = Math.floor((Math.random() * 5) + 1);
    setTimeout(myFunction, (1000 * x));
}

function playMusic() {
    alarm.play();
}

function myFunction() {
    cont = appSettings.getNumber("count");
    refreshIntervalId = setInterval(playMusic, 500);
    pageData.evacuate = true;
    pageData.classButtonSuccess = "button-success";
    var dateInit = new Date();
    console.log(diasSemana[dateInit.getDay()] + ", " + dateInit.getDate() + " de " + meses[dateInit.getMonth()] + " de " + dateInit.getFullYear());
    
    dateIni = "" + diasSemana[dateInit.getDay()] + " " + dateInit.getDate() + " de " + meses[dateInit.getMonth()] + " de " + dateInit.getFullYear() + " ";
    hourIni = "Hora : " + dateInit.getHours() + ":" + dateInit.getMinutes() + ":" + dateInit.getSeconds() + " Hrs. ";
    empezar();
    
}

function empezar() {

    if (marcha == 0) { 
        emp = new Date(); 
        elcrono = setInterval(tiempo, 10); 
        marcha = 1;
    }
}
function tiempo() { 
    actual = new Date(); 
    cro = actual - emp; 
    cr = new Date(); 
    cr.setTime(cro);
    cs = cr.getMilliseconds(); 
    cs = cs / 10; 
    cs = Math.round(cs);
    sg = cr.getSeconds(); 
    mn = cr.getMinutes(); 
    ho = cr.getHours() - 1; 
    
    
    if (cs < 10) { cs = "0" + cs; }  
    if (sg < 10) { sg = "0" + sg; }
    if (mn < 10) { mn = "0" + mn; }
    textCro = mn + ":" + sg + ":" + cs;
    
}

function empezar1() {
    if (marcha1 == 0) { 
        emp1 = new Date(); 
        elcrono1 = setInterval(tiempo1, 10);
        marcha1 = 1;
    }
}
function tiempo1() {
    actual1 = new Date();
    cro1 = actual1 - emp1;
    cr1 = new Date();
    cr1.setTime(cro1);
    cs1 = cr1.getMilliseconds();
    cs1 = cs1 / 10;
    cs1 = Math.round(cs1);
    sg1 = cr1.getSeconds();
    mn1 = cr1.getMinutes();
    ho1 = cr1.getHours() - 1;
    if (cs1 < 10) { cs1 = "0" + cs1; }
    if (sg1 < 10) { sg1 = "0" + sg1; }
    if (mn1 < 10) { mn1 = "0" + mn1; }
    textCro1 = mn1 + ":" + sg1 + ":" + cs1;
    pageData.set("cronometro1", textCro1);
}

exports.evacuate = function () {
    pageData.evacuate = false;
    pageData.classButtonSuccess = "button-success-disabled";
    pageData.end = true;
    pageData.classButtonInfo = "button-info";
    empezar1();
}

exports.stop = function () {
    console.log("PARE LA ALARMA");
    
    parar();
}

function parar() {
    pageData.initial = true;
    pageData.classButtonPrimary = "button-primary";
    pageData.end = false;
    pageData.classButtonInfo = "button-info-disabled";
    if (marcha == 1 && marcha1 == 1) {
        clearInterval(elcrono);
        clearInterval(elcrono1);
        marcha = 0;
        marcha1 = 0;
        var dateEnd = new Date();
        
        var listaGlobal = appSettings.getString("simulacrumArray");
        var arrayTest = JSON.parse(listaGlobal);
        arrayTest.push({ identify: cont, date: dateIni, time: hourIni, duration: "Tiempo : " + textCro1 });
        pageData.set("alarmList", arrayTest);
        appSettings.setString("simulacrumArray", JSON.stringify(arrayTest));

        cont++;
        appSettings.setNumber("count", cont);


        config.simulacrumArray.push({ identify: config.count, date: dateIni, time: hourIni, duration: "Tiempo : " + textCro1 });
        
        pruebaShini.push({ identify: config.count, date: dateIni, time: hourIni, duration: "Tiempo : " + textCro1 });
        var stringTest = JSON.stringify(pruebaShini);
        pageData.set("alarmList", pruebaShini);
        
        pageData.cronometro1 = "00:00:00";
        
        alarm.stop();
        clearInterval(refreshIntervalId);
        
    } else {
        clearInterval(elcrono);
        marcha = 0;
        
    }
    
}

exports.back = function () {
    var topmost = frameModule.topmost();

    var navigationOptions = {
        moduleName: "view/home/home-page",
        backstackVisible: false,
        clearHistory: true,
        animated: true,
        transition: {
            name: "slideLeft",
            duration: 380,
            curve: "easeIn"
        }
    };

    topmost.navigate(navigationOptions);
}

function viewToast(message) {
    toast = Toast.makeText(message, "long");
    toast.show();
}

exports.listViewItemTap = function (args) {


    var item = args.view.bindingContext;
    var index = pageData.alarmList.indexOf(item);
    dialogsModule.confirm({
        title: "Mensaje",
        message: "¿Está seguro de eliminar el simulacro " + item.identify + "?",
        okButtonText: "Si",
        cancelButtonText: "No"
    }).then(function (result) {
        if (result) {
            var listaGlobal = appSettings.getString("simulacrumArray");
            var arrayTest = JSON.parse(listaGlobal);
            arrayTest.splice(index, 1);

            appSettings.setString("simulacrumArray", JSON.stringify(arrayTest));
            pageData.set("alarmList", arrayTest);
        }
    });

}

exports.onDrawerButtonTap = function (args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}