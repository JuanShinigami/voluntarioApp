var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");
var MessageViewModel = require("../../shared/view-models/simulacrum-group-view-model");
var Toast = require("nativescript-toast");
var geolocation = require("nativescript-geolocation");
var localNotifications = require("nativescript-local-notifications");
var frameModule = require("ui/frame");

var toast;
var page;
var messageViewModel = new MessageViewModel([]);

var pageData = new observableModule.fromObject({
    massageList: messageViewModel
});

exports.onNavigatingTo = function(args) {

    page = args.object;
    page.bindingContext = pageData;
    loadMessage();
}

function loadMessage() {
    pageData.set("isLoading", true);
    var listView = page.getViewById("simulacrumGroupList");
    pageData.set("isLoading", false);
    listView.animate({
        opacity: 1,
        duration: 1000
    });
}

exports.onDrawerButtonTap = function(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

function viewToast(message) {
    toast = Toast.makeText(message, "long");
    toast.show();
}