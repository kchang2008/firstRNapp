//
//  SceneWebviewRoot.m
//  firstRNapp
//
//  Created by jun on 2019/5/19.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "SceneWebviewRoot.h"
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>

@implementation SceneWebviewRoot
- (void)viewDidLoad {
    [super viewDidLoad];
  
    //设置返回按钮
    self.navigationItem.leftBarButtonItem =  [[UIBarButtonItem alloc] initWithTitle:@"返回" style:UIBarButtonItemStyleDone target:self action:@selector(buttonClicked:)];
    self.navigationItem.leftBarButtonItem.tag = 1004;
  
    self.navigationItem.title = @"支付界面";
  
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                     moduleName:@"Payment"
                                              initialProperties:nil];
    rootView.frame = [UIScreen mainScreen].bounds;
    rootView.backgroundColor = [[UIColor alloc] initWithRed:176/255.0 green:224/255.0 blue:230/255.0 alpha:0.9];
    [self.view addSubview: rootView];
  
    [[ViewControllerManager sharedControllerManager] addViewController:self];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    NSURL* jsCodeLocation;
    // 拼接要写入文件的路径
    NSArray *documentsPathArr = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsPath = [documentsPathArr lastObject];
    
    NSString *fileName = [documentsPath stringByAppendingPathComponent:@"bundle/payment.ios.bundle"];
    NSLog(@"didFinishLaunchingWithOptions filename=%@",fileName);
    
    if ([[NSFileManager defaultManager] fileExistsAtPath:fileName]) {
        jsCodeLocation = [NSURL URLWithString:fileName];
    } else {
        NSLog(@"file isnot exist!");
    }
    
    return jsCodeLocation;
    
}

- (void)buttonClicked:(id)sender {
    [[ViewControllerManager alloc] removeViewController:self];
    [self dismissViewControllerAnimated:true completion:nil];
}
@end
