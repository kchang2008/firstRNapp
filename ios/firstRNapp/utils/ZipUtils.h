//
//  ZipUtils.h
//  firstRNapp
//
//  Created by jun on 2019/4/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ZipArchive.h"

@interface ZipUtils : NSObject
+ (void)zipFile : (NSString*)fileName destPath:(NSString*)path;
@end
