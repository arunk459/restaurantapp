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
    ScrollView
    } from 'react-native'; 
    
export default class Editaccount extends Component {
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
        constructor(props){
            super(props)
            this.state = {date:""}
          }
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
                <View style={styles.fieldview}>
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
                </View>
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
                                date={this.state.date}
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
                    <Picker style={{width: '100%'}} name="gender"> 
                        <Picker.Item label="Choose Gender" value=""  />
                        <Picker.Item label="Male" value="1" />
                        <Picker.Item label="Female" value="0" />
                    </Picker>
                </View>
                <View style={styles.fieldview}>
                     <Picker style={{width: '100%'}} name="city_id"> 
                        <Picker.Item label="Choose City" value="" />
                        <Picker.Item label="Tyson" value="tyson" />
                    </Picker>
                </View>
                <View style={styles.fieldview}>
                    <Picker style={{width: '100%'}} name="building_id"> 
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