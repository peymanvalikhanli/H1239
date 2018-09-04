import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker} from 'native-base';
import Orientation from 'react-native-orientation';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import lang from '../../model/lang/fa.json';

import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json'; 


export default class cost_edit extends PureComponent {

    get_data_from_server(){ 
        axios.post(server_url.GetTariffCategoryList, {
            userkey: this.state.Token,
        })
        .then(response=> {
            
            if(response.data.act != undefined || response.data.act != null){
                //alert(response.data.TariffCategory);
                 if(response.data.TariffCategory != undefined || response.data.TariffCategory != null || response.data.TariffCategory != ''){
                     this.setState({TariffCategory:response.data.TariffCategory}); 
                 }
            }         
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    constructor() {
        super();
        Orientation.lockToPortrait();
        this.onDateChange = this.onDateChange.bind(this);

        this.state = {
            Token:'#',
            national_code: '#',
            selectedStartDate: null,
            price:'',
            picker:'',
            TariffCategory:[{Title:'',TariffCategoryTypeTitle:''}],
          };
        
        AsyncStorage.getItem('Token', (err, result) => {
            if(result!= null){
               this.setState({Token: result});
               this.get_data_from_server();
           }  
        });


    }

    onDateChange(date) {
        this.setState({
          selectedStartDate: date,
        });
      }

    btn_send_onclick(){
        this.props.navigation.replace("home");
    }

    create_currency_input(){ 
     
    } 


    get_picker(){
        // style={stylesTitle.form_input}
        const items = this.state.TariffCategory.map((s,i)=>{
            return(
                <Picker.Item label={lang.cost_type} key={i} label={s.Title} value={s.TariffCategoryTypeTitle} />
            );
        });
        return items;
       
    }

    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';

        var userid = "";//this.props.navigation.state.params.userId;
        var userProfile = "";//this.props.navigation.state.params.userProfile;

        let date_picker = this.get_picker();
 
        return (
            <Container style={{ flex: 1 }}>
                <Header>
                <Left>
                    <Button
                        onPress={()=>{this.props.navigation.replace("profile",{userId:userid ,userProfile: userProfile});}}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                        </Left> 
                        <Body>
                        <Text
                        style= {{textAlign:'center',color:'#ffffff',fontFamily: "DinarTwoMedium_MRT",}}
                        >
                            {/* {lang.cost_registration} */}
                        </Text>
                    </Body>
                    <Right>
                        <Button
                        onPress={()=>{this.props.navigation.replace("home");}}
                        >
                            <Icon name="home" />
                        </Button>
                    </Right>
                    
                </Header> 
                <Content 
                    style={{paddingLeft: width*0.01,paddingRight: width*0.02,fontFamily: "DinarTwoMedium_MRT",}}
                >
                      <Button
                        style={styles.form_btn}
                    >
                        <Text
                            style={styles.font_name}
                        >
                            {lang.send}
                        </Text>
                    </Button>
                    <List>
                        <ListItem itemDivider>
                            <Text></Text>
                        </ListItem>
                    </List>
                    <Form
                    style={{justifyContent:'center',textAlign:'center',}}
                    > 

                        <Text
                        style={styles.text}
                        > 
                                {lang.name}: {userProfile.PatientName}
                        </Text>
                        {/* <Text
                        style={styles.text}
                        > 
                                {lang.Lname}: valikhanli 
                        </Text>  */}
                        <Text
                        style={styles.text}                        
                        > 
                                {lang.national_code_}: {userProfile.PatientNationalCode}
                        </Text>
                       <List> 
                           <ListItem itemDivider>
                           </ListItem>
                        </List>
                        
                        
                        
                        <Item> 
                        <Collapse
                        style={{width:width*0.95}}
                        >
                            <CollapseHeader>
                                    <Text
                                        style={styles.text}                        
                                    > 
                                        {lang.cost_date}: {startDate}
                                    </Text>
                            </CollapseHeader>
                            <CollapseBody>
                                <JalaliCalendarPicker
                                onDateChange={this.onDateChange}
                                textStyle={{fontFamily: "DinarTwoMedium_MRT",}}
                                />
                            </CollapseBody>
                        </Collapse>
                            
                            
                        </Item>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={[{ width: undefined, },styles.form_input]}
                                placeholder={lang.cost_type}
                                placeholderStyle={[{ color: "#bfc6ea" },styles.form_input]}
                                placeholderIconColor="#007aff"
                                onValueChange={ (service) => ( this.setState({selectedPicker:service}) ) } 
                                selectedValue={this.state.selectedPicker}
                            >
                                {date_picker}
                            </Picker>
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.form_input} >{lang.cost_price}</Label>
                            <Input
                            style={styles.form_input}
                            keyboardType="numeric"
                           // value={this.state.price}
                           // onChange={(event)=>{this.create_currency_input()}}                     
                                // placeholder={lang.cost_price}
                             />
                        </Item>
                                    
                        <Item 
                         style= {{textAlign:'center',justifyContent:'center',marginTop: height*0.05,}}
                        >
                            <Label
                            style={styles.form_input}
                            >{lang.cost_price}</Label>    
                        </Item>                                  
                    </Form>
                    <List
                    style={{marginTop:height*0.02,}}
                    >
                        <ListItem itemDivider>
                            <Text></Text>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                            style={styles.font_name}                                
                                >

                                    {lang.documents}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="card" /> */}
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    header: {
        width,
        height: height * 0.25,
        flex: 1,
        resizeMode: 'stretch'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: height * 0.70
    },
    child: {
        height: height * 0.90,
        width,
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    text: {
        marginTop: height * 0.008,
        fontSize: width * 0.03,
        color: "#000000",
        fontFamily: "DinarTwoMedium_MRT",
    },
    form: {
        width: width * 0.6,
        marginTop: height * 0.08,
    },
    form_btn: {
        marginTop: height * 0.01,
        marginLeft: width * 0.05,
        marginBottom: height * 0.01,
        width: width * 0.9,
        backgroundColor: "#2e2878",
        fontFamily: "DinarTwoMedium_MRT",
        textAlign: "center",
        justifyContent: 'center',
    },
    font_name: {
        fontFamily: "DinarTwoMedium_MRT",
    },
    form_item: {

        width: width * 0.08,
    },
    form_input: {
        // borderColor: '#ff0000',
        // color:'#ff0000',
        //textAlign: 'center',
        //fontSize: width * 0.03,
        fontFamily: "DinarTwoMedium_MRT",
    },
    img: {
        width: width * 0.8,
        height: width * 0.8 * 1.7,
        marginTop: width * 0.1,
        justifyContent: 'center',
        alignItems: 'stretch',
        resizeMode: 'stretch',
    },
    refresh: {
        width: width * 0.05,
        height: width * 0.05,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'stretch',
        resizeMode: 'stretch',
    },
});
