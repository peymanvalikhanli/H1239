import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker, Thumbnail } from 'native-base';
import Orientation from 'react-native-orientation';


import lang from '../../model/lang/fa.json';

import PhotoUpload from 'react-native-photo-upload';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class show_files extends PureComponent {

    get_images() {
        axios.post(server_url.GetTransDocumentDetail, {
            userkey: this.state.Token,
            transId: 50177
        })
            .then(response => {
                // alert(JSON.stringify(response));
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
                            if (response.data.UserDocumentDetail != undefined || response.data.UserDocumentDetail != null || response.data.UserDocumentDetail != '') {
                                var tem = [];
                                response.data.UserDocumentDetail.map((img, i) => {
                                    tem.push(img.Content_String)
                                    //alert(JSON.stringify(img));
                                }
                                );
                                this.setState({ images: tem });
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
        };

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                //     this.get_data_from_server();
                this.get_images();
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

    render() {

        var { navigate } = this.props.navigation;

        var data = this.props.navigation.state.params.data;

        const { selectedStartDate } = this.state;

        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            onPress={() => { this.props.navigation.replace("cost_registration", { userId: userid, userProfile: userProfile }); }}
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
