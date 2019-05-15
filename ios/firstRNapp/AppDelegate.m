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
