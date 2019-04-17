package com.firstrnapp.module;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.firstrnapp.net.NetInterceptor;
import com.firstrnapp.net.RNNetConnectApi;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.scalars.ScalarsConverterFactory;

/**
 * com.firstrnapp.module
 * 执行网络请求
 * @author jun
 * @date 2019/4/17
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class NetworkNativeModule extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;
    private String urlHost = "http://api.t.sina.com.cn/short_url/";
    private String appKey = "3271760578";
    private String TAG = "NetworkNativeModule";
    private int connectTime = 60;
    private RNNetConnectApi rnNetConnectApi;

    public NetworkNativeModule(ReactApplicationContext context) {
        super(context);
        this.mReactContext = context;
        createRetrofit();
    }

    @Override
    public String getName() {
        return "NetworkNativeModule";
    }

    @ReactMethod
    public void doNetworkRequest(String longUrl, final com.facebook.react.bridge.Callback callback) {
        Log.d(TAG,"doNetworkRequest");
        Call call = rnNetConnectApi.getShortLinkUrl(appKey,longUrl);
        call.enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                handleResponse(call,response,callback);
            }

            @Override
            public void onFailure(Call call, Throwable t) {
                if ( null != t) {
                    Log.d(TAG,"请求失败信息："+t.getMessage()+" 原因："+t.getCause());
                }
            }
        });
    }

    /**
     * 处理请求成功后的返回数据
     * @param call
     * @param response
     */
    private void handleResponse(Call call,Response response,com.facebook.react.bridge.Callback callback){
        call.cancel();

        //打印出错信息
        ResponseBody errorBody = response.errorBody();
        if ( errorBody != null ) {
            try {
                String respErrorStr = errorBody.string();
                Log.d(TAG, "handleResponse:respErrorStr=" + respErrorStr);
            } catch (IOException iex) {
                iex.printStackTrace();
            }
            return;
        }

        //解析正常包
        Object body = response.body();
        String shortUrl;

        if (body != null) {
            try {
                JSONArray jsonArray= new JSONArray(body.toString());
                JSONObject items;
                if ( null != jsonArray && jsonArray.length() > 0) {
                    items = jsonArray.getJSONObject(0);
                    shortUrl = items.getString("url_short");
                    Log.d(TAG,"shortUrl = "+shortUrl);

                    WritableArray array = Arguments.createArray();
                    array.pushString(shortUrl);
                    callback.invoke(array);
                }
            } catch (JSONException ex){
                ex.printStackTrace();
            }

        }
    }

    /**
     * retrofit创建
     * @return
     */
    protected void createRetrofit() {
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        builder.connectTimeout((long)this.connectTime, TimeUnit.SECONDS);
        builder.readTimeout((long)this.connectTime, TimeUnit.SECONDS);
        builder.writeTimeout((long)this.connectTime, TimeUnit.SECONDS);
        builder.retryOnConnectionFailure(false);
        builder.addInterceptor(new NetInterceptor());

        OkHttpClient okHttpClient = builder.build();

        Retrofit retrofit = (new retrofit2.Retrofit.Builder()).baseUrl(urlHost).client(okHttpClient)
                .addConverterFactory(ScalarsConverterFactory.create()).build();
        rnNetConnectApi = retrofit.create(RNNetConnectApi.class);
    }
}
