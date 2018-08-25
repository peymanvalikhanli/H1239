/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow

 Create by peyman valikhanli on 2018-07-03
 Company NEBKA team Copy Right 
 */

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry, AsyncStorage, NavigatorIOS,} from 'react-native';
import { StackNavigator } from 'react-navigation';
import RN from 'react-navigation'

import introduction from './sourceCode/view/pages/introduction'; 
import verification from './sourceCode/view/pages/verification'; 
import home from './sourceCode/view/pages/home'; 
import profile from './sourceCode/view/pages/profile';
import cost_registration from './sourceCode/view/pages/cost_registration';


const nave = StackNavigator({
  cost_registration: {screen: cost_registration},
  introduction: { screen: introduction },
  verification: {screen: verification},
  home: {screen: home},
  profile: {screen: profile},
//  cost_registration: {screen: cost_registration},
  
},{
  headerMode: "none"
});

export default nave;


AppRegistry.registerComponent('flow',nave)
