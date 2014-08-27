autocompleteWithWeather =  {

	/**
	 * @todo
	 * fields that need data attributes
	 * Check on the API key usage
	 * Create feedback for errors
	 * Make sure the autocomplete box aligns with the input box
	 * stringify the rain
	 * return an object at the end???
	 */

	/**
	 * Var that will hold the search term
	 */
	searchTerm: '',

	/**
	 * object that will hold all the results returned for the search term
	 */
	existingResults: '',

	/**
	 * Create an object that will hold all the measurement specifics
	 */
	measurements: {
		metric: {
			temperature: {
				abbr: '&#8451;',
				title: 'degrees Celcius'
			},
			minTemp: {
				abbr: '&#8451;',
				title: 'degrees Celcius'
			},
			maxTemp: {
				abbr: '&#8451;',
				title: 'degrees Celcius'
			},
			windSpeed: {
				abbr: 'mps',
				title: 'meters per second'
			},
			windDirection: {
				abbr: '&deg;',
				title: 'degrees'
			},
			pressure: {
				abbr: 'hPa/mbar',
				title: 'hectopascal/millibar'
			},
			rain: {
				abbr: 'mm/3h',
				title: 'millimeters per 3 hours'
			}
		},
		imperial: {
			temperature: {
				abbr: '&#8457;',
				title: 'degrees Fahrenheit'
			},
			minTemp: {
				abbr: '&#8451;',
				title: 'degrees Celcius'
			},
			maxTemp: {
				abbr: '&#8451;',
				title: 'degrees Celcius'
			},
			windSpeed: {
				abbr: 'fps',
				title: 'feet per second'
			},
			pressure: {
				abbr: 'hPa/mbar',
				title: 'hectopascal/millibar'
			},
			rain: {
				abbr: '&ldquo;/3h',
				title: 'inches per 3 hours'
			}
		}
	},

	/**
	 * Object holding the default options. Each can be overridden by passing the same key through to the init method
	 */
	defaults: {

		/**
		 * The selector for the search input field. This will be used to grab the search term for and to bind the
		 * resulting results box to
		 */
		searchElement: '#weatherSearchInput',

		/**
		 * How many characters should the user have to enter before the initial query is made to the OpenWeatherMap API?
		 */
		minSearchCharacters: 3,

		/**
		 * The API key for the openweathermap api. This may change or be deleted depending on how it needs to be used
		 */
		apiKey: 'e12d6c5a83c260d4fa6a27de5f923145',

		/**
		 * Does the user want their results in "metric" or "imperial"
		 *
		 * Metric:
		 *      Temperature:    degrees Celcius
		 *      Wind Speed:     meters/seconds
		 *      Pressure:       millibars
		 *      Rain:           millimeters
		 *
		 * Imperial:
		 *      Temperature:    degrees Fahrenheit
		 *      Wind Speed:     feet/second
		 *      Pressure:       millibars
		 *      Rain:           inches/3h
		 */
		measurementType: 'metric',

		/**
		 * What format does the user want the information to be presented in within the autocomplete results?
		 *
		 * Options:
		 *      cityName
		 *      city_id
		 *      temperature
		 *      icon
		 *      windSpeed
		 *      windDirection
		 *      clouds
		 *      countryCode
		 *      humidity
		 *      pressure
		 *      minTemp
		 *      maxTemp
		 *      longitude
		 *      latitude
		 *      shortDescription
		 *      longDescription
		 *
		 * All the user has to do is create a string and wrap data they want in curly braces.
		 * Example: If I wanted the information to be presented as:
		 * Barnsley, GB {weather icon} (15 deg C)
		 * Notes: In the example above the icon would be shown and the temperature would include the degree symbol
		 * followed by correct measurement (C or F)
		 * The above example would be coded as:
		 *
		 *      '{cityName}, {countryCode} {icon} ({temperature})'
		 * The above is also the default format.
		 */
        displayFormat: '{city}, {countryCode} {icon} ({temperature})',

        /**
         * Set an initial search term of a blank string
         */
              searchTerm: ''
	},

	/**
	 * Object holding the default options. Each can be overridden by passing the same key through to the init method
	 */
	copyOfDefaults: {

		/**
		 * The selector for the search input field. This will be used to grab the search term for and to bind the
		 * resulting results box to
		 */
		searchElement: '#weatherSearchInput',

		/**
		 * How many characters should the user have to enter before the initial query is made to the OpenWeatherMap API?
		 */
		minSearchCharacters: 3,

		/**
		 * The API key for the openweathermap api. This may change or be deleted depending on how it needs to be used
		 */
		apiKey: 'e12d6c5a83c260d4fa6a27de5f923145',

		/**
		 * Does the user want their results in "metric" or "imperial"
		 *
		 * Metric:
		 *      Temperature:    degrees Celcius
		 *      Wind Speed:     meters/seconds
		 *      Pressure:       millibars
		 *      Rain:           millimeters
		 *
		 * Imperial:
		 *      Temperature:    degrees Fahrenheit
		 *      Wind Speed:     feet/second
		 *      Pressure:       millibars
		 *      Rain:           inches/3h
		 */
		measurementType: 'metric',

		/**
		 * What format does the user want the information to be presented in within the autocomplete results?
		 *
		 * Options:
		 *      cityName
		 *      city_id
		 *      temperature
		 *      icon
		 *      windSpeed
		 *      windDirection
		 *      clouds
		 *      countryCode
		 *      humidity
		 *      pressure
		 *      minTemp
		 *      maxTemp
		 *      longitude
		 *      latitude
		 *      shortDescription
		 *      longDescription
		 *
		 * All the user has to do is create a string and wrap data they want in curly braces.
		 * Example: If I wanted the information to be presented as:
		 * Barnsley, GB {weather icon} (15 deg C)
		 * Notes: In the example above the icon would be shown and the temperature would include the degree symbol
		 * followed by correct measurement (C or F)
		 * The above example would be coded as:
		 *
		 *      '{cityName}, {countryCode} {icon} ({temperature})'
		 * The above is also the default format.
		 */
        displayFormat: '{city}, {countryCode} {icon} ({temperature})',

        /**
         * Set an initial search term of a blank string
         */
              searchTerm: ''
	},

	/**
	 * Replace the defaults with any replacements provided
	 *
	 * @param overrides
	 */
	overrideDefaults: function(overrides) {

		/**
		 * If the user is sticking to the defaults then return
		 */
		if (typeof overrides === "undefined") {
			return;
		}

		/**
		 * For every property in the defaults object, see if an override has been passed
		 */
		for(var prop in autocompleteWithWeather.defaults) {

			/**
			 * Has a replacement been provided
			 */
			if (overrides.hasOwnProperty(prop)) {

				/**
				 * A replacement has been found so overwrite the default
				 */
				autocompleteWithWeather.defaults[prop] = overrides[prop];
			}
		}
	},

	/**
	 * Initialise the script and set the defaults
	 *
	 * @param defaultOverrides
	 */
	init: function(defaultOverrides) {

		/**
		 * Override the defaults with any replacements provided
		 */
		this.overrideDefaults(defaultOverrides);

		/**
		 * When the keyup event has been fired in the search input field then action the input
         *
         * I am getting the value via normal JS instead of jQuery as I couldn't get the tests sto work with the ajax
         * key triggers which made me think that maybe there are some situations where they would also fail in real
         * life.
		 */
		document.getElementById(autocompleteWithWeather.defaults.searchElement.replace('#', '')).onkeyup = function(event) {

            /**
             * distinguish between IE's explicit event object (window.event) and everybody else's implicit.
             */
            var evtobj=window.event? event : e;

            /**
             * Get the unicode value of the key
             */
            var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode

            /**
             * Get the actual key that was pressed
             */
            var actualkey=String.fromCharCode(unicode).toLowerCase();

            /**
			 * Is the key pressed the down arrow?
			 */
			if (event.keyCode == 40) {

				/**
				 * Yes it is; this means that there must be existing results there so move down to the next city
				 */
				autocompleteWithWeather.focusNextItem();

				/**
				 * Go away
				 */
				return;
			}

			/**
			 * Is the key pressed the up arrow?
			 */
			if (event.keyCode == 38) {

				/**
				 * Yes it is; this means that there must be existing results there so move up to the previous city
				 */
				autocompleteWithWeather.focusPreviousItem();

				/**
				 * Go away
				 */
				return
			}

			/**
			 * Is the key pressed the Enter key?
			 */
			if (event.keyCode == 13) {

				/**
				 * This it is; this most likely means that the user wants to select the focused city
				 */
				autocompleteWithWeather.selectItem();

				/**
				 * Go away
				 */
				return;
			}

			/**
			 * Cache the value of the input element
             *
             * Commented this line out: it must have been there for some reason (probably testing) but
             * now it is just duplicating the lines following it
			 */
//			autocompleteWithWeather.searchTerm = document.getElementById(autocompleteWithWeather.defaults.searchElement.replace('#', '')).value;

            /**
             * Concatenate the old and new inputs
             */
            searchTerm = autocompleteWithWeather.searchTerm + actualkey;

			/**
			 * Set the value in the main scope
			 */
			autocompleteWithWeather.setSearchTerm(searchTerm);

			/**
			 * Now that we have a new input value we need to filter through the results
			 */
			autocompleteWithWeather.filterResults();

			/**
			 * Detect if a user click on a result item/city instead of navigating to it using the keyboard
			 */
			$('body').on('click', '.weatherSearchResultItem', function() {

                /**
                 * Add focus to the item so that we know which city has been chosen
                 */
                $(this).addClass('focus');

                /**
                 * Action the city selected
                 */
                autocompleteWithWeather.selectItem();
            });
		}
	},

	/**
	 * Sent the focus to the next search result
	 */
	focusNextItem: function() {

		/**
		 * Cache the focused elements as they are used more than once
		 */
		var focused = $('li.focus');

		/**
		 * Are there any results currently "focused"
		 */
		if (focused.length === 0) {

			/**
			 * No there aren't so set the focus to the first result
			 */
			this.focusItem($('#weatherSearchResults li').first());

		} else {

			/**
			 * There is an existing result item in focus so set the next one to be focused
			 */
			this.focusItem(focused.next());

			/**
			 * Unfocus the first element that has focus (at this point there is two)
			 */
			this.unfocusItem(focused.first());
		}
	},

	/**
	 * Move the focus to the previous result
	 */
	focusPreviousItem: function() {

		/**
		 * Cache the focused elements as they are used more than once
		 */
		var focused = $('li.focus');


		/**
		 * Are there ant existing focused results?
		 */
		if (focused.length > 0) {

			/**
			 * Yes there are so focus on the previous one
			 */
			this.focusItem(focused.prev());

			/**
			 * Unfocus the last focused element (in the DOM, not time wise) (at this stage there are two)
			 */
			this.unfocusItem(focused.last());
		} else {

			/**
			 * No there aren't so set the focus to the last result (press the up arrow with no results highlighted
			 * and the focus goes straight to the last entry and works it's way up
			 */
			this.focusItem($('#weatherSearchResults li').last());
		}
	},

	/**
	 * A search result item has been selected to accept it
	 */
	selectItem: function() {

		/**
		 * Cache the selected result as we are going to need it in several places
		 */
		var selected = $('li.focus').first();

		/**
		 * Set the chosen city in the script's scope for everything to access
		 */
		autocompleteWithWeather.setCity(selected.attr('data-cityName'));

		/**
		 * Set the search input elements data-tags with all the available information for the user to do with as
		 * they will
		 *
		 * @todo convert all underscores to camelCase
		 */
		$(autocompleteWithWeather.defaults.searchElement)
			.attr('data-city_id',          selected.attr('data-city_id'))
			.attr('data-cityName',         selected.attr('data-cityName'))
			.attr('data-countryCode',      selected.attr('data-countryCode'))
			.attr('data-temperature',      selected.attr('data-temperature'))
			.attr('data-min_temp',         selected.attr('data-min_temp'))
			.attr('data-max_temp',         selected.attr('data-max_temp'))
			.attr('data-windSpeed',        selected.attr('data-windSpeed'))
			.attr('data-windDirection',    selected.attr('data-windDirection'))
			.attr('data-cloudCoverage',    selected.attr('data-cloudCoverage'))
			.attr('data-longitude',        selected.attr('data-longitude'))
			.attr('data-latitude',         selected.attr('data-latitude'))
			.attr('data-humidity',         selected.attr('data-humidity'))
			.attr('data-pressure',         selected.attr('data-pressure'))
			.attr('data-rain',             selected.attr('data-rain'))
			.attr('data-description',      selected.attr('data-description'))
			.attr('data-shortDescription', selected.attr('data-shortDescription'))
			.attr('data-icon',             selected.attr('data-icon'))
            .attr('data-measurementType', autocompleteWithWeather.defaults.measurementType)
	},

	/**
	 * Set the item passed to be focused
	 *
	 * @param el
	 */
	focusItem: function(el) {

		/**
		 * Set it to be focused by adding the class "focus"
		 */
		el.addClass('focus');
	},

	/**
	 * Unfocus the passed item
	 *
	 * @param el
	 */
	unfocusItem: function(el) {

		/**
		 * Unfocus the item by removing the "focus" class
		 */
		el.removeClass('focus');
	},

	/**
	 * Count the characters in the search input's value
	 *
	 * @returns {Number}
	 */
	countChars: function() {

		/**
		 * Return the count as an integer
		 */
		return this.searchTerm.length;
	},

	/**
	 * Query the openWeatherMap API
	 */
	queryWeatherAPI: function() {

		/**
		 * Send an AJAX request off
		 */
		$.ajax({
			// Format the URL separately
			context: this,
			url: autocompleteWithWeather.formatSearchURL(),
			type: 'POST',
			success: function(reply) {
console.log('success has been triggered');
				/**
				 * The AJAX request was successful so extract the information we need
				 */
				autocompleteWithWeather.setResults(reply.list);

				/**
				 * Now that we have the correct information we need to build the results in the DOM
				 */
				autocompleteWithWeather.convertResultsIntoListItems();
			},
			error: function(reply) {
				/**
				 * There was an error
				 *
				 * @todo Create some user feedback for ajax error(s)
				 */
				console.warn("There was an error");
				console.dir(reply);
			},
            done: function() {
                console.log('ajax call has finished');
            }
		});

	},

	/**
	 * Extract the required information from the API query results
	 *
	 * @param list
	 */
	setResults: function(list) {

		/**
		 * Set the script's search results to the ones passed
		 */
		this.existingResults = list;
	},

	/**
	 * Convert the results into a DOM object
	 */
	convertResultsIntoListItems: function() {

		/**
		 * Cache the weather search results
		 */
		var results = $('#weatherSearchResults');
		/**
		 * Build the results container
		 */
		var ul = this.buildResultsContainer();

		/**
		 * If the results element is not visible...
		 */
		if (results.css('display') == 'none') {

			/**
			 * ...Slide it down
			 */
			results.slideDown();
		}

		/**
		 * Cache the results
		 */
		var r = this.existingResults;

		/**
		 * Iterate through the list of results
		 */
		for(var i=0; i < r.length; i++) {
			/**
			 * Set local variables for all the properties
			 */
			var city =             r[i].name;
			var city_id =          r[i].id;
			var temperature =      r[i].main.temp;
			var icon =             r[i].weather[0].icon;
			var windSpeed =        r[i].wind.speed;
			var windDirection =    r[i].wind.deg;
			var clouds =           r[i].clouds.all;
			var countryCode =      r[i].sys.country;
			var humidity =         r[i].main.humidity;
			var pressure =         r[i].main.pressure;
			var minTemp =          r[i].main.temp_min;
			var maxTemp =          r[i].main.temp_max;
			var coordsLat =        r[i].coord.lat;
			var coordsLon =        r[i].coord.lon;
			var description =      r[i].weather[0].description;
			var shortDescription = r[i].weather[0].main;

			/**
			 * Append a li to the container
			 */
			ul.append('<li></li>');

			var value = autocompleteWithWeather.displayFormat({
				cityName:        city,
				city_id:         city_id,
				temperature:     temperature,
				icon:            icon,
				windSpeed:       windSpeed,
				windDirection:   windDirection,
				clouds:          clouds,
				countryCode:     countryCode,
				humidity:        humidity,
				pressure:        pressure,
				minTemp:         minTemp,
				maxTemp:         maxTemp,
				latitude:        coordsLat,
				longitude:       coordsLon,
				description:     description,
				shortDescription: shortDescription
			});

			/**
			 * Attach a data attribute for each piece of information
			 */
			var li = $('#weatherSearchResults li:last-child')
				.addClass('weatherSearchResultItem')
				.attr('id', 'weatherSearchResultItem_' + r[i].id)
				.attr('data-cityName',         city)
				.attr('data-city_id',          city_id)
				.attr('data-temperature',      temperature)
				.attr('data-icon',             icon)
				.attr('data-windSpeed',        windSpeed)
				.attr('data-windDirection',    windDirection)
				.attr('data-cloudCoverage',    clouds)
				.attr('data-countryCode',      countryCode)
				.attr('data-humidity',         humidity)
				.attr('data-pressure',         pressure)
				.attr('data-minTemp',          minTemp)
				.attr('data-maxTemp',          maxTemp)
				.attr('data-latitude',         coordsLat)
				.attr('data-longitude',        coordsLon)
				.attr('data-description',      description)
				.attr('data-shortDescription', shortDescription)

			/**
			 * And set the text of the result item
			 */
				.html(value);

		}
	},

	/**
	 * Build the container to put the results into
	 */
	buildResultsContainer: function() {

		/**
		 * Cache the results selector
		 */
		var resultsSelector = $('#weatherSearchResults');
		/**
		 * If an existing container exists...
		 */
		if (resultsSelector.length == 1) {

			/**
			 * ...for each results item in there...
			 */
			$('#weatherSearchResults li').each(function() {

				/**
				 * ...get rid of it (effectively refreshing the results list on each keystroke)
				 */
				this.remove();
			});

			/**
			 * Return the newly emptied container
			 */
			return resultsSelector;
		}

		/**
		 * Append the container to the parent of the search input field
		 */
		var parent = $(autocompleteWithWeather.defaults.searchElement).parent();
		parent.append('<ul></ul>');

		var ul = parent.find('ul');

		/**
		 * Add the class; id; width and top attributes to the container
		 *
		 * @todo Make sure the autocomplete box aligns with the input field
		 */
		ul
			.addClass('autocompleteResults')
			.attr('id', 'weatherSearchResults')
			.css('width', $(this.defaults.searchElement).parent().width() + "px")
			.css('top', $(this.defaults.searchElement).parent().height() + "px");

		/**
		 * Return the container itself
		 */
		return resultsSelector;
	},

	/**
	 * Filter the search results
	 */
	filterResults: function() {

		/**
		 * If there are less than the minimum required characters in the string...
		 */
		if (this.countChars() <= (this.defaults.minSearchCharacters-1)) {

			/**
			 * ... then return nothing
			 */
			return null;
		}

		/**
		 * At this stage we have enough characters so query the OpenWeatherMap API
		 */
		this.queryWeatherAPI();
	},

	/**
	 * Format the search URL to go off to the API
	 */
	formatSearchURL: function() {
		var baseURL  = 'http://api.openweathermap.org/data/2.5/find?',
		    format   = 'json', // json or xml
		    metric   = 'metric',// internal, metric or imperial
		    accuracy = 'like';// like or accurate


		/**
		 * Get the API key from the defaults
		 *
		 * @todo See if I need an API key to push as it will be used by everybody and can they use it without a key???
		 */
		var apiKey   = autocompleteWithWeather.defaults.apiKey;

		/**
		 * We can now build the URL
		 */
	//	var url = baseURL + 'q=' + this.searchTerm + '&mode=' + format + '&units=' + metric + '&type=' + accuracy + '&APPID=' + apiKey;
		var url = baseURL + 'q=' + this.searchTerm + '&mode=' + format + '&units=' + metric + '&type=' + accuracy;

		/**
		 * And send it back
		 */
		return url;
	},

	/**
	 * Set the search term in the script's scope
	 *
	 * @param searchTerm
	 */
	setSearchTerm: function(searchTerm) {
		autocompleteWithWeather.searchTerm = searchTerm;
 	},

	/**
	 * Set the city in the script's scope
	 *
	 * @param city
	 *
	 * @returns {boolean}
	 */
	setCity: function(city) {

		/**
		 * Set the value of the search input to be the chosen city
		 */
		$(this.defaults.searchElement).val(city);

		/**
		 * Now that a choice has been made we can hide the results box
		 */
		this.hideAutocomplete();

		/**
		 * Now go away
		 */
		return false;
	},

	/**
	 * Hide the autocomplete container
	 */
	hideAutocomplete: function() {

		/**
		 * Just slide it up there, nice and fancy like
		 */
		$('#weatherSearchResults').slideUp();
	},


	/**
	 * Iterate through the code provided for the weather information display and replace the codes with the actual data
	 *
	 * @param data
	 */
	displayFormat: function(data) {

		/**
		 * Set the variable that will hold all of the replacement data
		 */
		var replacement;

		/**
		 * Cache the required format
		 */
		var formatRequired = autocompleteWithWeather.defaults.displayFormat;

		/**
		 * As long as there is an opening curly brace in the required format keep replacing them
		 */
		while (formatRequired.indexOf('{') >= 0) {

			/**
			 * Use substring to get the name of the piece of information we want to replace
			 */
			var dataToReplace = formatRequired.substring(formatRequired.indexOf('{')+1, (formatRequired.indexOf('}')));

			/**
			 * Now perform a switch/case on the name of the piece of data
			 */
			switch(dataToReplace) {

			/**
			 * These entries come in the form of an abbreviation and as such need to be wrapped in the appropriate tag
			 */
				case 'temperature':
				case 'windSpeed':
				case 'windDirection':
				case 'minTemp':
				case 'maxTemp':
				case 'pressure':

					/**
					 * Convert the provided temperature to the required measurement then it's ready to be swapped out
					 */
					replacement = autocompleteWithWeather.formatMeasurement(
						data[dataToReplace].toString(),
						autocompleteWithWeather.measurements[autocompleteWithWeather.defaults.measurementType][dataToReplace].abbr,
						autocompleteWithWeather.measurements[autocompleteWithWeather.defaults.measurementType][dataToReplace].title
					);
					break;

			/**
			 * These entries just need a percent sign appending
			 */
				case 'humidity':
				case 'clouds':

					/**
					 * Simply return the humidity level followed by the percent symbol
					 */
					replacement = data[dataToReplace] + '&#37;';
					break;

				case 'icon':

					/**
					 * Add a weather icon span to fit the icon into as the span will have it's background image set
					 */
					replacement = '<span class="weatherIcon_' + data.icon + ' weatherIcon">&nbsp;</span>';
					break;

			/**
			 * For the:
			 *      Latitude
			 *      Longitude
			 *      Country Code
			 *      City Name
			 *      Short Description
			 *      Long Description
			 * The information can just be returned as it does not need modifying
			 */
				case 'latitude':
				case 'longitude':
				case 'countryCode':
				case 'cityName':
				case 'description':
				case 'shortDescription':
				default:

					replacement = data[dataToReplace];
			}

			/**
			 * Create a new regular expression object with the code for the item eg {cityName}
			 */
			var re = new RegExp("{" + dataToReplace + "}");

			/**
			 * Perform the replacement.ie replace {cityName} with Barnsley (from the example near the top of the script)
			 * @type {string}
			 */
			formatRequired = formatRequired.replace(re, replacement);
		}

		/**
		 * Now that all the codes have been replaced we need to set the correctly formatted string back in the main
		 * object's scope
		 */
		return formatRequired;
	},

	/**
	 * Format the measurements according to whether the user wants metric aor imperial
	 */
	formatMeasurement: function(value, abbr, title) {
		return value.toString() + ' <abbr title="' + title + '">' + abbr + '</abbr>';
	},

    /**
     * Reset the defaults back to the originals
     */
    resetOptions: function() {
        autocompleteWithWeather.defaults = jQuery.extend(true, {}, autocompleteWithWeather.copyOfDefaults);
//        autocompleteWithWeather.defaults = clone autocompleteWithWeather.copyOfDefaults;
    }
};

/**
 * Initialise the autocompleteWithWeather script with the user's defaults/options
 *
 * @param defaultOverrides
 */
function initialiseAutocompleteWithWeather(defaultOverrides, $) {
	autocompleteWithWeather.init(defaultOverrides, $);
}
