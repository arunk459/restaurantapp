import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    View,
    ImageBackground,
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    Alert
    } from 'react-native';

import {addUser} from '../services/Auth';
import { connect } from 'react-redux';
import * as actions from '../actions';
 class Register extends Component {
  static navigationOptions = {
     header: null,
    }
    state = {
      name: "", 
      email: "",
      mobile:"",
      password:"" ,
      // city_id:cityId,
      // building_id:buildingId
    }
    saveUser=() =>{
    
        var formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password',this.state.password);
        formData.append('mobile', this.state.mobile);
        formData.append('name', this.state.name);
        formData.append('city_id',this.props.app.city_id);
        formData.append('building_id',this.props.app.building_id);
        console.log(formData);

        addUser(formData).then(res => {
          console.log('response :',res);
          if(res.data.status == 1){
          // this.props.navigation.navigate('Login')
          Alert.alert(
            'Message',
            'You have registered successfully. Please login to continue',
            [ 
              {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
              // {
              //   text: 'OK',
              //   onPress: () => this.props.navigation.navigate('Login'),
              //   style: 'cancel',
              // }//,
              // {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
            ]
            // {cancelable: false},
            );
          }
        }).catch(error => { 
          console.log('error',error);
        });
  }
    render() {
      // const { navigation } = this.props;
      // const cityId = navigation.getParam('city_id');
      // const buildingId = navigation.getParam('building_id');
///console.log(this.props);
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content"/>
             <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                  <View style={styles.container}>
                    <ImageBackground
                      style={styles.picture}
                      source={require('../images/loginbg.png')}>
                        <View style={styles.textfields}>
                        <Text style={styles.headingtext}>Food Delivery</Text>
                        <Text style={styles.subheadingtext}> Fast Food Delivery</Text>
                          <TextInput style={styles.input}
                            placeholder="Full Name"
                            returnKeyType="next"                            
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ name => this.setState({ name }) }                       
                          />
                           <TextInput style={styles.input}
                            placeholder="Email"
                            returnKeyType="next"                            
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ email => this.setState({ email }) }
                          />
                           <TextInput style={styles.input}
                            placeholder="Contact"
                            returnKeyType="next"                          
                            autoCapitalize="none"
                            keyboardType="phone-pad"
                            autoCorrect={false}
                            onChangeText={ mobile => this.setState({ mobile }) }                       
                          />
                          <TextInput style={styles.input}
                            placeholder="Password"
                            returnKeyType="go"
                            secureTextEntry
                            onChangeText={ password => this.setState({ password }) }
                          />
                          <TouchableOpacity style={styles.buttoncontainer} onPress={this.saveUser}>
                              <Text style={styles.buttontext}>Register Here</Text>
                          </TouchableOpacity>
                          <View style={styles.viewtext}>
                            <Text style={styles.textdata}>Already Registered ? </Text>
                            <Text style={styles.registertext} onPress={()=>this.props.navigation.navigate('Login')}
                            > LOGIN HERE</Text>
                          </View>
                        </View>
                    </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }
  const mapStateToProps = rstate => {
    return rstate;
  };
  
  export default connect(mapStateToProps, actions)(Register);
  
  
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor:'rgb(32,53,70)',
      flexDirection:'column'
    },
    picture: {
      flex: 1,
      resizeMode: 'cover',
    },
    textfields:{
      position:'absolute',
      left:0,
      right:0,
      height:200,
      padding:20,
      marginTop:150
    },
  
    input:{
      height: 40,
      paddingHorizontal:10,
      borderRadius:15,
      backgroundColor: '#fff',
      color:'#34495e',
      marginBottom:20
    },
    buttoncontainer:{
      height:40,
      backgroundColor:'#3fb265',
      paddingVertical: 10,
      justifyContent:'center'
    },
    buttontext:{
      textAlign:'center',
      color:'#fff',
      fontSize:20,
      fontWeight:'500'

    },
    viewtext:{
  
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'

    },
    textdata:{
      textAlign:'center',
      color:'#888',
      fontWeight:'400',
      paddingTop:15
    },
    registertext:{
      textAlign:'center',
      color:'#3fb265',
      fontWeight:'400',
      paddingTop:15
    },
    headingtext:{
      textAlign:'left',
      color:'#000000',
      fontWeight:'900',
      fontSize:25,

    },
    subheadingtext:{
        textAlign:'left',
        color:'#888',
        fontWeight:'400',
        marginBottom:25

    }
});
