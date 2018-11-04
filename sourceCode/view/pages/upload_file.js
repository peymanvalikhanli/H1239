import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert, AsyncStorage, BackHandler } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker, Thumbnail } from 'native-base';
import Orientation from 'react-native-orientation';


import lang from '../../model/lang/fa.json';

import PhotoUpload from 'react-native-photo-upload';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';

//const image_url = '../image/camera.png';
export default class upload_file extends PureComponent {

    upload_file_server(Id) {
        // alert(Id);
        this.state.images.map((img, i) => {
            let data = new FormData();

            data.append('transId', Id);
            data.append('fileName', "peymantest.png");
            data.append('fileType', 3);
            data.append('contentType', "image/png");
            data.append('content', img);

            axios.post(server_url.UploadDocument, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    // alert(JSON.stringify(response));
                    //if (response.data.msg != undefined || response.data.msg != null) {
                    // this.get_data();

                    // }
                    // Alert.alert(
                    //                 lang.info,
                    //                 response.data.Message,
                    //                 [
                    //                     { text: lang.yes },
                    //                 ],
                    //                 { cancelable: false }
                    //             )
                    //            // alert(response.data.Id);  
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



    send_data_for_server(data) {
        axios.post(server_url.CreateTrans, {
            userkey: this.state.Token,
            userInsuranceId: data.UserInsuranceId,
            transAmount: data.price,
            transDate: data.date,
            companyInsuranceId: data.CompanyInsuranceId,
            tariffCategoryTitle: data.const_type,
            pageCount: this.state.images.length,
        })
            .then(response => {

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
                                // Alert.alert(
                                //     lang.info,
                                //     response.data.Message,
                                //     [
                                //         { text: lang.yes },
                                //     ],
                                //     { cancelable: false }
                                // )
                                //alert(response.data.Id);  
                                this.upload_file_server(response.data.Id);
                                data.transId = response.data.Id;

                                var data_list = this.state.data_list;
                                if (data_list != null && data_list != undefined && data_list != "") {
                                    data_list = JSON.parse(data_list);
                                    // data_list.push(data);
                                    data_list.unshift(data);
                                } else {
                                    data_list = [data,];
                                }
                                //  alert(JSON.stringify(data_list));

                                AsyncStorage.setItem('const_list', JSON.stringify(data_list));

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
            image_index: 0,
            images: [],
            avatar: null,
            data_list: [],
            // image_url:image_url,
        };

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                //     this.get_data_from_server();
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
        this.props.navigation.replace("cost_registration", { userId: this.state.userid, userProfile: this.state.userProfile, record: this.state.record });
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

    image_items(uri) {
        const tem = this.state.images.map((img, i) => {
            return (
                <Button
                    style={[styles.btn_img]}
                >
                    <Image style={[styles.btn_img_]} source={{ uri: 'data:image/png;base64,' + img }} />
                </Button>
            );
        });
        return tem;
    }

    btn_add_onclick() {

        if (this.state.avatar !== null) {
            var tem = this.state.images;
            var a = tem.unshift(this.state.avatar);
            this.setState({ images: tem });
            //alert(this.state.avatar);
            this.setState({ avatar: null });
        }
    }

    save_register_const(record, profile) {


        //alert(data_list); 
        record.UserInsuranceId = profile.UserInsuranceId;
        record.CompanyInsuranceId = profile.CompanyInsuranceId;
        record.PatientName = profile.PatientName;
        record.PatientNationalCode = profile.PatientNationalCode;
        record.IsCheck = true;
        record.Attachment = "";


        this.send_data_for_server(record);

    }

    btn_save_onclick(record, profile) {
        if (this.state.images.length <= 0) {
            Alert.alert(
                lang.error,
                lang.insert_attachment,
                [
                    { text: lang.yes },
                ],
                { cancelable: false }
            )
            return;
        }

        Alert.alert(
            lang.warning,
            lang.ready_to_send,
            [
                { text: lang.no },
                { text: lang.yes, onPress: () => { this.send_data(record, profile) } },
            ],
            { cancelable: false }
        )

        // this.props.navigation.replace("home");
    }

    send_data(record, profile) {

        if (record != undefined) {
            switch (record.act) {
                case "register":
                    AsyncStorage.getItem('const_list', (err, result) => {
                        if (result != null) {
                            this.setState({ data_list: result });
                        }
                        this.save_register_const(record, profile);
                        //alert('test mikonasm'); 
                    });
                    break;
            }
        }

    }


    render() {

        var { navigate } = this.props.navigation;

        const { selectedStartDate } = this.state;

        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';

        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

        var userid = this.props.navigation.state.params.userId;

        var userProfile = this.props.navigation.state.params.userProfile;

        var record = this.props.navigation.state.params.record;

        this.setState({ record: record, userProfile: userProfile, userid: userid });

        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            onPress={() => { this.props.navigation.replace("cost_registration", { userId: userid, userProfile: userProfile, record: record }); }}
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
                    style={{ fontFamily: "DinarTwoMedium_MRT", }}
                >
                    <Button
                        style={{ width: width * 0.9, marginTop: height * 0.02, marginBottom: height * 0.02, marginLeft: width * 0.05, marginRight: width * 0.05, textAlign: 'center', justifyContent: 'center', fontFamily: "DinarTwoMedium_MRT", }}
                        //   onPress={() => { alert(JSON.stringify(userProfile)) }}
                        onPress={() => { this.btn_save_onclick(record, userProfile) }}
                    >
                        <Text
                            style={[styles.font,]}
                        >{lang.save}</Text>
                    </Button>
                    <List>
                        <ListItem itemDivider>
                        </ListItem>
                    </List>
                    <View
                        style={[{ flex: 1, justifyContent: 'center', width, height: height * 0.6, textAlign: 'center', flexDirection: 'column', alignItems: 'center', marginTop: height * 0.01, marginBottom: height * 0.01 },]}
                    >

                        <PhotoUpload
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                    this.setState({
                                        avatar: avatar
                                    });
                                    console.log('Image base64 string: ', avatar);
                                }
                            }}
                        >
                            <Image
                                source={require('../image/camera.png')}
                                resizeMode='stretch'
                                style={[{ flex: 1, width: width * 0.8 }]}
                            />
                        </PhotoUpload>

                    </View>
                    <List>
                        <ListItem itemDivider>
                        </ListItem>
                    </List>
                    <View
                        style={{ flex: 1, flexDirection: 'row', paddingRight: width * 0.01, paddingRight: width * 0.01 }}
                    >
                        <Button bordered large
                            onPress={() => { this.btn_add_onclick(); }}
                            style={[styles.btn_img]}
                        >
                            <Icon large name="add" />

                        </Button>
                        {this.image_items(uri)}
                    </View>
                </Content>
            </Container>
        );
    }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    font: {
        fontFamily: "DinarTwoMedium_MRT",
    },

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
    btn_img: {
        width: width * 0.1,
        height: height * 0.15,
        marginLeft: width * 0.01,
        marginTop: width * 0.01,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
    },
    btn_img_: {
        width: width * 0.1,
        height: height * 0.15,
        // marginLeft: width * 0.01,
        // marginTop: width * 0.01,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
    },
    img: {
        width: width * 0.8,
        height: width * 0.8 * 1.7,
        marginTop: width * 0.1,
        justifyContent: 'center',
        alignItems: 'stretch',
        resizeMode: 'stretch',
    },
});
