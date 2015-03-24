'use strict';

/* Controllers */

var myControllers = angular.module('myControllers', []);

/*
 * The LanguageDetectorCtrl implement the UX logic of the language detection web page.
 */
myControllers.controller('LanguageDetectorCtrl', ['$scope', 'languageDetection',
  function($scope, languageDetection) {
    $scope.inputText = "";
    $scope.language = "";

    $scope.detect = function(inputText) {
      $scope.language = languageDetection.detect(inputText);
    };

  }]);

