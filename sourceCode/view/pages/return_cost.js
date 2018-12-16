import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, BackHandler, Alert, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker } from 'native-base';
import Orientation from 'react-native-orientation';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import lang from '../../model/lang/fa.json';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class return_cost extends PureComponent {

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

    send_data_to_server(){
        axios.post(server_url.EditTrans, {
            userkey: this.state.Token,
            transId:this.state.data.TransId,
            transAmount:this.state.price,
            transDate: this.state.selectedStartDate,
            tariffCategoryTitle:this.state.selectedPicker,
            pageCount:this.state.data.PageCount, 
        })
            .then(response => {
             //    alert(JSON.stringify(response));
                if (response.data.act != undefined || response.data.act != null) {
                    //alert(JSON.stringify(response.data));
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
                        case "msg":
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
                            if (response.data.Id != undefined || response.data.Id != null || response.data.Id != '') {
                                Alert.alert(
                                    lang.info,
                                    response.data.Message,
                                    [
                                        { text: lang.yes },
                                    ],
                                    { cancelable: false }
                                )
                                // alert(response.data.Id);  
                                // this.upload_file_server(response.data.Id);
                                // data.transId = response.data.Id;

                                // var data_list = this.state.data_list;
                                // if (data_list != null && data_list != undefined && data_list != "") {
                                //     data_list = JSON.parse(data_list);
                                //     // data_list.push(data);
                                //     data_list.unshift(data);
                                // } else {
                                //     data_list = [data,];
                                // }
                                //  alert(JSON.stringify(data_list));

                                // AsyncStorage.setItem('const_list', JSON.stringify(data_list));

                            }
                            break;
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
            selectedPicker: '#',
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
        this.props.navigation.replace("return_cost_list");
        return true;
    }


    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
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

    create_currency_input() {
        var x = this.state.price;
        x=x.toString().replace(",","");
        var a = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.setState({ price: a });
    }

    btn_send_onclick(){
        if (this.state.price == '#' || this.state.price == null || this.state.price == '') {

            Alert.alert(
                lang.error,
                lang.enter_price,
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
                lang.enter_cost_type,
                [
                    { text: lang.yes },
                ],
                { cancelable: false }
            )
            return;
        }
        if (this.state.selectedStartDate == '#' || this.state.selectedStartDate == null || this.state.selectedStartDate == '') {

            Alert.alert(
                lang.error,
                lang.select_dateـcost,
                [
                    { text: lang.yes },
                ],
                { cancelable: false }
            )
            return;
        }

        this.send_data_to_server();
    }

    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';

        var userid = "";//this.props.navigation.state.params.userId;
        var userProfile = "";//this.props.navigation.state.params.userProfile;

        var data = this.props.navigation.state.params.data;

        this.setState({data: data});

       //alert(JSON.stringify(data));
        this.setState({ 
            selectedPicker: data.TariffCategoryTitle, 
            price : data.TransAmount 
        });

        // this.state.selectedStartDate = data.TransDate;


        let date_picker = this.get_picker();

        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            onPress={() => { this.props.navigation.replace("return_cost_list"); }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text
                            style={{ textAlign: 'center', color: '#ffffff', fontFamily: "DinarTwoMedium_MRT", }}
                        >
                            {lang.return_cost}
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
                    <Button
                        style={styles.form_btn}
                        onPress={()=>{this.btn_send_onclick()}}
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
                    <Form
                        style={{ justifyContent: 'center', textAlign: 'center', }}
                    >

                        <Text
                            style={styles.text}
                        >
                            {lang.name}: {data.PatientName}
                        </Text>
                        <Text
                            style={styles.text}
                        >
                            {lang.national_code_}: <Text style={{ fontFamily: "BNazanin", }}>{data.PatientNationalCode}</Text>
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
                                        {lang.cost_date}: <Text style={{ fontFamily: "BNazanin", }}>{startDate}</Text>
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
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={[{ width: undefined, }, styles.form_input]}
                                placeholder={lang.cost_type}
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
                                style={{ fontFamily: "BNazanin", }}
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
                    </Form>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Left />
                            <Body />
                            <Right>
                                <Text>{lang.description}</Text>
                            </Right>

                        </ListItem>
                    </List>
                    <Text>
                        {data.Description}
                    </Text>
                    <List
                        style={{ marginTop: height * 0.02, }}
                    >
                        <ListItem itemDivider>
                            <Text></Text>
                        </ListItem>
                        <ListItem icon
                            onPress={() => { this.props.navigation.replace("show_files", { data: data, parent: "return_cost", main_parent: "", userProfile: userProfile, userid: userid }); }}
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
