//
//  OpenSettingNativeModule.m
//  firstRNapp
//
//  Created by jun on 2019/3/17.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "OpenSettingNativeModule.h"

@implementation OpenSettingNativeModule

SettingsViewController *nativeSettingsVC;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(openNativeSettingsVC) {
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *delegate = (AppDelegate *)([UIApplication sharedApplication].delegate);
    UINavigationController *rootNav = delegate.rootViewController;
    
    nativeSettingsVC = [[SettingsViewController alloc] init];
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:nativeSettingsVC];
    [rootNav presentViewController:nav animated:YES completion:nil];
  });
}


/// RN向原生传递字符串
RCT_EXPORT_METHOD(getStringFromReactNative:(NSString *)s) {
  NSString *msg = [NSString stringWithFormat:@"RN传递过来的字符串：%@", s];
   [self showAlertController:msg setMessage:@"This is a test alert!"];
}

/// RN向原生传递字典
RCT_EXPORT_METHOD(getDictionaryFromRN:(NSDictionary *)dict) {
  NSString *name = [dict objectForKey:@"title"];
  NSLog(@"RN传递过来的字典：%@", dict);
  NSLog(@"RN传递过来的title：%@", name);
}

/// 以promise形式回传数据到RN端
RCT_EXPORT_METHOD(passPromiseBackToRN:(NSString *)msg resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  if (![msg isEqualToString:@""]) {
    resolve(@(YES));
  } else {
    reject(@"warning", @"msg cannot be empty!", nil);
  }
}

+ (id)allocWithZone:(struct _NSZone *)zone {
  static  OpenSettingNativeModule *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    NSNotificationCenter *defaultCenter = [NSNotificationCenter defaultCenter];
    [defaultCenter removeObserver:self];
    [defaultCenter addObserver:self
                      selector:@selector(sendCustomEvent:)
                          name:@"sendCustomEventNotification"
                        object:nil];
  }
  return self;
}

/// 接收通知的方法，接收到通知后发送事件到RN端。RN端接收到事件后可以进行相应的逻辑处理或界面跳转
- (void)sendCustomEvent:(NSNotification *)notification {
  [self sendEventWithName:@"CustomEventName" body:@"这是发给RN的字符串"];
}

/// 重写方法，定义支持的事件集合
- (NSArray<NSString *> *)supportedEvents {
  return @[@"CustomEventName"];
}

//弹出提示框
- (void)showAlertController: (NSString * )title setMessage:(NSString * )message
{
  //弹框提示
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:title                                                                   message:message preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"jump" style:UIAlertActionStyleDefault                                                          handler:^(UIAlertAction * action) {
      //响应事件
      NSLog(@"action = %@", action);
  }];
  
  UIAlertAction* cancelAction = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleDefault                                                          handler:^(UIAlertAction * action) {
      //响应事件
      NSLog(@"action = %@", action);
      [nativeSettingsVC dismissViewControllerAnimated:true completion:nil];
  }];
  
  [alert addAction:defaultAction];
  [alert addAction:cancelAction];
  
  [nativeSettingsVC presentViewController:alert animated:YES completion:nil];
}

@end
