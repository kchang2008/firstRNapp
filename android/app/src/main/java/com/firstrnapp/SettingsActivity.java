package com.firstrnapp;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.facebook.react.ReactActivity;

/**
 * com.firstrnapp
 *
 * @author jun
 * @date 2019/3/17
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class SettingsActivity extends ReactActivity {
    Button button;
    OpenSettingNativeModule openSettingNativeModule;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.settings_layout);

        openSettingNativeModule =  MainApplication.getSettingReactPackage().getOpenSettingNativeModule();
        button = findViewById(R.id.send_event_bt);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               openSettingNativeModule.sendEvent("CustomEventName","这是发给RN的字符串");
            }
        });
    }
}
