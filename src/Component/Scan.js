
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    Vibration,
    TouchableOpacity,
    Animated,
    Easing,
    Alert,
    Navigator,
    InteractionManager,
    Dimensions
} from 'react-native';
 
const {width, height}  = Dimensions.get('window');

import PropTypes from 'prop-types';
import {RNCamera} from 'react-native-camera';
import ViewFinder from './ViewFinder'

import scanLine from './image/scan_line.png';//扫描线

import TabNavigator from 'react-native-tab-navigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';

type props = {}

//执行二维码扫码
export default class Scan extends Component<props> {
    //设置标题
    static navigationOptions = {
          headerTitle: '二维码'
    };

    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            show: true,
            anim: new Animated.Value(0),
            transCode:'',//条码
            openFlash: false,
            active: true,
            flag:true,
            fadeInOpacity: new Animated.Value(0), // 初始值
            isEndAnimation:false,//结束动画标记
        }
        this._goBack = this._goBack.bind(this);
        this._startAnimation = this._startAnimation.bind(this);
        this.barcodeReceived = this.barcodeReceived.bind(this);
        this._changeFlash = this._changeFlash.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentWillUnmount() {
        this.state.show = false;
        console.log('---componentWillUnmount---');
    }

    componentDidMount() {
         InteractionManager.runAfterInteractions(() => {
             this._startAnimation(false)
         });
    }

    //开始动画，循环播放
    _startAnimation(isEnd) {
        if (this.state.show) {
            this.state.anim.setValue(0);
            Animated.timing(this.state.anim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear
            }).start(
                 () => {
                     if (isEnd){
                         this.setState({
                             isEndAnimation:true
                         })
                         return;
                     }
                     if (!this.state.isEndAnimation){
                         this.state.fadeInOpacity.setValue(0);
                         this._startAnimation(false)
                     }
                 }
            );
            console.log("---开始动画---");
        }
    }

    barcodeReceived(result) {
        if (this.state.show) {
            this.state.show = false;
            if (result) {
                  Vibration.vibrate([0, 500, 200, 500]);
                  let msg = result.data;
                  Alert.alert(
                        '提示',
                        msg,
                            [{text: '确定'}]
                  )
                  console.log('---扫描结果---' + result.data)
            } else {
                  Alert.alert(
                      '提示',
                      '扫描失败'
                          [{text: '确定'}]
                  )
            }
        }
    }
     //返回按钮点击事件
    _goBack() {
        this.setState({
            isEndAnimation:true,
        });
    }
    //开灯关灯
    _changeFlash() {
        this.setState({
            openFlash: !this.state.openFlash,
        });
    }
     //改变请求状态
    changeState(status){
        this.setState({
            flag:status
        });
        console.log('status='+status);
    }
 
    render(){
        const {
                openFlash,
                active,
            } = this.state;
        const { navigate } = this.props.navigation;
        return(

            <View style={styles.allContainer}>
                {(() => {
                    if (active) {
                        return (
                            <RNCamera
                                ref={cam => this.camera = cam}
                                style={styles.cameraStyle}
                                barcodeScannerEnabled={true}
                                onBarCodeRead={
                                    this.barcodeReceived
                                }
                                torchMode={openFlash ? 'on' : 'off'}>
                                    <View style={styles.container}>
                                        <View style={styles.titleContainer}>
                                            <View style={styles.leftContainer}>
                                                <TouchableOpacity activeOpacity={1} onPress={ this._goBack}>
                                                    <View>
                                                        <Text style={styles.button}>[返回]</Text>
                                                    </View>
                                                </TouchableOpacity>
                                           </View>
                                        </View>
                                    </View>
                                <View style={styles.centerContainer}/>
                                <View style={{flexDirection:'row'}}>
                                    <View style={styles.fillView}/>
                                    <View style={styles.scan}>
                                        <ViewFinder/>
                                        <Animated.View
                                            style={[styles.animatiedStyle, { transform: [{translateY: this.state.anim.interpolate({inputRange: [0,1], outputRange: [0,200]})}]}]}>
                                        </Animated.View>
                                    </View>
                                    <View style={styles.fillView}/>
                                </View>
                                <View style={styles.bottomContainer}>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            textAlign: 'center',
                                            width: 260,
                                            marginTop: active ? 25 : 285,
                                        },
                                    ]}
                                    numberOfLines={2}
                                >
                                    将运单上的条码放入框内即可自动扫描。
                                </Text>
                                <TouchableOpacity onPress={this._changeFlash}>
                                    <View style={styles.flash}>
                                        <Text style={styles.icon}>&#xe61a;</Text>
                                        <Text style={styles.text}>
                                            开灯/关灯
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                            </RNCamera>
                         );
                    }
                })()}
            </View>
        )
    }
}
 
const styles =StyleSheet.create({
    allContainer:{
        flex:1,
    },
    container: {
        ...Platform.select({
            ios: {
                height: 84,
            },
            android: {
                height: 50
            }
        }),
        backgroundColor:'skyblue',
        opacity:0.5
    },
    titleContainer: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 15,
            },
            android: {
                paddingTop: 0,
            }
        }),
        flexDirection: 'row',
    },
    leftContainer: {
        flex:0,
        justifyContent: 'center',
    },
    backImg: {
        marginLeft: 10,
    },
    cameraStyle: {
        alignSelf: 'center',
        width: width,
        height: height,
    },
    flash: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 60,
    },
    flashIcon: {
        fontSize: 1,
        color: 'white',
    },
    text: {
        fontSize: 14,
        color: 'white',
        marginTop:5
    },
    icon:{
        color:'white',
        fontSize:20,
    },
    scanLine:{
         alignSelf:'center',
    },
    centerContainer:{
        ...Platform.select({
            ios: {
                height: 80,
            },
            android: {
                height: 60,
            }
        }),
        width:width,
        backgroundColor:'skyblue',
        opacity:0.5
    },
    bottomContainer:{
        alignItems:'center',
        backgroundColor:'skyblue',
        alignSelf:'center',
        opacity:0.5,
        flex:1,
        width:width
    },
    fillView:{
        width:(width-220)/2,
        height:220,
        backgroundColor:'skyblue',
        opacity:0.5
    },
    scan:{
        width:220,
        height:220,
        alignSelf:'center'
    },
    button: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 20,
    },
    animatiedStyle: {
        height: 2,
        backgroundColor: '#00FF00'
    },
 

})