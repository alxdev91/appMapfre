
#import <Foundation/Foundation.h>
#import <FPBExtractoriOS/FPBExtractoriOS.h>

/**
 Data provided by the extraction process
 */
@interface FPhiWidgetExtractionData : NSObject<NSCopying>

/**
 array of images extracted from camera. When extraction process finish and status = UCFinish, this array contains only valid images used to extracting patterns.
 Each element of array is a ExtractionRecord containing image data, extraction time, etc...
 Maximum length of array is determined by maxNumPatterns integer.
 */
@property (nonatomic) NSMutableArray *images;

/**
 Results of a extraction process.
 */
@property (nonatomic) FPBExtractionResult *result;


/**
 QR decoded data available in modes EMAuthenticateQR and EMWizardLivenessQR
 */
@property (nonatomic) NSString *qrData;

@end
