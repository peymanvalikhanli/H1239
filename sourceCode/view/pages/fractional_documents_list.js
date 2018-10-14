import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, CheckBox, } from 'native-base';
import Orientation from 'react-native-orientation';

import { ListView } from 'react-native';

import lang from '../../model/lang/fa.json';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json'; 

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
];

export default class fractional_documents_list extends PureComponent {

    get_data_from_server(){ 
        axios.post(server_url.GetBackedTransList, {
            userkey: this.state.Token,
        })
        .then(response=> {
           // alert(JSON.stringify(response)); 
            if(response.data.act != undefined || response.data.act != null){
             //   alert(JSON.stringify(response.data.LstBackTrans));
                 if(response.data.LstBackTrans != undefined || response.data.LstBackTrans != null || response.data.LstBackTrans != ''){
                     this.setState({LstBackTrans:response.data.LstBackTrans}); 
                    // alert(JSON.stringify(this.state.LstOdatTrans));
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
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
            LstBackTrans:[],
        };

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                this.get_data_from_server();
            }
        });
    }

    btn_send_onclick() {
        this.props.navigation.replace("home");
    }

    render() {
        var { navigate } = this.props.navigation;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        // var userid = this.props.navigation.state.params.userId;
        // var userProfile = this.props.navigation.state.params.userProfile;
        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left />
                    <Body>
                        <Text
                            style={{ textAlign: 'center', color: '#ffffff', fontFamily: "DinarTwoMedium_MRT", }}
                        >
                            {lang.fractional_documents_list}
                        </Text>
                    </Body>
                    <Right>
                        <Button
                            onPress={() => { this.props.navigation.replace("home"); }}
                        >
                            <Icon name="home" />
                        </Button>
                    </Right>
                </Header>
                <Content>
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
                    <List
                        style={{ marginLeft: width * 0.01 }}
                        // dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        dataArray = {this.state.LstBackTrans}                        
                        renderRow={data =>
                            <ListItem icon
                            onPress={()=>{this.props.navigation.replace("fractional_documents",{data:data});}}                            
                            >
                                <Left>
                                    <Icon name="arrow-back" />
                                </Left>
                                <Text>
                                    {data.TransDateFa}
                            </Text>
                                <Body>
                                    <Text
                                        style={styles.font_name}

                                    >
                                        {data.TariffCategoryTitle} {"  "}  {data.PatientName}
                                    </Text>
                                </Body>
                                <Right>
                                    <CheckBox checked={true} color="green" />
                                </Right>
                            </ListItem>

                        }
                        // renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        //     <Button full danger >
                        //         <Icon active name="trash" />
                        //     </Button>}


                    />

                </Content>
                <Footer>

                </Footer>
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