
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');
    
var Geocoder = {
    /**
     * Forward geocodes a string.
     *
     * @param {String} _addessString       The address string to be geocoded
     * @param {Int}    _nbMaxResults       [OPTIONAL] The maximum nb of results
     */
    geocodeString: function(successCallback, errorCallback, addressString, nbMaxResults) {
		nbMaxResults = nbMaxResults || '1'; // optional parameter which defaults to '1'
        exec(successCallback, errorCallback, "Geocoder", "geocodeString", [addressString, nbMaxResults]);
    },
    
    /**
     * Reverse geocodes a position (Lat,Long).
     *
     * @param {Double} _latitude       The latitude
     * @param {Double} _longitude      The longitude
     */
    reverseGeocodeLatLong: function(successCallback, errorCallback, latitude, longitude) {
    	exec(successCallback, errorCallback, 'Geocoder', 'reverseGeocodeLatLong', [latitude, longitude]);
    }
    
};

module.exports = Geocoder;
