package com.firstrnapp.ui;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;

/**
 * com.firstrnapp.ui
 *
 * @author jun
 * @date 2019/5/19
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public abstract class BaseSubBundleActivity extends Activity {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        setContentView(mReactRootView);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setJSBundleFile(getScriptAssetPath())//设置加载文件，， 本地放一份文件。。本地实现缓存。拉接口更新此文件
                .addPackage(new MainReactPackage())

                .setUseDeveloperSupport(false)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        mReactRootView.startReactApplication(mReactInstanceManager, getMainComponentName(), null);//启动入口
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    protected abstract String getScriptAssetPath();

    protected abstract String getMainComponentName();

}