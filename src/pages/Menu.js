import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Animated,
  Image,
  Picker,
  TouchableOpacity
} from 'react-native';
import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';
import { SquarePagerView, TrianglePagerView, CirclePagerView } from '../components/PagerItemView';
import GridLayout from 'react-native-layout-grid';

import { connect } from 'react-redux';
import * as actions from '../actions';
const windowWidth = Dimensions.get('window').width;
const makeDropDown = (d) => {
  return d.map(d =>
    <Picker.Item label={d.name} value={d.id} />
  );
};

class Menu extends Component {
  
  state = {
    bgColor: new Animated.Value(0)
  }
  static navigationOptions = {
    header: null,
  }

  _setBgColor = Animated.event([{bgColor: this.state.bgColor}])

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
    }).catch(error => { console.log('error', error); });
  }
  fetchMenue = (menu_id) => {

    fetch_menu_items_new(menu_id).then(res => {

      if (res.data.status == 1) {
        this.props.setKey({ prop: 'menu_items', value: res.data.categories });
        this.setState({ 'loading': false });
      }
    }).catch(error => {
      console.log('error', error);
    });
  }
  renderCategory(item) {

    if (item) {
    if (!item.avg_rating) { item.avg_rating = 0 }

      return (
        <View style={styles.itemcontainer}>
        <View style={styles.itemimage}>
        <Image
        style={styles.imageview}
        source={{ uri: item.image }}
        />
        </View>
        <View style={styles.itemtext}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
        {Array(item.avg_rating).fill(<Ionicons name="star" size={12} color="#FF4500" />)}
        <TouchableOpacity style={styles.buttoncontainer} onPress={()=> this.props.navigation.navigate('Home')}>
        <Text style={styles.buttontext}>Add</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>

        );
  }else{
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
  render() {
    let bgColor = this.state.bgColor.interpolate({
      inputRange: [0, 1, 2 , 3 , 4, 5 , 6 , 7, 8],
      outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)','hsl(32, 97%, 59%)','hsl(72, 97%, 59%)','hsl(212, 97%, 59%)','hsl(332, 97%, 59%)','hsl(1, 97%, 59%)','hsl(200, 97%, 59%)']
    })
    const items = [];
    for (let x = 1; x <= 6; x++) {
      items.push({
        name: `Grid ${x}`
      });
    }
    return (
      <View style={{flex:1}}>
      <View style={styles.header}>
          <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:15,fontWeight:'bold',width:80,color:'#333',padding:10}}>Hii,Priya</Text>
            <View style={{flexDirection:'row', left:10,top:-30}}>
                <Picker style={{ height:75, width: 150}}
                    selectedValue={this.props.app.city_id}
                    onValueChange={(itemValue, itemIndex) => { 
                      this.props.setKey({ prop: 'city_id', value: itemValue });
                      this.getBuilding(itemValue);
                    }
                    }>
                    {makeDropDown(this.props.app.city)}
                  </Picker>
                  <Picker
                    style={{ height:75, width: 150}}
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
          <View style={styles.iconContainer}>
              <Ionicons name="heart-o" size={20} color="#000" />
              <Ionicons name="shopping-cart" size={20} color="#000" />
              <Text>{`(${this.props.app.cart.length})`}</Text>
          </View>
       </View>
        <IndicatorViewPager
          style={{flex: 1, flexDirection: 'column-reverse'}}
          indicator={this._renderTitleIndicator()}
          onPageScroll={this._onPageScroll.bind(this)}
        >
        {
        this.props.app.menu_items.map(d =>{
          return(  
            <View style={styles.itemcontainer}>
                <GridLayout
                items={d.products}
                itemsPerRow={2}
                renderItem={this.renderGridItem}
                />
            </View >
          );
        })    
        }
        </IndicatorViewPager>  
        </View>
        );
      } 
  _renderTitleIndicator () {
    let  titles = this.props.app.menu_items.map(o=>o.name);
    // ['SPECIALTY SANDWICHES','CLASSIC SANDWICHES','VEGETARIAN SANDWICHES'];
    return (
      <PagerTitleIndicator
      style={styles.indicatorContainer}
      trackScroll={true}
      itemTextStyle={styles.indicatorText}
      itemStyle={{width:windowWidth/3}}
      selectedItemStyle={{width:windowWidth/3}}
      selectedItemTextStyle={styles.indicatorSelectedText}
      selectedBorderStyle={styles.selectedBorderStyle}
      titles={titles}
      />
      )
  }
  _onPageScroll (scrollData) {
    let {offset, position} = scrollData
    if (position < 0 || position > 8) return
      this._setBgColor({bgColor: offset + position})
  }

}

const mapStateToProps = rstate => { return rstate;};

export default connect(mapStateToProps, actions)(Menu);

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 100,
    padding:20,
    left:10
},
  indicatorContainer: {
    backgroundColor: '#F6F5F5',
    height: 75,
    marginBottom:10,
    padding:15,
    
  },
  indicatorText: {
    fontSize: 14,
    color: '#000000',
    padding : 10
  },
  indicatorSelectedText: {
    fontSize: 14,
    color: '#F11616',
    padding : 10
  },
  selectedBorderStyle: {
    height: 3,
    backgroundColor: '#F11616'
  },
  textdisplay: {
    fontSize: 20,
    color: '#000000', 
    fontWeight:'500' 
  },
  textview:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }, 
  imageview:{
    height:'100%',
    width:'100%',
    position:'absolute',

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
name: {
  fontSize: 12,
  textAlign: 'left',
  color: '#000000',
  fontWeight:'400',
  marginBottom:5
},

})  
