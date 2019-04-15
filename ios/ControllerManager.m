//
//  ControllerManager.m
//  firstRNapp
//
//  Created by jun on 2019/4/13.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "ControllerManager.h"

@implementation ControllerManager
static ControllerManager *_instance =nil;
//通过属性传值，知道是从那里跳转进入本界面
UIViewController* currVC;
NSMutableArray* vcArray;

#pragma mark ====重写 相当于构建函数设置为私有，类的实例只能初始化一次
//使用alloc/new方式创建
+ (id)allocWithZone:(struct _NSZone *)zone
{
  @synchronized(self){
    if (_instance == nil) {
      _instance = [super allocWithZone:zone];
      return _instance;
    } else {
      return _instance;
    }
  }
  return nil;
}

//实例化句柄
+ (instancetype)sharedControllerManager
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _instance = [[ControllerManager alloc] init];
  });
  NSLog(@"%s:ControllerManager = %p",__func__,_instance);
  return _instance;
}

//添加当前UIViewController
- (void)addViewController:(UIViewController*)controller{
  if (vcArray == nil) {
    vcArray = [[NSMutableArray alloc]initWithCapacity:100];
  }
  [vcArray addObject:controller];
  currVC = controller;
}

//删除当前UIViewController
-(void)removeViewController:(UIViewController*)controller{
  if (vcArray != nil ) {
    [ vcArray removeObject:controller];
    NSUInteger len = [vcArray count];
    currVC = [ vcArray objectAtIndex:len-1];
  }
}

//获取当前view视图
-(UIViewController*)getCurrentViewController{
  return currVC;
}

//获取当前管理的界面数目
-(NSUInteger)getViewControllerCount{
  if (vcArray != nil ) {
    return [vcArray count];
  } else {
    return 0;
  }
}
@end
