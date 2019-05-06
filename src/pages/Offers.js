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
//import { ScrollView } from 'react-native-gesture-handler';
    
export default class Offers extends Component {
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Offers',
            headerTintColor: '#000',
            headerTitleStyle: {
            fontWeight: '100',
            fontSize:15
            },
            headerLeft: (
                <View style={styles.lefticon}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="arrowleft" size={22} color="#000" />  
                    </TouchableOpacity>
                
                </View>                    
            ),
            };       
        };
    render() {
        const newLocal = 'center';
        return (
           <ScrollView style={styles.container}>
                <View style={styles.reviewcontainer}>
                        <Text style={{left:10}}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/discount-voucher.png')}/></Text>
                        <Text style={styles.reviewtext3}>Free 10 % {"\n"}<Text style={{fontSize:14,color:'black'}}>Lorem Ipsum is simply {"\n"}dummy text of the printing.</Text></Text>
                        <Text style={styles.reviewrating}> FOODFREE10% </Text>
                        

                </View>
                <View style={styles.reviewcontainer}>
                        <Text style={{left:10}}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/discount-voucher.png')}/></Text>
                        <Text style={styles.reviewtext3}>Free 10 % {"\n"}<Text style={{fontSize:14,color:'black'}}>Lorem Ipsum is simply {"\n"}dummy text of the printing.</Text></Text>
                        <Text style={styles.reviewrating}> FOODFREE10% </Text>
                        

                </View>
                <View style={styles.reviewcontainer}>
                        <Text style={{left:10}}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/discount-voucher.png')}/></Text>
                        <Text style={styles.reviewtext3}>Free 10 % {"\n"}<Text style={{fontSize:14,color:'black'}}>Lorem Ipsum is simply {"\n"}dummy text of the printing.</Text></Text>
                        <Text style={styles.reviewrating}> FOODFREE10% </Text>
                        

                </View>
                <View style={styles.reviewcontainer}>
                        <Text style={{left:10}}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/discount-voucher.png')}/></Text>
                        <Text style={styles.reviewtext3}>Free 10 % {"\n"}<Text style={{fontSize:14,color:'black'}}>Lorem Ipsum is simply {"\n"}dummy text of the printing.</Text></Text>
                        <Text style={styles.reviewrating}> FOODFREE10% </Text>
                        

                </View>
                <View style={styles.reviewcontainer}>
                        <Text style={{left:10}}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/discount-voucher.png')}/></Text>
                        <Text style={styles.reviewtext3}>Free 10 % {"\n"}<Text style={{fontSize:14,color:'black'}}>Lorem Ipsum is simply {"\n"}dummy text of the printing.</Text></Text>
                        <Text style={styles.reviewrating}> FOODFREE10% </Text>
                        

                </View>
                <View style={styles.reviewcontainer}>
                        <Text style={{left:10}}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/discount-voucher.png')}/></Text>
                        <Text style={styles.reviewtext3}>Free 10 % {"\n"}<Text style={{fontSize:14,color:'black'}}>Lorem Ipsum is simply {"\n"}dummy text of the printing.</Text></Text>
                        <Text style={styles.reviewrating}> FOODFREE10% </Text>
                        

                </View>
                <View style={styles.reviewcontainer}>
                        <Text style={{left:10}}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/discount-voucher.png')}/></Text>
                        <Text style={styles.reviewtext3}>Free 10 % {"\n"}<Text style={{fontSize:14,color:'black'}}>Lorem Ipsum is simply {"\n"}dummy text of the printing.</Text></Text>
                        <Text style={styles.reviewrating}> FOODFREE10% </Text>
                        

                </View>
                <View style={styles.reviewcontainer}>
                        <Text style={{left:10}}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/discount-voucher.png')}/></Text>
                        <Text style={styles.reviewtext3}>Free 10 % {"\n"}<Text style={{fontSize:14,color:'black'}}>Lorem Ipsum is simply {"\n"}dummy text of the printing.</Text></Text>
                        <Text style={styles.reviewrating}> FOODFREE10% </Text>
                        

                </View>
                 
           </ScrollView>
           );

    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      marginTop:10,
      backgroundColor:"#f0f0f0",
    },
    lefticon:{
        padding : 10
     },
     reviewcontainer:{
        position: 'relative',
        backgroundColor:'#fff',
        //  top:-20,
        marginBottom:10,
        height:100,
        borderRadius: 10,
        width:'95%',
        marginLeft:8,
        elevation: 2,
        flexDirection:'row',
       
        
    },
    reviewtext3:{
        left:20,
        top:10,
        fontSize:20, 
        fontWeight:'400',
        color:'red',
        alignItems:'center',
        
        
       
      },
      reviewrating:{
         left:10,
        top:30,
        borderRadius:3,
        backgroundColor:'#fff',
        height:25,
        borderWidth: 1,
        fontWeight:'bold',
        borderStyle: "dashed",
        paddingTop:3
    },
   
    img:{
        width:50,
        height:50,
         top:-20, 
         left:5
      },
});