
describe('Test the object loads ok', function () {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'fixtures';
        loadFixtures('simple-input.html');

    });

    afterEach(function() {
        autocompleteWithWeather.resetOptions();
    })


    var measurements = autocompleteWithWeather.measurements;

    it('There should be 2 measurement choices', function() {
        expect(Object.keys(measurements).length).toBe(2);
    });

    it('Should have no undefined abbreviations or titles', function() {
        // Iterate through the measurement choices
        for (var i=0; i < Object.keys(measurements).length; i++) {

            var choices = ['metric', 'imperial'];

            for (var v in measurements[choices[i]]) {

                expect(measurements[choices[i]][v].abbr).toBeDefined();
            }
        }
        expect(autocompleteWithWeather.defaults.searchTerm).toBe('');

        expect($('<div>some text</div>')).not.toHaveText(/other/);
    });

    it('Should be able to override the default options', function() {
         var newDefaults = {
            minSearchCharacters: 8,
            measurementType: 'imperial',
            displayFormat: '{city}, {city_id}',
            searchTerm: 'Berlin',
            apiKey: ''
        };
        var testNewDefaults = initialiseAutocompleteWithWeather(newDefaults);

        expect(autocompleteWithWeather.defaults.minSearchCharacters).toEqual(8);
        expect(autocompleteWithWeather.defaults.measurementType).toEqual('imperial');
        expect(autocompleteWithWeather.defaults.displayFormat).toEqual('{city}, {city_id}');
        expect(autocompleteWithWeather.defaults.searchTerm).toEqual('Berlin');
        expect(autocompleteWithWeather.defaults.apiKey).toEqual('');
        
        delete testNewDefaults;
    });

    it('Should still work when no user options are passed', function() {
        var noOptions = initialiseAutocompleteWithWeather();

        //using the above set new defaults the default search term should still be Berlin
        expect(autocompleteWithWeather.copyOfDefaults.searchTerm).toBe('');
        
        delete noOptions;
    });
    
    delete measurements;
});

describe('Test the jQuery stuff', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'fixtures';
        loadFixtures('simple-input.html');
    });

    afterEach(function() {
        autocompleteWithWeather.resetOptions();
    })

    it('checks the input can receive focus', function () {

        var el = autocompleteWithWeather.defaults.searchElement;
        expect($(el).focus()).toBeFocused();
    });

    it('Updates the search box', function() {

        var updateSearchBox = initialiseAutocompleteWithWeather({
            minSearchCharacters: 2
        });

        var spy = spyOn(autocompleteWithWeather, 'setSearchTerm').and.callThrough();

        // Press b
        var press = jQuery.Event("keyup");
        press.keyCode = 66;
        $('input').eq(0).focus().trigger(press);
        expect(autocompleteWithWeather.setSearchTerm).toHaveBeenCalledWith('b');
        spy.calls.reset();
        
        delete updateSearchBox;
    });

    it('Makes an ajax call to the openweathermap API', function() {

        /**
         * Bollocks: for the life of me I cannot figure out how to track a spy
         * so that I can track that the setResults method gets called from the ajax success.
         * I can get as far as reducing the min search characters to 1 and then initialising the script
         * Then I can confirm the queryWeatherAPI has been called as the min chars has been reached but that is as far as I can get :-(
         */
        initialiseAutocompleteWithWeather({
            minSearchCharacters: 1
        });

        var fakeReply = '{"message":"like","cod":"200","count":3,"list":[{"id":2656284,"name":"Barnsley","coord":{"lon":-1.48333,"lat":53.549999},"main":{"temp":12.85,"pressure":1018,"humidity":71,"temp_min":11,"temp_max":14.44},"dt":1409005257,"wind":{"speed":1,"deg":100},"sys":{"country":"GB"},"rain":{"1h":0.51},"clouds":{"all":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"},{"id":310,"main":"Drizzle","description":"light intensity drizzle rain","icon":"09n"},{"id":701,"main":"Mist","description":"mist","icon":"50n"}]},{"id":4929771,"name":"Barnstable","coord":{"lon":-70.299469,"lat":41.700111},"main":{"temp":22.22,"pressure":1020,"humidity":73,"temp_min":19,"temp_max":26},"dt":1409005445,"wind":{"speed":3.6,"deg":150},"sys":{"country":"US"},"clouds":{"all":1},"weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01d"}]},{"id":2656281,"name":"Barnstaple","coord":{"lon":-4.05808,"lat":51.080219},"main":{"temp":16.29,"pressure":999,"humidity":93,"temp_min":16,"temp_max":17},"dt":1409003400,"wind":{"speed":4.1,"deg":180},"sys":{"country":"GB"},"rain":{"3h":3},"clouds":{"all":92},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}]}]}';


        /**
         * Now that we have proved the keyup event works we can set the minimum chars to 1 and just return a short
         * JSON object in order to test the rest
         */
        spyOn(autocompleteWithWeather, 'queryWeatherAPI');

var success;

        spyOn(jQuery, 'ajax').and.callFake(function(e) {
            console.log('calling success');
            success = jasmine.createSpy(e.success(fakeReply.list));
        });

        // Press b
        var press = jQuery.Event("keyup");
        press.keyCode = 66;
        $('input').eq(0).trigger(press);

        console.log('minCharacters: ' + autocompleteWithWeather.defaults.minSearchCharacters);
        expect(autocompleteWithWeather.queryWeatherAPI).toHaveBeenCalled();

        expect(success).toHaveBeenCalled();

    });
});
