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
import upload_file from './sourceCode/view/pages/upload_file';
import cost_list from './sourceCode/view/pages/cost_list';
import cost_edit from './sourceCode/view/pages/cost_edit';
import return_cost_list from './sourceCode/view/pages/return_cost_list';
import return_cost from './sourceCode/view/pages/return_cost';
import fractional_documents_list from './sourceCode/view/pages/fractional_documents_list';
import fractional_documents from './sourceCode/view/pages/fractional_documents';
import report_detail_cost from './sourceCode/view/pages/report_detail_cost';
import report_detail_cost_family from './sourceCode/view/pages/report_detail_cost_family';
import show_report_detail_cost from './sourceCode/view/pages/show_report_detail_cost';
import base_info from './sourceCode/view/pages/base_info';


const nave = StackNavigator({
  
  introduction: { screen: introduction },
  verification: {screen: verification},
  home: {screen: home},
  profile: {screen: profile},

  cost_registration: {screen: cost_registration}, 
  upload_file:{screen: upload_file},

  cost_list: { screen: cost_list },
  cost_edit: { screen: cost_edit },

  return_cost_list: { screen: return_cost_list },
  return_cost: { screen: return_cost },

  fractional_documents: { screen: fractional_documents },
  fractional_documents_list: { screen: fractional_documents_list },
 
  report_detail_cost: { screen: report_detail_cost },
  report_detail_cost_family: { screen: report_detail_cost_family },
  show_report_detail_cost: { screen: show_report_detail_cost },

  base_info: { screen: base_info },
  

},{
  headerMode: "none"
});

export default nave;


AppRegistry.registerComponent('flow',nave)
