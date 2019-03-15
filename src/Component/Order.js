import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,TouchableOpacity,
  View, Image
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";
import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';

type props = {}

export default class Order extends Component<props>{
  static navigationOptions = {
        headerTitle: '订单',//对页面的配置
        tabBarLabel: '订单',
        tabBarIcon: ({ focused, tintColor }) => (
              <Image
                source={focused ? require('./image/order_s.png') : require('./image/order_n.png')}
                style={{ width: 26, height: 26, tintColor: tintColor }}
              />
            )
  };

  constructor(props){
    super(props);
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() => {
                    this.props.navigation.setParams({title: '订单'})}
                }
            >
            <Text style={styles.text}>订单</Text>
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