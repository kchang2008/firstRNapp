package com.firstrnapp.net;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Query;


public interface RNNetConnectApi {
    //json格式接口请求
    @Headers({
            "Content-Type:application/x-www-form-urlencoded",
            "Accept-Charset: utf-8"
    })

    //单个上传
    @GET("shorten.json")
    Call<String> getShortLinkUrl(@Query("source") String appKey, @Query("url_long") String url_long);
}