import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, Alert, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker } from 'native-base';
import Orientation from 'react-native-orientation';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import lang from '../../model/lang/fa.json';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class cost_registration extends PureComponent {

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
            TariffCategory: [{ Title: lang.cost_type , TariffCategoryTypeTitle: '' }],
            selectedPicker: '#',
        };

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                this.get_data_from_server();
            }
        });
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
        var x = this.state.price;
        var a = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.setState({ price: a });
    }


    get_picker() {
        const items = this.state.TariffCategory.map((s, i) => {
            return (
                <Picker.Item label={s.Title} value={s.Title} />
            );
        });
        return items;
    }

    btn_next(userid,userProfile) {

        if(this.state.price == '#' || this.state.price == null || this.state.price == ''){

            Alert.alert(
                lang.error,
                lang.enter_price,
                [
                {text: lang.yes},
                ],
                { cancelable: false }
            )
            return;
        }
        if(this.state.selectedPicker == '#' || this.state.selectedPicker == null || this.state.selectedPicker == ''){

            Alert.alert(
                lang.error,
                lang.enter_cost_type,
                [
                {text: lang.yes},
                ],
                { cancelable: false }
            )
            return;
        }
        if(this.state.selectedStartDate == '#' || this.state.selectedStartDate == null || this.state.selectedStartDate == ''){

            Alert.alert(
                lang.error,
                lang.select_dateـcost,
                [
                {text: lang.yes},
                ],
                { cancelable: false }
            )
            return;
        }

        //AsyncStorage.setItem('cost', response.data.Token ); 
        this.props.navigation.replace("upload_file", { userId: userid, userProfile: userProfile ,record: {act:"register" ,price: this.state.price , const_type: this.state.selectedPicker , date: this.state.selectedStartDate} }); 
    }

    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';

        var userid = this.props.navigation.state.params.userId;
        var userProfile = this.props.navigation.state.params.userProfile;

        let date_picker = this.get_picker();

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
                            {lang.cost_registration}
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
                            {lang.name}: {userProfile.PatientName}
                        </Text>
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
                                style={{ width: width * 0.95 }}
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
                                        textStyle={{ fontFamily: "DinarTwoMedium_MRT", }}
                                    />
                                </CollapseBody>
                            </Collapse>
                        </Item>
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
                                onValueChange={(service) => (this.setState({ selectedPicker: service }))}
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
                                value={this.state.price}
                                onChange={(event) => { this.setState({ price: event.nativeEvent.text }); }}
                                onBlur={() => { this.create_currency_input(); }}
                            />
                        </Item>
                        {/* <Item
                            style={{ textAlign: 'center', justifyContent: 'center', marginTop: height * 0.05, }}
                        >
                            <Label
                                style={styles.form_input}
                            >{lang.cost_price}</Label>
                        </Item> */}
                        <Item>
                            <Button
                                style={{ width: width * 0.9, marginTop: height * 0.02, marginBottom: height * 0.025, marginLeft: width * 0.025, marginRight: width * 0.05, textAlign: 'center', justifyContent: 'center', fontFamily: "DinarTwoMedium_MRT", }}
                                onPress={() => { this.btn_next(userid,userProfile) }}
                            >
                                <Text>{lang.next}</Text>
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
