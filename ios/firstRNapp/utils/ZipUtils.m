//
//  ZipUtils.m
//  firstRNapp
//
//  Created by jun on 2019/4/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "ZipUtils.h"

@implementation ZipUtils
+ (Boolean)zipFile : (NSString*)fileName destPath:(NSString*)path{
  Boolean result = false;
  ZipArchive* zip = [[ZipArchive alloc] init];
  
  NSString* unzipfile = fileName;
  NSString* unzipto = path ;
  if( [zip UnzipOpenFile:unzipfile] )
  {
    BOOL ret = [zip UnzipFileTo:unzipto overWrite:YES];
    if( NO == ret )
    {
      NSLog(@"zipFile zip failed");
    } else {
      NSLog(@"zipFile zip to %@",path);
      result = true;
    }
    [zip UnzipCloseFile];
  } else {
    NSLog(@"zipFile zip file can't be opened");
  }
  return result;
  
}
@end
