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
  static navigationOptions = {
        headerTitle: '文章',//对页面的配置
        tabBarLabel: '文章',
        tabBarIcon: ({ focused, tintColor }) => (
              <Image
                source={focused ? require('./image/article_s.png') : require('./image/article_n.png')}
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