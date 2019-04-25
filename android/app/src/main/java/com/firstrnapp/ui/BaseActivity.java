package com.firstrnapp.ui;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.firstrnapp.bean.ActivityInfos;

/**
 * com.firstrnapp.ui
 *
 * @author jun
 * @date 2019/4/25
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class BaseActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityInfos.getInstance().addActivity(this);
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        ActivityInfos.getInstance().removeActivity(this);
    }
}
