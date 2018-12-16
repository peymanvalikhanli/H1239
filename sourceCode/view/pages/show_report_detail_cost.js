import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, BackHandler, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker } from 'native-base';
import Orientation from 'react-native-orientation';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import lang from '../../model/lang/fa.json';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class show_report_detail_cost extends PureComponent {

    get_data_from_server() {
        axios.post(server_url.GetTariffCategoryList, {
            userkey: this.state.Token,
        })
            .then(response => {

                if (response.data.act != undefined || response.data.act != null) {
                    //alert(response.data.TariffCategory);
                    if (response.data.TariffCategory != undefined || response.data.TariffCategory != null || response.data.TariffCategory != '') {
                        this.setState({ TariffCategory: response.data.TariffCategory });
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
            Token: '#',
            national_code: '#',
            selectedStartDate: null,
            price: '',
            picker: '',
            TariffCategory: [{ Title: '', TariffCategoryTypeTitle: '' }],
        };

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                this.get_data_from_server();
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
        this.props.navigation.replace(this.state.parent, { userId: this.state.userid, userProfile: this.state.userProfile, start_date: this.state.start_date, end_date: this.state.end_date });
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
        if(x == null ){return x}
        var a = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return a;
    }

    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';

        var userid = this.props.navigation.state.params.userId;
        var userProfile = this.props.navigation.state.params.userProfile;
        var parent = this.props.navigation.state.params.parent;
        var start_date = this.props.navigation.state.params.start_date;
        var end_date = this.props.navigation.state.params.end_date;

        this.setState({ userid: userid, userProfile: userProfile, parent: parent, start_date: start_date, end_date: end_date });

        var data = this.props.navigation.state.params.data;
        // alert(JSON.stringify(data));
        let date_picker = this.get_picker();

        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            onPress={() => { this.props.navigation.replace(parent, { userId: userid, userProfile: userProfile, start_date: start_date, end_date: end_date }); }}
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
                            {lang.name}: {data.PatientName}
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
                            {lang.cost_price}: <Text style={{ fontFamily: "BNazanin", }}>{this.create_currency_input(data.TransAmount)}</Text> {" "} {"ریال"}
                        </Text>

                        <Text
                            style={styles.text}
                        >
                            {lang.pay_price}:<Text style={{ fontFamily: "BNazanin", }}>{this.create_currency_input(data.TotalPaidAmount)}</Text> {" "} {"ریال"}
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
                            {lang.cost_date}: <Text style={{ fontFamily: "BNazanin", }}>{data.TransDateFa}</Text>
                        </Text>

                        <Text
                            style={styles.text}
                        >
                            {lang.ReadyToPayDate}: <Text style={{ fontFamily: "BNazanin", }}>{data.SendToInsuranceDateFa}</Text>
                        </Text>

                        <Text
                            style={styles.text}
                        >
                            {lang.pay_date}: <Text style={{ fontFamily: "BNazanin", }}>{data.PaidDateFa}</Text>
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
                            {lang.file_satatus}: {data.FileStatusTitle}
                        </Text>

                        <Text
                            style={styles.text}
                        >
                            {lang.file_NO}: <Text style={{ fontFamily: "BNazanin", }}>{data.FileNumber}</Text>
                        </Text>

                        {/* <Text
                            style={styles.text}
                        >
                            {lang.cost_type}: {data.TariffCategoryTitle}
                        </Text> */}


                    </Form>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Left />
                            <Body />
                            <Right>
                                <Text style={styles.font_name} >{lang.description}</Text>
                            </Right>

                        </ListItem>
                    </List>
                    <Text style={styles.font_name}>
                        {data.Description == null ? "" : data.Description}
                    </Text>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Text></Text>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("show_files",{data:data, parent:"show_report_detail_cost",main_parent:parent , userProfile: userProfile , userid: userid}); }}                                                    
                        >
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
