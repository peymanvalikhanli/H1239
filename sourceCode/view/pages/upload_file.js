import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker, Thumbnail } from 'native-base';
import Orientation from 'react-native-orientation';


import lang from '../../model/lang/fa.json';

import PhotoUpload from 'react-native-photo-upload';




export default class upload_file extends PureComponent {

    constructor() {
        super();
        Orientation.lockToPortrait();
        this.onDateChange = this.onDateChange.bind(this);

        this.state = {
            selectedStartDate: null,
        };
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    btn_send_onclick() {
        this.props.navigation.replace("home");
    }

    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

        var userid = this.props.navigation.state.params.userId;
        var userProfile = this.props.navigation.state.params.userProfile;

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
                    <Button
                        style={{ width: width * 0.9, marginTop: height * 0.02, marginBottom: height * 0.02, marginLeft: width * 0.05, marginRight: width * 0.05, textAlign: 'center', justifyContent: 'center', fontFamily: "DinarTwoMedium_MRT", }}
                        onPress={() => { alert('Hello peyman') }}
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
                            //  onPress={()=>{alert('Hello peyman')}}
                            style={[styles.btn_img]}
                        >
                            <Icon large name="add" />

                        </Button>
                        <Button
                            style={[styles.btn_img]}
                        >
                            <Thumbnail large source={{ uri: uri }} />
                        </Button>
                        <Button
                            style={[styles.btn_img]}
                        >
                            <Thumbnail large source={{ uri: uri }} />
                        </Button>
                        <Button
                            style={[styles.btn_img]}
                        >
                            <Thumbnail large source={{ uri: uri }} />
                        </Button>
                        <Button
                            style={[styles.btn_img]}
                        >
                            <Thumbnail large source={{ uri: uri }} />
                        </Button>
                        <Button
                            style={[styles.btn_img]}
                        >
                            <Thumbnail large source={{ uri: uri }} />
                        </Button>
                        <Button
                            style={[styles.btn_img]}
                        >
                            <Thumbnail large source={{ uri: uri }} />
                        </Button>
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
    img: {
        width: width * 0.8,
        height: width * 0.8 * 1.7,
        marginTop: width * 0.1,
        justifyContent: 'center',
        alignItems: 'stretch',
        resizeMode: 'stretch',
    },
});
