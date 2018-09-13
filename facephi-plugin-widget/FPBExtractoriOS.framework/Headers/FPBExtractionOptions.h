#import <Foundation/Foundation.h>
#import "FPBExtractionMode.h"

/**
	Represents the configuration of the extraction module.
	<p>
	Encapsulates all the configuration parameters used by the extraction module. It can be used
	to set a configuration to an object of the {@link FPBExtractor} class.
	</p>
*/
@interface FPBExtractionOptions : NSObject<NSCopying>

/**
     Gets or sets extraction mode.
 */
@property (nonatomic) FPBExtractionMode extractionMode;

/**
 Gets or sets liveness tag.
 */
@property (nonatomic) int livenessTag;

/**
 Gets or sets liveness tag.
 */
@property (nonatomic) NSData* userTags;

@end
