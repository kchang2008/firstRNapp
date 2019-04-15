//
//  ControllerManager.h
//  firstRNapp
//
//  Created by jun on 2019/4/13.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface ViewControllerManager : NSObject
{
  //本类中使用到的成员变量
  UIViewController* currVC;
  NSMutableArray* vcArray;
}

//使用类名直接访问 [类名 方法名]
+(instancetype)sharedControllerManager;

-(void)addViewController:(UIViewController*)controller;
-(void)removeViewController:(UIViewController*)controller;
-(UIViewController*)getCurrentViewController;
-(NSUInteger)getViewControllerCount;
@end
