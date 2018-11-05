import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, BackHandler, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker } from 'native-base';
import Orientation from 'react-native-orientation';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import lang from '../../model/lang/fa.json';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class base_info extends PureComponent {
    constructor() {
        super();
        Orientation.lockToPortrait();
        this.onDateChange = this.onDateChange.bind(this);

        this.state = {
            Token: '#',
            national_code: '#',
            selectedStartDate: null,
            price: '',
            picker: '',
            TariffCategory: [{ Title: '', TariffCategoryTypeTitle: '' }],
            userId: "",
            userProfile: "",
            documents: [0, 0, 0, 0, 0],
            doc_icon: ["", "", "", "", ""],
            doc_color: ["", "", "", "", ""],
        };

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
               // this.init_list();
            }
        });

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        //this.btn_exit_onclick(); // works best when the goBack is async
        this.props.navigation.replace("profile", { userId: this.state.userId, userProfile: this.state.userProfile });
        return true;
    }


    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    btn_send_onclick() {
        this.props.navigation.replace("home");
    }

    create_currency_input() {

    }

    create_currency_input(x) {

        var a = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return a;
    }

    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';

        var userid = this.props.navigation.state.params.userId;
        var userProfile = this.props.navigation.state.params.userProfile;

        var doc_icon = this.props.navigation.state.params.doc_icon;
        var doc_color = this.props.navigation.state.params.doc_color;

        //alert(JSON.stringify(doc_icon));
        //alert(JSON.stringify(doc_color));

   

        this.setState({ userid: userid, userProfile: userProfile });

        var data = [];//this.props.navigation.state.params.data;

        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            onPress={() => { this.props.navigation.replace("profile", { userId: userid, userProfile: userProfile }); }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text
                            style={{ textAlign: 'center', color: '#ffffff', fontFamily: "DinarTwoMedium_MRT", }}
                        >
                            {lang.baseData}
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
                <Content
                    style={{ paddingLeft: width * 0.01, paddingRight: width * 0.02, fontFamily: "DinarTwoMedium_MRT", }}
                >
                    <Form
                        style={{ justifyContent: 'center', textAlign: 'center', }}
                    >

                        <Text
                            style={styles.text}
                        >
                            {lang.national_code}: {userProfile.PatientNationalCode}
                        </Text>
                        <Text
                            style={styles.text}
                        >
                            {lang.name}: {userProfile.PatientName}
                        </Text>

                        <Text
                            style={styles.text}
                        >
                            {lang.relation}: {userProfile.RelationTypeTitle}
                        </Text>

                        <Text
                            style={styles.text}
                        >
                            {lang.birthday}: {userProfile.BirthDateFa}
                        </Text>
                        <Text
                            style={styles.text}
                        >
                            {lang.sheba_No}: {userProfile.ShebaNo == null || userProfile.ShebaNo == "" ? "-" : userProfile.ShebaNo}
                        </Text>
                    </Form>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Left />
                            <Body />
                            <Right>
                                <Text style={styles.font_name} >{lang.documents}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("personal_upload", { data: data, parent: "base_info", userProfile: userProfile, userid: userid, Type: "4", header_title: lang.health_insurance_card, data: "" }); }}
                        >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >
                                    {lang.health_insurance_card}
                                </Text>
                            </Body>
                            <Right>
                                <Icon name={doc_icon[2]} style={{ color: doc_color[2] }} />
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("personal_upload", { data: data, parent: "base_info", userProfile: userProfile, userid: userid, Type: "4", header_title: lang.copyـofـbirthـcertificate, data: "" }); }}
                        >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >
                                    {lang.copyـofـbirthـcertificate}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="md-stopwatch" style={{ color: "#eec79f" }} /> */}
                                <Icon name={doc_icon[1]} style={{ color: doc_color[1] }} />
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("personal_upload", { data: data, parent: "base_info", userProfile: userProfile, userid: userid, Type: "4", header_title: lang.copyـofـbirthـcertificate, data: "" }); }}
                        >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >
                                    {lang.copy_gharardad_hamkari}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="card" /> */}
                                {/* <Icon name="md-checkbox-outline" style={{ color: 'green'}} /> */}
                                <Icon name={doc_icon[3]} style={{ color: doc_color[3] }} />
                                {/* <Icon name="md-checkmark" style={{ color: 'green' }} /> */}
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("personal_upload", { data: data, parent: "base_info", userProfile: userProfile, userid: userid, Type: "4", header_title: lang.copyـofـbirthـcertificate, data: "" }); }}
                        >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >
                                    {lang.copy_eshteghal_tahsil} 
                                    {/* {this.state.doc_icon[1]} {this.state.doc_icon[2]} {this.state.doc_icon[3]} {this.state.doc_icon[4]} */}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="md-close" style={{ color: 'red' }} /> */}
                                <Icon name={doc_icon[4]} style={{ color: doc_color[4] }} />
                                {/* <Icon name="md-checkbox-outline" /> */}
                                {/* <Icon name="ios-checkmark" /> */}
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
