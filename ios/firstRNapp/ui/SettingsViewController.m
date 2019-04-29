//
//  SettingsViewController.m
//  firstRNapp
//
//  Created by jun on 2019/3/17.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "AppDelegate.h"
#import "SettingsViewController.h"
#import "DownloadManager.h"

@interface SettingsViewController() <DownloadManagerDelegate>{
  DownloadManager* downloadManger;
}
//进度条
@property (nonatomic, strong) UIProgressView *progressView;
@end

@implementation SettingsViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  downloadManger = [DownloadManager new] ;
  downloadManger.delegate = self;
  
  //设置返回按钮
  self.navigationItem.leftBarButtonItem =  [[UIBarButtonItem alloc] initWithTitle:@"返回" style:UIBarButtonItemStyleDone target:self action:@selector(buttonClicked:)];
  self.navigationItem.leftBarButtonItem.tag = 1004;
  
  self.navigationItem.title = @"设置界面";
  
  self.view.backgroundColor = [UIColor purpleColor];
  
  UILabel *label = [[UILabel alloc] init];
  
  //获取屏幕宽度：[[UIScreen mainScreen] bounds].size.width
  //获取屏幕高度： [[UIScreen mainScreen] bounds].size.height
  label.frame = CGRectMake(10, 80, 240, 140);
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
  event_button.frame = CGRectMake(10.0, 250.0, 160.0, 40.0);
  event_button.backgroundColor =[UIColor orangeColor];
  [event_button setTitle:@"发送消息给RN" forState:UIControlStateNormal];
  [event_button addTarget:self action:@selector(buttonClicked:) forControlEvents:UIControlEventTouchUpInside];
  event_button.tag = 1001;
  [self.view addSubview:event_button];
  
  UIButton *update_button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
  update_button.frame = CGRectMake(10.0, 250.0, 160.0, 40.0);
  update_button.backgroundColor =[UIColor orangeColor];
  [update_button setTitle:@"更新bundle包" forState:UIControlStateNormal];
  [update_button addTarget:self action:@selector(buttonClicked:) forControlEvents:UIControlEventTouchUpInside];
  update_button.tag = 1002;
  [self.view addSubview:update_button];
}

- (void)buttonClicked:(id)sender {
  if ([sender tag] == 1001) {
     [[NSNotificationCenter defaultCenter] postNotificationName:@"sendCustomEventNotification" object:nil];
  } else if ([sender tag] == 1002) {
     //执行更新操作
     [self initDownload];
     [ downloadManger startOrContinueDownload];
  } else {
     [[ViewControllerManager alloc] removeViewController:self];
     [self dismissViewControllerAnimated:true completion:nil];
  }
}

//更新进度条
-(void)DownloadManagerCallbackProgress:(double)progress Error:(NSError *)error identifier:(NSString *)identifier{
  NSLog(@"progress = %f",progress);
  if (progress < 0 ) { progress = 0; }
  if (progress > 1 ) { progress = 1; }
  
  //通知主线程刷新
  dispatch_async(dispatch_get_main_queue(), ^{
        if (self.progressView  == nil) {
          self.progressView = [[UIProgressView alloc] initWithFrame:CGRectMake(90, 340, 200, 2)];
          [self.view addSubview:self.progressView];
        }
        self.progressView.hidden = NO;
        self.progressView.progress = progress;
    
        if ( progress >= 1 ){
            self.progressView.hidden = YES;
        }
  });
}

//下载完成回调
-(void)DownloadManagerDownloadingFinish:(NSString *)path identifier:(NSString *)identifier {
  NSLog(@"path = %@ identifier=%@",path,identifier);
  
  //通知主线程刷新
  dispatch_async(dispatch_get_main_queue(), ^{
      self.progressView.progress = 1;
      [Toast addToastWithString:@"更新到最新数据啦~" inView:self.view];
      self.progressView.hidden = YES;
  });
}

//配置下载
- (void) initDownload {
  NSString *url = @"http://www.imobpay.com/test/download/bundle.zip";
  NSString *name = @"bundle.zip";
  [downloadManger config:url filename:name];
  [downloadManger initTask];
}
@end
