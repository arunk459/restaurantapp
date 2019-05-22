import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';

import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
    } from 'react-native'; 
import { Table, Row, Rows } from 'react-native-table-component';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {makeDropDown ,applyCoupon, get_bookings, fetch_sales_tax_rate} from '../services/Auth';    


class Order_details extends Component {
    
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Order Details',
            headerTintColor: '#000',
            headerTitleStyle: {
            fontWeight: '100',
            fontSize:15
            },
            headerLeft: (
                <View style={styles.lefticon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrowleft" size={22} color="#000" />  
                    </TouchableOpacity>
                
                </View>                    
            ),
            };       
        };
        constructor(props) {
            super(props);
            // this.state = {
            //   tableHead: ['Item Naame', 'Unit', 'Price'],
            //   tableData: [
            //     ['Item1', '2', '$ 5'],
            //     ['Item2', '2', '$ 6'],
            //     ['Item3', '1', '$ 4'],
            //     ['Item4', '4', '$ 8']
            //   ]
            // }
          }
        
       
    render() {
        const state = this.state;
        return (
           <ScrollView style={styles.container}>
                <View style={styles.reviewcontainer}>
                    <View style={{flex:0.2,margin:10}}>
                        <Image 
                        style={styles.img}
                        source={require('../images/imgs/right.png')}
                        />
                    </View>
                    <View style={{flex:0.7,margin:10}}>
                        <Text style={styles.reviewtext3}>
                        Order Delivery on APR 5,2019</Text>
                    </View>
                   
                </View>
                {/* <Table borderStyle={{borderColor: '#fff'}}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={state.tableData} textStyle={styles.text}/>
                </Table> 
                    <View style={{flex:1,top:10,flexDirection:'row',borderRadius:10}}>
                        <Text style={{left:10,fontSize:15}}>Total</Text>
                        <Text style={{left:190,fontSize:15}}>$ 23</Text>
                    </View> */}
                    <View style={styles.viewcontainer}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:0.6,margin:10}}>
                                <Text style={{fontSize:15,color:'#000'}}>Item Name</Text>
                            </View>
                            <View style={{flex:0.2,margin:10}}>
                                <Text style={{fontSize:15,color:'#000'}}>Unit</Text>
                            </View>
                            <View style={{flex:0.2,margin:10}}>
                                <Text style={{fontSize:15,color:'#000'}}>Price</Text>
                            </View>
                        </View>
                        <View style={styles.hrline}/>
                        <FlatList
                data={this.props.navigation.state.params.item.details}
                renderItem={({ item, index }) =>
                         <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:0.6,margin:10}}>
                                <Text style={{fontSize:15}}>{item.product_name}</Text>
                            </View>
                            <View style={{flex:0.2,margin:10}}>
                                <Text style={{fontSize:15}}>{item.quantity}</Text>
                            </View>
                            <View style={{flex:0.2,margin:10}}>
                                <Text style={{fontSize:15}}>{item.price}</Text>
                            </View>
                        </View>
                }
            />  
                        
                        
                        <View style={styles.hrline}/>
                        <View style={{flex:1,flexDirection:'row',paddingVertical:10}}>
                            <View style={{flex:0.6,margin:10}}>
                                <Text style={{fontSize:15,color:'#000'}}>Total</Text>
                            </View>
                            <View style={{flex:0.2,margin:10}}>
                                {/* <Text style={{fontSize:15,color:'#000'}}>Unit</Text> */}
                            </View>
                            <View style={{flex:0.2,margin:10}}>
                                <Text style={{fontSize:15,color:'#000'}}>$23.67</Text>
                            </View>
                        </View>
                    </View>
           </ScrollView>
           );

    }
}

const mapStateToProps = state => { return state; };

export default connect(mapStateToProps,actions)(Order_details);

const styles = StyleSheet.create({
    

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    reviewcontainer:{
        flex:1,
        position: 'relative',
        backgroundColor:'#fff',
        marginBottom:10,
        height:50,
        borderRadius: 8,
        width:'100%',
        flexDirection:'row',
        elevation: 2,
    },
    reviewtext3:{
        fontSize:15 
      },
      img:{
        width:30,
        height:30,
        // top:0,
         left:15
      },
      viewcontainer:{
        position: 'relative',
        backgroundColor:'#fff',
        marginBottom:10,
        borderRadius: 10,
        width:'100%',
        marginLeft:8,
        elevation: 2,
        // flexDirection:'row'
    },
    hrline:{
        borderBottomColor: '#f7f7f7',
        borderBottomWidth: 1,
        // paddingVertical:10
        },
   
});