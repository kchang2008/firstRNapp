import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import ApiOfPayment from './ApiOfPayment';

class Payment extends React.Component {
  render() {
    ApiOfPayment();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is Payment Interface</Text>
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
    },
});

const AppRegistry = require('AppRegistry');
AppRegistry.registerComponent('Payment', () => Payment);

module.exports = Payment;
