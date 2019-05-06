import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
    } from 'react-native'; 
    
export default class Change_pass extends Component {
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Change Password', 
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
            headerRight: (
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                         <Text style={{fontWeight:'200', fontSize:15, color:'#000'}}>SAVE</Text>
                    </TouchableOpacity>
                </View>  
            ),
            };       
        };
    render() {
        return (
           <View style={styles.container}>
                 <View style={styles.textfields}>
                    <TextInput style={styles.input}
                            placeholder="Old Password"
                            returnKeyType="Next"
                            secureTextEntry
                            onChangeText={ password => this.setState({ password }) }
                          />
                    <TextInput style={styles.input}
                            placeholder="New Password"
                            returnKeyType="go"
                            secureTextEntry
                            onChangeText={ password => this.setState({ password }) }
                          />
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
    },
    lefticon:{
        padding : 10
     },
    iconContainer: { 
    flexDirection: "row", 
    justifyContent: "space-evenly",
    width: 100,
    },
      textfields:{
        position:'absolute',
        left:0,
        right:0,
        height:200,
        padding:20,
        
      },
    
      input:{
        height: 40,
        paddingHorizontal:10,
        borderRadius:15,
        backgroundColor: '#fff',
        color:'#34495e',
        marginBottom:20,
      },
});