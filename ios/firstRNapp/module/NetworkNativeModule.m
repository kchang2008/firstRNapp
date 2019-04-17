//
//  NetworkNativeModule.m
//  firstRNapp
//
//  Created by jun on 2019/4/17.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "NetworkNativeModule.h"

@implementation NetworkNativeModule

//导入当前这个交互类
RCT_EXPORT_MODULE();

/****
申明RN可以调用的本地方法
RCTResponseSenderBlock就相当于CallBack方法，是在RCTBridgeModule.h定义的block.
    typedef void (^RCTResponseSenderBlock)(NSArray *response);
传送到js是一组数据
****/
RCT_EXPORT_METHOD(doNetworkRequest:(NSString *)longUrl success:(RCTResponseSenderBlock)callback) {
    NSLog(@"doNetworkRequest longUrl = %@",longUrl);
    [self getShorLinktUrl:longUrl success:callback];
}

//执行网络请求
- (void)getShorLinktUrl: (NSString*)longUrl success:(RCTResponseSenderBlock)callback {
    NSString *urlHost = @"http://api.t.sina.com.cn/short_url/shorten.json?source=3271760578&&url_long=";
  
    urlHost = [urlHost stringByAppendingString:longUrl];
  
    NSURL *url = [NSURL URLWithString: urlHost];
    NSURLSession *session = [NSURLSession sharedSession];
    
    //创建可变的请求对象
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    
    NSString *contentType = [NSString stringWithFormat:@"text/plain"];
    [request setValue:contentType forHTTPHeaderField: @"Content-Type"];
    NSString *accept = [NSString stringWithFormat:@"application/json"];
    [request setValue:accept forHTTPHeaderField: @"Accept"];
    
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable responseData, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        
        NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
        if ( nil != httpResponse) {
            NSLog(@"response status = %d",(int)httpResponse.statusCode);
            if ( nil != error) {
               NSLog(@"response error = %@",error);
            }
        }
        
        //8.解析数据:根据需要处理
        //NSString *result = [[NSString alloc] initWithData:responseData encoding:NSUTF8StringEncoding];
        NSDictionary *result = [NSJSONSerialization JSONObjectWithData:responseData options:kNilOptions error:nil];
        NSLog(@"response result = %@",result);
        
        if ([result isKindOfClass:[NSArray class]]) {
            NSDictionary *item = (NSDictionary*)[(NSArray*)result objectAtIndex:0];
            for (NSString *key in item) {
                //存入数组并同步
                
                [[NSUserDefaults standardUserDefaults] setObject:item[key] forKey:key];
                
                [[NSUserDefaults standardUserDefaults] synchronize];
                
                NSLog(@"key: %@ value: %@", key, item[key]);
            }
        } else {
            for (NSString *key in result) {
                //存入数组并同步
                
                [[NSUserDefaults standardUserDefaults] setObject:result[key] forKey:key];
                
                [[NSUserDefaults standardUserDefaults] synchronize];
                
                NSLog(@"key: %@ value: %@", key, result[key]);
            }
        }
    }];
    
    //读取数据
    NSString *shortUrl = [[NSUserDefaults standardUserDefaults] objectForKey:@"url_short"];
  
    if ( nil != shortUrl) {
      NSLog(@"shortUrl = %@",shortUrl);
      callback(@[shortUrl,]);
      
    } else {
      callback(@[@"获取失败",]);
    }
  
    [dataTask resume];
}
@end
