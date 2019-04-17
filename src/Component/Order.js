import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,TouchableOpacity,
  View, Image,NativeModules,
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";
import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//全局使用
var nativeModule = NativeModules.NetworkNativeModule;

type props = {}

export default class Order extends Component<props>{

  //设置标题
  static navigationOptions = {
      headerTitle: '订单'
  };

  //注意函数名称尽量不要和其他js文件相同
  callBack = (url) => {
        //只在当前代码块中有效
        let delay_time = 3000;

        console.log("拿到短链接地址了："+url);
        setTimeout(()=> {
            //setState后会动态执行一次刷新渲染render函数
            this.setState({
                shortUrl: url,
            })
        }, delay_time);
  }

  getDataFromNet = () => {
        nativeModule.doNetworkRequest("http://www.imobpay.com/test/v3_test/openapp/testSms.html",this.callBack);
  }

  constructor(props){
        super(props);
        this.getDataFromNet();
        this.state = {
           shortUrl: "获取中。。。",  //这里放你自己定义的state变量及初始值
        };
  }

  render(){
    const { navigate } = this.props.navigation;
    let shortUrl = this.state.shortUrl;

    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() => {
                    this.props.navigation.setParams({title: '订单'})}
                }
            >
            <Text style={styles.text}>{shortUrl}</Text>
        </TouchableOpacity>
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
    }
});