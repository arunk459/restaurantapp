import React, {Component} from 'react';
// import Slideshow from 'react-native-slideshow';
import Swiper from "react-native-web-swiper";
import Ionicons from 'react-native-vector-icons/FontAwesome';

import {
    StyleSheet, 
    Text,
    View,
    Image,
    ScrollView,
    Button,Picker
    } from 'react-native';

import GridLayout from 'react-native-layout-grid';
export default class Home extends Component {
     
  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
        return {
           
      headerLeft: (
        <View style={styles.iconContainer}>
        <View  style={{height: 50, width: 150}}><Text>kamlesh</Text></View>
       <Picker
          
         style={{height: 50, width: 50}}
         onValueChange={(itemValue, itemIndex) =>
           navigation.setParams({cityid: itemValue})
         }>
         <Picker.Item label="Java" value="java" />
         <Picker.Item label="JavaScript" value="js" />
       </Picker>
       <Picker
          
         style={{height: 50, width: 50}}
         onValueChange={(itemValue, itemIndex) =>
           navigation.setParams({buildingid: itemValue})
         }>
         <Picker.Item label="Java" value="java" />
         <Picker.Item label="JavaScript" value="js" />
       </Picker>
       </View>  
            ),

      headerRight: (
        <View style={styles.iconContainer}>
       <Ionicons name="heart-o" size={24}/> 
       <Ionicons name="shopping-cart" size={24} />  
       </View>  
            ),
      
    }
    

    }
   renderGridItem = (item) => (
    <View style={styles.item}>
      <View style={styles.flex} />
      <Text style={styles.name}>
        {item.name}
      </Text>
    </View>
  );
    render() {
      const items = [];
      for (let x = 1; x <= 30; x++) {
        items.push({
          name: `Grid ${x}`
        });
      }
      return (
     
        <ScrollView style={styles.container}>
              <View style={styles.swipercontainer}>
                <Swiper>  
                    <View>
                        <Image 
                        style={{width:550,height:450}}
                        source={require('../images/banner1.jpg')}
                        />
                    </View>
                    <View>
                    <Image 
                        style={{width:500,height:450}}
                        source={require('../images/banner2.jpg')}
                        />
                    </View>
                </Swiper>
              </View>
              <View style={{height:100}}>
                <Text style={styles.text}>Delivery Times</Text>
                  <Swiper style={{height:100}} activeDotStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#fff' }}>
                  <View style={styles.timerview} >
                  <Text style={styles.displaytime}>
                  <Image style={{width:15,height:15}} source={require('../images/imgs/alarm-clock.png')}/> 10:00 - 11:00</Text>
                      <Text style={styles.displaytime}><Image style={{width:15,height:15}} source={require('../images/imgs/alarm-clock.png')}/> 10:00 - 11:00</Text>
                      <Text style={styles.displaytime}> <Image style={{width:15,height:15}} source={require('../images/imgs/alarm-clock.png')}/> 10:00 - 11:00</Text>
                  </View>
                  </Swiper>

              </View>
                
           
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
    iconContainer: { 
      flexDirection: "row", 
      justifyContent: "space-evenly",
      width: 100
    },
    text:{
        textAlign:'left',
        fontSize:15,
        padding:8,
      
    },
  container: {
      flex: 1,
      
  },
  swipercontainer:{
    flex: 1,
    height:200
   
  },
  
  timerview:{
    flexDirection: 'row',
    backgroundColor:'#fff',

  },
  displaytime:{
    
    borderWidth: 1, 
    borderRadius: 3, 
    borderColor: '#ddd', 
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    fontSize: 11,
    fontWeight:'bold',
		 padding: 10,  
		backgroundColor: '#fff',
    margin: 6,
    
			
  },
  flex: {
    flex: 1,
    
  },
  item: {
    height: 130,
    backgroundColor: '#CCCCCC',
    padding: 10,
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000'
  },
});