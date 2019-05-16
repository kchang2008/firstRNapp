/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "DownloadManager.h"
#import <React/RCTBridge.h>
#import "DiffMatchPatch.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"firstRNapp"
                                            initialProperties:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  self.rootViewController = [UINavigationController new];
  self.rootViewController.view = rootView;
  self.window.rootViewController = self.rootViewController;
  [self.window makeKeyAndVisible];
  
  [[ViewControllerManager sharedControllerManager] addViewController:self.rootViewController];
  return YES;
}

- (void) checkPatch : (NSString*)path{
  NSString* patch_file = [path stringByAppendingString:@"/bundle/patch_ios.jsbundle"];
  NSString* old_bundle_file = [path stringByAppendingString:@"/bundle/index.ios.jsbundle"];
  if ( [ self.manage fileExistsAtPath:patch_file] == YES
      && [ self.manage fileExistsAtPath:old_bundle_file] == YES) {
    NSString *aContent = [NSString stringWithContentsOfFile:patch_file encoding:NSUTF8StringEncoding error:nil];
    NSString *bContent = [NSString stringWithContentsOfFile:old_bundle_file encoding:NSUTF8StringEncoding error:nil];
    
    //有补丁包,实例化对比对象
    DiffMatchPatch *dmp = [[DiffMatchPatch alloc]init];
    
    //获取差异化文件内容
    NSData *patchesData = [NSData dataWithContentsOfFile:patch_file];
    //解析差异化文件内容
    NSString *patchesStr = [[NSString alloc]initWithData:patchesData encoding:NSUTF8StringEncoding];
    
    //生成补丁
    NSMutableArray *patches = [dmp patch_fromText:patchesStr error:nil ];
    
    if ( patches.count > 0 ) {
      //应用补丁
      NSArray *results = [dmp patch_apply:patches toString:bContent];
      
      //results 是个数组，数组第一个字段为应用补丁后的内容。（字符串）
      //然后将应用后的内容回写到原文件
      NSString *string = results.firstObject;
      [string writeToFile:old_bundle_file atomically:YES];
      
      NSLog(@"已经更新完成");
    } else {
      NSLog(@"无更新");
    }
  }
}

- (NSFileManager *)manage{
  if (!_manage){
    _manage = [NSFileManager defaultManager];
  }
  return _manage;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  NSURL *jsCodeLocation;
  
  NSArray *documentsPathArr = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsPath = [documentsPathArr lastObject];
  
  // 拼接要写入文件的路径
  NSString *path = [documentsPath stringByAppendingPathComponent:@"bundle/index.ios"];
  NSString *fileName = [documentsPath stringByAppendingPathComponent:@"bundle/index.ios.jsbundle"];
  NSLog(@"didFinishLaunchingWithOptions path=%@,filename=%@",path,fileName);
  
  if ([[NSFileManager defaultManager] fileExistsAtPath:fileName]) {
    [ self manage ];
    [ self checkPatch:documentsPath ];
    
    jsCodeLocation = [NSURL URLWithString:fileName];//[[NSBundle mainBundle] URLForResource:path withExtension:@"jsbundle"];
    NSLog(@"didFinishLaunchingWithOptions jsCodeLocation=%@",jsCodeLocation.absoluteURL.absoluteString);
  } else {
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];
    NSLog(@"didFinishLaunchingWithOptions default bundle file");
  }
  
  return jsCodeLocation;
}

//后台下载管理
-(void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)(void))completionHandler {
  [DownloadManager sharedInstance].downloadSessionCompletionHandler = completionHandler;
}
@end
