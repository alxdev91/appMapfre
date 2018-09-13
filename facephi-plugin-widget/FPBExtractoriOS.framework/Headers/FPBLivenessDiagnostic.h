/** 
	\file FPBLivenessDiagnostic.h
*/
/**
	Represents the different states of liveness detection process.
*/
typedef NS_ENUM(NSUInteger, FPBLivenessDiagnostic) {
    /** Not rated. */
	FPBLivenessDiagnosticNotRated = 0, 
    
	/** Photo detected. */
    FPBLivenessDiagnosticPhotoDetected = 1, 
    
	/** Photography is not detected. */
    FPBLivenessDiagnosticLivenessDetected = 2, 
	
	/** Unsuccess. */
	FPBLivenessDiagnosticUnsuccess = 3, 
	
	/** Unsuccess due to low performance.. */
	FPBLivenessDiagnosticUnsuccessLowPerformance = 4, 
	
	/** Unsuccess due to glasses. */
	FPBLivenessDiagnosticUnsuccessGlasses = 5, 
	
	/** Unsuccess due to bad light conditions. */
	FPBLivenessDiagnosticUnsuccessLight = 6, 
};



