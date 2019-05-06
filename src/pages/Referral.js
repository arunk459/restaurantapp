import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    } from 'react-native'; 
    
export default class Referral extends Component {
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'refer',
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
    },
    lefticon:{
        padding : 10
     },
   
});