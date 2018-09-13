#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <QuartzCore/QuartzCore.h>
#import <CoreVideo/CoreVideo.h>
#import <CoreMedia/CoreMedia.h>
#import <CoreText/CoreText.h>
#import "FPhiWidgetExtractionMode.h"
#import "FPhiWidgetExtractionData.h"
#import <FPBExtractoriOS/FPBExtractoriOS.h>

#import "FPhiGraph.h"

//#define RESOURCES_BUNDLE @"FPhiWidgetios.framework"

typedef NS_ENUM(NSUInteger, FPhiWidgetLivenessMode) {
    
    /**
     No liveness mode
     */
    LMLivenessNone = 0,
    
    /**
     liveness blink mode
     */
    LMLivenessBlink = 1,
    
    /**
     liveness blink mode
     */
    //LMLivenessMove = 2,
    
};

/**
 User control object. Manages ipad and iphone cameras and delivery results from a extraction process.
*/
@interface FPhiWidget : UIViewController <AVCaptureVideoDataOutputSampleBufferDelegate,AVCaptureMetadataOutputObjectsDelegate, FPhiGraphProtocol, NSXMLParserDelegate>

/**
 Extraction mode used to perform extraction process.
 */
@property (nonatomic) FPhiWidgetExtractionMode extractionMode;

/**
 Scanning qr code functionality. Available in Authenticate mode. Default value=false
 */
@property (nonatomic) bool qrMode;

/**
 Authenticate liveness mode Default value=LMLivenessNone
 */
@property (nonatomic) FPhiWidgetLivenessMode livenessMode;

/**
 Optional userTag. Custom app tag recorded in extraction template. 4 bytes length. Additional bytes in NSData will be truncated!!!
 */
@property (nonatomic) NSData* userTags;

/**
 Debug mode property. This property is only for debugging purposes. False by default.
 */
@property (nonatomic) bool debugMode;

/**
 Scene timeout property. This property sets the timeout in the information screens (In seconds, 0 or less not apply).
 */
@property (nonatomic) float sceneTimeout;

/**
 Results of a extraction process.
 */
@property (nonatomic) FPhiWidgetExtractionData *results;

/**
 Liveness diagnostic
 */
@property (nonatomic) FPBLivenessDiagnostic livenessDiagnostic;

/**
 LivenessMove diagnostic
 */
@property (nonatomic) FPBLivenessDiagnostic livenessMoveDiagnostic;

/**
 if enabled, returned images are cropped to face rectangle. True by default.
 Activating this feature, face and eyes coordinates are not corresponding with cropped image returned.
 */
@property (nonatomic) bool cropImagesToFace;

/**
 Ratio used to expand or shrink face rectangle.
   ratio=1.0f original face rectangle
   ratio=1.2f 20% bigger face rectangle (default value)
   ratio=0.8f 20% smaller face rectangle
 */
@property (nonatomic) float cropRatio;

/**
 optional locale used to programatically force widget locale.
 */
@property (nonatomic) NSString *locale;

/**
 Initialize a new user control object.
 param frontCameraIfAvailable: By default rear camera used. If device's front camera is available and frontCameraIfAvailable is true, front camera is used.
 */
- (id)init :(bool)frontCameraIfAvailable :(NSString *)resourcesPath :(id)delegate;
    	
/**
 Initialize a new user control object.
 param frontCameraIfAvailable: By default rear camera used. If device's front camera is available and frontCameraIfAvailable is true, front camera is used.
 */
- (id)init :(bool)frontCameraIfAvailable :(NSString *)resourcesPath :(id)delegate :(NSError **)error;

/**
 Start a full extraction process. When process was finished ExtractionFinished method from protocol FPhiUCProtocol is executed.
 */
- (void)StartExtraction;

/**
 Stops a extraction process.
 */
- (void)StopExtraction;

/**
 Transform rectangle from camera image space to display space.
 Extractor returns face and eyes information in image space. Use this method to calculate in display space in order to paint in the correct place.
 */
//-(CGRect)TransformToDisplaySpace:(CGRect)imageSpaceRectangle;

/**
 Return byte buffer representation of img in PNG Format
 */
+(NSData *)PNGRepresentationFromImage :(UIImage *)img;

/**
 Return byte byffer representation of img in JPEG Format.
 Parameter compressionQuality: Range [0..1]
 */
+(NSData *)JPGRepresentationFromImage :(UIImage *)img :(CGFloat)compressionQuality;

@end
