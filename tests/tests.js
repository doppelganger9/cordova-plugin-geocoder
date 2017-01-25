/**
 * tests.js -- Apache Cordova Geocoder Plugin / unit tests.
 *
 * Copyright (C) 2017 David LACOURT
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
 
exports.defineAutoTests = function () {
    
    var fail = function (done) {
        expect(true).toBe(false);
        done();
    },
    succeed = function (done) {
        expect(true).toBe(true);
        done();
    };

    describe('navigator.geocoder object', function () {

        it("should exist", function () {
            expect(navigator.geocoder).toBeDefined();
        });

	    describe('.geocodeString function', function () {
			beforeEach(function(done) {
		      done();
		    }, 1000);
		    
	        it(" should exist", function () {
    	        expect(navigator.geocoder.geocodeString).toBeDefined();
        	});

	        it(" should return one object result {address, longitude, latitude} by default", function (done) {
	        	navigator.geocoder.geocodeString(function (result) {
	        		console.log(result);
	        		expect(result).not.toBeNull();
	        		// is not an array
	        		expect(typeof result).toBe("object");
	        		expect('length' in result).toBe(false);
	        		expect(result.address).not.toBeNull();
	        		expect(result.latitude).not.toBeNull();
	        		expect(result.longitude).not.toBeNull();
	        		done();
	        	}, function(err) {
	        		console.log(err);
	        		expect(err).not.toBeNull();
	        		done.fail('error callback called');
	        	}, "rue de paris");
        	}, 10000);

	        it(" should return an array with multiple results {address, longitude, latitude} if asked to", function (done) {
	        	navigator.geocoder.geocodeString(function (result) {
	        		console.log(result);
	        		expect(result).not.toBeNull();
	        		// is an array
	        		expect(typeof result).toBe("object");
	        		expect('length' in result).toBe(true);
	        		expect(result.length).toBe(2);

	        		expect(result[0].address).not.toBeNull();
	        		expect(result[0].latitude).not.toBeNull();
	        		expect(result[0].longitude).not.toBeNull();

	        		expect(result[1].address).not.toBeNull();
	        		expect(result[1].latitude).not.toBeNull();
	        		expect(result[1].longitude).not.toBeNull();

	        		done();
	        	}, function(err) {
	        		console.log(err);
	        		expect(err).not.toBeNull();
	        		done.fail('error callback called');
	        	}, "rue de paris", 2);
        	}, 10000);
        	
			afterEach(function(done) {
		      done();
		    }, 1000);
        });

	    describe('.reverseGeocodeLatLong function', function () {

	        it(" should exist", function () {
    	        expect(navigator.geocoder.reverseGeocodeLatLong).toBeDefined();
        	});
        
        
	        it(" should return a valid result {address, longitude, latitude}", function (done) {
	        	navigator.geocoder.reverseGeocodeLatLong(function (result) {
	        		console.log(result);
	        		expect(result).not.toBeNull();
	        		// is not an array
	        		expect(typeof result).toBe("object");
	        		expect('length' in result).toBe(false);

	        		expect(result.address).not.toBeNull();
	        		expect(result.latitude).not.toBeNull();
	        		expect(result.longitude).not.toBeNull();

	        		done();
	        	}, function(err) {
	        		console.log(err);
	        		expect(err).not.toBeNull();
	        		done.fail('error callback called');
	        	}, 51.523779, -0.158511);
        	}, 10000);
        	
        });

    });

};
