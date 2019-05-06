import React, {Component} from 'react';
import Fonticons from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    } from 'react-native'; 
    
    export default class Account extends Component {
      static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'My Account',
            headerTintColor: '#000',
            headerTitleStyle: {
            fontWeight: '100',
            fontSize:15
        },
      };
    };
    render() {
    return (
       <View style={styles.container}>   
          <TouchableOpacity style={styles.editaccount} onPress={() => this.props.navigation.navigate('Editaccount')}>
          <Image 
              style={{width:25,height:25}}
              source={require('../images/imgs/user.png')}
            />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>Name:</Text>
              <Text>Email:</Text>
            </View>
            <Fonticons name="angle-right" size={25}/>
          </TouchableOpacity>
          <View style={styles.hrline}/>

          <TouchableOpacity style={styles.editaccount} onPress={() => this.props.navigation.navigate('Change_pass')}>
          <Image 
              style={styles.img}
              source={require('../images/imgs/unlock.png')}
            />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>Change Passowrd</Text>
            </View>
            <Fonticons style={styles.viewicon} name="angle-right" size={25}/>
          </TouchableOpacity>
          <View style={styles.hrline}/>

          <TouchableOpacity style={styles.editaccount} onPress={() => this.props.navigation.navigate('Order')}>
          <Image 
              style={styles.img}
              source={require('../images/imgs/serving_dish.png')}
            />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>My Orders</Text>
            </View>
            <Fonticons  style={styles.viewicon} name="angle-right" size={25}/>
          </TouchableOpacity>
          <View style={styles.hrline}/>

          <TouchableOpacity style={styles.editaccount} onPress={() => this.props.navigation.navigate('Favourities')}>
          <Image 
              style={styles.img}
              source={require('../images/imgs/fav.png')}
            />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>Favourites</Text>
            </View>
            <Fonticons style={styles.viewicon} name="angle-right" size={25}/>
          </TouchableOpacity>
          <View style={styles.hrline}/>

          <TouchableOpacity style={styles.editaccount} onPress={() => this.props.navigation.navigate('Referral')}>
          <Image 
              style={styles.img}
              source={require('../images/imgs/discount.png')}
            />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>Referrel</Text>
            </View>
            <Fonticons style={styles.viewicon} name="angle-right" size={25} />
          </TouchableOpacity>
          <View style={styles.hrline}/>

          <TouchableOpacity style={styles.editaccount} onPress={() => this.props.navigation.navigate('Offers')}>
          <Image 
              style={styles.img}
              source={require('../images/imgs/discount-voucher.png')}
            />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>Offers</Text>
            </View>
            <Fonticons style={styles.viewicon} name="angle-right" size={25}/>
          </TouchableOpacity>
          <View style={styles.hrline}/>

          <TouchableOpacity style={styles.editaccount} onPress={() => this.props.navigation.navigate('Help')}>
          <Image 
              style={styles.img}
              source={require('../images/imgs/tel.png')}
            />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>Help</Text>
              <Text>FAQ & Links:</Text>
            </View>
            <Fonticons style={styles.viewicon} name="angle-right" size={25}/>
          </TouchableOpacity>
          <View style={styles.hrline}/>

          <TouchableOpacity style={styles.editaccount} >
          <Image 
              style={styles.img}
              source={require('../images/imgs/logout.png')}
          />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>Logout:</Text>
            </View>
            <Fonticons style={styles.viewicon}  name="angle-right" size={25} />
          </TouchableOpacity>
          <View style={styles.hrline}/>
         
      </View>
      );
    }
  }

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      marginTop:25,
      // height:100
    },
    viewicon:{
      top:-15
    },
    editaccount:{
      flexDirection:'row',
      padding:15,
      top:-25,
    },
    nameview:{
      top:-5,
      flex:1,
      flexDirection:'column',
      left:15,
    },
    nametext:{
      fontSize:15,
      fontWeight:'400',
      color:'#000'
    },
    hrline:{
      borderBottomColor: '#eee',
      borderBottomWidth: 2,
      left:50,
      top:-45,
      },
      img:{
        width:30,
        height:30,
        top:-10,
        left:-5
      }
  });
  