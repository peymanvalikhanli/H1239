import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, CheckBox, } from 'native-base';
import Orientation from 'react-native-orientation';

import { ListView } from 'react-native';

import lang from '../../model/lang/fa.json';


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

export default class cost_list extends PureComponent {

    constructor() {
        super();
        Orientation.lockToPortrait();
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
        };
    }

    is_deleteRow(secId, rowId, rowMap) {

        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }

    deleteRow(secId, rowId, rowMap) {

        Alert.alert(
            lang.warning,
            lang.are_you_delete_thia_item,
            [
                { text: lang.no },
                { text: lang.yes,onPress: () => {this.is_deleteRow(secId, rowId, rowMap) }},
            ],
            { cancelable: false }
        )
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
                <Left/>
                    <Body>
                        <Text
                        style= {{textAlign:'center',color:'#ffffff',fontFamily: "DinarTwoMedium_MRT",}}
                        >
                            {lang.cost_list}
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
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem icon
                            onPress={()=>{this.props.navigation.replace("cost_edit");}}
                            >
                                <Left>
                                    <Icon name="arrow-back" />
                                </Left>
                                <Text>
                                    ۱۳۹۷-۰۱-۱۲
                            </Text>
                                <Body>
                                    <Text
                                        style={styles.font_name}

                                    >
                                        {lang.cost_type} {"  "} برادر  {data}
                                    </Text>
                                </Body>
                                <Right>
                                    <CheckBox checked={true} color="green" />
                                </Right>
                            </ListItem>

                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>}

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
