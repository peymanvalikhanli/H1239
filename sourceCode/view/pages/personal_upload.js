import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert, AsyncStorage, BackHandler, TouchableOpacity, PixelRatio, ToastAndroid } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker, Thumbnail } from 'native-base';
import Orientation from 'react-native-orientation';

import lang from '../../model/lang/fa.json';

import PhotoUpload from 'react-native-photo-upload';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';

import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'react-native-fetch-blob';

import Spinner from 'react-native-loading-spinner-overlay';


export default class personal_upload extends PureComponent {

    get_images() {
        if (this.state.userProfile.UserId == null || this.state.userProfile.UserId == undefined || this.state.userProfile.UserId == "") {
            setTimeout(() => {
                this.get_images();
            }, 1000);
            return;
        }
        axios.post(server_url.GetUserDocumentDetail, {
            userkey: this.state.Token,
            userId: this.state.userProfile.UserId,
            userDocumentType: this.state.Type
        })
            .then(response => {
                // alert(JSON.stringify(response));
                if (response.data.act != undefined || response.data.act != null) {
                    //alert(JSON.stringify(response.data));
                    switch (response.data.act) {
                        case "Error":
                            // Alert.alert(
                            //     lang.error,
                            //     response.data.Message,
                            //     [
                            //         { text: lang.yes },
                            //     ],
                            //     { cancelable: false }
                            // )
                            break;
                        case "msg":
                            // Alert.alert(
                            //     lang.error,
                            //     response.data.Message,
                            //     [
                            //         { text: lang.yes },
                            //     ],
                            //     { cancelable: false }
                            // )
                            break;
                        case "Success":
                            if (response.data.UserDocumentDetail != undefined || response.data.UserDocumentDetail != null || response.data.UserDocumentDetail != '') {
                                var tem = [];
                                var show_msg = false; 
                                response.data.UserDocumentDetail.map((img, i) => {
                                    if(show_msg== false){
                                        ToastAndroid.showWithGravityAndOffset(
                                            img.Description,
                                            ToastAndroid.LONG,
                                            ToastAndroid.BOTTOM,
                                            25,
                                            50,
                                          );
                                        show_msg = true;
                                    }
                                    tem.push(img.Content_String)
                                }
                                );
                                this.setState({ images: tem, get_image_count: tem.length, file_send_count:tem.length });
                            }
                            break;

                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    upload_file_server(Id) {
        // alert(Id);
        this.state.images.map((img, i) => {
            if (i >= this.state.get_image_count) {
                let data = new FormData();
                RNFetchBlob.fs.readFile(img.uri, 'base64')
                    .then((img_data) => {
                        data.append('userId', Id);
                        data.append('userDocumentType', this.state.Type);
                        data.append('fileName', "peymantest.png");
                        // data.append('fileType', 4);
                        data.append('contentType', "image/png");
                        data.append('content', img_data);
                        data.append('userkey', this.state.Token);

                        axios.post(server_url.UploadUserDocument, data, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                            .then(response => {
                               // alert(JSON.stringify(response));  
                                this.setState({ spinner: false });
                                switch (response.data.act) {
                                    case "Success":
                                        var count = this.state.file_send_count;
                                        count++;
                                        this.setState({ file_send_count: count });
                                        //alert(count+""+this.state.images.length)
                                        if (this.state.FileNumber !== null && count == this.state.images.length) {
                                            
                                            Alert.alert(
                                                lang.info,
                                                response.data.Message,
                                                [
                                                    { text: lang.yes },
                                                ],
                                                { cancelable: false }
                                            )
                                           // this.props.navigation.replace(this.state.parent, { userId: this.state.userid, userProfile: this.state.userProfile, doc_icon: this.state.doc_icon, doc_color: this.state.doc_color, doc_data: this.state.doc_data });
                                           this.props.navigation.replace("profile", { userId: this.state.userId, userProfile: this.state.userProfile });
                                        }
                                        break;
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                                //alert(JSON.stringify(error));
                                this.setState({ spinner: false });
                            });
                    });
            }
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
            up_images: [],
            avatar: null,
            data_list: [],
            get_image_count: 0,
            avatarSource: null,
            file_send_count:0, 
            current_image : -1 ,
            show_msg: true,
        };

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.selectVideoTapped = this.selectVideoTapped.bind(this);

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                //     this.get_data_from_server();
                this.get_images();
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
        this.props.navigation.replace(this.state.parent, { userId: this.state.userid, userProfile: this.state.userProfile, doc_icon: this.state.doc_icon, doc_color: this.state.doc_color, doc_data: this.state.doc_data });
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
                    {i < this.state.get_image_count ? (
                        <Image style={[styles.btn_img_]} source={{ uri: 'data:image/png;base64,' + img }} />
                    ) : (
                            <Image style={[styles.btn_img_]} source={img} />
                        )}
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
        if (id >= this.state.get_image_count) {
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
    }

    delete_image(id) {
        var tem = [];
        tem = this.state.images;
        tem.splice(id, 1);
        this.setState({ 
            images: tem,  
            current_image: (tem.length-1), 
            avatarSource: this.state.images[tem.length-1]
        });
        this.forceUpdate();
    }

    btn_add_onclick() {

        if (this.state.avatarSource !== null) {
            var tem = this.state.images;
            var a = tem.push(this.state.avatarSource);
            this.setState({ 
                images: tem, 
                current_image: (tem.length-1),
            });
            // this.setState({ avatarSource: null });
        }
    }

    btn_save_onclick() {
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
        // alert(JSON.stringify(this.state.userProfile.UserId));
        this.setState({ spinner: true });
        this.upload_file_server(this.state.userProfile.UserId);
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

        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

        var { navigate } = this.props.navigation;

        var userid = this.props.navigation.state.params.userId;

        var userProfile = this.props.navigation.state.params.userProfile;

        var Type = this.props.navigation.state.params.Type;

        var header_title = this.props.navigation.state.params.header_title;

        var parent = this.props.navigation.state.params.parent;

        var data = this.props.navigation.state.params.data;

        var doc_color = this.props.navigation.state.params.doc_color;
        var doc_icon = this.props.navigation.state.params.doc_icon;
        var doc_data = this.props.navigation.state.params.doc_data;
        var Type = this.props.navigation.state.params.Type;


        this.setState({ Type: Type, userid: userid, userProfile: userProfile, parent: parent, doc_data: doc_data, doc_icon: doc_icon, doc_color: doc_color });

        if(this.state.show_msg == false){

        ToastAndroid.showWithGravityAndOffset(
            'A wild toast appeared!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );

          this.setState({
            show_msg: true,
          })
        }


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
                            onPress={() => { this.props.navigation.replace(parent, { userId: userid, userProfile: userProfile, doc_icon: doc_icon, doc_color: doc_color, doc_data: doc_data }); }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text
                            style={{ textAlign: 'center', color: '#ffffff', fontFamily: "DinarTwoMedium_MRT", }}
                        >
                            {header_title}
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
                        onPress={() => { this.btn_save_onclick() }}
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
                                {( this.state.avatarSource === null  || this.state.images.length <=0 )? (
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
