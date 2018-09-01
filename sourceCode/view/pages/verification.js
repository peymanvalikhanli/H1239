import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left } from 'native-base';
import Orientation from 'react-native-orientation';

import lang from '../../model/lang/fa.json';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json'; 


export default class verification extends PureComponent {

    constructor() {
        super();
        Orientation.lockToPortrait();

        this.state={
            verify_code1:'#',
            verify_code2:'#',
            verify_code3:'#',
            verify_code4:'#',
            national_code:'',
        }
    }

    btn_send_onclick(national_code){

       
        var have_error = false;

        if((this.state.verify_code1 != null || this.state.verify_code1 != '') && this.state.verify_code1 != '#'){
            if((this.state.verify_code2 != null || this.state.verify_code2 != '' )&& this.state.verify_code2 != '#'){
                if((this.state.verify_code3 != null || this.state.verify_code3 != '' )&& this.state.verify_code3 != '#'){
                    if((this.state.verify_code4 != null || this.state.verify_code4 != '' )&& this.state.verify_code4 != '#'){

                        //____________________________________
                        //TODO: send data 

                        axios.post(server_url.verification, {
                            nationalCode: national_code,
                            codeGenerate: this.state.verify_code1+''+this.state.verify_code2+''+this.state.verify_code3+''+this.state.verify_code4,
                        })
                        .then(response=> {
                            
                            if(response.data.act != undefined || response.data.act != null){
                                
                                if (response.data.act.trim() == 'Field' || response.data.Token == '' ){
                                    Alert.alert(
                                        lang.error,
                                        lang.verifiy_code_is_not_valid,
                                        [
                                        {text: lang.yes},
                                        ],
                                        { cancelable: false }
                                    )
                                }else{
                                    AsyncStorage.setItem('Token', response.data.Token ); 
                                    AsyncStorage.setItem('national_code', national_code );
                                    this.props.navigation.replace("home");
                                }
                                  
                            }         
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                        //____________________________________

                    }else{
                        have_error = true;
                    }
                }else{
                    have_error = true;
                }
            }else{
                    have_error = true;
            }
        }else{
                    have_error = true;
                    alert('test');
        }

        if(have_error==true){
            Alert.alert(
                lang.error,
                lang.not_valid_verify_code,
                [
                {text: lang.yes},
                ],
                { cancelable: false }
            )
        }

       // this.props.navigation.replace("home");


    }

    btn_try_again_onclick(national_code){
       
        axios.post(server_url.login, {
            nationalCode: national_code,
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
                   // this.props.navigation.replace("verification", { mobile:  response.data.mobileNumber, national_code : this.state.national_code })
                }
                  
            }         
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    

    render() {
        var { navigate } = this.props.navigation;
        var mobile = this.props.navigation.state.params.mobile;
        var national_code = this.props.navigation.state.params.national_code; 
  //      this.setstate({national_code : national_code});
        return (
            <Container style={{ flex: 1 }}>
                <Content>
                    <View>
                        <Image
                            style={styles.header}
                            source={require("../image/header.png")}
                        />
                    </View>
                    <Body>
                        <Text style={[styles.text, { width: width * 0.5, textAlign: 'center' }]}>
                            {lang.system_verify}
                            {mobile.substring(0, 4)}
                            *****
                            {mobile.substring(8, 11)}
                    {lang.is_sending}
                        </Text>
                        <Form style={[styles.form, { flex: 1, flexDirection: 'row', justifyContent: 'space-between' }]} >
                            <Item floatingLabel
                                style={styles.form_item} >
                                <Input
                                    keyboardType="numeric"
                                    placeholder=""
                                    maxLength={1}
                                    onChange={(event) => {this.setState({ verify_code1: event.nativeEvent.text });this._input1._root.focus();}}
                                    style={styles.form_input}
                                    blurOnSubmit={false}
                                    onFocus = {()=>{this.setState({ verify_code1: "" });}}
                                    value={this.state.verify_code1=='#'?'':this.state.verify_code1}                                
                                />
                            </Item>
                            <Item floatingLabel
                                style={styles.form_item}
                            >
                                <Input
                                    keyboardType="numeric"
                                    placeholder=""
                                    maxLength={1}
                                    onChange={(event) => {this.setState({ verify_code2: event.nativeEvent.text });this._input2._root.focus();}}
                                    style={styles.form_input}
                                    getRef={(c) => this._input1 = c}
                                    blurOnSubmit = {false}
                                    onFocus = {()=>{this.setState({ verify_code2: "" });}}
                                    value={this.state.verify_code2=='#'?'':this.state.verify_code2}
                                />
                            </Item>
                            <Item floatingLabel
                                style={styles.form_item}
                            >
                                <Input
                                    keyboardType="numeric"
                                    placeholder=""
                                    maxLength={1}
                                    onChange={(event) => {this.setState({ verify_code3: event.nativeEvent.text });this._input3._root.focus();}}
                                    style={styles.form_input}
                                    getRef = {(c)=>this._input2 = c}
                                    blurOnSubmit = {false}
                                    onFocus = {()=>{this.setState({ verify_code3: "" });}}
                                    value={this.state.verify_code3=='#'?'':this.state.verify_code3}                                    
                                />
                            </Item>
                            <Item floatingLabel
                                style={styles.form_item}
                            >
                                <Input
                                    keyboardType="numeric"
                                    placeholder=""
                                    maxLength={1}
                                    onChange={(event) => this.setState({ verify_code4: event.nativeEvent.text })}
                                    style={styles.form_input}
                                    getRef = {(c)=>this._input3 = c}
                                    blurOnSubmit = {false}
                                    onFocus = {()=>{this.setState({ verify_code4: "" });}}
                                    value={this.state.verify_code4=='#'?'':this.state.verify_code4}                                    
                                />
                            </Item>
                        </Form>
                        <Text style={[styles.text, { width: width * 0.5, marginTop: height * 0.05, fontSize: width * 0.03, textAlign: 'center' }]}>
                            {lang.call_company_for_help}
                        </Text>

                        <Button transparent 
                            style={{ marginTop: height * 0.05, marginRight: width * 0.05, width: width * 0.5, textAlign: 'center' }}
                            onPress={()=>{this.btn_try_again_onclick(national_code)}}
                        >
                            <Right>
                                <Image
                                    style={styles.refresh}
                                    source={require("../image/refresh.png")}
                                />
                            </Right>
                            <Body>
                                <Text style={{ color: "#000000", fontFamily: "DinarTwoMedium_MRT", }}>
                                    {lang.try_again}

                                </Text>
                            </Body>
                            <Left />
                        </Button>

                        <Button style={styles.form_btn}
                        onPress={()=>{this.btn_send_onclick(national_code)}}
                        >
                            <Body>
                                <Text style={{ color: "#ffffff", fontFamily: "DinarTwoMedium_MRT", }}>
                                    {lang.accept}
                                </Text>
                            </Body>
                        </Button>

                    </Body>
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
        marginTop: height * 0.01,
        fontSize: width * 0.05,
        color: "#000000",
        fontFamily: "DinarTwoMedium_MRT",
    },
    form: {
        width: width * 0.6,
        marginTop: height * 0.08,
    },
    form_btn: {
        marginTop: height * 0.1,
        marginLeft: width * 0.05,
        width: width * 0.5,
        backgroundColor: "#2e2878",
        fontFamily: "DinarTwoMedium_MRT",
    },
    form_item: {

        width: width * 0.08,
    },
    form_input: {
        // borderColor: '#ff0000',
        // color:'#ff0000',
        textAlign: 'center',
        fontSize: width * 0.03,
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
