weatherAutocomplete =  {

	/**
	 * @todo
	 * - search on 3 characters
	 * - convert ajax results to the results that I want (search via ajax once & then cache)
	 * - Extract the required info for each result
	 * - Convert that into a ul li
	 * - style the ul li to be stacked (autocomplete)
	 * - further filter on each keydown
	 */

	term: '',
	existingResults: '',
	defaults: {
		searchElement: '#city',
		minSearchCharacters: 3,
		informationToDisplay: [
			'city',
			'countryCode',
			'temperature',
			'icon'
		]
	},

	init: function() {
		console.log('initialising weatherAutocomplete');

		$('body').on('keyup', this.defaults.searchElement, function(el) {

			if (el.keyCode == 40) {
				weatherAutocomplete.focusNextItem(el);
				return;
			} else if (el.keyCode == 38) {
				weatherAutocomplete.focusPreviousItem(el);
				return
			} else if (el.keyCode == 13) {
				weatherAutocomplete.selectItem(el);
				return;
			}

			var term = $(this).val();

			weatherAutocomplete.setTerm(term);

			weatherAutocomplete.filterResults();


			$('body').on('click', '.weatherSearchResultItem', function() {
				weatherAutocomplete.setCity($(this).attr('data-city'));
			});
		})

	},

	focusNextItem: function(el) {
		if ($('li.focus').length == 0) {
			this.focusItem($('#weatherSearchResults li').first());

		} else {
			this.focusItem($('li.focus').next());
			this.unfocusItem($('li.focus').first());
		}
	},

	focusPreviousItem: function(el) {

		if ($('li.focus').length > 0) {
			this.focusItem($('li.focus').prev());
			this.unfocusItem($('li.focus').last());
		}
	},

	selectItem: function(el) {
		var city = $('li.focus').first().attr('data-city');
		console.log('chosen: ' + city);
		weatherAutocomplete.setCity(city);
	},

	focusItem: function(el) {
		el.addClass('focus');
	},

	unfocusItem: function(el) {
		el.removeClass('focus');
	},

	countChars: function() {
		return this.term.length;
	},

	queryWeatherAPI: function() {
		$.ajax({
			url: weatherAutocomplete.formatSearchURL(),
			type: 'POST',
			success: function(reply) {
				console.dir(reply);
				weatherAutocomplete.extractRelevantInformation(reply);
				weatherAutocomplete.convertResultsIntoListItems();
			},
			error: function(reply) {
				console.warn("There was an error");
				console.dir(reply);
			}
		});

	},

	extractRelevantInformation: function(reply) {

		var list = reply.list;

		var results = [];

		for(i=0; i<list.length; i++) {
			results.push(list[i]);
		}

		this.existingResults = results;

		return true;
	},

	convertResultsIntoListItems: function() {
		var ul = this.buildResultsContainer();

		if ($('#weatherSearchResults').css('display') == 'none') {
			$('#weatherSearchResults').slideDown();
		}

		var r = this.existingResults;
		for(i=0; i < r.length; i++) {


			var city = r[i].name;
			var cityId = r[i].id;
			var temp = r[i].main.temp;
			var icon = r[i].weather[0].icon;
			var windSpeed = r[i].wind.speed;
			var windDirection = r[i].wind.dir;
			var clouds = r[i].clouds.all;
			var countryCode = r[i].sys.country;
			var humidity = r[i].main.humidity;
			var pressure = r[i].main.pressure;
			var minTemp = r[i].main.temp_min;
			var maxTemp = r[i].main.temp_max;
			var coordsLat = r[i].coord.lat;
			var coordsLon = r[i].coord.lon;
			var description = r[i].weather[0].description;
			var shortDescription = r[i].weather[0].main;

			ul.append('<li></li>');

			var li = $('#weatherSearchResults li:last-child')
				.addClass('weatherSearchResultItem')
				.attr('id', 'weatherSearchResultItem_' + r[i].id)
				.attr('data-city', city)
				.attr('data-cityId', cityId)
				.attr('data-temp', temp)
				.attr('data-icon', icon)
				.attr('data-windSpeed', windSpeed)
				.attr('data-windDirection', windDirection)
				.attr('data-clouds', clouds)
				.attr('data-countryCode', countryCode)
				.attr('data-humidity', humidity)
				.attr('data-pressure', pressure)
				.attr('data-minTemp', minTemp)
				.attr('data-maxTemp', maxTemp)
				.attr('coordsLat', coordsLat)
				.attr('coordsLon', coordsLon)
				.attr('description', description)
				.attr('data-shortDescription', shortDescription)

				.text(city);

			if (weatherAutocomplete.defaults.informationToDisplay.indexOf('icon')) {
				var icon = '<span id="weatherIcon_' + r[i].id + '" class="weatherIcon">&nbsp;</span>';

				$('#weatherSearchResultItem_' + r[i].id).append(icon);
				weatherAutocomplete.setBackgroundIcon(r[i].id, r[i].weather[0].icon);
			}

			if (weatherAutocomplete.defaults.informationToDisplay.indexOf('temp')) {
				var temp = '<span id="weatherTemp_' + r[i].id + '" class="weatherTemp">(' + weatherAutocomplete.convertKelvinToCelcius(r[i].main.temp) + ' &#8451;)</span>';

				$('#weatherSearchResultItem_' + r[i].id).append(temp);
			}
		}
	},

	buildResultsContainer: function() {

		if ($('#weatherSearchResults').length == 1) {
			$('#weatherSearchResults li').each(function() {
				this.remove();
			});
			return $('#weatherSearchResults');
		}

		var parent = $(this.defaults.searchElement).parent();

		parent.append('<ul></ul>');
		var ul = parent.find('ul');

		/**
		 * @todo Make sure the autocomplete box aligns with the input field
		 */
		ul
			.addClass('autocompleteResults')
			.attr('id', 'weatherSearchResults')
			.css('width', $(this.defaults.searchElement).parent().width() + "px")
			.css('top', $(this.defaults.searchElement).parent().height() + "px");

		return $('#weatherSearchResults');
	},

	filterResults: function() {

		// If there are less than 3 characters in the string then return
		if (this.countChars() <= 2) {
			return null;
		}

		// If there are no existing results then query the weather API
		this.queryWeatherAPI();

	},

	formatSearchURL: function() {
		var baseURL = 'http://api.openweathermap.org/data/2.5/find?',
			format = 'json', // json or xml
			metric = 'internal',// internal, metric or imperial
			accuracy = 'like'; // like or accurate
		var url = baseURL + 'q=' + this.term + '&mode=' + format + '&units=' + metric + '&type=' + accuracy;
		return url;
	},

	setTerm: function(term) {
		this.term = term;
	},

	setCity: function(city) {
		$(this.defaults.searchElement).val(city);
		this.hideAutocomplete();
		return false;
	},

	hideAutocomplete: function() {
		$('#weatherSearchResults').slideUp();
	},

	setBackgroundIcon: function(id, iconId) {
		console.log('setting css for: ' + id);
		$('#weatherSearchResultItem_' + id)
			.children()
			.addClass('icon' + iconId);
	},

	convertKelvinToCelcius: function(kelvin) {
		return (parseInt(kelvin) - 272.15).toFixed(1);
	}


};

$(document).ready(function() {
	weatherAutocomplete.init();
});
