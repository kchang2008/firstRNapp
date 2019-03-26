package com.firstrnapp;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * com.firstrnapp
 *
 * @author jun
 * @date 2019/3/17
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class OpenSettingNativeModule extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;

    public OpenSettingNativeModule(ReactApplicationContext context) {
        super(context);
        this.mReactContext = context;
    }

    @Override
    public String getName() {
        return "OpenSettingNativeModule";
    }

    @ReactMethod
    public void openNativeSettingsVC() {
        Intent intent = new Intent();
        intent.setClass(mReactContext, SettingsActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mReactContext.startActivity(intent);
    }


    /**
     * RN向原生传递字典。这里原生端接收RN传过来的字典类型是ReadableMap
     *
     * @param map
     */
    @ReactMethod
    public void getDictionaryFromRN(ReadableMap map) {
        System.out.print(map);
        Toast.makeText(mReactContext, "已收到字典数据", Toast.LENGTH_SHORT).show();
    }

    /**
     * RN向原生传递字符串
     *
     * @param s
     */
    @ReactMethod
    public void getStringFromReactNative(String s) {
        Toast.makeText(mReactContext, s, Toast.LENGTH_LONG).show();
    }

    /**
     * 原生通过回调的形式向RN端传递string
     *
     * @param callback
     */
    @ReactMethod
    public void passStringBackToRN(Callback callback) {
        callback.invoke("This is a string from Native");
    }

    /**
     * 原生通过回调的形式向RN端传递字典。这里传出去的字典类型必须是WritableMap，java中的Map、HashMap是不能传递到RN的
     *
     * @param callback
     */
    @ReactMethod
    public void passDictionaryBackToRN(Callback callback) {
        WritableMap map = Arguments.createMap();
        map.putString("name", "小明");
        map.putInt("age", 20);
        map.putString("gender", "male");
        map.putBoolean("isGraduated", true);
        callback.invoke(map);
    }

    /**
     * 原生通过回调的形式向RN端传递数组。这里传出去的字典类型必须是WritableArray
     *
     * @param callback
     */
    @ReactMethod
    public void passArrayBackToRN(Callback callback) {
        WritableArray array = Arguments.createArray();
        array.pushString("React Native");
        array.pushString("Android");
        array.pushString("iOS");
        callback.invoke(array);
    }

    @ReactMethod
    public void passPromiseBackToRN(String msg, Promise promise) {
        if (!msg.equals("")) {
            promise.resolve(true);
        } else {
            promise.reject("warning", "msg cannot be empty!");
        }
    }

    public void sendEvent(String eventName,String msg) {
        String dataToRN = msg;
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, dataToRN);
    }
}
