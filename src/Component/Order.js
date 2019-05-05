import React,{ Component } from 'react';
import {
  StyleSheet,Alert,ScrollView,
  Text,TouchableOpacity,
  View, Image,NativeModules,
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";
import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import xml2js from 'react-native-xml2js/lib/parser';

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

  //检查是否为xml格式：如果没找到<?xml字符串，结果为-1；
  isXmlData(data) {
       console.log("检查数据：",data);
       var result = (JSON.stringify(data).search('<?xml') != -1);
       console.log("isXmlData =",result);
       return result ;
  }

  //解析xml数据
  parseXmlData(data) {
     //xml多一步解析过程
     xml2js.parseString(data, (err, res) => {
         if (err != null) {
            console.log("xml数据解析错误：",err.message);
         } else {
            var msg = JSON.stringify(res);
            var QtPay = JSON.parse(msg).QtPay;

            console.log("xml数据解析成功：",QtPay);
            this.showAlert(JSON.stringify(QtPay),true);
         }
     })
  }

  //显示提示框
  showAlert(msg,isXMl){
      Alert.alert(
           '提示',
           msg,
               [{text: '确定'}]
      )
      if (isXMl) {
          this.setState({
             xmlUrl: msg,
          })
      } else {
          this.setState({
             jsUrl: msg,
          })
      }
  }

  //发送请求并处理请求返回的数据
  processResponseData(isXMl){
     this.fetchData(isXMl)
         .then(data => {
                 console.log("response.data=",data);
                 if (this.isXmlData(data)) {
                     this.parseXmlData(data);
                 } else {
                     this.showAlert(JSON.stringify(data),false);
                 };
         })
         .catch(reason => console.log("reason.message="+reason.message))
         .done();  //调用了done() —— 这样可以抛出异常而不是简单忽略
  }

  constructor(props){
        super(props);
        this.state = {
                   shortUrl: "本地获取数据中。。。",  //这里放你自己定义的state变量及初始值
                   jsUrl: "JSON页面获取数据中。。。",  //这里放你自己定义的state变量及初始值
                   xmlUrl:"XML页面获取数据中。。。",  //这里放你自己定义的state变量及初始值
                };
        this.getDataFromNet();
        this.processResponseData(false); //json请求
        this.processResponseData(true);  //xml请求
  }

  //由页面发起请求
  async fetchData(isXMl) {
          //json请求
          let urldata = 'https://zapp.imobpay.com:7024/unifiedAction.json';
          let param = {"mobileNo":"","transTime":"172748","sign":"533F820352F4EBA6BA58B52ED194C133","clientType":"02","longitude":"0","token":"0000","mobileSerialNum":"35550006070829400000000000000000000000000","phone":"","userIP":"192.168.123.163","areaCode":"310115","appVersion":"V3","transLogNo":"000039","customerId":"","osType":"android5.1.1","transDate":"20181026","version":"1.8.1","latitude":"0","application":"ClientUpdate.Req","clientVersion":"1.8.4","appUser":"ruitongbao"};
          let bodyData = 'requestXml='+JSON.stringify(param);

          if (isXMl) {
             //xml请求
             urldata = 'https://zapp.imobpay.com:7024/unifiedAction.do';
             param = '<QtPay application="NewGetBankCardList.Req" appUser="bmzhangguibao" version="3.8.3" osType="android5.1.1" mobileSerialNum="35550006070829400000000000000000000000000" userIP="192.168.123.163" clientType="02" token="5E3BB74E1C3854A884082285AAD09CD1" customerId="A002000363" phone="13651623268" longitude="121.535108" latitude="31.213722" areaCode="310115"><application>NewGetBankCardList.Req</application><customerId>A002000363</customerId><cardType>0</cardType><mobileNo>13651623268</mobileNo><transDate>20190505</transDate><transTime>110949</transTime><transLogNo>000045</transLogNo><sign>n85o3nd2romjnb06onivuq1m85k1qnfl</sign><appVersion>V3</appVersion></QtPay>';
             bodyData = 'requestXml='+ param;
          }

          console.log("fetch body=",bodyData);
          let response = await fetch(urldata,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              },
              body: bodyData
          });
          data = await response.text();
          // only proceed once second promise is resolved
          return data;
        //调用了done() —— 这样可以抛出异常而不是简单忽略
  }

  render(){
    const { navigate } = this.props.navigation;
    let shortUrl = this.state.shortUrl;
    let jsUrl = this.state.jsUrl;
    let xmlUrl = this.state.xmlUrl;

    console.log("render jsUrl=",jsUrl);
    console.log("render xmlUrl=",xmlUrl);
    console.log("render shortUrl=",shortUrl);

    return (
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}>
            <View style={styles.vertical_view}>
                 <Text style={styles.text}>{shortUrl}</Text>
            </View>

            <View style={styles.vertical_view}>
                <Text style={styles.text}>{jsUrl}</Text>
            </View>

            <View style={styles.vertical_view}>
                <Text style={styles.text}>{xmlUrl}</Text>
            </View>

            <TouchableOpacity style={styles.button}
                  onPress={() => { _scrollView.scrollTo({y: 0}); }}>
                  <Text style={styles.top_text}>回顶部</Text>
            </TouchableOpacity>
        </ScrollView>
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
    top_text:{
      fontSize:15,
      margin:10,
      color:'orange',
      textAlign: 'center',
    },
    text:{
      fontSize:20,
      margin:10,
      color:'black',
    },
    vertical_view:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
        paddingBottom:15,
    },
});