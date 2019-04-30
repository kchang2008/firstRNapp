package com.firstrnapp.ui;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.firstrnapp.MainApplication;
import com.firstrnapp.R;
import com.firstrnapp.module.SettingNativeModule;
import com.firstrnapp.task.ZipExtractorTask;
import com.firstrnapp.tool.UploadApk;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * com.firstrnapp
 *
 * @author jun
 * @date 2019/3/17
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class SettingsActivity extends BaseActivity implements ZipExtractorTask.Delegate{
    Button button;
    SettingNativeModule openSettingNativeModule;

    private ExecutorService executor ;
    private class ThreadFactoryBuild implements ThreadFactory {
        @Override
        public Thread newThread(Runnable r){
            Thread thread = new Thread(r);
            thread.setUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler(){
                @Override
                public void uncaughtException(Thread t, Throwable e) {

                }
            });
            return thread;
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.settings_layout);

        setTitleName("设置");

        openSettingNativeModule =  MainApplication.getSettingReactPackage().getSettingNativeModule();
        button = findViewById(R.id.send_event_bt);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               //openSettingNativeModule.sendEvent("CustomEventName","这是发给RN的字符串");
               testMultiThread();
            }
        });

        Button update_bt = findViewById(R.id.update_bt);
        update_bt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateBundleFile();
            }
        });

    }

    @Override
    protected void onDestroy(){
        super.onDestroy();
        UploadApk.getInstance().releaseDownloadResource();
    }

    /**
     * 测试多线程
     */
    private void testMultiThread(){
        if ( null == executor) {
            executor = new ThreadPoolExecutor(5, 50,
                    0L, TimeUnit.MILLISECONDS,
                    new LinkedBlockingQueue<Runnable>(1024),
                    new ThreadFactoryBuild(),
                    new ThreadPoolExecutor.AbortPolicy());
        }
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Log.i("testMultiThread","测试多线程");
                openSettingNativeModule.sendEvent("CustomEventName","这是发给RN的字符串");
            }
        });
    }

    /**
     * 更新bundle文件
     */
    private void updateBundleFile(){
        UploadApk.getInstance().init(this);
        UploadApk.getInstance().download("http://www.imobpay.com/test/download/index.android.bundle.zip");
    }

    /*
     * (non-Javadoc)
     *
     * @see
     * plugins.util.ZipExtractorTask.Delegate#unzipComplete_callback(java.lang
     * .String, java.lang.String, boolean)
     */
    @Override
    public void unzipComplete_callback(String sourcePath, String destPath, boolean silence) {
        Log.i("unzipComplete_callback","unzip succeed");
    }

    /*
     * (non-Javadoc)
     *
     * @see plugins.util.ZipExtractorTask.Delegate#unzipCancel_callback()
     */
    @Override
    public void unzipCancel_callback() { }
}
