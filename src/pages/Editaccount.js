import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker'
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Picker,
    Alert,
    ScrollView
    } from 'react-native'; 

import { connect } from 'react-redux';
import * as actions from '../actions';
import {update_profile} from '../services/Auth';

    
class Editaccount extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            name: "",
            mobile:"",
            gender:"",
            dob:"",
            office_name:"",
            building_id:"",
            office_no:"",
            floor:"",
            city_id:"",
            email:""
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({ updateProfile: this.updateProfile });
    }
    updateProfile = ()=>{
        var formData = new FormData();  
        formData.append('id', this.props.auth.user.user.id);
        formData.append('name', this.state.name);
        formData.append('mobile', this.state.mobile);
        formData.append('gender', this.state.gender);
        formData.append('dob', this.state.dob);
        formData.append('building_id', this.state.building_id);
        formData.append('office_name', this.state.office_name);
        formData.append('office_no', this.state.office_no);
        formData.append('floor', this.state.floor);
        formData.append('city_id', this.state.city_id);

        update_profile(formData).then(res =>{
            if(res.data.status == 1){
                this.props.navigation.goBack();
                Alert.alert("Message",res.data.message);
            }
            if(res.data.status == 0){
                Alert.alert("Message",res.data.message);
            }
        }).catch(err =>{
            console.log(err);
        });
    }

    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Edit Account',
            headerTintColor: '#000',
            headerTitleStyle: {
            fontWeight: '200', 
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
                    <TouchableOpacity onPress={() => navigation.state.params.updateProfile()}>
                         <Text style={{fontWeight:'200', fontSize:15, color:'#000'}}>SAVE</Text>
                    </TouchableOpacity>
                </View>  
            ),
            };       
        };
    render() {
        return (
           <ScrollView style={styles.container}>
                <View style={styles.fieldview}>
                <Image 
                    style={{width:25,height:25}}
                    source={require('../images/imgs/user.png')}
                    />
                    <View style={styles.nameview}>
                        <Text style={styles.nametext}>Full Name</Text>
                        <TextInput style={styles.input}
                            placeholder="Full Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ name => this.setState({ name }) }                       
                          />
                    </View>
                </View>
                {/* <View style={styles.fieldview}>
                <Image 
                    style={{width:25,height:25}}
                    source={require('../images/imgs/email-address.png')}
                    />
                    <View style={styles.nameview}>
                        <Text style={styles.nametext}>Email</Text>
                        <TextInput style={styles.input}
                            placeholder="Email"
                            returnKeyType="next"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ email => this.setState({ email }) }
                          />
                    </View>
                </View> */}
                <View style={styles.fieldview}>
                <Image 
                    style={{width:25,height:25}}
                    source={require('../images/imgs/contact.png')}
                    />
                    <View style={styles.nameview}>
                        <Text style={styles.nametext}>Contact</Text>
                        <TextInput style={styles.input}
                            placeholder="Contact"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ mobile => this.setState({ mobile }) }                       
                          />
                    </View>
                </View>
                <View style={styles.fieldview}>
                       
                          <DatePicker
                                style={{width: 300}}
                                date={this.state.dob}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1886-05-01" 
                                maxDate="2019-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                
                                }}
                                onDateChange={(dob) => {this.setState({dob: dob})}}
                            />
                </View>
                <View style={styles.fieldview}>
                    <Picker style={{width: '100%'}} name="gender"
                     selectedValue={this.state.gender}
                     onValueChange={(itemValue, itemIndex) => { 
                       this.setState({ gender: itemValue });
                     }}
                    > 
                        <Picker.Item label="Choose Gender" value=""  />
                        <Picker.Item label="Male" value="1" />
                        <Picker.Item label="Female" value="0" />
                    </Picker>
                </View>
                <View style={styles.fieldview}>
                     <Picker style={{width: '100%'}} name="city_id"
                     selectedValue={this.state.city_id}
                     onValueChange={(itemValue, itemIndex) => { 
                       this.setState({ city_id: itemValue });
                     }}
                     > 
                        <Picker.Item label="Choose City" value="" />
                        <Picker.Item label="Tyson" value="tyson" />
                    </Picker>
                </View>
                <View style={styles.fieldview}>
                    <Picker style={{width: '100%'}} name="building_id"
                    selectedValue={this.state.building_id}
                    onValueChange={(itemValue, itemIndex) => { 
                      this.setState({ building_id: itemValue });
                    }}
                    > 
                        <Picker.Item label="Choose Building" value=""  />
                        <Picker.Item label="Tyson Tower" value="tysontower" />
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
               
           </ScrollView>
           );

    }
}

const mapStateToProps = state => { return state; };

export default connect(mapStateToProps,actions)(Editaccount);
const styles = StyleSheet.create({
    lefticon:{
        padding : 10
     },
    iconContainer: { 
        flexDirection: "row", 
        justifyContent: "space-evenly",
        width: 100,
        },
    container: {
      flex: 1,
      flexDirection:'column',
      margin:10,
    },
    
    fieldview:{
      flexDirection:'row',
    },
    nameview:{
        flexDirection:'column',
        left:15, 
      },
    nametext:{
    fontSize:15,
    fontWeight:'400',
    color:'#000'
    },
    input:{
    height: 40,
    paddingHorizontal:10,
    borderRadius:15,
    backgroundColor: '#fff',
    color:'#34495e',
    marginBottom:20
    },
   
});