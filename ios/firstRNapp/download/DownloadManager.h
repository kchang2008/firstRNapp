//
//  DownloadManager.h
//  firstRNapp
//
//  Created by jun on 2019/4/26.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ZipUtils.h"
#import "NSURLSession+CorrectResumeData.h"

@protocol DownloadManagerDelegate <NSObject>
@optional
-(void)DownloadManagerCallbackProgress:(double)progress Error:(NSError *)error identifier:(NSString *)identifier;
-(void)DownloadManagerDownloadingFinish:(NSString *)path identifier:(NSString *)identifier;
@end

@interface DownloadManager : NSObject

@property(nonatomic,strong)NSString *identifier;//唯一SessionConfiguration
@property(nonatomic,strong)NSString *fileName;//保存的文件名
@property(nonatomic,strong)NSString *urlStr;

@property (nonatomic, weak) IBOutlet id<DownloadManagerDelegate> delegate;
@property (strong, nonatomic) NSData *resumeData;//已下载的数据
@property (nonatomic, copy) void (^downloadSessionCompletionHandler)(void);

- (void)startOrContinueDownload;//开始或继续下载
- (void)pauseDownload;//暂停下载
-(void)cancelDownload;//取消下载

-(void)removeDownloadFile;//移除已下载好的文件
-(void)removeCacheDownloadFile;//移除缓存的文件

- (void)downloadProgress:(void (^)(CGFloat progress, NSError *err))downloadProgressBlock complement:(void (^)(NSString *path))completeBlock;

-(void)config :(NSString*)url filename:(NSString*)name;
-(void)initTask;
+(DownloadManager *)sharedInstance;
@end
