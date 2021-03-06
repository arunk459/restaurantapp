import React, { Component } from 'react';
import Fonticons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Rating, CheckBox } from 'react-native-elements';

import { connect } from 'react-redux';
import * as actions from '../actions';
import Loader from "./Loader";
 import CustomMultiPicker from "./multipleSelect";
import {add_to_cart, fetch_product_details, submit_product_review } from '../services/Auth';
// import { NetworkInfo } from 'react-native-network-info';


class Details extends Component {
    state = {
        loading: true,
        rating: 0,
        review: '',
        checked:{13:true},
        quantity:1
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Details',
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
        this.getProductDetails(this.props.app.selectedProduct.id);
        //
        // NetworkInfo.getIPV4Address(ip => {
          
        //   this.props.setKey({ prop: 'mac', value: ip });
        // });

    }
    getProductDetails = (productId) => {
               var formData = new FormData();

          formData.append('product_id', productId);
        fetch_product_details(formData).then(res => {
          
            console.log('productDetail :', res.data.product);
            if (res.data.status == 1) {
                this.props.setKey({ prop: 'product', value: res.data.product });
                

            }
        }).catch(error => {
            console.log('error', error);
        });
    }
    handelCheck =(i)=>{
        let o={};
        o[i]=0;

        this.setState(
            {
                checked:   {...this.state.checked,[i]:false}
            } );
             
    }
    renderAddon = ()=>  {
        if(!this.props.app.product)return;
        return  this.props.app.product.add_ons.map(a => {      

           return(
            <View style={{ flexDirection: 'column' }}>
            <Text>{a.name}</Text>

            {a.items.map(i => {
               if(i.is_single == 1){  
                  return (
                      <View style={{ flexDirection: 'row' }}>
                      <CheckBox
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      title={i.name}
                      onPress={()=>this.handelCheck( i.id)}
                      checked={this.state.checked[i.id] }
                      />
                      </View>

                      )
              }else{
                return (
                    <View style={{ flexDirection: 'row' }}>
                    <CheckBox

                    title={i.name}
                    onPress={()=>this.handelCheck( i.id)}
                    checked={this.state.checked[i.id]}
                    />
                    </View>

                    )
            }

        })}
            </View>

            )        

       })
    }

    addTocart = () => {
      var formData = new FormData();
      formData.append('product_id', this.props.app.product.id);
      formData.append('product_name',  this.props.app.product.name);
      formData.append('product_image',  this.props.app.product.image);
      formData.append('quantity', this.state.quantity);
      formData.append('building_id',  this.props.app.building_id);
      formData.append('price',  this.props.app.product.prices[0].offered_price);
      formData.append('mac',  this.props.app.mac);
      let addonIds = [];
      for (let key in  this.state.checked ) {
            if (this.state.checked[key]==1) {
                 addonIds.push(key);
            }
        }
     formData.append('prod_ids',  addonIds.toString());
     console.log('formData',formData);

      add_to_cart(formData).then(res => {
        // console.log('response :',res);
        if(res.data.status == 1){
              this.props.pushArray({ prop: 'cart', value: formData });
        this.props.navigation.navigate('MyCart')
        }
      }).catch(error => {
        console.log('error',error);
      });
    }
    submitReview = () => {
        var formData = new FormData();
        formData.append('review', this.state.review);
        formData.append('rating', this.state.rating);
        submit_product_review(formData).then(res => {
            console.log('productDetail :', res);
            if (res.data.status == 1) {
                Alert.alert(res.data.message);
            }
        }).catch(error => {
            console.log('error', error);
        });
    }
    ratingCompleted = (rating) => {
        this.setState({ 'rating': rating });
    }

    render() {
        let app = this.props.app;
 console.log('props' ,this.props.app);
        if (!app.product) {
            return <Loader
                loading={true} />
        }
        return (
            <View style={{ flex: 1 }}>

                <ScrollView style={styles.container}>
                    <View style={styles.imagecontainer}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: app.product.image }}
                        />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={styles.name}>{app.product.name}</Text>
                        <View style={styles.review}>
                            <Text>{app.product.rating}</Text>
                            <Ionicons name="star" size={10} />
                            <Text style={{ top: -5 }}> ({app.product.reviews.length} review)</Text>
                        </View>

                        <View style={{ margin: 10, fontSize: 13, flexDirection: "row" }}>
                            <Text>Size: {app.product.prices[0].size}</Text>
                            <Text style={{ marginLeft: 70 }}>{`${app.product.prices[0].price}`}</Text>
                        </View>
                        <View style={{ margin: 10, fontSize: 13, flexDirection: "column" }}>
                            {this.renderAddon()}
                          
                        </View>
                        {/* <View style={{ margin: 10, fontSize: 13, flexDirection: "column" }}>
                            <Text>Add on Catagory: Cheese</Text>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>American</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Lettuce</Text>
                                </View>
                            </View>
                        </View> */}
                        <TouchableOpacity style={styles.buttoncontainer} onPress={()=>this.addTocart()}>
                            <Text style={styles.buttontext}>ADD</Text>
                        </TouchableOpacity>
                        <View style={styles.hrline} />
                        <View style={{ margin: 10, fontSize: 13, flexDirection: "row" }}>
                            <Text>{app.product.description}</Text>
                        </View>

                    </View>

                    <Text style={{ fontSize: 15, top: -30, left: 10 }}>Write your review's</Text>
                    <View style={styles.writecontainer}>
                        <Rating
                            type="star"
                            ratingCount={5}
                            fractions={0}
                            startingValue={0}
                            imageSize={25}
                            onFinishRating={this.ratingCompleted}
                            // showRating
                            style={{ paddingVertical: 10 }}
                        />
                        <View style={styles.reviewtext1}>
                            <TextInput style={styles.input}
                                placeholder="Please Enter Review"
                                returnKeyType="next"
                                //onSubmitEditing={() => this.passwordInput.focus()}
                                // keyboardType="Text"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={review => this.setState({ review })}
                            />
                            <TouchableOpacity onPress={() => this.submitReview()}>
                                <Image
                                    style={styles.img}
                                    source={require('../images/imgs/ios-paper-plane-outline.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <Text style={{ fontSize: 15, left: 10 }}>Reviews</Text>
                    {
                        app.product.reviews.map(d => {


                            return (<View style={styles.reviewcontainer}>
                                <Text style={styles.reviewtext3}>{`${d.name}(${d.email})`} </Text>
                                <Text style={styles.reviewrating}>{d.rating}</Text>
                                <Ionicons name="star" size={12} color="#FF4500" />
                                <View style={styles.hrline} />

                            </View>)
                        })

                    }
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.cartbutton}>
                        <Text style={styles.carttext}>ADD TO FAVOURITE</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}
const mapStateToProps = rstate => { return rstate; };

export default connect(mapStateToProps, actions)(Details);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",

    },

    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 100,
    },
    lefticon: {
        padding: 10
    },
    imagecontainer: {
        flex: 1,
        height: 200,
    },
    textcontainer: {
        //    flex:1,
        position: 'relative',
        backgroundColor: '#fff',
        top: -50,
        // height: 250,
        borderRadius: 10,
        width: '95%',
        marginLeft: 8,
        elevation: 2
    },
    name: {
        fontSize: 15,
        textAlign: 'left',
        color: '#000000',
        fontWeight: '400',
        margin: 10
    },
    input: {
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        color: '#34495e',
        marginBottom: 20
    },
    review: {
        //   flex:1,
        flexDirection: 'row',
        marginLeft: 10
    },
    buttoncontainer: {
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#3fb265',
        fontSize: 11,
        fontWeight: 'bold',
        padding: 5,
        justifyContent: 'space-around',
        // marginLeft:100
        margin: 10,
        marginTop: 30

    },
    buttontext: {
        textAlign: 'center',
        color: '#3fb265',
        fontSize: 15,
    },
    hrline: {
        borderBottomColor: '#f7f7f7',
        borderBottomWidth: 1,
    },
    reviewcontainer: {
        position: 'relative',
        backgroundColor: '#fff',
        top: 20,
        marginBottom: 40,
        height: 120,
        borderRadius: 10,
        width: '95%',
        marginLeft: 8,
        elevation: 2,
        flexDirection: 'row'
    },
    writecontainer: {
        position: 'relative',
        backgroundColor: '#fff',
        top: -10,
        height: 120,
        borderRadius: 10,
        width: '95%',
        marginLeft: 8,
        elevation: 2,

    },
    reviewtext1: {
        flex: 1,
        flexDirection: 'row',
    },

    img: {
        width: 30,
        height: 30,
        // top:0,
        left: -5
    },

    reviewtext3: {
        left: 10,
        top: 10,
        fontSize: 15
        //  fontWeight:300  
    },
    reviewrating: {
        left: 100,
        top: 10
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
        padding: 10
    },
    carttext: {
        fontSize: 15,
        fontWeight: '500',
        margin: 0,
        marginBottom: 5,
        color: '#fff'
    }
});
