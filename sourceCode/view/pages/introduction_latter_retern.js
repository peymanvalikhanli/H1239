import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, BackHandler, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker } from 'native-base';
import Orientation from 'react-native-orientation';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import lang from '../../model/lang/fa.json';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class introduction_letter_retern extends PureComponent {

    // get_data_from_server() {
    //     axios.post(server_url.GetTariffCategoryList, {
    //         userkey: this.state.Token,
    //     })
    //         .then(response => {

    //             if (response.data.act != undefined || response.data.act != null) {
    //                 //alert(response.data.TariffCategory);
    //                 if (response.data.TariffCategory != undefined || response.data.TariffCategory != null || response.data.TariffCategory != '') {
    //                     this.setState({ TariffCategory: response.data.TariffCategory });
    //                 }
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

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
        };

        // AsyncStorage.getItem('Token', (err, result) => {
        //     if (result != null) {
        //         this.setState({ Token: result });
        //         this.get_data_from_server();
        //     }
        // });


    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        //this.btn_exit_onclick(); // works best when the goBack is async
        this.props.navigation.replace("introduction_letter_list");
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


    get_picker() {
        // style={stylesTitle.form_input}
        const items = this.state.TariffCategory.map((s, i) => {
            return (
                <Picker.Item label={lang.cost_type} key={i} label={s.Title} value={s.TariffCategoryTypeTitle} />
            );
        });
        return items;

    }

    create_currency_input(x) {

        var a = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return a;
    }

    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';

        var userid = "";//this.props.navigation.state.params.userId;
        var userProfile = "";//this.props.navigation.state.params.userProfile;
        // var parent = this.props.navigation.state.params.parent;
        // var start_date = this.props.navigation.state.params.start_date;
        // var end_date = this.props.navigation.state.params.end_date;

        // this.setState({ userid: userid, userProfile: userProfile, parent: parent, start_date: start_date, end_date: end_date });

        var data = this.props.navigation.state.params.data;
        //alert(JSON.stringify(data))

        // let date_picker = this.get_picker();

        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            onPress={() => { this.props.navigation.replace("introduction_letter_list"); }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text
                            style={{ textAlign: 'center', color: '#ffffff', fontFamily: "DinarTwoMedium_MRT", }}
                        >
                            {/* {lang.fractional_documents} */}

                            {data.TariffCategoryTitle}
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
                            {lang.name}: {data.ApplicantName}
                        </Text>
                    </Form>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Left />
                            <Body />
                            <Right>
                                {/* <Text style={styles.font_name} >{lang.description}</Text> */}
                            </Right>

                        </ListItem>
                    </List>
                    {/* <Text
                            style={styles.text}
                        >
                            {lang.national_code_}: {data.PatientNationalCode}
                        </Text> */}
                    <Form>
                        <Text
                            style={styles.text}
                        >
                            {lang.RequestDate}: {data.RequestDateFa}
                        </Text>

                        <Text
                            style={styles.text}
                        >
                            {lang.introduction_letter_No}:{data.SystemNumber}
                        </Text>
                    </Form>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Left />
                            <Body />
                            <Right>
                            </Right>
                        </ListItem>
                    </List>

                    <Form>
                        <Text
                            style={styles.text}
                        >
                            {lang.IntroductionLetterDate}: {data.IntroductionLetterDateFa}
                        </Text>

                        <Text
                            style={styles.text}
                        >
                            {lang.ValidityDateFa}: {data.ValidityDateFa}
                        </Text>
                    </Form>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Left />
                            <Body />
                            <Right>
                            </Right>
                        </ListItem>
                    </List>
                    <Form>
                        <Text
                            style={styles.text}
                        >
                            {lang.IntroductionLetterStatusTitle}: {data.IntroductionLetterStatusTitle}
                        </Text>
                    </Form>
                    <List
                        style={{ marginTop: height * 0.02,}}
                    >
                        <ListItem itemDivider>
                            <Body >
                                <Text
                                    // style={styles.text}
                                >
                                    {lang.description}
                                </Text>
                            </Body>
                        </ListItem>
                    </List>
                    <Form>
                        <Text
                            style={styles.text}
                        >
                            {data.Description}
                        </Text>
                    </Form>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Left />
                            <Body />
                            <Right>
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("introduction_latter_upload", { data: data, parent: "introduction_letter_retern", userProfile: userProfile, userid: userid, Type: "5", header_title: lang.dastur_pezashk }); }}                            >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >

                                    {lang.dastur_pezashk}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="card" /> */}
                            </Right>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("introduction_latter_upload", { data: data, parent: "introduction_letter_retern", userProfile: userProfile, userid: userid, Type: "5", header_title: lang.name_bime_gozar }); }}
                            >
                            <Left>
                                <Icon name="arrow-back" />
                            </Left>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >

                                    {lang.name_bime_gozar}
                                </Text>
                            </Body>
                            <Right>
                                {/* <Icon name="card" /> */}
                            </Right>
                        </ListItem>
                    </List>

                </Content>
            </Container >
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
