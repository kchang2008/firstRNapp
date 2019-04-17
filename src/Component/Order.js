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
var urlHost = "http://api.t.sina.com.cn/short_url/shorten.json?source=3271760578&&url_long=";
var longUrl = "http://www.imobpay.com/test/v3_test/openapp/testSms.html";
var delay_time = 3000;

type props = {}

export default class Order extends Component<props>{

  //设置标题
  static navigationOptions = {
      headerTitle: '订单'
  };

  //注意函数名称尽量不要和其他js文件相同
  callBack = (url) => {
        console.log("拿到短链接地址了："+url);
        setTimeout(()=> {
            //setState后会动态执行一次刷新渲染render函数
            this.setState({
                shortUrl: url,

            })
        }, delay_time);
  }

  getDataFromNet = () => {
        nativeModule.doNetworkRequest(longUrl,this.callBack);
  }

  constructor(props){
        super(props);
        this.state = {
                   shortUrl: "本地获取数据中。。。",  //这里放你自己定义的state变量及初始值
                   jsUrl: "页面获取数据中。。。",  //这里放你自己定义的state变量及初始值
                };
        this.getDataFromNet();
        this.fetchData();

  }

  //由页面发起请求
  fetchData() {
        fetch(urlHost+longUrl)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("responseData[0]=",responseData[0]);
                setTimeout(()=> {
                    this.setState({
                        jsUrl: responseData[0].url_short,

                    });
                }, delay_time);
            })
            .done();
        //调用了done() —— 这样可以抛出异常而不是简单忽略
    }


  render(){
    const { navigate } = this.props.navigation;
    let shortUrl = this.state.shortUrl;
    let jsUrl = this.state.jsUrl;

    console.log("render jsUrl=",jsUrl);
    console.log("render shortUrl=",shortUrl);

    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() => {
                    this.props.navigation.setParams({title: '订单'})}
                }
            >
            <Text style={styles.text}>{shortUrl}</Text>
            <Text style={styles.text}>{jsUrl}</Text>
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
      fontSize:20,
      margin:10,
      color:'black'
    }
});