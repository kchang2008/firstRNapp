import React,{ Component } from 'react';
import {
  StyleSheet,
  Text, Button,
  View, Image,TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";
import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';

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

  render(){
    return (
         <View style={styles.container}>
            <Text style={styles.text}>首页</Text>
            <Button title='去详情页' onPress={() => this.props.navigation.navigate('DetailsVC')}/>
            <Button title='去设置页' onPress={() => this.jumpToSettingsInterface()}/>
         </View>
    );
  }

  //跳转到原生设置界面
  jumpToSettingsInterface(){
     nativeModule.openNativeSettingsVC();
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
    }
});