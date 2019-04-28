//
//  DownloadManager.m
//  firstRNapp
//
//  Created by jun on 2019/4/26.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "DownloadManager.h"

#define IS_IOS10ORLATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 10)
#define IS_IOS8ORLATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8)

@interface DownloadManager ()<NSURLSessionDelegate, NSURLSessionTaskDelegate,NSURLSessionDownloadDelegate> {
  NSString *tmpPath;
  BOOL _isDownloadStateCompleted;
  int64_t allSize;
  BOOL _isStart;
}

@property (nonatomic) NSURLSession *session;
@property (nonatomic) NSURLSessionDownloadTask *downloadTask;
@property (nonatomic,strong) NSString *DownloadPath;
@property (nonatomic,strong) NSString *CachePath;
@property (nonatomic,strong) NSString *Location;
@property (nonatomic,strong) NSFileManager *manage;
@property (strong, nonatomic) NSOperationQueue *queue;

@property(nonatomic,copy)void (^downloadProgressBlock)(CGFloat progress, NSError *err);
@property(nonatomic,copy)void (^completeBlock)(NSString *path);

@end

@implementation DownloadManager
-(NSString *)Location {
  if (!_Location) {
    _Location =[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory , NSUserDomainMask, YES) lastObject] ;
    [self.manage createDirectoryAtPath:_Location withIntermediateDirectories:YES attributes:nil error:nil];
  }
  return _Location;
}

- (NSString *)DownloadPath {
  if (!_DownloadPath) {
    _DownloadPath =[self.Location stringByAppendingPathComponent:self.fileName];
  }
  return _DownloadPath;
}

- (NSString *)CachePath {
  if (!_CachePath) {
    _CachePath =[self.Location stringByAppendingPathComponent:[NSString stringWithFormat:@"cashe%@",self.fileName]];
  }
  return _CachePath;
}

//初始化session
-(NSURLSession *)session {
  if (!_session) {
    if (_identifier) {
      if (IS_IOS8ORLATER) {
        NSURLSessionConfiguration *configure = [NSURLSessionConfiguration backgroundSessionConfigurationWithIdentifier:_identifier];
        _session = [NSURLSession sessionWithConfiguration:configure delegate:self delegateQueue:self.queue];
      }else{
        _session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration backgroundSessionConfigurationWithIdentifier:_identifier] delegate:self delegateQueue:self.queue];
      }
    }else {
      _session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:self.queue];
    }
  }
  return _session;
}

- (NSOperationQueue *)queue {
  if (!_queue) {
    _queue = [[NSOperationQueue alloc]init];
    _queue.maxConcurrentOperationCount = 1;
  }
  return _queue;
}

- (NSFileManager *)manage{
  if (!_manage){
    _manage = [NSFileManager defaultManager];
  }
  return _manage;
}

-(instancetype)init {
  if (self = [super init]) {
    self.identifier = @"BackgroundSession.tmp";
  }
  return self;
}

+(DownloadManager *)sharedInstance {
  static dispatch_once_t pred = 0;
  __strong static id internet = nil;
  dispatch_once(&pred, ^{
    internet = [[self alloc] init];
  });
  return internet;
}

- (void)downloadProgress:(void (^)(CGFloat progress, NSError *err))downloadProgressBlock complement:(void (^)(NSString *path))completeBlock {
  self.downloadProgressBlock = downloadProgressBlock;
  self.completeBlock = completeBlock;
}

-(void)config :(NSString*)url filename:(NSString*)name {
  self.urlStr = url;
  self.fileName = name;
}

-(void)initTask {
  NSURL *downloadURL = [NSURL URLWithString:self.urlStr];
  NSURLRequest *request = [NSURLRequest requestWithURL:downloadURL];
  self.downloadTask = [self.session downloadTaskWithRequest:request];
}

-(NSInteger)AlreadyDownloadLength {
  return [[[NSFileManager defaultManager]attributesOfItemAtPath:self.DownloadPath error:nil][NSFileSize] integerValue];
}

// 是否已经下载
- (BOOL)isDownloadCompletedWithDownload {
  return [self.manage fileExistsAtPath:self.DownloadPath];
}

-(void)startOrContinueDownload {
  if (_isStart) {
    return;
  }
  if (![self isDownloadCompletedWithDownload]) {
    [self initTask];
    self.resumeData = [NSData dataWithContentsOfFile:self.CachePath];
    if (self.resumeData) {
      if (IS_IOS10ORLATER) {
        self.downloadTask = [self.session downloadTaskWithCorrectResumeData:self.resumeData];
      } else {
        self.downloadTask = [self.session downloadTaskWithResumeData:self.resumeData];
      }
    }
    _isStart = YES;
    [self.downloadTask resume];
  }else {
    NSLog(@"已经下载完成");
    !self.completeBlock?:self.completeBlock(self.DownloadPath);
    
    if ([self.delegate respondsToSelector:@selector(DownloadManagerDownloadingFinish:identifier:)]) {
      [self.delegate DownloadManagerDownloadingFinish:self.DownloadPath identifier:self.identifier];
      [self unZipFileToPath];
    }
  }
}

-(void)cancelDownload {
  _isStart = NO;
  [self.downloadTask suspend];
  [self.downloadTask cancel];
  self.downloadTask = nil;
  [self removeCacheDownloadFile];
}

- (void)pauseDownload {
  _isStart = NO;
  if (![self isDownloadCompletedWithDownload]) {
    __weak __typeof(self) wSelf = self;
    [self.downloadTask cancelByProducingResumeData:^(NSData * resumeData) {
      __strong __typeof(wSelf) sSelf = wSelf;
      sSelf.resumeData = resumeData;
      [sSelf saveData:resumeData];
    }];
  }else {
    NSLog(@"已经下载完成");
  }
}

-(void)saveData:(NSData *)data {
  [data writeToFile:self.CachePath atomically:YES];
}

//监听进度
-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite {
  
  if (downloadTask == self.downloadTask) {
    allSize = totalBytesExpectedToWrite;
    double progress = (double)totalBytesWritten / (double)totalBytesExpectedToWrite;
    dispatch_async(dispatch_get_main_queue(), ^{
      !self.downloadProgressBlock?:self.downloadProgressBlock(progress,nil);
      
      if ([self.delegate respondsToSelector:@selector(DownloadManagerCallbackProgress:Error:identifier:)]) {
        [self.delegate DownloadManagerCallbackProgress:progress Error:nil identifier:self.identifier];
      }
    });
  }
}

-(void)removeDownloadFile {
  NSError *error;
  if ([self.manage fileExistsAtPath:self.DownloadPath ] ) {
    [self.manage removeItemAtPath:self.DownloadPath  error:&error];
    if (error) {
      NSLog(@"removeItem error %@",error);
    }
  }
}

-(void)removeCacheDownloadFile {
  NSError *error;
  if ([self.manage fileExistsAtPath:self.CachePath ] ) {
    [self.manage removeItemAtPath:self.CachePath  error:&error];
    if (error) {
      NSLog(@"removeItem error %@",error);
    }
  }
}

//下载成功
- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location {
  NSLog(@"downloadTask:%lu didFinishDownloadingToURL:%@", (unsigned long)downloadTask.taskIdentifier, location);
  NSString *locationString = [location path];
  NSError *error;
  [self removeDownloadFile];
  [self removeCacheDownloadFile];
  
  [self.manage moveItemAtPath:locationString toPath:self.DownloadPath error:&error];
  if (error) {
    NSLog(@"moveItemAtPath error %@",error);
  }
  _isStart = NO;
  !self.completeBlock?:self.completeBlock(self.DownloadPath);
  
  if ([self.delegate respondsToSelector:@selector(DownloadManagerDownloadingFinish:identifier:)]) {
    [self.delegate DownloadManagerDownloadingFinish:self.DownloadPath identifier:self.identifier];
    [self unZipFileToPath];
  }
}

//下载完成
- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error {
  if (error) {
    _isStart = NO;
    if ([error.userInfo objectForKey:NSURLSessionDownloadTaskResumeData]) {
      NSData *data = [error.userInfo objectForKey:NSURLSessionDownloadTaskResumeData];
      self.resumeData = data;
      [self saveData:data];
    }
  }
  
  double progress = (double)task.countOfBytesReceived / (double)task.countOfBytesExpectedToReceive;
  dispatch_async(dispatch_get_main_queue(), ^{
    !self.downloadProgressBlock?:self.downloadProgressBlock(progress,error);
    if ([self.delegate respondsToSelector:@selector(DownloadManagerCallbackProgress:Error:identifier:)]) {
      [self.delegate DownloadManagerCallbackProgress:progress Error:error identifier:self.identifier];
      [self unZipFileToPath];
    }
  });
  self.downloadTask = nil;
}

- (void)URLSessionDidFinishEventsForBackgroundURLSession:(NSURLSession *)session
{
  if (self.downloadSessionCompletionHandler) {
    self.downloadSessionCompletionHandler();
  }
}

/**
解压到沙盒目录下
**/
- (void)unZipFileToPath{
  NSArray *documentsPathArr = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsPath = [documentsPathArr lastObject];
  
  [ZipUtils zipFile:self.DownloadPath destPath:self.Location];
  
}
@end
