import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,TouchableOpacity,
  View, Image
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";

type props = {}

export default class Owner extends Component<props>{
  static navigationOptions = {
        headerTitle: '我的',//对页面的配置
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
              <Image
                source={focused ? require('./image/owner_s.png') : require('./image/owner_n.png')}
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
                    this.props.navigation.setParams({title: '我的'})}
                }
            >
            <Text style={styles.text}>我的</Text>
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