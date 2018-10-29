import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert, AsyncStorage, BackHandler } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker, Thumbnail } from 'native-base';
import Orientation from 'react-native-orientation';


import lang from '../../model/lang/fa.json';

import PhotoUpload from 'react-native-photo-upload';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class introduction_latter_upload extends PureComponent {

    upload_file_server(Id) {
        // alert(Id);
        this.state.images.map((img, i) => {
            let data = new FormData();

            data.append('transId', Id);
            data.append('fileName', "peymantest.png");
            data.append('fileType', this.state.Type);
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
        this.props.navigation.replace(this.state.parent, { userId: this.state.userid, userProfile: this.state.userProfile, data: this.state.data });
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

        this.upload_file_server(this.state.data.Id);
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

       // alert(JSON.stringify( data));

        this.setState({ Type: Type, userid: userid, userProfile: userProfile, parent: parent , data:data });

        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            onPress={() => { this.props.navigation.replace(parent, { userId: userid, userProfile: userProfile, data: data }); }}
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
