
import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert, NetInfo, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text } from 'native-base';
import Orientation from 'react-native-orientation';
import SwiperFlatList from 'react-native-swiper-flatlist';

import lang from '../../model/lang/fa.json';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json'; 

function handleFirstConnectivityChange(isConnected) {
    if(!isConnected){
        
        Alert.alert(
            lang.error,
            lang.check_internet_connection,
            [
              {text: 'بله', onPress: () => RNExitApp.exitApp()},
            ],
            { cancelable: false }
          )
    }
    
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
}
NetInfo.isConnected.addEventListener(
    'connectionChange',
    handleFirstConnectivityChange
);




export default class introduction extends PureComponent {

    constructor() {
        super();

        this.state={
            is_change_page : false,
            national_code: '#',
        }

        Orientation.lockToPortrait();

        AsyncStorage.getItem('Token', (err, result) => {
            if(result!= null){
               this.go_home_page();
           }  
        });

    }

    go_home_page(){
        this.props.navigation.replace("home");
    }

    btnEnter_onclick() {
        if(this.state.national_code != null || this.state.national_code != '' || this.state.national_code != '#'){
            
            if( this.state.national_code.length == 10){

                //_______________________________

                axios.post(server_url.login, {
                    nationalCode: this.state.national_code,
                })
                .then(response=> {
                    
                    if(response.data.act != undefined || response.data.act != null){
                        
                        if (response.data.act.trim() == 'NO User' || response.data.mobileNumber == '' ){
                            Alert.alert(
                                lang.error,
                                lang.NoUser,
                                [
                                {text: lang.yes},
                                ],
                                { cancelable: false }
                            )
                        }else{
                            this.props.navigation.replace("verification", { mobile:  response.data.mobileNumber, national_code : this.state.national_code })
                        }
                          
                    }         
                })
                .catch(function (error) {
                    console.log(error);
                });

                //_______________________________


                // this.props.navigation.replace("verification");                
            }else{ //if(this.state.national_code.length < 10 || this.state.national_code.length > 10){
                Alert.alert(
                    lang.error,
                    lang.check_national_code,
                    [
                    {text: lang.yes},
                    ],
                    { cancelable: false }
                )
            }
        }else{

        }
    }

    render() {
        var { navigate } = this.props.navigation;
        return (
            <Container style={{ flex: 1 }}>
                <Content>
                    <View>
                        <Image
                            style={styles.header}
                            source={require("../image/header.png")}
                        />
                    </View>
                    <View key="view_1" style={styles.container} >
                        <SwiperFlatList
                            showPagination
                            paginationDefaultColor='#8382ae'
                            paginationActiveColor='#2e2878'
                        >
                            {/* <View key="view_1_1" style={[styles.child, { backgroundColor: "#ffffff" }]} >
                                <Body style={{ backgroundColor: "#ffffff" }}>
                                    <Image
                                        source={require("../image/2.png")}
                                    />
                                </Body>
                            </View> */}
                            <View key="view_1_2" style={[styles.child, { backgroundColor: "#ffffff" }]}>
                                <Body>
                                    <Image
                                        source={require("../image/1.png")}
                                    />
                                </Body>
                            </View>
                            <View key="view_1_3" style={[styles.child, { backgroundColor: "#ffffff" }]}>
                                <Body>
                                    <Form style={styles.form} >
                                        <Item floatingLabel>
                                            <Label style={{ fontFamily: "DinarTwoMedium_MRT", }}>
                                                {lang.user_name}
                                            </Label>
                                            <Input
                                                keyboardType="numeric"
                                                maxLength={10}
                                                onChange={(event) => this.setState({national_code: event.nativeEvent.text})}
                                            />
                                        </Item>
                                    </Form>
                                    <Button style={styles.form_btn}
                                        onPress={() => { this.btnEnter_onclick() }}>
                                        <Body>
                                            <Text style={{ color: "#ffffff", fontFamily: "DinarTwoMedium_MRT", }}>
                                                {lang.enter}
                                            </Text>
                                        </Body>
                                    </Button>
                                </Body>
                            </View>
                        </SwiperFlatList>
                    </View>

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
        marginTop: height * 0.1,
        fontSize: width * 0.08,
        color: "#1bbbc4",
        fontFamily: "DinarTwoMedium_MRT",
    },
    form: {
        width: width * 0.6,
        marginTop: height * 0.1,
    },
    form_btn: {
        marginTop: height * 0.2,
        marginLeft: width * 0.05,
        width: width * 0.5,
        backgroundColor: "#2e2878",
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
});
