package com.firstrnapp.tool;

import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import com.firstrnapp.R;
import com.firstrnapp.dialog.UpdateApkDialog;
import com.firstrnapp.task.ZipExtractorTask;
import com.firstrnapp.ui.BaseActivity;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadListener;
import com.liulishuo.filedownloader.FileDownloader;

import java.io.File;
import java.io.IOException;

/**
 * com.qtpay.imobpay.activity
 *
 * @author jun
 * @date 2019/3/12
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class UploadApk {
    private BaseActivity baseActivity;
    private int downloadId = 0;
    private boolean isFailed = false;
    private String apkpath;
    private UpdateApkDialog dialog_download;

    private UploadApk(){}

    public static UploadApk getInstance(){
        return UploadApkHandler.instance;
    }

    private static class UploadApkHandler {
        private static UploadApk instance = new UploadApk();
        static {
            Log.i("UploadApk","This's innerClass's static code block");
        }
    }

    /**
     * 释放资源
     */
    public void releaseDownloadResource(){
        if (downloadId != 0) {
            FileDownloader.getImpl().pause(downloadId);
        }
    }

    /***
     * 完成初始化
     * @param baseUIActivity
     */
    public void init(BaseActivity baseUIActivity){
        this.baseActivity = baseUIActivity;
        FileDownloader.setup(baseUIActivity);
    }

    /**
     * 生成文件夹
     * @param filePath
     */
    public void makeRootDirectory(String filePath) {
        File file = null;
        try {
            file = new File(filePath);
            if (!file.exists()) {
                file.mkdir();
            }
        } catch (Exception e) {
            Log.i("error:", e+"");
        }
    }

    /***
     * 创建文件
     * @param filePath
     * @param fileName
     * @throws IOException
     */
    private void createFileAndDirectory(String filePath,String fileName) {
        File file = null;
        try {
            makeRootDirectory(filePath);
            file = new File(filePath + fileName);
            if (!file.exists()) {
                file.createNewFile();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /***
     * 执行下载
     * @param url:版本更新地址
     */
    public boolean download(String url) {
        if (url != null && !url.isEmpty()) {
            isFailed = false;
            Log.i("showUpdataDialogCustom", "下载apk,开始更新");
            String savedPath = Environment.getExternalStorageDirectory()
                    + File.separator + "firstRN";
            apkpath = Environment.getExternalStorageDirectory()
                    + File.separator + "firstRN" + File.separator + getNameFromUrl(url);
            //createFileAndDirectory(savedPath,apkpath);

            initDownloadDialog();
            downloadId = FileDownloader.getImpl().create(url)
                    .setWifiRequired(false).setPath(apkpath)
                    .setListener(new FileDownloadListener() {
                        @Override
                        protected void pending(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                            Log.i("download", "pending");
                        }

                        @Override
                        protected void connected(BaseDownloadTask task, String etag, boolean isContinue, int soFarBytes, int totalBytes) {
                            Log.i("download", "connected");
                        }

                        @Override
                        protected void progress(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                            Log.i("download", "progress");
                            if (totalBytes > 0) {
                                int percent = (int) ((double) soFarBytes / (double) totalBytes * 100);
                                dialog_download.setTip(percent);
                            }
                        }

                        @Override
                        protected void blockComplete(BaseDownloadTask task) {
                            Log.i("download", "blockcmplte");
                        }

                        @Override
                        protected void retry(final BaseDownloadTask task, final Throwable ex,
                                             final int retryingTimes, final int soFarBytes) {
                            Log.i("download", "retry");
                        }

                        @Override
                        protected void completed(BaseDownloadTask task) {
                            Toast.makeText(baseActivity, "下载完成!", Toast.LENGTH_SHORT).show();
                            dialog_download.setTip(100);
                            dialog_download.dismiss();
                            Log.i("download", "completed");
                            zipPackage(baseActivity,apkpath);
                        }

                        @Override
                        protected void paused(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                            Log.i("download", "paused");
                        }

                        @Override
                        protected void error(BaseDownloadTask task, Throwable e) {
                            Log.i("download", "error:" + e.getMessage());
                            isFailed = true;
                        }

                        @Override
                        protected void warn(BaseDownloadTask task) {
                            Log.i("download", "warn");
                            continueDownLoad(task);//如果存在了相同的任务，那么就继续下载
                        }
                    }).start();
            Log.i("uploadApk","downloadid" + downloadId);
        } else {
            isFailed = true;
        }

        return isFailed;
    }

    private void continueDownLoad(BaseDownloadTask task) {
        if (null == task) {
            return;
        }
        while (task.getSmallFileSoFarBytes() != task.getSmallFileTotalBytes()) {
            if (task.getSmallFileTotalBytes() > 0) {
                int percent = (int) ((double) task.getSmallFileSoFarBytes() / (double) task.getSmallFileTotalBytes() * 100);
                dialog_download.setTip(percent);
            }
        }
    }


    /**
     * 去掉url中的路径,获取文件名
     *
     * @param strURL url地址
     * @return url请求参数部分
     * @author lzf
     */
    private String getNameFromUrl(String strURL) {
        String strAllParam = "";
        String[] arrSplit = null;
        strURL = strURL.trim().toLowerCase();
        arrSplit = strURL.split("[?]");

        if (strURL.length() > 1) {
            if (arrSplit.length > 0) {
                if (arrSplit[0].contains(".zip")) {
                    strAllParam = arrSplit[0].substring(arrSplit[0].lastIndexOf("/") + 1);
                }
            }
        }
        return strAllParam;
    }


    //初始化下载loading框
    private void initDownloadDialog() {
        dialog_download = new UpdateApkDialog(baseActivity,
                R.style.mydialog);
        dialog_download.setCanceledOnTouchOutside(false);
        dialog_download.show();
    }

    /**
     * 解压缩包
     * @param baseActivity
     * @param packageFile
     */
    private void zipPackage(BaseActivity baseActivity,String packageFile){
        try {
            String unZipPath = baseActivity.getFilesDir().getAbsolutePath() + "/WebPlugin";
            ZipExtractorTask task = new ZipExtractorTask(packageFile, unZipPath, baseActivity, true, true);
            task.execute();
        } catch (Exception ex){
            ex.printStackTrace();
        }
    }
}
