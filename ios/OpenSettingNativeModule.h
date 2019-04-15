//
//  OpenSettingNativeModule.h
//  firstRNapp
//
//  Created by jun on 2019/3/17.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "SettingsViewController.h"
#import "AppDelegate.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "ViewControllerManager.h"

//如果需要支持发送消息给服务器，就要继承RCTEventEmitter这个类，RCTBridgeModule是接口
@interface OpenSettingNativeModule : RCTEventEmitter<RCTBridgeModule>

@end
