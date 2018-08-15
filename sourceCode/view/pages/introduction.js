
import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text } from 'native-base';
import Orientation from 'react-native-orientation';
import SwiperFlatList from 'react-native-swiper-flatlist';

import lang from '../../model/lang/fa.json';




export default class introduction extends PureComponent {

    constructor() {
        super();
        Orientation.lockToPortrait();
    }

    btnEnter_onclick() {
        this.props.navigation.replace("verification");
    }

    render() {
        var { navigate } = this.props.navigation;
        return (
            <Container style={{ flex: 1 }}>
                <Content>
                    <View>
                        <Image
                            style={styles.header}
                            source={require("../image/header.png")}
                        />
                    </View>
                    <View key="view_1" style={styles.container} >
                        <SwiperFlatList
                            showPagination
                            paginationDefaultColor='#8382ae'
                            paginationActiveColor='#2e2878'
                        >
                            <View key="view_1_1" style={[styles.child, { backgroundColor: "#ffffff" }]} >
                                <Body style={{ backgroundColor: "#ffffff" }}>
                                    <Image
                                        source={require("../image/2.png")}
                                    />
                                </Body>
                            </View>
                            <View key="view_1_2" style={[styles.child, { backgroundColor: "#ffffff" }]}>
                                <Body>
                                    <Image
                                        source={require("../image/1.png")}
                                    />
                                </Body>
                            </View>
                            <View key="view_1_3" style={[styles.child, { backgroundColor: "#ffffff" }]}>
                                <Body>
                                    <Form style={styles.form} >
                                        <Item floatingLabel>
                                            <Label style={{ fontFamily: "DinarTwoMedium_MRT", }}>
                                                {lang.user_name}
                                            </Label>
                                            <Input
                                                keyboardType="numeric"
                                            />
                                        </Item>
                                    </Form>
                                    <Button style={styles.form_btn}
                                        onPress={() => { this.btnEnter_onclick() }}>
                                        <Body>
                                            <Text style={{ color: "#ffffff", fontFamily: "DinarTwoMedium_MRT", }}>
                                                {lang.enter}
                                            </Text>
                                        </Body>
                                    </Button>
                                </Body>
                            </View>
                        </SwiperFlatList>
                    </View>

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
        marginTop: height * 0.1,
        fontSize: width * 0.08,
        color: "#1bbbc4",
        fontFamily: "DinarTwoMedium_MRT",
    },
    form: {
        width: width * 0.6,
        marginTop: height * 0.1,
    },
    form_btn: {
        marginTop: height * 0.2,
        marginLeft: width * 0.05,
        width: width * 0.5,
        backgroundColor: "#2e2878",
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
});
