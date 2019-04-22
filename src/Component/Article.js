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

import {RNCamera} from 'react-native-camera';

type props = {}

export default class Article extends Component<props>{
  //设置标题
  static navigationOptions = {
      headerTitle: '文章'
  };

  constructor(props){
    super(props);
    this.state = {
        cameraType: RNCamera.Constants.Type.back
    };
  }

  //切换前后摄像头
  switchCamera() {
    var state = this.state;
    if(state.cameraType === RNCamera.Constants.Type.back) {
      state.cameraType = RNCamera.Constants.Type.front;
    }else{
      state.cameraType = RNCamera.Constants.Type.back;
    }
    this.setState(state);
  }

  //拍摄照片
  takePicture() {
    const options = {jpegQuality: 50};

    this.camera.takePictureAsync({options})
      .then(function(data){
        alert("拍照成功！图片保存地址：\n"+data.path)
      })
      .catch(err => console.error(err));
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
      <RNCamera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            type={this.state.cameraType}
            >
            <Text style={styles.button} onPress={this.switchCamera.bind(this)}>[切换摄像头]</Text>
            <Text style={styles.button} onPress={this.takePicture.bind(this)}>[拍照]</Text>
      </RNCamera>
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
      preview: {
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexDirection: 'row',
      },
      toolBar: {
          width: 200,
          margin: 40,
          backgroundColor: '#000000',
          justifyContent: 'space-between',

      },
      button: {
          flex: 0,
          backgroundColor: '#fff',
          borderRadius: 5,
          color: '#000',
          padding: 10,
          margin: 40,
      }
});