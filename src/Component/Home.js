import React,{ Component } from 'react';
import {
  StyleSheet,
  Text, Button,Platform,
  View, Image,TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";
import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { scaleSize } from "./ScreenUtils";
import PermissionUtil from './PermissionUtil';
import CustomButton from './ButtonComponent';

type props = {}


var nativeModule = NativeModules.OpenSettingNativeModule;

export default class Home extends Component<props>{
  //设置标题
  static navigationOptions = {
      headerTitle: '首页'
  };

  constructor(props){
    super(props);
  }

  componentWillMount(){
         DeviceEventEmitter.addListener('CustomEventName', (e)=> {
             nativeModule.getStringFromReactNative("接收到通知");
         });
  }

  componentDidMount() {
      let eventEmitter = new NativeEventEmitter(nativeModule);
        this.listener = eventEmitter.addListener("CustomEventName", (result) => {
          console.log("获取到事件通知\n" + result);
        })
  }

  componentWillUnmount() {
      console.log("删除事件通知\n" + result);
      this.listener && this.listener.remove();
  }

  alertPermissionResult(msg){
     nativeModule.getStringFromReactNative(msg)
  }

  render(){
        success = () => {
              alertPermissionResult("检查权限成功")
        }

        fail = () => {
              alertPermissionResult("检查权限失败")
        }

        //跳转到原生设置界面
        jumpToSettingsInterface = () => {
             nativeModule.openNativeSettingsVC();
        }

        //如果客户端走的是reject，则会进入到catch捕捉
        passPromiseResolveBackToRN = () => {
             nativeModule.passPromiseBackToRN("promise").then(result=> {
                                console.warn('data', result);
                            }).catch((err)=> {
                                console.warn('err', err);
                            });

        }

        //使用try catch捕捉异常,测试下来没有第一种显示的异常信息多
         passPromiseRejectBackToRN = async () =>  {
              try {
                var result = nativeModule.passPromiseBackToRN("");
                if (result) {
                   console.log("respond this method",result);
                }
              } catch (e) {
                console.warn('err', e);
              }
        }

        return (
             <View style={styles.container}>
                <Text style={styles.text}>首页</Text>
                <CustomButton
                    text="去详情页"
                    buttonColor="red"
                    buttonType="normal"
                    textStyle={styles.textStyle}
                    style={styles.customButton}
                    disableColor="grey"
                    onPress={()=> {
                        setTimeout(()=> {
                            this.props.navigation.navigate('DetailsVC');

                        }, 300);
                    }}
                />
                <CustomButton
                    text="去设置页"
                    buttonColor="red"
                    buttonType="normal"
                    textStyle={styles.textStyle}
                    style={styles.customButton}
                    disableColor="grey"
                    onPress={()=> {
                        setTimeout(()=> {

                            jumpToSettingsInterface();

                        }, 300);
                    }}
                />
                <CustomButton
                    text="测试resolve"
                    buttonColor="red"
                    buttonType="normal"
                    textStyle={styles.textStyle}
                    style={styles.customButton}
                    disableColor="grey"
                    onPress={()=> {
                        setTimeout(()=> {

                            passPromiseResolveBackToRN();

                        }, 300);
                    }}
                />
                <CustomButton
                    text="测试reject"
                    buttonColor="red"
                    buttonType="normal"
                    textStyle={styles.textStyle}
                    style={styles.customButton}
                    disableColor="grey"
                    onPress={()=> {
                        setTimeout(()=> {

                            passPromiseRejectBackToRN();

                        }, 300);
                    }}
                />
                <CustomButton
                    text="检查权限"
                    buttonColor="red"
                    buttonType="normal"
                    textStyle={styles.textStyle}
                    style={styles.customButton}
                    disableColor="grey"
                    onPress={()=> {
                        setTimeout(()=> {

                            PermissionUtil.checkPermission(success,fail,["location"]);//成功调用 失败调用 权限

                        }, 3000);
                    }}
                />
             </View>
        );
  }
}


const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'grey'
    },
    text:{
      fontSize:30,
      color:'black'
    },
    customButton: {
         width: 150,
         height: 40,
         marginTop:40
    },
    textStyle: {
         color: 'blue',
         fontSize:20
    },
});