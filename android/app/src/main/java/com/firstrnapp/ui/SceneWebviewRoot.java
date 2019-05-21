package com.firstrnapp.ui;

/**
 * com.firstrnapp.ui
 *
 * @author jun
 * @date 2019/5/19
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class SceneWebviewRoot extends BaseSubBundleActivity {
    @Override
    protected String getScriptAssetPath(){
        return getApplicationContext().getFilesDir().getAbsolutePath() +"/bundle/payment.android.bundle";
    }

    @Override
    protected String getMainComponentName(){
        return "Payment";
    }
}
