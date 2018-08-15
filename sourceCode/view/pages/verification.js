import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left } from 'native-base';
import Orientation from 'react-native-orientation';

import lang from '../../model/lang/fa.json';




export default class verification extends PureComponent {

    constructor() {
        super();
        Orientation.lockToPortrait();
    }

    btn_send_onclick(){
        this.props.navigation.replace("home");
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
                    <Body>
                        <Text style={[styles.text, { width: width * 0.5, textAlign: 'center' }]}>
                            {lang.system_verify}
                            0936****723
                    {lang.is_sending}
                        </Text>
                        <Form style={[styles.form, { flex: 1, flexDirection: 'row', justifyContent: 'space-between' }]} >
                            <Item inlineLabel
                                style={styles.form_item} >
                                <Input
                                    keyboardType="numeric"
                                    placeholder=""
                                    maxLength={1}
                                    onChange={(event) => this.setState({ verify_code: event.nativeEvent.text })}
                                    style={styles.form_input}

                                />
                            </Item>
                            <Item inlineLabel
                                style={styles.form_item}
                            >
                                <Input
                                    keyboardType="numeric"
                                    placeholder=""
                                    maxLength={1}
                                    onChange={(event) => this.setState({ verify_code: event.nativeEvent.text })}
                                    style={styles.form_input}

                                />
                            </Item>
                            <Item inlineLabel
                                style={styles.form_item}
                            >
                                <Input
                                    keyboardType="numeric"
                                    placeholder=""
                                    maxLength={1}
                                    onChange={(event) => this.setState({ verify_code: event.nativeEvent.text })}
                                    style={styles.form_input}

                                />
                            </Item>
                            <Item inlineLabel
                                style={styles.form_item}
                            >
                                <Input
                                    keyboardType="numeric"
                                    placeholder=""
                                    maxLength={1}
                                    onChange={(event) => this.setState({ verify_code: event.nativeEvent.text })}
                                    style={styles.form_input}
                                />
                            </Item>
                        </Form>
                        <Text style={[styles.text, { width: width * 0.5, marginTop: height * 0.05, fontSize: width * 0.03, textAlign: 'center' }]}>
                            {lang.call_company_for_help}
                        </Text>

                        <Button transparent style={{ marginTop: height * 0.05, marginRight: width * 0.05, width: width * 0.5, textAlign: 'center' }}>
                            <Right>
                                <Image
                                    style={styles.refresh}
                                    source={require("../image/refresh.png")}
                                />
                            </Right>
                            <Body>
                                <Text style={{ color: "#000000", fontFamily: "DinarTwoMedium_MRT", }}>
                                    {lang.try_again}

                                </Text>
                            </Body>
                            <Left />
                        </Button>

                        <Button style={styles.form_btn}
                        onPress={()=>{this.btn_send_onclick()}}
                        >
                            <Body>
                                <Text style={{ color: "#ffffff", fontFamily: "DinarTwoMedium_MRT", }}>
                                    {lang.accept}
                                </Text>
                            </Body>
                        </Button>

                    </Body>
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
        marginTop: height * 0.01,
        fontSize: width * 0.05,
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
