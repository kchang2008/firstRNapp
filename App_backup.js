/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import { platform } from "os";

import TabNavigator from 'react-native-tab-navigator';
import Home from './src/Component/Home';
import Article from './src/Component/Article';
import Owner from './src/Component/Owner';
import Order from './src/Component/Order';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const dataSource = [
                    {icon:require('./image/home_n.png'),selectedIcon:require('./image/home_s.png'),tabPage:'Home',tabName:'首页',component:Home},
                    {icon:require('./image/article_n.png'),selectedIcon:require('./image/article_s.png'),tabPage:'Article',tabName:'文章',component:Article},
                    {icon:require('./image/order_n.png'),selectedIcon:require('./image/order_s.png'),tabPage:'Order',tabName:'订单',component:Order},
                    {icon:require('./image/owner_n.png'),selectedIcon:require('./image/owner_s.png'),tabPage:'Owner',tabName:'我的',component:Owner}
                 ]
                 
var navigation = null;
type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    navigation = this.props.navigation;
    this.state = {
      selectedTab:'Home'
    }
  }

  render() {
    let tabViews = dataSource.map((item,i) => {
      return (
          <TabNavigator.Item
            title={item.tabName}
            selected={this.state.selectedTab===item.tabPage}
            titleStyle={{color:'black'}}
            selectedTitleStyle={{color:'#7A16BD'}}
            renderIcon={()=><Image style={styles.tabIcon} source={item.icon}/>}
            renderSelectedIcon = {() => <Image style={styles.tabIcon} source={item.selectedIcon}/>}
            tabStyle={{alignSelf:'center'}}
            onPress = {() => {this.setState({selectedTab:item.tabPage})}}
            key={i}
            >
            <item.component  navigation={navigation}/>
        </TabNavigator.Item>
      );
    })
    return (
      <View style={styles.container}>
        <TabNavigator
          hidesTabTouch={true}
          >
            {tabViews}
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabIcon:{
    width:23,
    height:23,
  }
});