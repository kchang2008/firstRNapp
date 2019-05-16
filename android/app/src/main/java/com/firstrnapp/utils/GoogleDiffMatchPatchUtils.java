package com.firstrnapp.utils;

import android.content.Context;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.LinkedList;

/**
 * Created by wanghaijun on 2018/1/19.
 * 合并patch包
 */

public class GoogleDiffMatchPatchUtils {
    private static GoogleDiffMatchPatchUtils mInstance;
    private diff_match_patch dmp = null;
    private Context mReactContext;

    private GoogleDiffMatchPatchUtils(Context reactContext) {
        mReactContext = reactContext;

        if(dmp == null) {
            dmp = new diff_match_patch();
        }
    }

    // 多线程安全单例模式（双重同步锁）
    public static GoogleDiffMatchPatchUtils getInstance(Context reactContext) {
        if(mInstance == null) {
            synchronized (GoogleDiffMatchPatchUtils.class) {
                if(mInstance == null) {
                    mInstance = new GoogleDiffMatchPatchUtils(reactContext);
                }
            }
        }

        return mInstance;
    }

    /**
     * 文件合并
     *
     * @param assetsBundleFile
     * @param patchesFile
     */
    public void mergePatSourceWithAsset(String assetsBundleFile, String patchesFile, File newBundleFileDir) {
        // 转换pat
        LinkedList<diff_match_patch.Patch> patchesList = (LinkedList<diff_match_patch.Patch>) dmp.patch_fromText(patchesFile);
        // 合并，生成新的bundle
        Object[] bundleArray = dmp.patch_apply(patchesList, assetsBundleFile);

        try {
            Writer writer = new FileWriter(newBundleFileDir);
            String newBundleFile = (String) bundleArray[0];
            writer.write(newBundleFile);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
