/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Account from './pages/Account';
import Starter from './pages/Starter';
import Details from './pages/Details';
import Mycart from './pages/Mycart';
import Help from './pages/Help';
import Change_pass from './pages/Change_pass';
import Editaccount from './pages/Editaccount';
import Favourities from './pages/Favourites';
import Order from './pages/My_order';
import Order_details from './pages/Order_details';
import Offers from './pages/Offers';
import Referral from './pages/Referral'
// import Splash from './pages/Splash';

const AppNavigator = createStackNavigator(
  {
    Starter: {
      screen: Starter,
    },
    Login: {
      screen: Login,
    },
    Details: {
      screen: createStackNavigator({Details:Details,MyCart:Mycart})
     // screen:Details,
    },
     MyCart: {
      screen: Mycart,
    },
    Register: {
      screen: Register,
    },
    Help: {
      screen: Help,
    },
    Change_pass:{
      screen:Change_pass,
    },
    Editaccount:{
      screen:Editaccount,
    },
    Favourities:{
      screen:Favourities,
    },
    Order:{
      screen:Order,
    },
    Order_details:{
      screen:Order_details,
    },
    Offers:{
      screen : Offers,
    },
    Referral:{
      screen: Referral,
    },
    Home: { 
      screen: createBottomTabNavigator({
        Home: {
          screen: createStackNavigator({Home:Home, Menu:Menu, Account:Account}),
        },
        Menu: {
          screen: Menu,
        },
        Account: {
          // screen: Account,  
          screen:createStackNavigator({Account:Account, Editaccount: Editaccount, Change_pass: Change_pass, Help: Help, Favourities:Favourities,Order:Order,Order_details:Order_details,Offers:Offers,Referral:Referral }),
        }
      },
        {
          headerMode: 'none',
          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              let IconComponent = Ionicons;
              let iconName;
              if (routeName === 'Home') {
                iconName = `home`;
              } else if (routeName === 'Menu') {
                iconName = `info-circle`;
              }
              else if (routeName === 'Account') {
                iconName = `user-circle-o`;
              }
              return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
          }),
          tabBarOptions: {
            activeTintColor: 'green',
            inactiveTintColor: 'gray',

          },
        },

      ),
    }
  },
  {
    headerMode: 'none',
    initialRouteName: "Starter",
  },

);

const styles = StyleSheet.create({

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 100
  }
});

export default createAppContainer(AppNavigator);



