'use strict';

var angular = require('angular'); // That's right! We can just require angular as if we were in node

var LanguageDetectorCtrl = require('./controllers/LanguageDetectorCtrl'); // We can use our LanguageDetectorCtrl.js as a module. Rainbows.

var app = angular.module('myApp', []);
app.controller('LanguageDetectorCtrl', ['$scope', LanguageDetectorCtrl]);