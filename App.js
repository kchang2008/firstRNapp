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
import Details from './src/Component/Details';

import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const dataSource = [
                    {icon:require('./image/home_n.png'),selectedIcon:require('./image/home_s.png'),tabPage:'Home',tabName:'首页',component:Home},
                    {icon:require('./image/article_n.png'),selectedIcon:require('./image/article_s.png'),tabPage:'Article',tabName:'文章',component:Article},
                    {icon:require('./image/order_n.png'),selectedIcon:require('./image/order_s.png'),tabPage:'Order',tabName:'订单',component:Order},
                    {icon:require('./image/owner_n.png'),selectedIcon:require('./image/owner_s.png'),tabPage:'Owner',tabName:'我的',component:Owner}
                 ]
                 
var navigation = null;
type Props = {};

export default class App extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
          const { params } = navigation.state;

          return {
              title: params ? params.title : '新闻',    
                  headerStyle: {
                      backgroundColor: '#fff',
                  },
                  headerTintColor: '#000',
                  headerTitleStyle: {
                      flex: 1,
                      textAlign: 'center',
                      fontWeight: '20',
                  },
          }
   };

  constructor(props){
    super(props);
    navigation = this.props.navigation;
    this.state = {
      selectedTab:'Home'
    }
  }

  //建立带导航栏的界面，最后组合成一个底部条
  topNavigator(){
        let topTabs = createBottomTabNavigator({
                HomeVC:createStackNavigator(
                    {
                        Home: { screen: Home },
                        DetailsVC: { screen: Details },
                    },{
                    navigationOptions:{
                        headerTitle:'首页',
                        tabBarLabel: '首页',
                        tabBarIcon: ({ focused, tintColor }) => (
                            <Image
                              source={focused ? require('./image/home_s.png') : require('./image/home_n.png')}
                              style={{ width: 26, height: 26, tintColor: tintColor }}
                            />
                          )
                    } }),
                ArticleVC:createStackNavigator({screen:Article},{
                    navigationOptions:{
                       headerTitle:'文章',
                       tabBarLabel: '文章',
                       tabBarIcon: ({ focused, tintColor }) => (
                           <Image
                             source={focused ? require('./image/article_s.png') : require('./image/article_n.png')}
                             style={{ width: 26, height: 26, tintColor: tintColor }}
                           />
                         )
                    } }),
                OwnerVC:createStackNavigator({screen:Owner},{
                    navigationOptions:{
                      headerTitle:'我的',
                      tabBarLabel: '我的',
                      tabBarIcon: ({ focused, tintColor }) => (
                          <Image
                            source={focused ? require('./image/owner_s.png') : require('./image/owner_n.png')}
                            style={{ width: 26, height: 26, tintColor: tintColor }}
                          />
                        )
                    } }),
                OrderVC:createStackNavigator({screen:Order},{
                    navigationOptions:{
                        headerTitle:'订单',
                        tabBarLabel: '订单',
                        tabBarIcon: ({ focused, tintColor }) => (
                            <Image
                              source={focused ? require('./image/order_s.png') : require('./image/order_n.png')}
                              style={{ width: 26, height: 26, tintColor: tintColor }}
                            />
                          )
                    } }),
            },
            {
             tabBarOptions: {
               activeTintColor: '#4BC1D2',
               inactiveTintColor: '#000',
               showIcon: true,
               showLabel: true,
               upperCaseLabel: false,
               pressColor: '#823453',
               pressOpacity: 0.8,
               style: {
                 backgroundColor: '#fff',
                 paddingBottom: 0,
                 borderTopWidth: 0.5,
                 borderTopColor: '#ccc',
               },
               labelStyle: {
                 fontSize: 12,
                 margin: 1
               },
               indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
             },
             tabBarPosition: 'bottom',
             swipeEnabled: false,
             animationEnabled: false,
             lazy: true,
             backBehavior: 'none',
           }
        )
        //引入要用到的跳转页面
        const  mynavigatior = createStackNavigator({
            MainVC:{screen:topTabs},
            DetailVC:{screen:Details},
        });
        return createAppContainer(topTabs)
    }

    render(){
        let Pages = this.topNavigator()
        return <Pages/>
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
