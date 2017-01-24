
# Apache Cordova Geocoder Plugin

When you want to use the native Geocoding/Reverse Geocoding capabilities of your device without using other APIs.

## Installation

    git clone https://github.com/doppelganger9/cordova-plugin-geocoder.git
    cd my-project
    cordova plugin add ../cordova-plugin-geocoder

or, better, directly with the repo URL :

    cordova plugin add https://github.com/doppelganger9/cordova-plugin-geocoder.git

## Sample App

*Prerequisite* : you have all the prerequisite to develop, build and run ios and/or android platforms for Cordova.

You can run the sample app to see the plugin in action. Open ios simulator or android emulator.

    cd sample
    cordova prepare
    cordova build
    
    # to run ios platform:    
    cordova run ios
    # to run android platform:    
    cordova run android

You can then enter Safari development menu or Chrome inspect to debug the webviews and test
the plugin from the Inspector Console.

## Supported Platforms

- iOS (via MapKit)
- Android (via Android Location)

## Methods

- navigator.geocoder.geocodeString
- navigator.geocoder.reverseGeocodeLatLong

## navigator.geocoder.geocodeString

To Forward geocode a given address to find coordinates.

    navigator.geocoder.geocodeString(successCallback, errorCallback, addressString);

### Parameters

- __addressString__: The address to be geocoded. (String)
- __nbMaxResults__: The maximum number of addresses to be returned. (OPTIONAL, defaults to 1) (Int)

### Example

    function onError(err) {
        alert(JSON.stringify(err));
    }
    function onSuccess(coords) {
        alert("The location is lat="+coords.latitude+", lon="+coords.longitude);
    }

    navigator.geocoder.geocodeString(onSuccess, onError, "221B Bakers Street, London");

    // or a one liner when you debug your webview in the sample app :
    navigator.geocoder.geocodeString(function onSuccess(data) {console.debug(data, JSON.stringify(data));}, function onError(err) {console.debug(err, JSON.stringify(err));}, "221B Bakers Street, London");

### Sample response

    iOS :
    {
        "address":"221B Baker Street, London, NW1, England",
        "locality":"London",
        "longitude":-0.1582827815654968,
        "streetName":"Baker Street",
        "postalCode":"NW1",
        "latitude":51.5231895720848,
        "streetNumber":"221B"
    }

    android :
    {
        "latitude":48.8561594,
        "longitude":2.4254903,
        "address":"Rue de Paris, Montreuil, France"
    }

## navigator.geocoder.geocodeString, with more than one result

To forward geocode a given address with multiple results.

    navigator.geocoder.geocodeString(successCallback, errorCallback, addressString , nbMaxResults);

### Example

    function onError(err) {
        alert(JSON.stringify(err));
    }
    function onSuccess(coords) {
        for (var i = 0; i<2; i++) {
            alert("The location is lat=" + coords[i].latitude + ", lon=" + coords[i].longitude + ", address=" + coords[i].address);
        }
    }

    navigator.geocoder.geocodeString(onSuccess, onError, "221B Bakers Street, London", 2);
    navigator.geocoder.geocodeString(onSuccess, onError, "rue de paris", 2);

    // or a one liner when you debug your webview in the sample app :
    navigator.geocoder.geocodeString(function onSuccess(data) {console.debug(data, JSON.stringify(data));}, function onError(err) {console.debug(err, JSON.stringify(err));}, "221B Bakers Street, London", 2);
    navigator.geocoder.geocodeString(function onSuccess(data) {console.debug(data, JSON.stringify(data));}, function onError(err) {console.debug(err, JSON.stringify(err));}, "rue de paris", 2);

### Sample response

    iOS :
    [
        {
            "address":"221B Baker Street, London, NW1, England",
            "locality":"London",
            "longitude":-0.1582827815654968,
            "streetName":"Baker Street",
            "postalCode":"NW1",
            "latitude":51.5231895720848,
            "streetNumber":"221B"
        },
        {
            "address":"221B Baker St, London ON, Canada",
            "locality":"London",
            "longitude":-81.24608566470123,
            "streetName":"Baker St",
            "postalCode":"N6C",
            "latitude":42.96739489307311,
            "streetNumber":"221B"
        }
    ]

    android :
    [
        {
            "latitude":48.8561594,
            "longitude":2.4254903,
            "address":"Rue de Paris, Montreuil, France"
        },{
            "latitude":48.8239611,
            "longitude":2.4099273,
            "address":"Rue de Paris, Charenton-le-Pont, France"
        }
    ]

## navigator.geocoder.reverseGeocodeLatLong

To reverse geocode a given Latitude, Longitude position to find a corresponding address using native SDKs.

    navigator.geocoder.reverseGeocodeLatLong(successCallback, errorCallback, latitude, longitude);

### Parameters

- __latitude__: The latitude. (Double)
- __longitude__: The longitude. (Double)

### Example

    function onError(err) {
        alert(JSON.stringify(err));
    }
    function onSuccess(coords) {
        alert("The location is lat="+coords.latitude+", lon="+coords.longitude);
    }

    navigator.geocoder.reverseGeocodeLatLong(onSuccess, onError, 51.523779, -0.158511);

    // or a one liner when you debug your webview in the sample app :
    navigator.geocoder.reverseGeocodeLatLong(function onSuccess(data) {console.debug("data", data, JSON.stringify(data));}, function onError(err) {console.error(err, JSON.stringify(err));}, 48.924246, 2.359955);
    
### Sample response

    iOS :
    {
        "address":"Sherlock Holmes Museum, 239 Baker Street, London, NW1 6XE, England",
        "locality":"London",
        "longitude":-0.1585802,
        "streetName":"Baker Street",
        "postalCode":"NW1 6XE",
        "latitude":51.5237492,
        "streetNumber":"239"
    }
    
    android :
    {
        "latitude":48.9241631,
        "longitude":2.3577677,
        "address":"211 Mail de l'Ellipse, 93200 Saint-Denis, France"
    }