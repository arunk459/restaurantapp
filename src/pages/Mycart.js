import React, { Component } from 'react';
import Fonticons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/AntDesign';
import NumericInput from 'react-native-numeric-input'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Loader from "./Loader";
import { view_cart } from '../services/Auth';

class Mycart extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'My Cart',
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: '100',
        fontSize: 15
      },
      headerRight: (
        <View style={styles.iconContainer}>
          <Fonticons name="heart-o" size={20} color="#000" />
          <Fonticons name="shopping-cart" size={20} color="#000" />
        </View>
      ),
      headerLeft: (
        <View style={styles.lefticon}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="arrowleft" size={22} color="#000" />
          </TouchableOpacity>

        </View>
      ),
    };
  };
  componentDidMount() {
    this.getMyCart();
  }
  getMyCart = () => {
    var formData = new FormData();

    formData.append('device_id', this.props.app.mac);
    formData.append('building_id', this.props.app.building_id);
    view_cart(formData).then(res => {

      console.log('productDetail :', res.data.product);
      if (res.data.status == 1) {
        this.props.setKey({ prop: 'cart_products', value: res.data.cart_products });
      }
    }).catch(error => {
      console.log('error', error);
    });
  }
  render() {
    let cart_products = this.props.app.cart_products;

    console.log('props', this.props.app);
    if (!cart_products) {
      return <Loader
        loading={true} />
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
         {
            cart_products.map(p => {
              if (p.parent_id != 0) return;
              let addon = cart_products.filter(o => o.parent_id == p.id);
            //  console.log(p);

              return (
                <View style={styles.editaccount}>
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                    source={{ uri: p.product_image }}
                  />
                  <View style={styles.nameview}>
                    <Text style={styles.nametext}>{p.product_name}</Text>

                    <View style={{flex:1}}>
                      {
                        addon.map(add => {
                          return (
                            <Text style={styles.nametext}>{add.product_name}</Text>
                          )
                        })
                     }
                    </View>
                    <TouchableOpacity onPress="removeItem(p)">
                      <Text style={{ color: 'red' }} >Remove Item</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={{ left: 50, top: 10 }}>
                    <NumericInput minValue={1} totalHeight={30} totalWidth={80} textColor='black' onChange={value => console.log(value)} />
                  </View>
                 <Text style={{ fontSize: 15, top: 10, color: '#000',left: 50 }}>{p.price}</Text> */}
                  <View style={styles.hrline} />
                </View>                
              )
            })
          }         
          {/* <View style={styles.editaccount}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={require('../images/imgs/cuisine1.jpg')}
            />
            <View style={styles.nameview}>
              <Text style={styles.nametext}>Hot Item Name</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.nametext}>Add on Itme 1</Text>
                <Text style={styles.nametext}>Add on Itme 2</Text>
              </View>
              <TouchableOpacity>
                <Text style={{ color: 'red' }}>Remove Item</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginRight: 30, top: 10 }}>
              <NumericInput minValue={1} totalHeight={30} totalWidth={80} textColor='black' onChange={value => console.log(value)} />
            </View>

            <Text style={{ fontSize: 15, top: 10, color: '#000' }}>$8.49</Text>
          </View> */}

        </ScrollView>
        <View style={styles.footer}>
          <Text style={{ right: 200, top: 15, fontSize: 15 }}>$16.46</Text>
          <TouchableOpacity style={styles.cartbutton}>
            <Text style={styles.carttext}>PROCEED TO PAY</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const mapStateToProps = rstate => { return rstate; };

export default connect(mapStateToProps, actions)(Mycart);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 20
  },
  viewicon: {
    top: -15
  },
  editaccount: {
    flexDirection: 'row',
    padding:10,
    // top:5,
  },
  nameview: {
    top:-5,
    flex: 1,
    flexDirection: 'column',
    padding: 10,

  },
  nametext: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    // width:100
  },
  hrline: {
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
    width: 350,
    left: 50,
    padding: 5,
    top: -3,
  },
  img: {
    width: 30,
    height: 30,
    top: -10,
    left: -5
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 100,
  },
  lefticon: {
    padding: 10
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    padding: 10,
    left: 200
  },
  cartbutton: {
    margin: 0,
    height: 44,
    backgroundColor: '#eb451f',
    width: 200,
    alignItems: 'center',
    padding: 10,
    right: 80


  },
  carttext: {
    fontSize: 15,
    fontWeight: '300',
    margin: 0,
    marginBottom: 5,
    right: 15,
    color: '#fff'
  }

});