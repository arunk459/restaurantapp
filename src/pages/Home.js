import React, { Component } from 'react';
// import Slideshow from 'react-native-slideshow';
import Swiper from "react-native-web-swiper";
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Picker, AsyncStorage,Dimensions
} from 'react-native';
import GridLayout from 'react-native-layout-grid';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {makeDropDown, fetch_cities, fetch_buildings, fetch_banners, fetch_delivery_times, fetch_menu_items_new,view_cart } from '../services/Auth';
import Loader from "./Loader";



const {height} = Dimensions.get("window");
class Home extends Component {
  state = {
    user: '', city: [],
    menu_items: [],
    delivery_times: [],
    banners: [],
    accessToken: "",
    building_id: "",
    realtedBuilding: [],
    menu_id: '',
    loading: true,
    city_id: "",
  }

  static navigationOptions = {
    header: null,
  }
  componentDidMount =()=> {
    this.props.setKey({prop: 'mac',value:this.props.auth.user.user.email});
    this.init();
    this.getMyCart();
    setTimeout(()=>{
      this.setState({loading:false});
    },3000)
  }

  getMyCart = () => {
    var formData = new FormData();  
    formData.append('device_id', this.props.auth.user.user.email);
    formData.append('building_id', this.props.app.building_id);
    view_cart(formData).then(res => {
      if (res.data.status == 1) {
        this.props.setProducts({ prop: 'cart_products', value: [] });        
        this.props.setProducts({ prop: 'cart_products', value: res.data.cart_products });
        const unique = [...new Set(res.data.cart_products.map(item => item.parent_id))];
        this.props.setCartLength({prop: 'cart_length',value : res.data.cartcount })
      }
    }).catch(error => {
      console.log('error', error);
    });
  }
   
  init = async () => {
   // let sdata = await AsyncStorage.getItem('userData');
   // sdata = JSON.parse(sdata);
   this.fetchBanners();
   this.fetchDeliveryTimes();
    await this.getBuilding(this.props.auth.user.user.city_id);
  }

  getCity = () => {
    fetch_cities().then(res => {
      if (res.data.status == 1) {
        this.props.navigation.setParams({ 'city': res.data.cities });
      }
    }).catch(error => { console.log('error', error); });
  }
  getBuilding = (cityId) => {
    if (!cityId) return;
    fetch_buildings(cityId).then(res => {
      if (res.data.status == 1) { 
        this.props.setKey({ prop: 'realtedBuilding', value: res.data.buildings });
      }
    }).then(()=>{
      this.fetchMenue(this.props.app.realtedBuilding[0].menu_id);
    }).catch(error => { console.log('error', error); });
  }

 _retrieveData = (value) => {
    value = JSON.parse(value);
    if (value !== null) {
      // We have data!!
      this.props.setKey({ prop: 'city', value: value.user.city_id });
      this.props.setKey({ prop: 'building_id', value: value.user.building_id });
      this.props.setKey({ prop: 'username', value: value.user.name });
      //this.props.setKey({ prop: 'menu_id', value: value.user.menu_id });

    } else {

    }
  }
  renderBannner() {
    return this.props.app.banners&&this.props.app.banners.map(d =>
      <View>
        <Image style={{ width: '100%', height: '100%' }}
          source={{ uri: d.image }}
        />
      </View>
    );

  }
  renderDelveryTime() {
    return this.props.app.delivery_times && this.props.app.delivery_times.map(d =>
      <Text style={styles.displaytime}>
        <Image style={{ width: 15, height: 15 }} source={require('../images/imgs/alarm-clock.png')} /> {d.name}</Text>
    );

  }
  // renderGridItem = (item) => (
  //   <View style={styles.item}>
  //     <View style={styles.flex} />
  //     <Text style={styles.name}>
  //       {item.name}
  //     </Text>
  //   </View>
  // );
  getProductDetails = (item) => {
    this.props.setKey({ prop: 'selectedProduct', value: item });
    this.props.navigation.navigate('Details');

  }

  renderCategory(item) {
    
    if (item) {
      if (!item.avg_rating) { item.avg_rating = 0 }

      return (
        <View style={{flex:1}}>

          <TouchableOpacity onPress={() => this.getProductDetails(item)} style={styles.itemimage}>
            <Image
              style={styles.imageview}
              source={{ uri: item.image }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Ionicons name="star" size={12} color="#f2a832" />
                <Text style={[styles.name,{paddingHorizontal:5}]}>{item.avg_rating}</Text>
            </View>
            <TouchableOpacity style={styles.buttoncontainer} onPress={() => this.getProductDetails(item)}>
                <Text style={styles.buttontext}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <View style={styles.itemcontainer}></View>
    }
  }
  renderGridItem = (item) => {
    if (item) {
      return this.renderCategory(item);
    } else {
      return <View style={styles.itemcontainer}></View>
    }

  }

  fetchBanners = () => {
    fetch_banners().then(res => {
      if (res.data.status == 1) {
        this.props.setKey({ prop: 'banners', value: res.data.banners });
      }
    }).catch(error => {
      console.log('error', error);
    });
  }

  fetchMenue = (menu_id) => {

    fetch_menu_items_new(menu_id).then(res => {

      if (res.data.status == 1) {
         this.props.setKey({ prop: 'menu_items', value: res.data.categories });
       // this.props.setKey({ prop: 'city_id', value: res.data.categories });
        this.setState({ 'loading': false });
      }
    }).catch(error => {
      console.log('error', error);
    });
  }
  fetchDeliveryTimes = () => {
    fetch_delivery_times().then(res => {
      // console.log('response :',res);
      if (res.data.status == 1) {
        this.props.setKey({ prop: 'delivery_times', value: res.data.delivery_times });
      }
    }).catch(error => {
      console.log('error', error);
    });
  }
  _retrieveData = (value) => {
    value = JSON.parse(value);
    if (value !== null) {
      // We have data!!
      this.props.setKey({ prop: 'city', value: value.user.city_id });
      this.props.setKey({ prop: 'building_id', value: value.user.building_id });
      this.props.setKey({ prop: 'username', value: value.user.name });
      //this.props.setKey({ prop: 'menu_id', value: value.user.menu_id });

    } else {

    }


  }



  render() {
    console.log("this.props",this.props); 
    // const items = [];
    // for (let x = 1; x <= 6; x++) {
    //   items.push({
    //     name: `Grid ${x}`
    //   });
    // }
    // if (this.state.loading || !this.props.app.menu_items || !this.props.app.delivery_times) {
    //   return <Loader
    //     loading={true} />
    // }
    if (this.state.loading) {
        return <Loader
          loading={this.state.loading} />
      }
    return (
    
    <View style={{flex:1}}>
        <View style={styles.header}>
              <View style={{flex:0.65,flexDirection:'column'}}>
                <View style={{flex:0.5,justifyContent:'center'}}>
                   <Text style={{fontSize:15,fontWeight:'bold',width:80,color:'#333',paddingLeft:10}}>Hi{"  "+this.props.auth.user.user.name}</Text>                    
                </View>
                <View style={{flex:0.5,flexDirection:'row',alignItems:'center'}}>
                <Picker style={{width:'50%'}}
                    selectedValue={this.props.app.city_id}
                    onValueChange={(itemValue, itemIndex) => { 
                      this.props.setKey({ prop: 'city_id', value: itemValue });
                      this.getBuilding(itemValue);
                    }
                    }>
                    {makeDropDown(this.props.app.city)}
                </Picker> 
                <Picker style={{width:'50%'}}
                selectedValue={this.props.app.building_id}
                    onValueChange={(itemValue, itemIndex) => {
                      if (!itemValue) return;
                      this.props.setKey({ prop: 'building_id', value: itemValue });
                      let obj = this.props.app.realtedBuilding.find(o => o.id === itemValue);
                      if (obj.menu_id) {
                        this.props.setKey({ prop: 'menu_id', value: obj.menu_id });
                        this.fetchMenue(obj.menu_id);
                      }
                    }
                    }>
                    {makeDropDown(this.props.app.realtedBuilding)}
                </Picker>           
                </View>
              </View>
              <View style={{flex:0.35,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Favourities')}}>
                 <Ionicons name="heart-o" size={25} color="#000" style={{paddingRight:20}}/>
              </TouchableOpacity>
                 <TouchableOpacity onPress={() =>this.props.navigation.navigate('MyCart')} style={{paddingRight:20,flexDirection:'row',alignItems:'center'}}>
                 <Ionicons name="shopping-cart" size={25} color="#000" />
                 <Text>{`(${this.props.app.cart_length})`}</Text>
                 </TouchableOpacity>
              </View>
        </View>
        <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:30}}>
          <View style={{backgroundColor:'black',height:height/3}}>
            <Swiper>
              {this.renderBannner()}
            </Swiper>
         </View>
         <View style={{ height: 90 }}>
           <Text style={styles.text}>Delivery Times</Text>
           <Swiper activeDotStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#fff' }}>
             <View style={styles.timerview} >
               {this.renderDelveryTime()}
             </View>
           </Swiper>
         </View>
         {

      this.props.app.menu_items && this.props.app.menu_items.map(d => {
        if (d.products.length == 0) return null;
        return (
        <View style={styles.flex}>
          <View style={styles.categorytext}>
            <Text style={styles.text}>{d.name}</Text>
          </View>
          {d.products.length > 0 &&
            <GridLayout
              items={d.products}
              itemsPerRow={2}
              renderItem={this.renderGridItem}
            />}
        </View>)
      }
      )
    }
        </ScrollView>
    </View>
    );
  }
} 

const mapStateToProps = state => { 
  return state; };

export default connect(mapStateToProps, actions)(Home);

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    fontSize: 15,
    padding: 8,
  },
  header:{
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    //paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // width: 100,
    // padding:20,
  //  left:-10
},
  container: {
    flex: 1,

  },
  swipercontainer: {
    flex: 1,
    height: 200,
  },

  timerview: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',

  },
  displaytime: {

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
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#fff',
    margin: 6,
  },
  flex: {
    flex: 1,
  },
  item: {
    height: 100,
    backgroundColor: '#CCCCCC',
    padding: 10,
  },
  name: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
  },
  categorytext: {
    flex: 1
  },
  itemcontainer: {
    flex: 1,
    flexDirection: "column",
    height: 160,
  },
  itemimage: {
    height: 100,
  },
  itemtext: {
    height: 60,
    padding: 10
  },
  imageview: {
    height: '100%',
    width: '100%',
  },
  buttoncontainer: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#3fb265',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal:10,
    justifyContent: 'center',
  },
  buttontext: {
    textAlign: 'center',
    color: '#3fb265',
    fontSize: 10,
  },
});