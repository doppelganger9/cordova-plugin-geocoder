/**
 * GCPGeocoder.m -- Apache Cordova Geocoder Plugin / iOS platform implementation.
 *
 * Copyright (C) 2017 David LACOURT
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
#import "GCPGeocoder.h"

@implementation GCPGeocoder

- (void)geocodeString:(CDVInvokedUrlCommand *)command {
    NSString* callbackId = command.callbackId;
    NSString* addressString = [command.arguments objectAtIndex:0];
    NSString* nbMaxResultString = @"1";
    if (command.arguments.count > 1) {
        nbMaxResultString = [command.arguments objectAtIndex:1];
    }
    NSInteger nbMaxResult = [nbMaxResultString integerValue];
    
    [self.commandDelegate runInBackground:^{
        CLGeocoder *geocoder = [[CLGeocoder alloc] init];
        __block CDVPluginResult *result;
        [geocoder geocodeAddressString:addressString completionHandler:^(NSArray *placemarks, NSError *error) {
            if (error) {
                NSLog(@"%@", error);
                
                result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.localizedDescription];
                
            } else {
                if (placemarks.count > 0) {
                    if (nbMaxResult == 1) {
                        MKPlacemark *place = [placemarks objectAtIndex:0];
                        NSDictionary *loc = [self locationDictionaryFromPlaceMark:place];
                        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:loc];
                    } else if (nbMaxResult > 1) {
                        NSMutableArray *locations = [NSMutableArray array];
                        for (NSInteger i = 0; i < [placemarks count] && i < nbMaxResult; i++) {
                            MKPlacemark *place = [placemarks objectAtIndex:i];
                            NSDictionary *loc = [self locationDictionaryFromPlaceMark:place];
                            [locations addObject:loc];
                        }
                        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:locations];
                    } else {
                        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"Invalid nb max result : %@", nbMaxResultString]];
                    }
                } else {
                    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"no address found !"];
                }
            }
            [self.commandDelegate sendPluginResult:result callbackId:callbackId];
        }];
    }];
}

- (NSDictionary *)locationDictionaryFromPlaceMark:(MKPlacemark *)aPlace {
    NSString *addressString = [[aPlace.addressDictionary objectForKey:@"FormattedAddressLines"] componentsJoinedByString:@", "];
    
    NSDictionary *loc = [[NSDictionary alloc] initWithObjectsAndKeys:
                        [NSNumber numberWithDouble:aPlace.location.coordinate.latitude], @"lat",
                        [NSNumber numberWithDouble:aPlace.location.coordinate.longitude ], @"lng",
                        addressString, @"formattedAddress",
                        aPlace.thoroughfare, @"street",
                        aPlace.subThoroughfare ? aPlace.subThoroughfare : @"", @"streetNumber",
                        aPlace.locality ? aPlace.locality : @"", @"town",
                        aPlace.country ? aPlace.country : @"", @"country",
                        aPlace.ISOcountryCode ? aPlace.ISOcountryCode : [aPlace.addressDictionary valueForKey:@"CountryCode"], @"countryCode",
                        aPlace.postalCode ? aPlace.postalCode : @"", @"postalCode", nil];                         
    return loc;
}

- (void)reverseGeocodeLatLong:(CDVInvokedUrlCommand*)command {
    NSString *callbackId = command.callbackId;
    NSString *latString = [command.arguments objectAtIndex:0];
    NSString *longString = [command.arguments objectAtIndex:1];
    
    CLLocation *location = [[CLLocation alloc]initWithLatitude:[latString doubleValue] longitude:[longString doubleValue]];
    __block CDVPluginResult *result;
    [self.commandDelegate runInBackground:^{
        CLGeocoder *geocoder = [[CLGeocoder alloc] init];
        
        [geocoder reverseGeocodeLocation:location completionHandler:^(NSArray* placemarks, NSError* error) {
            if (error) {
                NSLog(@"%@", error);
                result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.localizedDescription];
            } else {
                
                if ([placemarks count] > 0) {
                    MKPlacemark *place = [placemarks objectAtIndex:0];
                    NSDictionary *loc = [self locationDictionaryFromPlaceMark:place];
                    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:loc];
                } else {
                    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"no address found for this latitude and longitude !"];
                }
            }
            [self.commandDelegate sendPluginResult:result callbackId:callbackId];
        }];
    }];
}

@end
