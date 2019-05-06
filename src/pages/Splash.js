import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    Image,
    ImageBackground} from 'react-native';

    export default class Splash extends Component {
  static navigationOptions = {
    header: null,
   }
  //  componentDidMount() {
  //   setTimeout(() => {
  //     this.props.navigation.navigate('Starter')
  // },3000)
  //  }
    render() {
      return (
        <View style={styles.container}>
            <ImageBackground source={require('../images/loginbg.png')} style={{width: '100%', height: '100%'}}>
             <View style={styles.imagecontainer}>
                <Image style={styles.imageset}
                    source={require('../images/logo.png')}
                />
                <Text style={styles.welcome}>Fast Food Service</Text>
             </View>
             </ImageBackground>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    imagecontainer: {    
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 25,
    },
    welcome: {
      fontSize: 20,
      fontWeight:'bold',    
      color:'black'
    },
   
    imageset: {
        width: 60,
        height: 80   
    }
    
  });
