package com.firstrnapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * com.firstrnapp
 *
 * @author jun
 * @date 2019/3/17
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class SettingReactPackage implements ReactPackage {
    private OpenSettingNativeModule openSettingNativeModule;

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        openSettingNativeModule = new OpenSettingNativeModule(reactContext);
        List<NativeModule> modules = new ArrayList<>();
        modules.add(openSettingNativeModule);
        return modules;
    }

    @Override
    public List<com.facebook.react.uimanager.ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    /***
     * 获取句柄
     * @return
     */
    public OpenSettingNativeModule getOpenSettingNativeModule() {
        return openSettingNativeModule;
    }
}
