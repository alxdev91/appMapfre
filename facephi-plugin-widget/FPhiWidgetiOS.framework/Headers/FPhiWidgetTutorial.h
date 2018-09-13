
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "FPhiWidgetTutorialEnum.h"

/**
 Entry point of tutorial UIViewControllers.
 */
@interface FPhiWidgetTutorial : NSObject

/**
 View Controller target.
*/
//@property (class) UIViewController *vcTarget;

/**
 This method sets the View Controller target.
*/
//+ (void) setVcTarget:(UIViewController *)value;

/**
 This method show the choosen wizard tutorial.
 param actualVC: The viewcontroller which is load now
 param tutorialId: The specific tutorial to show
 */
+(void)ShowTutorial :(UIViewController *)actualVC :(FPhiWidgetTutorialEnum)tutorialId :(NSString *)resourcesPath;

/**
 This method show the choosen wizard tutorial.
 param actualVC: The viewcontroller which is load now
 param tutorialId: The specific tutorial to show
 param target: optional target when tutorial finish
 */
+(void)ShowTutorial :(UIViewController *)actualVC :(FPhiWidgetTutorialEnum)tutorialId :(NSString *)resourcesPath :(UIViewController *)target;

@end
