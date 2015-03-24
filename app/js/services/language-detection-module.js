/*
 * languageDetectionModule Services 
 * This module contains the main business logic of language detection
 * and it exposes the method 'detect' to detect in which language the text is.
 */

angular.module('languageDetectionModule', [])
	.factory('languageDetection', ['dictionary', '_', function(dictionary, _) {
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
		var sortedEnglishWords = sortWords(dictionary.english);
		var sortedFrenchWords = sortWords(dictionary.french);
		var sortedGermanWords = sortWords(dictionary.german);

		/*
		 * Detect the language by given text
		 * @param text - the text to be detected
		 * @return the language name; if no language is detected, return ''.
		 */
		var detectLanguage  = function(text) {
		  var scores = [
		    {'langulage':'english', 'score': 0, 'words': sortedEnglishWords},
		    {'langulage':'french', 'score': 0, 'words': sortedFrenchWords},
		    {'langulage':'german', 'score': 0, 'words': sortedGermanWords}
		    
		  ];

		  for (var i = 0; i < scores.length; i++) {
		    scores[i].score = detectLanguageScore(text, scores[i].words);
		  };
		  
		  var sortedScores = _.sortBy(scores, function(item){
		    return item.score;
		  })

		  if (sortedScores[sortedScores.length - 1].score > 0) {
		    return sortedScores[sortedScores.length - 1].langulage;
		  } else {
		    return '';
		  }
		}

		var detectLanguageScore = function(text, dictionary) {
		  if (text) {
		    var lowercaseText = text.toLowerCase();
		    var words = lowercaseText.split(/[ ,.;:?!]+/);

		    var wordsNumber = words.length;
		    var matchedNumber = 0;

		    if (wordsNumber == 0) {
		      return 0;
		    }
		    _.each(words, function(word){
		      var index = _.indexOf(dictionary, word, true); // Set isSorted to true to use faster binary search.
		      if (index > -1) {
		        matchedNumber++;
		      }
		    });


		    var score = matchedNumber / wordsNumber;

		        return score;
		    
		  } else {
		    return 0;
		  }
		}; 

    return {
    	'detect': detectLanguage
    }; 
}]);