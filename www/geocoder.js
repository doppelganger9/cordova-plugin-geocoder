/**
 * geocoder.js -- Apache Cordova Geocoder Plugin / cordova plugin javascript bridge.
 *
 * Copyright (C) 2017 David LACOURT
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
 
var exec = require('cordova/exec');
    
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
