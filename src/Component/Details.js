import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,Alert,
  View, Image,TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";
import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Storage from './DeviceStorage'; //default方法不需要花括号，加上就会报错，方法找不到

type props = {}

export default class Details extends Component<props>{
   //设置标题
  static navigationOptions = {
      headerTitle: '详情'
  };

  constructor(props){
    super(props);
  }

  render(){
    const { navigate } = this.props.navigation;
    Storage.get("isIn").then((isIn) => {
       console.log("isIn = \n" + isIn);
       if (isIn == 0 || isIn == null) {
               Storage.save("isIn",1);
               Alert.alert(
                         '提示',
                         '欢迎新用户',
                             [{text: '确定'}]
                      )
           } else {
               Alert.alert(
                         '提示',
                         '欢迎再回来',
                             [{text: '确定'}])
           }
    });

    return (
      <View style={styles.container}>
            <Text style={styles.text}>详情展示页</Text>
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