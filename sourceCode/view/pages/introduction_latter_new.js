import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, Alert, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker } from 'native-base';
import Orientation from 'react-native-orientation';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import lang from '../../model/lang/fa.json';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class inroduction_latter_new extends PureComponent {

    upload_file_server(Id, images) {
        // alert(Id);
        images.map((img, i) => {
            let data = new FormData();

            data.append('transId', Id);
            data.append('fileName', "peymantest.png");
            data.append('fileType', 5);
            data.append('contentType', "image/png");
            data.append('content', img);

            axios.post(server_url.UploadDocument, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    // alert(JSON.stringify(response));  
                    switch (response.data.act) {
                        case "Success":
                            Alert.alert(
                                lang.info,
                                response.data.Message,
                                [
                                    { text: lang.yes },
                                ],
                                { cancelable: false }
                            )
                            break;
                    }
                })
                .catch(function (error) {
                    //console.log(error);
                    alert(JSON.stringify(error));
                });

        });
    }


    register(userProfile) {
        axios.post(server_url.CreateIntroductionLetter, {
            userkey: this.state.Token,
            applicantId: userProfile.UserInsuranceId,
            introductionLetterDate: this.state.req_start_date,
            receiveIntroductionLetterDate: this.state.req_end_date,
            tariffCategoryTitle: this.state.selectedPicker_TariffCategory,
            description: '',
            PhoneNumber: this.state.phone_number,
            GetIntroductionLetterStatusTitle: this.state.selectedPicker
        })
            .then(response => {
                // alert(JSON.stringify(response));
                switch (response.data.act) {
                    case "Error":
                        Alert.alert(
                            lang.error,
                            response.data.Message,
                            [
                                { text: lang.yes },
                            ],
                            { cancelable: false }
                        )
                        break;
                    case "Success":
                        // if (response.data.TariffCategory != undefined || response.data.TariffCategory != null || response.data.TariffCategory != '') {
                        //     this.setState({ TariffCategory: response.data.TariffCategory });
                        // }
                        // alert(JSON.stringify(response.data));
                        // return;
                        Alert.alert(
                            lang.info,
                            response.data.Message,
                            [
                                { text: lang.yes },
                            ],
                            { cancelable: false }
                        )

                        AsyncStorage.getItem('name_bime_gozar', (err, result) => {
                            if (result != null && result.trim() != "#") {
                                this.upload_file_server(response.data.Id,JSON.parse(result));
                            }
                        });
                        AsyncStorage.getItem('dastur_pezashk', (err, result) => {
                            if (result != null && result.trim() != "#") {
                                this.upload_file_server(response.data.Id,JSON.parse(result));
                            }
                        });


                        //this.props.navigation.replace("home");
                        break;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    get_GetTariffCategoryListForIntroductionLetter() {
        axios.post(server_url.GetTariffCategoryListForIntroductionLetter, {
            userkey: this.state.Token,
        })
            .then(response => {
                // alert(JSON.stringify(response));
                switch (response.data.act) {

                    case "Success":
                        if (response.data.TariffCategory != undefined || response.data.TariffCategory != null || response.data.TariffCategory != '') {
                            this.setState({ TariffCategory: response.data.TariffCategory });
                        }
                        break;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    get_HowGetIntroductionLetter() {
        axios.post(server_url.HowGetIntroductionLetter, {
            userkey: this.state.Token,
        })
            .then(response => {
                //alert(JSON.stringify(response));

                if (response.data.act != undefined || response.data.act != null) {
                    switch (response.data.act) {

                        case "Success":
                            if (response.data.GetIntroductionLetter != undefined || response.data.GetIntroductionLetter != null || response.data.GetIntroductionLetter != '') {
                                this.setState({ GetIntroductionLetter: response.data.GetIntroductionLetter });
                            }
                            break;
                    }
                    //alert(response.data.TariffCategory);

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
        this.onDateChange1 = this.onDateChange1.bind(this);

        this.state = {
            Token: '#',
            selectedStartDate: null,
            selectedendDate: null,
            GetIntroductionLetter: [{ Title: lang.nahve_daryaft_moarefi, TariffCategoryTypeTitle: '' }],
            TariffCategory: [{ Title: lang.cost_type, TariffCategoryTypeTitle: '' }],
            selectedPicker: '#',
            selectedPicker_TariffCategory: '#',
        };

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                this.get_HowGetIntroductionLetter();
                this.get_GetTariffCategoryListForIntroductionLetter();
            }
        });
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
            startDate: date.format('jYYYY/jM/jD'),
            req_start_date: date.format('M/D/YYYY')
        });
        AsyncStorage.setItem('report_date', JSON.stringify({ start: date.format('jYYYY/jM/jD'), req_start_date: date.format('M/D/YYYY'), end: this.state.endDate, req_end_date: this.state.req_end_date }));
    }

    onDateChange1(date) {
        this.setState({
            selectedendDate: date,
            endDate: date.format('jYYYY/jM/jD'),
            req_end_date: date.format('M/D/YYYY')
        });
        AsyncStorage.setItem('report_date', JSON.stringify({ start: this.state.startDate, req_start_date: this.state.req_start_date, end: date.format('jYYYY/jM/jD'), req_end_date: date.format('M/D/YYYY') }));
    }

    btn_send_onclick() {
        this.props.navigation.replace("home");
    }

    create_currency_input() {
        var x = this.state.price;
        var a = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.setState({ price: a });
    }


    get_picker() {
        const items = this.state.GetIntroductionLetter.map((s, i) => {
            return (
                <Picker.Item label={s.Title} value={s.Title} />
            );
        });
        return items;
    }

    get_picker_TariffCategory() {
        const items = this.state.TariffCategory.map((s, i) => {
            return (
                <Picker.Item label={s.Title} value={s.Title} />
            );
        });
        return items;
    }

    upload_file_onlick(header_title, keys) {

        AsyncStorage.setItem(keys, "#");
        this.props.navigation.replace("introduction_latter_select_file", { parent: "inroduction_latter_new", userProfile: this.state.userProfile, userid: this.state.userid, Type: "5", header_title: header_title, data: "", keys: keys });
    }

    btn_next(userid, userProfile) {

        if (this.state.phone_number == '#' || this.state.phone_number == null || this.state.phone_number == '') {

            Alert.alert(
                lang.error,
                lang.enter_phone_number,
                [
                    { text: lang.yes },
                ],
                { cancelable: false }
            )
            return;
        }
        if (this.state.selectedPicker == '#' || this.state.selectedPicker == null || this.state.selectedPicker == '') {

            Alert.alert(
                lang.error,
                lang.enter_nahve_ersal,
                [
                    { text: lang.yes },
                ],
                { cancelable: false }
            )
            return;
        }
        if (this.state.selectedPicker_TariffCategory == '#' || this.state.selectedPicker_TariffCategory == null || this.state.selectedPicker_TariffCategory == '') {

            Alert.alert(
                lang.error,
                lang.enter_cost_type,
                [
                    { text: lang.yes },
                ],
                { cancelable: false }
            )
            return;
        }
       
        this.register(userProfile);

    }


    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';

        var userid = this.props.navigation.state.params.userId;
        var userProfile = this.props.navigation.state.params.userProfile;

        this.setState({ userid: userid, userProfile: userProfile })

        let date_picker = this.get_picker();

        let get_picker_TariffCategory = this.get_picker_TariffCategory();

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
                            {lang.darkhast}
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
                    <Form>
                        <Item>
                            <Collapse
                                style={{ width: width * 0.95 }}
                            >
                                <CollapseHeader>
                                    <Text
                                        style={styles.text}
                                    >
                                        {lang.tarikh_bastari}: {this.state.startDate}
                                    </Text>
                                </CollapseHeader>
                                <CollapseBody>
                                    <JalaliCalendarPicker
                                        onDateChange={this.onDateChange}
                                        textStyle={{ fontFamily: "DinarTwoMedium_MRT", }}
                                    />
                                </CollapseBody>
                            </Collapse>
                        </Item>
                        <Item>
                            <Collapse
                                style={{ width: width * 0.95 }}
                            >
                                <CollapseHeader>
                                    <Text
                                        style={styles.text}
                                    >
                                        {lang.tarikh_daryaft}: {this.state.endDate}
                                    </Text>
                                </CollapseHeader>
                                <CollapseBody>
                                    <JalaliCalendarPicker
                                        onDateChange={this.onDateChange1}
                                        textStyle={{ fontFamily: "DinarTwoMedium_MRT", }}
                                    />
                                </CollapseBody>
                            </Collapse>
                        </Item>
                        <Item>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >
                                    {lang.tarikh_etebar_5_ruze}
                                </Text>
                            </Body>

                        </Item>
                        {/* <List>
                            <ListItem itemDivider>
                            </ListItem>
                        </List> */}
                        <Text
                            style={styles.text}
                        >
                            {lang.cost_type}
                        </Text>
                        <Item picker >
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={[{ width: undefined, }, styles.form_input]}
                                placeholderStyle={[{ color: "#bfc6ea" }, styles.form_input]}
                                placeholderIconColor="#007aff"
                                onValueChange={(service) => (this.setState({ selectedPicker_TariffCategory: service }))}
                                selectedValue={this.state.selectedPicker_TariffCategory}
                            >
                                {get_picker_TariffCategory}
                            </Picker>
                        </Item>
                        <Text
                            style={styles.text}
                        >
                            {lang.nahve_daryaft_moarefi}
                        </Text>
                        <Item picker >
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={[{ width: undefined, }, styles.form_input]}
                                placeholderStyle={[{ color: "#bfc6ea" }, styles.form_input]}
                                placeholderIconColor="#007aff"
                                onValueChange={(service) => (this.setState({ selectedPicker: service }))}
                                selectedValue={this.state.selectedPicker}
                            >
                                {date_picker}
                            </Picker>
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.form_input} >{lang.mobile}</Label>
                            <Input
                                style={styles.form_input}
                                keyboardType="numeric"
                                value={this.state.phone_number}
                                onChange={(event) => { this.setState({ phone_number: event.nativeEvent.text }); }}
                            // onBlur={() => { this.create_currency_input(); }}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.form_input} >{lang.sat_jahat_ersal}</Label>
                            <Input
                                style={styles.form_input}
                                keyboardType="numeric"
                                value={this.state.time}
                                onChange={(event) => { this.setState({ time: event.nativeEvent.text }); }}
                            // onBlur={() => { this.create_currency_input(); }}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.form_input} >{lang.address}</Label>
                            <Input
                                style={styles.form_input}
                                // keyboardType=""
                                value={this.state.address}
                                onChange={(event) => { this.setState({ address: event.nativeEvent.text }); }}
                            // onBlur={() => { this.create_currency_input(); }}
                            />
                        </Item>
                        <Item>
                            <Body>
                                <Text
                                    style={styles.font_name}
                                >
                                    {lang.sat_kare_sherkat}
                                </Text>
                            </Body>
                        </Item>
                        <List>
                            <ListItem itemDivider>
                                <Left />
                                <Body style={{ width: width * 0.5 }}>
                                    <Text
                                        style={styles.font_name}
                                    >
                                        {lang.hazine_ersal_be_ohde}
                                    </Text>
                                </Body>
                            </ListItem>
                            <ListItem icon
                                onPress={() => { this.upload_file_onlick(lang.dastur_pezashk, "dastur_pezashk") }}
                            >
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
                                onPress={() => { this.upload_file_onlick(lang.name_bime_gozar, "name_bime_gozar") }}
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

                        <Item>
                            <Button
                                style={{ width: width * 0.9, marginTop: height * 0.02, marginBottom: height * 0.025, marginLeft: width * 0.025, marginRight: width * 0.05, textAlign: 'center', justifyContent: 'center', fontFamily: "DinarTwoMedium_MRT", }}
                                onPress={() => { this.btn_next(userid, userProfile) }}
                            >
                                <Text>{lang.send}</Text>
                            </Button>
                        </Item>
                    </Form>
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
