
#ifndef FPhiUCError_h
#define FPhiUCError_h

/**
	User control error.
 */
typedef NS_ENUM(NSUInteger, FPhiWidgetError)
{
    /**
     Nothing.
     */
    FWENoError = 0,
    
	/**
	 Unknown error.
	*/
    FWEUnknown = 1,
    
	/**
	 Camera permission error.
	*/
    FWECameraPermission = 2
};


#endif /* FPhiUCError_h */
