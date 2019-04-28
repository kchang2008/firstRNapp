//
//  Toast.h
//  firstRNapp
//
//  Created by jun on 2019/4/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface Toast : NSObject

+ (void) addToastWithString:(NSString *)string inView:(UIView *)view;
+ (void) removeToastWithView:(NSTimer *)timer;
@end
