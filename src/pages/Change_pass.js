import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert
    } from 'react-native'; 
import { connect } from 'react-redux';
import * as actions from '../actions';



import {update_password} from '../services/Auth';


    
class Change_pass extends Component {
    constructor(props){
        super(props);
        this.state={
            newPassword:"",
            oldPassword:""
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({ updatePassword: this.updatePassword });
    }
    updatePassword = ()=>{
        var formData = new FormData();  
        formData.append('user_id', this.props.auth.user.user.id);
        formData.append('password', this.state.oldPassword);
        formData.append('new_password', this.state.newPassword);
        update_password(formData).then((res)=>{
            if(res.data.status == 1){
                this.props.navigation.goBack();
                Alert.alert("Message",res.data.message);
            }
            if(res.data.status == 0){
                Alert.alert("Message",res.data.message);
            }
        }).catch(err=>{
            console.log(err)
        })
    }
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrowleft" size={22} color="#000" />  
                    </TouchableOpacity>
                </View>                    
            ),
            headerRight: (
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.state.params.updatePassword()}>
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
                            onChangeText={ oldPassword => this.setState({ oldPassword }) }
                          />
                    <TextInput style={styles.input}
                            placeholder="New Password"
                            returnKeyType="go"
                            secureTextEntry
                            onChangeText={ newPassword => this.setState({ newPassword }) }
                          />
                 </View>
                 
           </View>
           );

    }
}

const mapStateToProps = state => { return state; };

export default connect(mapStateToProps,actions)(Change_pass);
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