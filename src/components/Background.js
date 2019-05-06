import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, Image, View,ImageBackground} from 'react-native';
import bgSrc from '../images/loginbg.png';
export default class Background extends Component {
    render() {
      return (
      // <View style={{flex: 1}}>
      // <Image style={styles.picture} source={bgSrc}>
      //   {this.props.children}
      // </Image>
      // </View>
        <ImageBackground
          style={styles.picture}
          source={require('../images/loginbg.png')}
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    picture: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
    },
  });
  