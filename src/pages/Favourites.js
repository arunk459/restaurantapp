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

import GridLayout from 'react-native-layout-grid';
export default class Favourites extends Component {
    static navigationOptions  = ({ navigation }) => {
        return {
            headerTitle: 'Favourites',
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
    renderGridItem = (item) => (
       
                <View style={styles.itemcontainer}>
                <View style={styles.itemimage}>
                <Image 
                style={styles.imageview}
                source={require('../images/banner1.jpg')}
                />
                </View>
                <View style={styles.itemtext}>
                <Text style={styles.name}>Item Name</Text>
                <View style={{flex:1,flexDirection:'row'}}>
                        <Ionicons name="star" size={12} color="#FF4500"/> 
                        <TouchableOpacity style={styles.buttoncontainer} onPress={this.login}>
                            <Text style={styles.buttontext}>Add</Text>
                        </TouchableOpacity>
                </View>
                </View>
        </View>
    );
    render() {
        const items = [];
       
        //let x=1;
        for (let x = 1; x <= 5; x++) {
           
          items.push({
            name: `Grid ${x}`
          });
         // Alert.alert(items);
       }
        return (
           <ScrollView style={styles.container}>
                 <View style={styles.flex}>
                    <GridLayout
                        items={items}
                        itemsPerRow={2}
                        renderItem={this.renderGridItem}
                    />
                </View>                
           </ScrollView>
           );
 
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   flexDirection:'column',
    //   margin:10,
    
    },
    lefticon:{
        padding : 10
     },
    flex: {
        flex: 1,      
      },
    text:{
        textAlign:'left',
        fontSize:15,
        padding:8,     
    },
    itemcontainer:{
        flex:1,
        flexDirection:"column",
        height:160,
      },
      itemimage:{
        height:100,
      },
      itemtext:{
        height:60,
        // backgroundColor:'green',
        padding:10
      },
      imageview:{
        height:'100%',
        width:'100%',
        position:'absolute',
        
    },
    buttoncontainer:{
      borderWidth: 1, 
      borderRadius: 3, 
      borderColor: '#3fb265', 
      fontSize: 11,
      fontWeight:'bold',
      padding: 12,  
      justifyContent:'space-around',
      marginLeft:100
  
    },
    buttontext:{
      textAlign:'center',
      color:'#3fb265',
      fontSize:10,
    },
});