'use strict';

var englishWords = require('../data/englishWords');
var frenchWords = require('../data/frenchWords');
var germanWords = require('../data/germanWords');
var _ = require('underscore');


var LanguageDetectorCtrl = function($scope) {
  
	$scope.inputText = "";
	$scope.isEnglish = false;
	$scope.isFrench = false;
	$scope.isGerman = false;

	
	/*
	 * lowercase and sort the words
	 */
	var sortWords = function(words) {

		var lowerCaseWords = _.map(words, function(word){
			return word.toLowerCase();
		});

		return _.sortBy(lowerCaseWords, function(word){
			return word;
	});
	}

	/*
	 * Sort the dictionaries, so the detection is faster.
	 */
	var sortedEnglishWords = sortWords(englishWords);
	var sortedFrenchWords = sortWords(frenchWords);
	var sortedGermanWords = sortWords(germanWords);

	console.log("sortedEnglishWords: ", sortedEnglishWords);
	console.log("sortedFrenchWords: ", sortedFrenchWords);
	console.log("sortedGermanWords: ", sortedGermanWords);


	$scope.detect = function(inputText) {
		$scope.isEnglish = detectLanguage(inputText, sortedEnglishWords);
		$scope.isFrench = detectLanguage(inputText, sortedFrenchWords);
		$scope.isGerman = detectLanguage(inputText, sortedGermanWords);
	};

	var detectLanguage = function(text, dictionary) {
		
		if (text) {
			var lowercaseText = text.toLowerCase();
			var words = lowercaseText.split(/[ ,.;:?!]+/);

			var wordsNumber = words.length;
			var PASS_SCORE = 0.5; // At lease 50% words need to be in the dictionary to be considered to be in the language.
			var matchedNumber = 0;

			if (wordsNumber == 0) {
				return false;
			}
			_.each(words, function(word){
				var index = _.indexOf(dictionary, word, true); // Set isSorted to true to use faster binary search.
				if (index > -1) {
					matchedNumber++;
				}
			});

			var score = matchedNumber / wordsNumber;

			if (score >= PASS_SCORE) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}; 

	

 
};

module.exports = LanguageDetectorCtrl;
