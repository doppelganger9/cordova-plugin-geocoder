#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>
#import <Cordova/CDVPlugin.h>


@interface GCPGeocoder : CDVPlugin {}

- (void)geocodeString:(CDVInvokedUrlCommand*)command;
- (void)reverseGeocodeLatLong:(CDVInvokedUrlCommand*)command;

@end
