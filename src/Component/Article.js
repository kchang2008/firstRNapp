import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Image,TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";
import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';

type props = {}

export default class Article extends Component<props>{
  //设置标题
  static navigationOptions = {
      headerTitle: '文章'
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
                    this.props.navigation.setParams({title: '文章'})}
                }
            >
            <Text style={styles.text}>文章</Text>
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