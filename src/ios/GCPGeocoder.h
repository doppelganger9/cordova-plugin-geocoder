/**
 * GCPGeocoder.h -- Apache Cordova Geocoder Plugin / iOS platform header file.
 *
 * Copyright (C) 2017 David LACOURT
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>
#import <Cordova/CDVPlugin.h>


@interface GCPGeocoder : CDVPlugin {}

- (void)geocodeString:(CDVInvokedUrlCommand*)command;
- (void)reverseGeocodeLatLong:(CDVInvokedUrlCommand*)command;

@end
