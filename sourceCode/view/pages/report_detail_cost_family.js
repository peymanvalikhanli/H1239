import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, BackHandler, AsyncStorage, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, } from 'native-base';
import Orientation from 'react-native-orientation';

import lang from '../../model/lang/fa.json';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import { ListView } from 'react-native';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';

var is_first = true;


export default class report_detail_cost_family extends PureComponent {


    get_data_from_server() {
        axios.post(server_url.GetTransStatusReportList, {
            userkey: this.state.Token,
            fromSendDate: this.state.req_start_date,
            toSendDate: this.state.req_end_date,
            patientNationalCode: ""
        })
            .then(response => {

                if (response.data.act != undefined || response.data.act != null) {
                    //alert(JSON.stringify(response.data));
                    switch (response.data.act) {
                        case "msg":
                            alert(response.data.Message);
                            break;
                        case "Success":
                            if (response.data.LstTransStatusRepor != undefined || response.data.LstTransStatusRepor != null || response.data.LstTransStatusRepor != '') {
                                this.setState({ listViewData: response.data.LstTransStatusRepor });
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
        this.onDateChange1 = this.onDateChange1.bind(this);
        //  this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            Token: '#',
            national_code: '#',
            selectedStartDate: null,
            selectedendDate: null,
            basic: true,
            listViewData: [],
            fromSendDate: null,
            toSendDate: null,

        };
        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                //  this.get_data_from_server();
            }
        });
        AsyncStorage.getItem('report_date', (err, result) => {
            if (result != null) {
                var data = JSON.parse(result);
                this.setState({ startDate: data.start, endDate: data.end, req_start_date: data.req_start_date, req_end_date: data.req_end_date });
                if(data.req_end_date!=null && data.req_start_date!=null){
                    this.get_data_from_server();
                }
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
        this.props.navigation.replace("home");
        return true;
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

    btn_search_onclick() {
        //alert(startDate+" hi peyman "+ endDate);

        this.get_data_from_server();
    }

    render() {
        var { navigate } = this.props.navigation;
        var userid = "";//this.props.navigation.state.params.userId;
        var userProfile = "";//this.props.navigation.state.params.userProfile;

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
                    <Form>
                        <Item>
                            <Collapse
                                style={{ width: width * 0.95 }}
                            >
                                <CollapseHeader>
                                    <Text
                                        style={styles.text}
                                    >
                                        {lang.start_date}: {this.state.startDate}
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
                                        {lang.end_date}: {this.state.endDate}
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
                    </Form>
                    <Button
                        style={styles.form_btn}
                        onPress={() => { this.btn_search_onclick() }}
                    >
                        <Text
                            style={styles.font_name}
                        >
                            {lang.report}
                        </Text>
                    </Button>
                    <List >
                        <ListItem itemDivider>
                            <Text></Text>
                        </ListItem>
                    </List>
                    <List
                        style={{ marginLeft: width * 0.01 }}
                        // rightOpenValue={-75}
                        // dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        dataArray={this.state.listViewData}
                        renderRow={data =>
                            <ListItem icon
                                onPress={() => { this.props.navigation.replace("show_report_detail_cost", { data: data, parent: "report_detail_cost_family", userId: userid, userProfile: userProfile, start_date: this.state.selectedStartDate, end_date: this.state.selectedendDate }); }}
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
                                        {data.PatientName} {"  "} {data.TariffCategoryTitle}
                                    </Text>
                                </Body>
                                <Right />
                            </ListItem>

                        }
                    // renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    //     <Button full danger >
                    //         <Icon active name="trash" />
                    //     </Button>}

                    />

                </Content>
                {/* <Footer>

                </Footer> */}
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
        // fontSize: width * 0.02,
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
