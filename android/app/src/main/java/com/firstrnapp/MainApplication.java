package com.firstrnapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.firstrnapp.module.NetworkReactPackage;
import com.firstrnapp.module.SettingReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.reactnative.camera.RNCameraPackage;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {

  private static MainApplication instance;
  private static SettingReactPackage settingReactPackage;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected @Nullable
    String getJSBundleFile() {
      //如果有下载更新，则使用下载更新文件
      String unZipFile = getApplicationContext().getFilesDir().getAbsolutePath() + "/bundle/index.android.bundle";
      File file = new File(unZipFile);
      if (file.exists()) {
        return unZipFile;
      } else {
        return super.getJSBundleFile();
      }
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    /**
     * 所有的和RN交互的包都需要定义在这里
     * @return
     */
    @Override
    protected List<ReactPackage> getPackages() {
      settingReactPackage = new SettingReactPackage();
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new RNCameraPackage(),
              new RNGestureHandlerPackage(),
              new NetworkReactPackage(),
              settingReactPackage
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    instance = this;
  }

  public static SettingReactPackage getSettingReactPackage(){
      return settingReactPackage;
  }
}
