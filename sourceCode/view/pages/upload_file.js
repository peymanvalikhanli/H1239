import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert, AsyncStorage, BackHandler, TouchableOpacity, PixelRatio } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker, Thumbnail } from 'native-base';
import Orientation from 'react-native-orientation';

import lang from '../../model/lang/fa.json';

import PhotoUpload from 'react-native-photo-upload';

import ImagePicker from 'react-native-image-picker';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';

import RNFetchBlob from 'react-native-fetch-blob';

import Spinner from 'react-native-loading-spinner-overlay';

//const image_url = '../image/camera.png';
export default class upload_file extends PureComponent {

    upload_file_server(Id) {
        // alert(Id);
        this.state.images.map((img, i) => {
            let data = new FormData();
            //alert(JSON.stringify(img.uri));
            RNFetchBlob.fs.readFile(img.uri, 'base64')
                .then((img_data) => {
                    data.append('transId', Id);
                    data.append('fileName', "peymantest.png");
                    data.append('fileType', 3);
                    data.append('contentType', "image/png");
                    data.append('content', img_data);

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
                                    // check it for send file
                                    var count = this.state.file_send_count;
                                    count++;
                                    this.setState({ file_send_count: count });

                                    if (this.state.FileNumber !== null && this.state.file_send_count == this.state.images.length) {
                                       // alert(this.state.FileNumber);
                                       this.setState({ spinner:false });
                                        Alert.alert(
                                            lang.info,
                                            response.data.Message + " " + lang.file_NO + " " + this.state.FileNumber+ " "+ lang.write_on_document,
                                            [
                                                { text: lang.yes },
                                            ],
                                            { cancelable: false }
                                        )
                                        this.props.navigation.replace("cost_registration", { userId: this.state.userid, userProfile: this.state.userProfile, record: "" });
                                    }
                                    break;
                            }
                        })
                        .catch(function (error) {
                            //console.log(error);
                            alert(JSON.stringify(error));
                        });

                })


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
                            this.setState({ spinner:false });
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
                            this.setState({ spinner:false });
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
                                //alert(JSON.stringify(response.data.FileNumber));  
                                this.setState({ FileNumber: response.data.FileNumber })
                                this.setState({ file_send_count: 0 , spinner:true  });
                                //FileNumber
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
            avatarSource: null,
            file_send_count: -1,
            FileNumber: null,
            spinner: false,
            current_image : -1 ,
        };

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                //     this.get_data_from_server();
            }
        });

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.selectVideoTapped = this.selectVideoTapped.bind(this);
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
                    // onPress={() => { this.btn_delete(i) }}
                    onPress={() => { this.btn_select_image(i) }}
                >
                    {/* <Image style={[styles.btn_img_]} source={{ uri: 'data:image/png;base64,' + img }} /> */}
                    {/* <Image style={[styles.btn_img_]} source={{ uri:  img }} />                     */}
                    <Image style={[styles.btn_img_]} source={img}
                    />

                </Button>
            );
        });
        return tem;
    }

    btn_select_image(id){
        this.setState({
            avatarSource: this.state.images[id],
            current_image: id,
        })
    }

    btn_delete() {
        var id = this.state.current_image;
        if(id == -1 ){ // not select imge 
            return;
        }
        Alert.alert(
            lang.warning,
            lang.are_you_deleted,
            [
                { text: lang.no },
                { text: lang.yes, onPress: () => { this.delete_image(id) } },
            ],
            { cancelable: false }
        )
    }

    delete_image(id) {
        var tem = [];
        tem = this.state.images;
        tem.splice(id, 1);
        //alert(JSON.stringify(tem));
        this.setState({
             images: tem ,
             current_image: (tem.length-1), 
             avatarSource: this.state.images[tem.length-1]

        });
        this.forceUpdate();
    }

    btn_add_onclick() {

        if (this.state.avatarSource !== null) {
            var tem = this.state.images;
            var a = tem.unshift(this.state.avatarSource);
            this.setState({ 
                images: tem,
                current_image: (tem.length-1),
             });
            


            //this.setState({ avatarSource: null });
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

        this.setState({ spinner:true });
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

    // new code 
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
                
                this.btn_add_onclick();
            }
        });
    }

    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium',
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    videoSource: response.uri,
                });
            }
        });
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
                <Spinner
                    visible={this.state.spinner}
                    textContent={lang.loading}
                    textStyle={styles.spinnerTextStyle}
                />
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
                        >{lang.send}</Text>
                    </Button>
                    <List>
                        <ListItem itemDivider>
                        </ListItem>
                    </List>
                    <View
                        style={[{ flex: 1, justifyContent: 'center', width, height: height * 0.6, textAlign: 'center', flexDirection: 'column', alignItems: 'center', marginTop: height * 0.01, marginBottom: height * 0.01 },]}
                    >

                        {/* <PhotoUpload
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                    this.setState({
                                        avatar: avatar
                                    });
                                    console.log('Image base64 string: ', avatar);
                                }
                            }}
                            maxWidth={5000}
                            maxHeight={5000}
                        >
                            <Image
                                source={require('../image/camera.png')}
                                resizeMode='stretch'
                                style={[{ flex: 1, width: width * 0.8 }]}
                            />
                        </PhotoUpload> */}

                        {/* select photo  */}
                        <TouchableOpacity 
                        // onPress={this.selectPhotoTapped.bind(this)}
                        onPress={() => { this.btn_delete() }}
                        >
                            <View
                                style={[
                                    styles.avatar,
                                    styles.avatarContainer,
                                    { marginBottom: 20 },
                                ]}
                            >
                                {(this.state.avatarSource === null || this.state.images.length <=0 ) ? (
                                    <Image
                                        source={require('../image/camera.png')}
                                        resizeMode='stretch'
                                        style={[{ flex: 1, width: width * 0.8 }]}
                                    />
                                ) : (
                                        <Image style={styles.avatar} source={this.state.avatarSource} />
                                    )}
                            </View>
                        </TouchableOpacity>

                    </View>
                    <List>
                        <ListItem itemDivider>
                        </ListItem>
                    </List>
                    <View
                        style={{ flex: 1, flexDirection: 'row', paddingRight: width * 0.01, paddingRight: width * 0.01 }}
                    >
                        <Button bordered large
                            // onPress={() => { this.btn_add_onclick(); }}
                            onPress={this.selectPhotoTapped.bind(this)}
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
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 0,
        width: width,
        height: height * 0.6,
    },
});
