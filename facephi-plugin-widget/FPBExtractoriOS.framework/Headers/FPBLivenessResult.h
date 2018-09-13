#import <Foundation/Foundation.h>
#import "FPBLivenessDiagnostic.h"

/**
	Liveness result.
*/
@interface FPBLivenessResult : NSObject<NSCopying>

/**
	Liveness diagnostic.
	@see FPBLivenessDiagnostic
*/
@property (nonatomic,readonly) FPBLivenessDiagnostic livenessDiagnostic;

/**
	Indicates the penalty.
*/
@property (nonatomic,readonly) int penalty;


@end
