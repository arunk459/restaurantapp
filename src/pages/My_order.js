import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet, 
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList
    } from 'react-native'; 

import { connect } from 'react-redux';
import * as actions from '../actions';
import {makeDropDown ,applyCoupon, get_bookings, my_bookings} from '../services/Auth';
const {height} = Dimensions.get("window");  

class My_order extends Component {
    componentDidMount(){
        my_bookings(this.props.auth.user.user.id).then((res)=>{
            console.log(res);
            this.props.setBookings('my_bookings',res.data.bookings)
        })
    }
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'My Orders',
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
    render() {
        return (
           <ScrollView style={styles.container}>
            <FlatList
                data={this.props.app.my_bookings}
                renderItem={({ item, index }) =>
                <View style={[styles.reviewcontainer,{flex: 1}]}>
                    <View style={{flex:1,margin:10}}> 
                            <Text style={{fontSize:14,color:'#000'}}>{`Order Id: ${item.unique_code}`}   </Text>
                        </View>
                   
                        <View style={{flex:1,marginLeft:10}}> 
                            <Text style={{fontSize:14,color:'red'}}>{`Price: ${item.amount}`} </Text>
                        </View>
              
                    <View style={{flexDirection:'row',flex:1,paddingVertical:5}}>
                        <View style={{flex:0.7,margin:10}}> 
                            <Text style={{fontSize:14,color:'#000'}}> {`Tax Amount: ${item.tax_amount}`}</Text>
                        </View>
                        <View style={{flex:0.2,margin:10}}> 
                            <Text style={{fontSize:12,color:'green'}}> Recieved </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',flex:1,paddingVertical:5}}>
                        <View style={{flex:0.7,marginLeft:10}}> 
                            <Text style={{fontSize:14,color:'red'}}>{`Discount Amount: ${item.discount_amount}`}</Text>
                        </View>
                        <View style={{flex:0.3,marginLeft:10}}> 
                            <Text style={{fontSize:13}}> {`${item.order_date}`}</Text>
                        </View>
                    </View>
                  
                    <View style={{flex:1,margin:10}}>
                         <Text style={{fontSize:14}}>Item1,Item2,Item3</Text>   
                    </View>
                    <View style={styles.hrline}/>
                    <TouchableOpacity style={styles.details} onPress={()=>this.props.navigation.navigate('Order_details',{item})}>
                         <Text style={{color:'#000',fontSize:15,fontWeight:'bold',textAlign:'center'}}>View Details</Text>
                    </TouchableOpacity>
                    </View>}
            />   
           </ScrollView>
           );

    }
}

const mapStateToProps = state => { return state; };

export default connect(mapStateToProps,actions)(My_order);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor:"#f7f7f7",
      height:height,
      margin:10
    },
    lefticon:{
        padding : 10
     },
     reviewcontainer:{
        position: 'relative',
        backgroundColor:'#fff',
        marginBottom:10,
        height:height/4,
        borderRadius: 10,
        width:'95%',
        marginLeft:8,
        elevation: 2,
        // flexDirection:'row'
    },
   
    hrline:{
        borderBottomColor: '#f7f7f7',
        borderBottomWidth: 1,
        // paddingVertical:10
        },

    details:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        padding:10
    }
   
});