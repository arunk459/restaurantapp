import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    Picker,
    TextInput,
    Dimensions,
    Button
    } from 'react-native'; 
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {makeDropDown} from '../services/Auth';

const {height} = Dimensions.get("window");
class Timing extends Component {
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Timing',
            headerTintColor: '#000',
            headerTitleStyle: {
            fontWeight: '100',
            fontSize:15
            },
            headerRight: (
                <View style={styles.iconContainer}>
                    <TouchableOpacity>
                         <Text style={{fontWeight:'200', fontSize:15, color:'#000'}}>SAVE</Text>
                    </TouchableOpacity>
                </View>  
            ),
            };       
        };
    render() {
        console.log("this.props in TImings",this.props);
        return (
           <ScrollView style={styles.container}>
                <View style={styles.fieldview}>
                    <Picker style={{width:'100%'}}
                    selectedValue={this.props.app.selectedTiming}
                    onValueChange={(itemValue, itemIndex) => { 
                        this.props.setTiming( prop= 'selectedTiming', value= itemValue );
                    }
                    }>
                    <Picker.Item label="Choose Timing" value="" />
                    {makeDropDown(this.props.app.delivery_times)}
                </Picker> 
                </View>
                <View style={styles.fieldview}>
                    <View style={styles.imgview}>
                        <Image 
                        style={{width:27,height:27}}
                        source={require('../images/imgs/user.png')}
                        />
                    </View>
                
                    <View style={styles.nameview}>
                        {/* <Text style={styles.nametext}>Full Name</Text> */}
                        <TextInput style={styles.input}
                            placeholder="Full Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ name => this.setState({ name }) }
                            value={this.props.auth.user.user.name}                       
                          />
                    </View>
                </View>
                <View style={styles.fieldview}>
                    <View style={styles.imgview}>
                        <Image 
                        style={{width:27,height:27}}
                        source={require('../images/imgs/email-address.png')}
                        />
                    </View>
                    <View style={styles.nameview}>
                        {/* <Text style={styles.nametext}>Email</Text> */}
                        <TextInput style={styles.input}
                            placeholder="Email"
                            returnKeyType="next"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ email => this.setState({ email }) }
                            value={this.props.auth.user.user.email}
                          />
                    </View>
                </View>
                <View style={styles.fieldview}>
                    <View style={styles.imgview}>
                        <Image 
                        style={{width:27,height:27}}
                        source={require('../images/imgs/contact.png')}
                        />
                    </View>
                    <View style={styles.nameview}>
                        {/* <Text style={styles.nametext}>Contact</Text> */}
                        <TextInput style={styles.input}
                            placeholder="Contact"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ mobile => this.setState({ mobile }) }  
                            value={this.props.auth.user.user.mobile}

                          />
                    </View>
                </View>
                <View style={styles.fieldview}>
                    <Picker style={{width:'100%'}}
                        selectedValue={this.props.app.selectedBuildingDuringCheckout}
                        onValueChange={(itemValue, itemIndex) => { 
                            this.props.selectedBuildingDuringCheckout( prop= 'selectedBuildingDuringCheckout', value= itemValue );
                        }
                        }>
                        <Picker.Item label="Choose Building" value="" />
                        {makeDropDown(this.props.app.realtedBuilding)}
                    </Picker> 
                </View>
                <View style={styles.fieldview}> 
                    <TextInput style={styles.input}
                            placeholder="Office Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ office_name => this.setState({ office_name }) }                       
                    />
                </View>
                <View style={styles.fieldview}>
                <TextInput style={styles.input}
                            placeholder="Office No"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ office_no => this.setState({ office_no }) }                       
                    />
                </View>
                <View style={styles.fieldview}>
                <TextInput style={styles.input}
                            placeholder="Floor"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ floor => this.setState({ floor }) }                       
                    />
                </View>
                <View style={styles.reviewcontainer}>
                    <View style={{height:35,alignItems:'center',flexDirection:'row'}}>
                        <Text style={[styles.reviewtext3,{width:'60%',alignItems:'center'}]}>Sub Total</Text>
                        <Text style={[styles.reviewtext3,{width:'20%',alignItems:'center'}]}>{`Rs. ${this.props.app.total_cart_value}`}</Text>
                    </View>
                    <View style={{height:35,alignItems:'center',flexDirection:'row'}}>
                        <Text style={[styles.reviewtext3,{width:'60%',alignItems:'center'}]}>Tax</Text>
                        <Text style={[styles.reviewtext3,{width:'20%',alignItems:'center'}]}>10.00</Text>
                    </View>
                   
                    <View style={{height:50,alignItems:'center',flexDirection:'row'}}>
                        <Text style={[styles.reviewtext3,{width:'60%',fontWeight:'bold'}]}>Total</Text>
                        <Text style={[styles.reviewtext3,{width:'20%',fontWeight:'bold'}]}>{`Rs. ${this.props.app.total_cart_value}`}</Text>
                    </View>
                        
                </View>
                <View style={styles.fieldview}>
                    <Text  style={{fontSize:15,fontWeight:'bold',paddingHorizontal:11}}>Coupon Code</Text>                   
                </View>
                <View style={[styles.fieldview,{flex:1,top:-10}]}>
                <TextInput style={[styles.input,{flex:0.70}]}
                            placeholder="Enter Coupon Code Here"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ coupon_code => this.setState({ coupon_code }) }  
                                                
                 />
                <TouchableOpacity style={{flex:0.22,height:40}}>
                    <Text style = {styles.buttonText}>  Apply </Text>
                </TouchableOpacity>
                                   
                </View>
               
           </ScrollView>
           );

    }
}

const mapStateToProps = state => { return state; };

export default connect(mapStateToProps,actions)(Timing);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:height
    },
    iconContainer: { 
        flexDirection: "row", 
        justifyContent: "space-evenly",
        width: 100,
        },
    fieldview:{
        flexDirection:'row',
        width:'100%',
        height:height/13
    },
   
    imgview:{
        width:'15%',
        alignItems:'center'
    },
    nameview:{
        flexDirection:'column',
        // left:15, 
        width:'80%'
      },
    nametext:{
    fontSize:15,
    fontWeight:'400',
    color:'#000'
    },
    input:{
    height: 40,
    paddingHorizontal:11,
    borderRadius:15,
    backgroundColor: '#fff',
    color:'#34495e',
    marginBottom:20
    },
    reviewtext3:{
         
        top:10,
        fontSize:15,
        fontWeight:'400',
        
      },
      reviewcontainer:{
        position: 'relative',
        marginBottom:20,
        height:120,
        borderRadius: 10,
        width:'95%',
        marginLeft:8,
        elevation: 2,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
 
    hrline:{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        top:-100,
        width:280,
        left:25, 
        },
    buttonText:{
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white',
      fontWeight:'bold',
      textAlign:'center'
    
    }
});