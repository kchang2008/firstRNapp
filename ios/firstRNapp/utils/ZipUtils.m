//
//  ZipUtils.m
//  firstRNapp
//
//  Created by jun on 2019/4/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "ZipUtils.h"

@implementation ZipUtils
+ (void)zipFile : (NSString*)fileName destPath:(NSString*)path{
  ZipArchive* zip = [[ZipArchive alloc] init];
  
  NSString* unzipfile = fileName;
  NSString* unzipto = path ;
  if( [zip UnzipOpenFile:unzipfile] )
  {
    BOOL ret = [zip UnzipFileTo:unzipto overWrite:YES];
    if( NO==ret )
    {
      NSLog(@"zipFile zip failed");
    } else {
      NSLog(@"zipFile zip to %@",path);
    }
    [zip UnzipCloseFile];
  } else {
    NSLog(@"zipFile zip file can't be opened");
  }
  
  
}
@end
