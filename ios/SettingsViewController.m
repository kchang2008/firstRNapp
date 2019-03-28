//
//  SettingsViewController.m
//  firstRNapp
//
//  Created by jun on 2019/3/17.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "AppDelegate.h"
#import "SettingsViewController.h"

@implementation SettingsViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.navigationItem.title = @"设置界面";
  
  self.view.backgroundColor = [UIColor purpleColor];
  
  UILabel *label = [[UILabel alloc] init];
  
  //获取屏幕宽度：[[UIScreen mainScreen] bounds].size.width
  //获取屏幕高度： [[UIScreen mainScreen] bounds].size.height
  label.frame = CGRectMake(10, 30, 240, 140);
  label.backgroundColor = [ UIColor orangeColor];
  label.text = @"上海钱拓金融欢迎您";
  label.font = [ UIFont systemFontOfSize: 14.0 ];
  
  //后一个字体会覆盖前一个字体
  label.font = [ UIFont italicSystemFontOfSize:14.0 ];
  
  label.textColor = [ UIColor colorWithRed:0.82 green:0.08 blue:0.10 alpha:1 ];
  label.textAlignment = NSTextAlignmentCenter;
  
  //打印系统自带字体库
  //    for (NSString *name in [ UIFont familyNames ]) {
  //        NSLog(@"%@",name);
  //    }
  
  //使用系统字体库
  label.font = [UIFont fontWithName:@"Zapfino" size:10.0];
  
  //设置断行方式
  label.lineBreakMode = NSLineBreakByCharWrapping;
  
  //设置行数（0或者-1表示由系统计算确切行数）
  label.numberOfLines = 0;
  
//  //根据字体长度动态去计算标签长度
//  CGSize size = [ label.text sizeWithFont:label.font constrainedToSize:CGSizeMake(240, 1000) lineBreakMode:NSLineBreakByWordWrapping];
//  label.frame = CGRectMake( label.frame.origin.x,label.frame.origin.y,label.frame.size.width,size.height);
  
  //label加圆角
  label.layer.masksToBounds = YES;
  label.layer.cornerRadius = 10;
  
  [self.view addSubview:label];
  
  UIButton *event_button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
  event_button.frame = CGRectMake(80.0, 210.0, 160.0, 40.0);
  event_button.backgroundColor =[UIColor orangeColor];
  [event_button setTitle:@"发送消息给RN" forState:UIControlStateNormal];
  [event_button addTarget:self action:@selector(buttonClicked:) forControlEvents:UIControlEventTouchUpInside];
  event_button.tag = 1001;
  [self.view addSubview:event_button];
}

- (void)buttonClicked:(id)sender {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"sendCustomEventNotification" object:nil];
}

@end
