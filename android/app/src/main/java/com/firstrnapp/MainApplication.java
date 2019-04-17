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

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static MainApplication instance;
  private static SettingReactPackage settingReactPackage;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
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
              new RNGestureHandlerPackage(),
              new NetworkReactPackage(),
              settingReactPackage
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
