import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Picker,
  Alert
} from 'react-native';

import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { Spinner } from './Spinner';

import { connect } from 'react-redux';
import * as actions from '../actions';

import { fetch_cities, google_login, fetch_buildings } from '../services/Auth';

const makeDropDown = (d) => {
  return d.map(d =>
    <Picker.Item label={d.name} value={d.id} />
  );
};

class Starter extends Component {

  state = {
    user: '', city: [],
    email: "",
    idToken: "",
    city_id: "",
    accessToken: "",
    building_id: "",
    realtedBuilding: [],
    loading: true


  }
  static navigationOptions = {
    header: null,
  }



  async componentDidMount() {
    this.getCity();
    this._configureGoogleSignIn();

  }
  getCity = () => {
    fetch_cities().then(res => {
      if (res.data.status == 1) {
        this.props.setKey({ prop: 'city', value: res.data.cities });
      }
    }).catch(error => {
      console.log('error', error);
    });
  }
  getBuilding = (cityId) => {
    fetch_buildings(cityId).then(res => {
      if (res.data.status == 1) {
        this.props.setKey({ prop: 'realtedBuilding', value: res.data.buildings });
      }
    }).catch(error => { console.log('error', error); });
  }


  _configureGoogleSignIn() {
    GoogleSignin.configure({

      webClientId: '652611382985-mlu63h8data1l3hqdgr4baouvf1pl5mh.apps.googleusercontent.com',

    });
  }
  googleLogin = (userInfo) => {
    var formData = new FormData();
    formData.append('email', userInfo.user.email);
    formData.append('idToken', userInfo.idToken);
    formData.append('building_id', this.state.building_id);
    formData.append('city_id', this.state.city_id);
    formData.append('accessToken', userInfo.accessToken);
    formData.append('givenName', userInfo.user.givenName);
    formData.append('familyName', userInfo.user.familyName);

    google_login(formData).then(res => {
      console.log('response :', res);
      if (res.data.status == 1) {
        this.props.navigation.navigate('Home', {
          'city_id': this.state.city_id,
          'building_id': this.state.building_id,
          'menu_id': this.state.menu_id
        });
      }
    }).catch(error => {
      console.log('error', error);
    });
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      this.setState({ userInfo });
      this.googleLogin(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        Alert.alert('sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert(error.code);
      }
    }
  };



  render() {
    console.log(this.props);
    // if (this.state.loading) {

    //         return <Spinner />
    //     }
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>

        <View style={styles.container}>

          <ImageBackground
            style={styles.picture}
            source={require('../images/loginbg.png')}>
            <View style={styles.textfields}>
              <Text style={styles.headingtext}>Food Delivery</Text>
              <Text style={styles.subheadingtext}> Fast Food Delivery</Text>
              <Picker
                selectedValue={this.props.app.city_id}
                onValueChange={(itemValue, itemIndex) => {

                  this.props.setKey({ prop: 'city_id', value: itemValue });
                  if (!itemValue) return;
                  this.getBuilding(itemValue);
                }
                }
              >
                <Picker.Item label="Choose City" value="" />
                {makeDropDown(this.props.app.city)}
              </Picker>
              <Picker
                selectedValue={this.props.app.building_id}

                onValueChange={(itemValue, itemIndex) => {
                  if (!itemValue) return;
                  this.props.setKey({ prop: 'building_id', value: itemValue });
                  let obj = this.props.app.realtedBuilding.find(o => o.id === itemValue);
                  if (obj.menu_id) {
                    this.props.setKey({ prop: 'menu_id', value: obj.menu_id });
                  }
                }
                }
              >
                <Picker.Item label="Choose Building" value="" />
                {makeDropDown(this.props.app.realtedBuilding)}
              </Picker>
              <TouchableOpacity style={styles.buttoncontainer}>
                <Text style={styles.buttontext} onPress={() => this.props.navigation.navigate('Register', { city_id: this.sate.city_id, building_id: this.state.building_id })}>GET STARTED</Text>
              </TouchableOpacity>
              <View style={styles.viewtext}>
                <Text style={styles.textdata}>Already Registered ? </Text>
                <Text style={styles.registertext} onPress={() => this.props.navigation.navigate('Login')}
                >LOG IN</Text>
              </View>
              <TouchableOpacity style={styles.buttoncontainer} onPress={this._signIn}>
                <Text style={styles.buttontext}>GOOGLE LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttoncontainer} onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.buttontext}>GOOGLE LOGIN</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = rstate => {
  return rstate;
};

export default connect(mapStateToProps, actions)(Starter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'rgb(32,53,70)',
    flexDirection: 'column'
  },
  picture: {
    flex: 1,
    resizeMode: 'cover',
  },
  textfields: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    padding: 20,
    marginTop: 150
  },

  buttoncontainer: {
    height: 40,
    backgroundColor: '#3fb265',
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 20

  },
  buttontext: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: '500'

  },
  viewtext: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  textdata: {
    textAlign: 'center',
    color: '#888',
    fontWeight: '400',
    paddingTop: 15
  },
  registertext: {
    textAlign: 'center',
    color: '#3fb265',
    fontWeight: '400',
    paddingTop: 15
  },
  headingtext: {
    textAlign: 'left',
    color: '#000000',
    fontWeight: '900',
    fontSize: 25,

  },
  subheadingtext: {
    textAlign: 'left',
    color: '#888',
    fontWeight: '400',
    marginBottom: 25

  }
});
