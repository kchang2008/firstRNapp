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
//设置标题
  static navigationOptions = {
      headerTitle: '我的'
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