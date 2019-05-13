import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
    } from 'react-native'; 

import GridLayout from 'react-native-layout-grid';
import { connect } from 'react-redux';


import { fetch_wishlist } from '../services/Auth';
import * as actions from '../actions';


class Favourites extends Component {

  componentDidMount(){
    fetch_wishlist(this.props.auth.user.user.id).then(res =>{
          console.log("res in fav",res);
          this.props.setFavouriteProducts({prop : 'set_fav_products',value : res.data.products});
    })
  }
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Favourites',
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
      renderCategory = (item) => {
        if (item) {
          return (
            <View style={styles.itemcontainer}>
                <View style={{flex:0.5}} >
                <Image 
                style={styles.imageview}
                source={item ? {uri : item.product_image } :require('../images/banner1.jpg')}
                />
                </View>
                <View>
                <Text style={styles.name}>{item ? item.product_name : ""}</Text>
                <View style={{flex:1,flexDirection:'row'}}>
                        <Ionicons name="star" size={12} color="#FF4500"/>
                        <Text>{item ? item.rate : ""}</Text> 
                        <TouchableOpacity style={styles.buttoncontainer} onPress={this.login}>
                            <Text style={styles.buttontext}>Add</Text>
                        </TouchableOpacity>
                </View>
                </View>
        </View>
          );
        } else {
          return <View style={styles.itemcontainer}></View>
        }
       
        //         <View style={styles.itemcontainer}>
        //         <View style={styles.itemimage}>
        //         <Image 
        //         style={styles.imageview}
        //         source={item ? {uri : item.product_image } :require('../images/banner1.jpg')}
        //         />
        //         </View>
        //         <View style={styles.itemtext}>
        //         <Text style={styles.name}>{item ? item.product_name : ""}</Text>
        //         <View style={{flex:1,flexDirection:'row'}}>
        //                 <Ionicons name="star" size={12} color="#FF4500"/>
        //                 <Text>{item ? item.rate : ""}</Text> 
        //                 <TouchableOpacity style={styles.buttoncontainer} onPress={this.login}>
        //                     <Text style={styles.buttontext}>Add</Text>
        //                 </TouchableOpacity>
        //         </View>
        //         </View>
        // </View>
        
    };

    renderGridItem = (item) => {
      if (item) {
        return this.renderCategory(item);
      } else {
        return <View style={styles.itemcontainer}></View>
      }
  
    }
  
    render() {
        const items = this.props.app.favProducts;
        return (
           <ScrollView style={styles.container}>
                 <View style={styles.flex}>
                    <GridLayout
                        items={this.props.app.favProducts}
                        itemsPerRow={1}
                        renderItem={this.renderGridItem}
                    />
                </View>                
           </ScrollView>
           );
 
    }
}

const mapStateToProps = state => { 
  return state; };

export default connect(mapStateToProps, actions)(Favourites);
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   flexDirection:'column',
    //   margin:10,
    
    },
    lefticon:{
        padding : 10
     },
    flex: {
        flex: 1,      
      },
    text:{
        textAlign:'left',
        fontSize:15,
        padding:8,     
    },
    itemcontainer:{
        flex:1,
        flexDirection:"column",
        height:160,
      },
      itemimage:{
        height:100,
      },
      itemtext:{
        height:60,
        // backgroundColor:'green',
        padding:10
      },
      imageview:{
        height:'100%',
        width:'100%',
        position:'absolute',
        
    },
    buttoncontainer:{
      borderWidth: 1, 
      borderRadius: 3, 
      borderColor: '#3fb265', 
      fontSize: 11,
      fontWeight:'bold',
      padding: 12,  
      justifyContent:'space-around',
      marginLeft:100
  
    },
    buttontext:{
      textAlign:'center',
      color:'#3fb265',
      fontSize:10,
    },
});