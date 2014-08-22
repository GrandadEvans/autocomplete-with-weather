GLOBAL.document = require('jsdom').jsdom();
GLOBAL.window =     document.createWindow();
GLOBAL.$ = GLOBAL.$jQuery = require('jquery').create('window');

var should = require('should');
require('../src/js/weatherAutocomplete.js');

/**
 * Set the defaults that we will be using
 */
var defaults = {
	searchElement: '#weatherInput',
	minSearchCharacters: 4,
	measurementType: 'metric',
	displayFormat: '{city}, {countryCode} ({temp})'
};

/**
 * Tests to run:
 *    Defaults can be overwritten
 *    Test up, down and enter key presses
 *    Test focus next
 *    Test Focus Previous
 *    Test Focus
 *    Test set search term
 *    Test Fires Ajax query
 */

/**
 * First test the defaults can be overridden
 */
describe('Defaults-can-be-overridden', function() {

	weatherAutocomplete.init(defaults);

	it('should have a new search element', function() {
		weatherAutocomplete.defaults.searchElement.should.equal('#weatherInput');
	});
});
