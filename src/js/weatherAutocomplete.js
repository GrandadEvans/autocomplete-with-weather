weatherAutocomplete =  {

	/**
	 * @todo
	 * Implement the:
	 *     display format
	 *     fields that need data attributes
	 * Check on the API key usage
	 * Create feedback for errors
	 * Make sure the autocomplete box aligns with the input box
	 * Sort out the background icons
	 * stringify the rain
	 * return an object at the end???
	 */
	term: '',
	existingResults: '',
	defaults: {
		searchElement: '#weatherSearchInput',
		minSearchCharacters: 3,
		apiKey: 'e12d6c5a83c260d4fa6a27de5f923145',
		measurementType: 'metric',
		displayFormat: '<city>, <countryCode> <icon> (<temp>)'
	},

	/**
	 * Replace the defaults with any replacements provided
	 *
	 * @param overrides
	 */
	overrideDefaults: function(overrides) {

		/**
		 * For every property in the defaults object, see if an override has been passed
		 */
		for(var prop in weatherAutocomplete.defaults) {

			/**
			 * Has a replacement been provided
			 */
			if (overrides.hasOwnProperty(prop)) {

				/**
				 * A replacement has been found so overwrite the default
				 */
				weatherAutocomplete.defaults[prop] = overrides[prop];
			}
		}
	},

	/**
	 * Iinitialise the script and set the defaults
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
		 */
		$('body').on('keyup', weatherAutocomplete.defaults.searchElement, function(el) {

			/**
			 * Is the key pressed the down arrow?
			 */
			if (el.keyCode == 40) {

				/**
				 * Yes it is; this means that there must be existing results there so move down to the next city
				 */
				weatherAutocomplete.focusNextItem(el);

				/**
				 * Go away
				 */
				return;
			}

			/**
			 * Is the key pressed the up arrow?
			 */
			if (el.keyCode == 38) {

				/**
				 * Yes it is; this means that there must be existing results there so move up to the previous city
				 */
				weatherAutocomplete.focusPreviousItem(el);

				/**
				 * Go away
				 */
				return
			}

			/**
			 * Is the key pressed the Enter key?
			 */
			if (el.keyCode == 13) {

				/**
				 * This it is; this most likely means that the user wants to select the focused city
				 */
				weatherAutocomplete.selectItem(el);

				/**
				 * Go away
				 */
				return;
			}

			/**
			 * Cache the value of the input element
			 */
			var term = $(this).val();

			/**
			 * Set the value in the main scope
			 */
			weatherAutocomplete.setSearchTerm(term);

			/**
			 * Now that we have a new input value we need to filter through the results
			 */
			weatherAutocomplete.filterResults();

			/**
			 * Detect if a user click on a result item/city instead of navigating to it using the keyboard
			 */
			$('body').on('click', '.weatherSearchResultItem', function() {

				/**
				 * Action the city selected
				 */
				weatherAutocomplete.setCity($(this).attr('data-city'));
			});
		})
	},

	/**
	 * Sent the focus to the next search result
	 *
	 * @param el
	 */
	focusNextItem: function(el) {

		/**
		 * Are there any results currently "focused"
		 */
		if ($('li.focus').length == 0) {

			/**
			 * No there aren't so set the focus to the first result
			 */
			this.focusItem($('#weatherSearchResults li').first());

		} else {

			/**
			 * There is an existing result item in focus so set the next one to be focused
			 */
			this.focusItem($('li.focus').next());

			/**
			 * Unfocus the first element that has focus (at this point there is two)
			 */
			this.unfocusItem($('li.focus').first());
		}
	},

	/**
	 * Move the focus to the previous result
	 *
	 * @param el
	 */
	focusPreviousItem: function(el) {

		/**
		 * Are there ant existing focused results?
		 */
		if ($('li.focus').length > 0) {

			/**
			 * Yes there are so focus on the previous one
			 */
			this.focusItem($('li.focus').prev());

			/**
			 * Unfocus the last focused element (in the DOM, not time wise) (at this stage there are two)
			 */
			this.unfocusItem($('li.focus').last());
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
	 *
	 * @param el
	 */
	selectItem: function(el) {

		/**
		 * Cache the selected result as we are going to need it in several places
		 */
		var selected = $('li.focus').first();

		/**
		 * Set the chosen city in the script's scope for everything to access
		 */
		weatherAutocomplete.setCity(selected.attr('data-cityName'));

		/**
		 * Set the search input elements data-tags with all the available information for the user to do with as
		 * they will
		 *
		 * @todo convert all underscores to camelCase
		 */
		$(weatherAutocomplete.defaults.searchElement)
			.attr('data-city_id',          selected.attr('data-city_id'))
			.attr('data-cityName',         selected.attr('data-cityName'))
			.attr('data-countryCode',      selected.attr('data-countryCode'))
			.attr('data-temp',             selected.attr('data-temp'))
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
	 * Coune the characters in the search input's value
	 *
	 * @returns {Number}
	 */
	countChars: function() {

		/**
		 * Return the count as an integer
		 */
		return this.term.length;
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
			url: weatherAutocomplete.formatSearchURL(),
			type: 'POST',
			success: function(reply) {

				/**
				 * The AJAX request was successful so extract the information we need
				 */
				weatherAutocomplete.setResults(reply.list);

				/**
				 * Now that we have the correct information we need to build the results in the DOM
				 */
				weatherAutocomplete.convertResultsIntoListItems();
			},
			error: function(reply) {
				/**
				 * There was an error
				 *
				 * @todo Create some user feedback for ajax error(s)
				 */
				console.warn("There was an error");
				console.dir(reply);
			}
		});

	},

	/**
	 * Extract the required information from the API query results
	 *
	 * @param reply
	 *
	 * @returns {boolean}
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
		 * Build the results container
		 */
		var ul = this.buildResultsContainer();

		/**
		 * If the results element is not visible...
		 */
		if ($('#weatherSearchResults').css('display') == 'none') {

			/**
			 * ...Slide it down
			 */
			$('#weatherSearchResults').slideDown();
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
			var temp =             r[i].main.temp;
			var icon =             r[i].weather[0].icon;
			var windSpeed =        r[i].wind.speed;
			var windDirection =    r[i].wind.dir;
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


			weatherAutocomplete.displayFormat({
				cityName:        city,
				city_id:         city_id,
				temp:            temp,
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
				sortDescription: shortDescription
			})

			/**
			 * Set the rain seperately as it comes in a variety of different measurements depending in the rain level
			 */
			var rain = weatherAutocomplete.stringifyRain(r[i].main.rain);


			/**
			 * Append a li to the container
			 */
			ul.append('<li></li>');

			/**
			 * Attach a data attribute for each piece of information
			 *
			 * @todo Add a default that will allow the user to select which pieces of information they want
			 */
			var li = $('#weatherSearchResults li:last-child')
				.addClass('weatherSearchResultItem')
				.attr('id', 'weatherSearchResultItem_' + r[i].id)
				.attr('data-cityName',         city)
				.attr('data-city_id',          city_id)
				.attr('data-temp',             temp)
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
			 *
			 * @todo Make this the format the is provided in the defaults/options
			 */
				.text(weatherAutocomplete.displayFormat);
		}
	},

	/**
	 * Build the container to put the results into
	 */
	buildResultsContainer: function() {

		/**
		 * If an existing container exists...
		 */
		if ($('#weatherSearchResults').length == 1) {

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
			return $('#weatherSearchResults');
		}

		/**
		 * Append the container to the parent of the search input field
		 */
		var parent = $(weatherAutocomplete.defaults.searchElement).parent();
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
		return $('#weatherSearchResults');
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
			metric   = 'internal',// internal, metric or imperial
			accuracy = 'like'; // like or accurate


		/**
		 * Get the API key from the defaults
		 *
		 * @todo See if I need an API key to push as it will be used by everybody and can they use it without a key???
		 */
		apiKey   = weatherAutocomplete.defaults.apiKey;

		/**
		 * We can now build the URL
		 */
		var url = baseURL + 'q=' + this.term + '&mode=' + format + '&units=' + metric + '&type=' + accuracy + '&APPID=' + apiKey;

		/**
		 * And send it back
		 */
		return url;
	},

	/**
	 * Set the search term in the script's scope
	 *
	 * @param term
	 */
	setSearchTerm: function(term) {
		this.term = term;
	},

	/**
	 * Set the city in the script's scope
	 *
	 * @param city
	 *
	 * @returns {boolean}
	 */
	setCity: function(city) {
		$(this.defaults.searchElement).val(city);
		this.hideAutocomplete();
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
	 * Set the background icon for the search result item
	 *
	 * @param id
	 * @param iconId
	 */
	setBackgroundIcon: function(id, iconId) {

		/**
		 * Add the icon class to the element in question
		 *
		 * @todo Make sure this only happens to one child
		 */
		$('.weatherSearchResultItem_' + id)
			.children()
			.addClass('icon' + iconId);
	},

	/**
	 * Convert the temperature from Kelvin to the required scale
	 *
	 * @param kelvin
	 *
	 * @returns {number}
	 */
	convertTemperature: function(kelvin) {

		/**
		 * If the measurement is 'c' then the conversion is simple...
		 */
		if (weatherAutocomplete.defaults.measurementType == 'metric') {

			/**
			 * ...we just take 272.15 away...
			 */
			return parseInt((parseInt(kelvin) - 272.15));
		} else {

			/**
			 * ...but 'f' is more complicated
			 */
			return parseInt((K - 273.15)* 1.8000 + 32.00);
		}
	},

	/**
	 * Convert the correct temperature to the correct display formt dependant on the measurement
	 *
	 * @param temp
	 * @param measurement
	 *
	 * @returns {string}
	 */
	convertTemperatureToDisplayFormat: function(temp) {

		/**
		 * Set a blank string
		 */
		var entity = '';

		/**
		 * Apply the correct HTML entity for the measurement type
		 */
		if (weatherAutocomplete.defaults.measurementType == 'metric') {
			entity = '&#8451';
		} else {
			entity = '&#8457';
		}

		/**
		 * return the correct temperature formatted with the correct HTML entity and rounded to one decimal place
		 */
		return temp.toFixed(1) + ' ' + entity;
	},

	/**
	 * Convert the rain level to a uniform format as it comes in various formats depending on the rain level
	 *
	 * @param rainObj
	 *
	 * @returns {string}
	 */
	stringifyRain: function(rainObj) {

		/**
		 * If there rain is not set there has been no rain provided in the search results
		 */
		if (typeof rainObj === "undefined") {

			/**
			 * In which case we can return empty handed
			 */
			return null;
		}

		/**
		 * @todo stringify the rain
		 */
		return 'rain';
	},

	displayFormat: function(data) {
		var formatRequired = this.defaults.displayFormat;
		while (formatRequired.indexOf('{') >= 0) {
			var dataToReplace = formatRequired.substring(formatRequired.indexOf('{')+1, (formatRequired.indexOf('}')))

			switch(dataToReplace) {
				case temp:
					replacement = weatherAutocomplete.convertTemperature(data.temp);
					break;

				case 'windSpeed':
					replacement = weatherAutocomplete.formatWindSpeed(data.windSpeed);
					break;

				case 'windDirection':
					replacement = data.windDirection + '&deg;';
					break

				case 'clouds':
					replacement = data.clouds + '&#37;';
					break

				case 'humidity':
					replacement = data.humidity + '&#37;';
					break;

				case 'pressure':
					replacement = data.pressure + 'mbar';
					break;

				case 'minTemp':
					replacement = weatherAutocomplete.convertTemperature(data.minTemp);

				case 'maxTemp':
					replacement = weatherAutocomplete.convertTemperature(data.maxTemp);

			/**
			 * If the icon is in the information to DISPLAY then display it
			 *
			 * @todo Try and fit this in with the above todo
			 */
				case 'icon':

					/**
					 * Add a weather icon span to fit the icon into
					 */
					var replacement = '<span class="weatherIcon_' + data.id + ' weatherIcon">&nbsp;</span>';

					/**
					 * Set the background image to be the icon
					 */
					weatherAutocomplete.setBackgroundIcon(data.id, data.icon);

				case 'latitude':
				case 'longitude':
				case 'countryCode':
				case 'cityName':
				case 'description':
				case 'shortDescription':
				default:
					replacement = data[dataToReplace];
			}
		}
	},

	formatWindSpeed: function() {
		return windSpeed + weatherAutocomplete[weatherAutocomplete.defaults.measurementType].windSpeed;
	}
};

/**
 * Initialise the weatherAutocomplete script with the user's defaults/options
 *
 * @param defaultOverrides
 */
function initialiseAutocompleteWithWeather(defaultOverrides) {
	weatherAutocomplete.init(defaultOverrides);
}
