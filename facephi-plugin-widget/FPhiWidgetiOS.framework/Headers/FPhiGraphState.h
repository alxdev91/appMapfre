//
//  FPhiGraphStateLogic.h
//  FPhiUCios
//
//  Created by Ruben Leal on 24/5/17.
//  Copyright © 2017 Facephi Biometria S.A. All rights reserved.
//

#import <UIKit/UIKit.h>

@class FPhiGraph;

@interface FPhiGraphState : NSObject

@property FPhiGraph *graph;

-(void)onEnterState:(NSString *)stateName :(CGSize)canvasSize;
-(void)calculateButtonPosition:(NSString *)stateName :(CGSize)canvasSize;
-(void)execute:(NSString *)stateName :(CGSize)canvasSize;
-(void)onTap:(NSString *)stateName :(CGPoint)position :(CGSize)canvasSize;
-(void)onTouchesBegan:(NSString *)stateName :(NSSet<UITouch *> *)touches :(UIView *)view;
-(void)onTouchesEnded:(NSString *)stateName :(NSSet<UITouch *> *)touches :(UIView *)view;
-(void)onSwipe:(NSString *)stateName :(UISwipeGestureRecognizer *)swipe;
-(void)onPlayerDidReachEnd:(NSString *)stateName :(NSNotification *)notification;

-(void)draw:(CGContextRef)context :(CGSize)canvasSize :(NSString *)stateName;
-(void)drawButtons:(CGContextRef)context :(CGSize)canvasSize :(NSString *)stateName;

@end
