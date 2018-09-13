
#import <Foundation/Foundation.h>
#import "FPhiWidgetFrameObj.h"
/**
    Set of behavior that is expected of an object in a given situation
 */
@protocol FPhiWidgetProtocol <NSObject>

/**
    Invoked when the extraction process is finished.
    - Mandatory method
 */
-(void)ExtractionFinished;


@optional

/**
 Invoked when the extraction process fail.
 - Optional method
 */
-(void)ExtractionFailed:(NSError *) error;

/**
 Invoked when extraction process is cancelled by user.
 - Optional method
 */
-(void)ExtractionCancelled;

/**
 Invoked when extraction process is aborted by timeout.
 - Optional method
 */
-(void)ExtractionTimeout;

/**
 *
 */
-(BOOL) QRValidator:(NSString *)qrData;

@end
