package com.firstrnapp.ui;

import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.ReactActivity;
import com.firstrnapp.R;
import com.firstrnapp.bean.ActivityInfos;
import com.firstrnapp.utils.UIViewUtils;

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

    /**
     * 设置当前页面的标题
     *
     * @param
     * @author tianyingzhong
     */
    public void setTitleName(String title) {
        TextView tv_title = (TextView) findViewById(R.id.all_title_text);
        LinearLayout all_spliteline_text = (LinearLayout) findViewById(R.id.all_spliteline_text);
        tv_title.setText(title);

        UIViewUtils.setTextSize(this, tv_title, com.imobpay.viewlibrary.config.UIViewConfig.MARGIN_50);
        UIViewUtils.setLinearHeightSize(this, all_spliteline_text,
                com.imobpay.viewlibrary.config.UIViewConfig.MARGIN_1);
        setTitleLeftBack();
    }

    private void setTitleLeftBack() {
        LinearLayout linear_back = (LinearLayout) findViewById(R.id.all_backbutton_layout);
        linear_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        setLeftBackTvSize();
    }

    // 设置返回文字字体大小
    private void setLeftBackTvSize() {
        TextView back_text_bt = (TextView) findViewById(R.id.all_back_text_bt);
        UIViewUtils.setTextSize(this, back_text_bt, com.imobpay.viewlibrary.config.UIViewConfig.MARGIN_40);
    }
}
