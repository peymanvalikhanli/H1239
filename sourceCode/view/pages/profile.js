import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, BackHandler, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, } from 'native-base';
import Orientation from 'react-native-orientation';

import lang from '../../model/lang/fa.json';




export default class profile extends PureComponent {

    constructor() {
        super();
        Orientation.lockToPortrait();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        //this.btn_exit_onclick(); // works best when the goBack is async
        this.props.navigation.replace("home");
        return true;
    }

    btn_send_onclick() {
        this.props.navigation.replace("home");
    }

    render() {
        var { navigate } = this.props.navigation;
        var userid = this.props.navigation.state.params.userId;
        var userProfile = this.props.navigation.state.params.userProfile;
        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Right>
                        <Button
                            onPress={() => { this.props.navigation.replace("home"); }}
                        >
                            <Icon name="home" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View>
                        <Image
                            style={styles.header}
                            source={require("../image/header.png")}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#ffffff', paddingBottom: 30 }}>
                        <View>

                            <Image
                                style={{
                                    paddingVertical: 30,
                                    width: width * 0.35,
                                    height: width * 0.35,
                                    borderRadius: width * 0.5,
                                }}
                                resizeMode='stretch'
                                source={
                                    require('../image/default_avatar.jpg')
                                }
                            />
                        </View>
                        <View>
                            <Text
                                style={styles.font_name}
                            >{userProfile.PatientName}</Text>
                        </View>
                    </View>
                    <List >
                        <ListItem itemDivider>
                            <Text></Text>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("base_info", { userId: userid, userProfile: userProfile }); }}
                        >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >

                                    {lang.baseData}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="card" /> */}
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("cost_registration", { userId: userid, userProfile: userProfile, record: "" }); }}
                        >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}

                                >
                                    {lang.cost_registration}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="card" /> */}
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("report_detail_cost", { userId: userid, userProfile: userProfile, start_date: null, end_date: null }); }}
                        >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}

                                >
                                    {lang.reportHazine}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="card" /> */}
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("inroduction_latter_new", { userId: userid, userProfile: userProfile, record: "" }); }}
                        >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >
                                    {lang.darkhast}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="arrow-back" /> */}
                            </Right>
                        </ListItem>
                    </List>
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
        marginTop: height * 0.1,
        marginLeft: width * 0.05,
        width: width * 0.5,
        backgroundColor: "#2e2878",
        fontFamily: "DinarTwoMedium_MRT",
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
