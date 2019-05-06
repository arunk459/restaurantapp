import React, { Component } from "react";
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Account from '../pages/Account';
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
export default (MainScreenNavigator  = TabNavigator(
  {
    Home: { screen: Home },
    Menu: { screen: Menu },
    Account: { screen: Account }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Home")}>
              <Icon name="bowtie" />
              <Text>Lucy</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Menu")}>
              <Icon name="briefcase" />
              <Text>Nine</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Account")}>
              <Icon name="headset" />
              <Text>Jade</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));