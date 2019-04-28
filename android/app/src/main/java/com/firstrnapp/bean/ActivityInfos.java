package com.firstrnapp.bean;

import android.app.Activity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * com.pay.tool
 *
 * @author jun
 * @date 2019/4/3
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class ActivityInfos implements Serializable{
    private  Activity currActivity;
    private ActivityInfos(){}

    public static ActivityInfos getInstance(){
        return ActivityInfosHandler.instance;
    }

    private static class ActivityInfosHandler {
        private static ActivityInfos instance = new ActivityInfos();
    }

    /**
     * 正在运行的Activity
     */
    private  List<Activity> runingActivities = new ArrayList<Activity>();

    /**
     * 添加Activity
     */
    public  List<Activity> getRunningActivity() {
        return runingActivities;
    }

    /**
     * 添加Activity
     *
     * @param activity
     */
    public  void addActivity(Activity activity) {
        runingActivities.add(activity);
    }

    /**
     * 移除Activity
     *
     * @param activity
     */
    public  void removeActivity(Activity activity) {
        runingActivities.remove(activity);
    }

    /**
     * 清除数据
     */
    public void clear(){
        runingActivities.clear();
    }

    /**
     * 检查界面是否关闭
     * @param activity
     * @return
     */
    public boolean isFinished(Activity activity){
        boolean ret = false;
        for (Activity activity1 : runingActivities) {
            if (activity1.getClass().getName().equals(activity.getClass().getName())) {
                ret = false;
                break;
            } else {
                ret = true;
            }
        }
        return ret;
    }

    public Activity getCurrActivity() {
        return currActivity;
    }
}
