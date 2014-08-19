# WeatherAutocomplete

## About
This script provides an autocomplete box underneath an input element. Upon typing name of a city/town etc the results are filtered down in the autocomplete as you would expect.

Along with the cities, the weather for that city is also displayed. All weather information for that city is then available through a series of data attributes.

Much of the script is configurable on instantiation. You can pass an object the script with your choice on things like the input to tie the autocomplete to and many more options (detailed below)

## Usage

### Bower
`bower install --save weatherAutocomplete` will install the package via bower. The main files are provided offering the default js and css files by default although you can always override this in the usual way.

### Git
You can clone the repository locally with `git clone git@github.com:GrandadEvans/weatherAutocomplete.git`

### How to use it
    weatherAutocomplete({
        searchElement: '#weatherAutocompleteSearchInput',
        minSearchCharacters: 3,
        informationToDisplay: [
            'city',
            'countryCode',
            'temperature',
            'icon'
        ],
        measurements: 'metric'
    });

## Configuration

There are several configuration options (as can be seen above). In details then&hellip;

### Searchelement
The id of the input to tie the autocomplete to
(default) '#weatherAutocompleteSearchInput'

### minSearchChars
How many characters would you like to have before the inital search is carried out?
(default) 3

### informationToDisplay
What information would you like to display? You can either enter a string (if you just want the city name) or an array with several fields in. The fields available are:

  *   The city name `city`
  *   The temperature `temp`
  *   The wind speed `windSpeed`, `wind-speed`, `wind_speed`
  *   The wind direction `windDirection`, `wind-direction`, `wind_direction`
  *   The percentage of cloud cover `clouds`
  *   The country name `country`
  *   The 2 character country code `countryCode`, `country-code`, `country_code`
  *   The humidity `humidity`
  *   The barometric pressure `pressure`
  *   Maximum temperature for the city `maxTemp`, `max-temp`, `max_temp`
  *   Minimum temperature for the city `minTemp`, `min-temp`, `min_temp`
  *   An icon showing the weather `icon`
  *   The co-ordinates as 'data-lat' and 'data-lon' `coords`

## Support
If you require any help then please don't be afraid to ask :-) and thanks for looking.
