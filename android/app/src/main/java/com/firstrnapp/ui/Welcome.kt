package com.firstrnapp.ui;

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Message
import com.facebook.react.ReactActivity
import com.firstrnapp.R
import com.firstrnapp.ui.MainActivity

/**
 * 欢迎界面
 * @author jun
 * @date 2019/3/28
Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
class Welcome : ReactActivity() {
    @SuppressLint("HandlerLeak")
    var handler : Handler = Handler { msg: Message ->
        if (msg.what == 0x0001) {
            //执行跳转操作
            val intent = Intent(this@Welcome, MainActivity::class.java)
            startActivity(intent)
            finish()
        }
        true
    }

    //允许传值为空
    override fun onCreate(savedInstanceState : Bundle? )
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.welcome)

        //2秒钟后跳转到主界面
        handler.sendEmptyMessageDelayed(0x0001,2000);
    }


}