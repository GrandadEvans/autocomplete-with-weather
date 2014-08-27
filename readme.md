# autocomplete-with-weather

## About
This script provides an autocomplete box underneath an input element. Upon typing name of a city/town etc the results are filtered down in the autocomplete as you would expect.

Along with the cities, the weather for that city is also displayed. All weather information for that city is then available through a series of data attributes.

Much of the script is configurable on instantiation. You can pass an object the script with your choice on things like the input to tie the autocomplete to and many more options (detailed below)

## Usage

### Bower
`bower install --save autocomplete-with-weather` will install the package via bower. The main files are provided offering the default js and css files by default although you can always override this in the usual way.

### Git
You can clone the repository locally with `git clone git@github.com:GrandadEvans/autocomplete-with-weather.git`

### How to use it
You can initialise the script with the following code passing the following options into it.

The options are explained further below and this example uses the default values.

		initialiseAutocompleteWithWeather({
			searchElement: '#weatherSearchInput',
			minSearchCharacters: 3,
			displayFormat: '{cityName}, {countryCode} {icon} ({temp})',
			measurementType: 'metric' // metric or imperial
		});
	});

## Configuration

There are several configuration options (as can be seen above). In details then&hellip;

### Searchelement
The id of the input to tie the autocomplete to
(default) '#autocompleteWithWeatherSearchInput'

### minSearchChars
How many characters would you like to have before the initial search is carried out?
(default) 3

### Format to display the information in
What format does the user want the information to be presented in within the autocomplete results?

Options:

  *  cityName
  *  city_id
  *  temperature
  *  icon
  *  windSpeed
  *  windDirection
  *  clouds
  *  countryCode
  *  humidity
  *  pressure
  *  minTemp
  *  maxTemp
  *  longitude
  *  latitude
  *  shortDescription
  *  longDescription

All the user has to do is create a string and wrap data they want in curly braces.
Example: If I wanted the information to be presented as:
Barnsley, GB {weather icon} (15 deg C)
Notes: In the example above the icon would be shown and the temperature would include the degree symbol
followed by correct measurement (C or F)
The above example would be coded as:

     '{cityName}, {countryCode} {icon} ({temperature})'
The above is also the default format.

## Support
If you require any help then please don't be afraid to ask :-) and thanks for looking.

## Todo
I have a few plans for this library as i use it myself:

  *  Create tests
  *  Search results: take abbreviations away from temperatures and add them to the countryCodes instead
  *  Create an auto notification if an error exists
  *  Make sure the autocomplete box aligns with the search input box
  *  Monitor the rain input to see what levels the rainfall are over
  
## Changlog

v0.1.4
  *  Fixed two typos causing problems
   
v0.1.3
  *  Added more cached elements
  *  Updated the distribution files

v0.1.2
  *  Renamed main files to the hyphenated format

v0.1.1
  *  autocompleteWithWeather.js
  *  Fixed a few typos; layout errors and removed API key from the AJAX call
  *  Made few changes to the bower.json 

v.0.1.0
  *  Initial commit
