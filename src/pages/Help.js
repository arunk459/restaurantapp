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
    
export default class Help extends Component {
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Help',
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
           <ScrollView style={styles.container}>
                 <View style={styles.writecontainer}>
                    <Text style={styles.questext}>Do I have to pay for sign up ?</Text>
                    <Text style={styles.anstext}>No, Ezzybyte sign up is free. You will have to only pay for the food order.</Text>
                 </View>
                 <View style={styles.writecontainer}>
                    <Text style={styles.questext}>When I can order ?</Text>
                    <Text style={styles.anstext}>Orders can be placed via website or mobile app anytime. However, delivery will be during selected lunch hours during the checkout process ?</Text>
                 </View>
                 <View style={styles.writecontainer}>
                    <Text style={styles.questext}>Can I preorder ?</Text>
                    <Text style={styles.anstext}>Yes, during checkout you can select the date of order.</Text>
                 </View>
                 <View style={styles.writecontainer}>
                    <Text style={styles.questext}>Does ezzybyte deliver on all days ?</Text>
                    <Text style={styles.anstext}>Ezzybyte, currently focuses on Monday to Friday office lunch. You will be able to select the day of delivery during checkout.</Text>
                 </View>
                 <View style={styles.writecontainer}>
                     <Text style={styles.questext}>Who makes the food ?</Text>
                    <Text style={styles.anstext}>Ezzybyte is technology company and it works with          closeby restaurants to prepare and deliver the food. Ezzybyte will provide the information of restaurant along with food.</Text>
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
    writecontainer:{
        position: 'relative',
        backgroundColor:'#fff',
        top:-10,
        height:100,
        borderRadius: 8,
        width:'95%',
        marginLeft:8,
        elevation: 2,
        marginTop:10,
        flexDirection:'column'
    },
    questext:{
        fontSize:15,
        fontWeight:'bold',
        left:10,
        top:10
    },
    anstext:{
        fontSize:13,
        left:10,
        top:15,
        textAlign:'justify',
        width:'95%'
    }
});