package com.firstrnapp.module;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * com.firstrnapp
 * 设置管理包，注册在application中
 * @author jun
 * @date 2019/3/17
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class SettingReactPackage implements ReactPackage {
    private SettingNativeModule settingNativeModule;

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        settingNativeModule = new SettingNativeModule(reactContext);
        List<NativeModule> modules = new ArrayList<>();
        modules.add(settingNativeModule);
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
    public SettingNativeModule getSettingNativeModule() {
        return settingNativeModule;
    }
}
