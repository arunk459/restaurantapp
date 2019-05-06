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
    import { Table, Row, Rows } from 'react-native-table-component';
export default class Order_details extends Component {
    
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Order Details',
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
        constructor(props) {
            super(props);
            this.state = {
              tableHead: ['Item Naame', 'Unit', 'Price'],
              tableData: [
                ['Item1', '2', '$ 5'],
                ['Item2', '2', '$ 6'],
                ['Item3', '1', '$ 4'],
                ['Item4', '4', '$ 8']
              ]
            }
          }
        
       
    render() {
        const state = this.state;
        return (
           <ScrollView style={styles.container}>
                <View style={styles.reviewcontainer}>
                    <Text style={styles.reviewtext3}><Image 
                                        style={styles.img}
                                        source={require('../images/imgs/right.png')}
                                        />Order Delivery on APR 5,2019</Text>
                </View>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={state.tableData} textStyle={styles.text}/>
                </Table> 
                    <View style={{flex:1,top:10,flexDirection:'row',borderRadius:10}}>
                        <Text style={{left:10,fontSize:15}}>Total</Text>
                        <Text style={{left:190,fontSize:15}}>$ 23</Text>
                    </View>
           </ScrollView>
           );

    }
}
const styles = StyleSheet.create({
    

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    reviewcontainer:{
        position: 'relative',
        backgroundColor:'#fff',
        top:-10,
        marginBottom:10,
        height:50,
        borderRadius: 8,
        width:'100%',
        //marginLeft:8,
        elevation: 2,
    },
    reviewtext3:{
        left:30,
        // top:5,
        fontSize:15 
      //  fontWeight:300  
      },
      img:{
        width:30,
        height:30,
        // top:0,
         left:15
      },
   
});