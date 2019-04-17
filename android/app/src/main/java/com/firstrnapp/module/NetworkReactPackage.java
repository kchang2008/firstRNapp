package com.firstrnapp.module;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * com.firstrnapp.module
 * 网络请求包，在application中注册
 * @author jun
 * @date 2019/4/17
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class NetworkReactPackage implements ReactPackage {
    private NetworkNativeModule networkNativeModule;
    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        networkNativeModule = new NetworkNativeModule(reactContext);
        List<NativeModule> modules = new ArrayList<>();
        modules.add(networkNativeModule);
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
