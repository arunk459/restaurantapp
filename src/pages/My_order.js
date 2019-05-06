import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    } from 'react-native'; 
    
export default class My_order extends Component {
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
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="arrowleft" size={22} color="#000" />  
                    </TouchableOpacity>
                
                </View>                    
            ),
            };       
        };
    render() {
        return (
           <View style={styles.container}>
                <View style={styles.reviewcontainer}>
                    <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={styles.reviewtext3}>Orders Id: EZZPPFGT545</Text>
                    <Text style={styles.reviewrating}> $16.56</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={styles.reviewtext31}>Tax Amount: $10</Text>
                    <Text style={styles.reviewrating1}>Recieved</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={styles.reviewtext32}>Discount Amount: $10</Text>
                    <Text style={styles.reviewrating2}>April 5,2019</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{top:-45,fontSize:15,left:10,fontWeight:'400'}}>Item1,Item2,Item3</Text>   
                    </View>
                    <View style={styles.hrline}/>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                    <Text style={{color:'red',left:250}}>View Details</Text>
                    </TouchableOpacity>
                    </View>
                 </View>
           </View>
           );

    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      marginTop:10,
      backgroundColor:"#f0f0f0",
     // height:'auto'
    },
    lefticon:{
        padding : 10
     },
     reviewcontainer:{
        position: 'relative',
        backgroundColor:'#fff',
        top:20,
        marginBottom:10,
        height:200,
        borderRadius: 10,
        width:'95%',
        marginLeft:8,
        elevation: 2,
        // flexDirection:'row'
    },
    reviewtext3:{
        left:10,
        top:10,
        fontSize:15,
        
       // fontWeight:500 
      },
      reviewtext31:{
        left:10,
        top:-10,
        fontSize:15,
        
       // fontWeight:500 
      },
      reviewtext32:{
        left:10,
        top:-25,
        fontSize:15,
      color:'red'
      },
      reviewrating:{
        left:100,
        top:10,
        color:'red'
    },
    reviewrating1:{
        left:150,
        top:-10,
        color:'green'
    },
    reviewrating2:{
        left:100,
        top:-25,
       
    },
    hrline:{
        borderBottomColor: 'green',
        borderBottomWidth: 1,
        top:-20
        },
   
});