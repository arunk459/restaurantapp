import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import {fetch_login} from '../services/Auth';
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

    
class Login extends Component {
  static navigationOptions = {
     header: null,
    }
    constructor(props) {
      super(props)
      this.state = {
        username: "",
        password: "",
      }   
    }

    login = () => {
      const _this =this;
      const {username} = this.state;
      const {password} = this.state;
      var formData = new FormData();
      formData.append('email', username);
      formData.append('password', password);
      fetch_login(formData).then(res => {
         console.log('response :',res);
        if(res.data.status == "1"){
          console.log('response :',res);
          this.props.handleLoginUser(res.data);
        this.props.navigation.navigate('Home')
        }
      }).catch(error => {
        console.log('error',error);
      });
}
    render() {
      console.log(this.props);
      return (
        // <SafeAreaView style={styles.container}>
        //   <StatusBar barStyle="light-content"/>
        //      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        //         <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                  <View style={styles.container}>
                    <ImageBackground
                      style={styles.picture}
                      source={require('../images/loginbg.png')}>
                        <View style={styles.textfields}>
                        <Text style={styles.headingtext}>Food Delivery</Text>
                        <Text style={styles.subheadingtext}> Fast Food Delivery</Text>
                          <TextInput style={styles.input}
                            placeholder="Username"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ username => this.setState({ username }) }
                          />
                          <TextInput style={styles.input}
                            placeholder="Password"
                            returnKeyType="go"
                            secureTextEntry
                            onChangeText={ password => this.setState({ password }) }
                          />
                          <TouchableOpacity style={styles.buttoncontainer} onPress={this.login}>
                              <Text style={styles.buttontext}>Login Here</Text>
                          </TouchableOpacity>
                          <View style={styles.viewtext}>
                            <Text style={styles.textdata}>New User ? </Text>
                            <Text style={styles.registertext} onPress={()=>this.props.navigation.navigate('Starter')}
                            >REGISTER HERE</Text>
                          </View>

                        </View>
                    </ImageBackground>
                </View>
        //       </TouchableWithoutFeedback>
        //   </KeyboardAvoidingView>
        // </SafeAreaView>
      );
    }
  }

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    handleLoginUser: payload => dispatch({type:"SET_USER_DATA",payload}),
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);

  
  
 
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
