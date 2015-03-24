/* underscoreModule Services 
 * Wrap the underscore.js into this module.
 */

angular.module('underscoreModule', [])
	.factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});