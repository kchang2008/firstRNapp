import React,{ Component } from 'react';
import {
  StyleSheet,
  Text, Button,
  View, Image,TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";
import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';

type props = {}

export default class Home extends Component<props>{
  constructor(props){
    super(props);
  }

  render(){
    return (
         <View style={styles.container}>
            <Text style={styles.text}>首页</Text>
            <Button title='去详情页' onPress={() => this.props.navigation.navigate('DetailsVC')}/>
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