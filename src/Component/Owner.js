import React,{ Component } from 'react';
import {
  StyleSheet,Platform,Dimensions,
  Text,TouchableOpacity,InteractionManager,
  View, Image,
} from 'react-native';

import PropTypes from 'prop-types';
import { platform } from "os";

import CustomButton from './ButtonComponent';
import { scaleSize } from "./ScreenUtils";

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
        <CustomButton
            text="去扫码"
            buttonColor="red"
            buttonType="normal"
            textStyle={styles.textStyle}
            style={styles.customButton}
            disableColor="grey"
            onPress={(callback)=> {
                setTimeout(()=> {
                    callback();
                    this.props.navigation.navigate('ScanVC');

                }, 300);
            }}
        />
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
    customButton: {
          width: 150,
          height: 40,
          marginTop:40
    },
    textStyle: {
          color: 'blue',
          fontSize:scaleSize(40)
    },

});