//
//  ControllerManager.m
//  firstRNapp
//
//  Created by jun on 2019/4/13.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "ViewControllerManager.h"

//定义全局变量，但只能在这个类中使用。不同于C/java,不能在其他类中使用本类类名+static变量访问
//正规写法是放在@implementation前面
static ViewControllerManager *_instance =nil;

@implementation ViewControllerManager

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

//复制方式初始化
- (id)copyWithZone:(nullable NSZone*)zone {
  NSLog(@"%s:ControllerManager copyWithZone= %p",__func__,_instance);
  return self;
}

//深度复制
- (id)mutableCopyWithZone:(nullable NSZone*)zone {
  NSLog(@"%s:ControllerManager mutableCopyWithZone= %p",__func__,_instance);
  return self;
}

//实例化句柄
+ (instancetype)sharedControllerManager
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _instance = [[ViewControllerManager alloc] init];
  });
  NSLog(@"%s:ControllerManager = %p",__func__,_instance);
  return _instance;
}

//添加当前UIViewController
- (void)addViewController:(UIViewController*)controller{
  if (vcArray == nil) {
    vcArray = [[NSMutableArray alloc]init];
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
