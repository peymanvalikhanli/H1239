import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, Alert, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Badge } from 'native-base';
import Orientation from 'react-native-orientation';

import lang from '../../model/lang/fa.json';

import axios from 'axios';

import server_url from '../../model/server_config/controller_url.json';


export default class home extends PureComponent {

    get_personal_data() {
        axios.post(server_url.GetUserInsuranceList, {
            userkey: this.state.Token,
        })
            .then(response => {

                if (response.data.act != undefined || response.data.act != null) {
                    // alert(response.data.LstUserInsurance);
                    if (response.data.LstUserInsurance != undefined || response.data.LstUserInsurance != null || response.data.LstUserInsurance != '') {

                        AsyncStorage.setItem('LstUserInsurance', JSON.stringify(response.data.LstUserInsurance));
                        this.setState({ LstUserInsurance: response.data.LstUserInsurance });
                        this.setState({ btn_count: response.data.LstUserInsurance.length });

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

        this.state = {
            Token: '#',
            national_code: '#',
            LstUserInsurance: '#',
            btn_count: 0,
        }

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                this.get_personal_data();
            }
        });

        //_________________ const list data
        // AsyncStorage.getItem('const_list', (err, result) => {
        //     if (result != null) {
        //         alert(result );
        //     }
        // });

        AsyncStorage.getItem('national_code', (err, result) => {
            if (result != null) {
                this.setState({ national_code: result });
            }
        });

    }


    btn_send_onclick(userId, index) {

        try {
            if (userId != null && userId != undefined && userId != '' && userId != 0) {
                this.props.navigation.replace("profile", { userId: userId, userProfile: this.state.LstUserInsurance[index] });
            }
        } catch (e) {

        }

    }

    btn_exit_onclick() {
        Alert.alert(
            lang.warning,
            lang.are_you_log_out,
            [
                { text: lang.no },
                { text: lang.yes,onPress: () => {this. exit_app() }},
            ],
            { cancelable: false }
        )

        
    }

    exit_app(){
        AsyncStorage.setItem('Token', null);
        AsyncStorage.setItem('national_code', null);
        AsyncStorage.clear();
        this.props.navigation.replace("introduction");
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
                        <View
                            style={styles.divider_view}
                        >
                            <View
                                style={styles.top_frame}
                            >
                                <Button transparent
                                    style={styles.header_btn}
                                >
                                    <Image
                                        style={styles.header_btn_image}
                                        resizeMode='stretch'
                                        source={require('../image/btn_z4.png')}
                                    />
                                </Button>
                                <Button transparent
                                    style={styles.header_btn}
                                    onPress={() => { this.btn_exit_onclick() }}
                                >
                                    <Image
                                        style={styles.header_btn_image}
                                        resizeMode='stretch'
                                        source={require('../image/btn_z3.png')}
                                    />
                                </Button>
                                <Button transparent
                                    style={styles.header_btn}
                                    onPress={()=>{this.props.navigation.replace("report_detail_cost");}}
                                >
                                    <Image
                                        style={styles.header_btn_image}
                                        resizeMode='stretch'
                                        source={require('../image/btn_z2.png')}
                                    />
                                </Button>
                                <Button transparent
                                    style={styles.header_btn}
                                >
                                    <Image
                                        style={styles.header_btn1_image}
                                        resizeMode='stretch'
                                        source={require('../image/btn1.png')}
                                    />
                                </Button>
                            </View>
                            <View
                                style={styles.clo_view}
                            >

                                <View
                                    style={[styles.row_view, { marginTop: height * 0.05 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 1 ? this.state.LstUserInsurance[1].UserInsuranceId : undefined, 1) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p.png')}
                                            source={(this.state.btn_count > 1 ? require('../image/p.png') : require('../image/p61.png'))}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.45, marginTop: (height * 0.03) * -1 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 2 ? this.state.LstUserInsurance[2].UserInsuranceId : undefined, 2) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p11.png')}
                                            source={(this.state.btn_count > 2 ? require('../image/p11.png') : require("../image/p61.png"))}
                                        />
                                    </Button>
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 3 ? this.state.LstUserInsurance[3].UserInsuranceId : undefined, 3) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p12.png')}
                                            source={(this.state.btn_count > 3 ? require('../image/p12.png') : require('../image/p62.png'))}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.68, marginTop: height * 0.025 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 4 ? this.state.LstUserInsurance[4].UserInsuranceId : undefined, 4) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p21.png')}
                                            source={(this.state.btn_count > 4 ? require('../image/p21.png') : require('../image/p61.png'))}
                                        />
                                    </Button>
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 5 ? this.state.LstUserInsurance[5].UserInsuranceId : undefined, 5) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p22.png')}
                                            source={(this.state.btn_count > 5 ? require('../image/p22.png') : require('../image/p62.png'))}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.75, marginTop: height * 0.05 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 6 ? this.state.LstUserInsurance[6].UserInsuranceId : undefined, 6) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            source={this.state.btn_count > 6 ? require('../image/p31.png') : require('../image/p61.png')}
                                        />
                                    </Button>
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 0 ? this.state.LstUserInsurance[0].UserInsuranceId : undefined, 0) }}
                                        style={styles.btn_main_personal}
                                    >
                                        <Image
                                            style={styles.btn_main_personal_image}
                                            resizeMode='stretch'
                                            source={require('../image/center_image.png')}
                                        />
                                    </Button>
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 7 ? this.state.LstUserInsurance[7].UserInsuranceId : undefined, 7) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            source={this.state.btn_count > 7 ? require('../image/p32.png') : require('../image/p62.png')}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.68, marginTop: height * 0.05 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 8 ? this.state.LstUserInsurance[8].UserInsuranceId : undefined, 8) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p41.png')}
                                            source={(this.state.btn_count > 8 ? require('../image/p41.png') : require('../image/p61.png'))}
                                        />
                                    </Button>
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 9 ? this.state.LstUserInsurance[9].UserInsuranceId : undefined, 9) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p42.png')}
                                            source={(this.state.btn_count > 9 ? require('../image/p42.png') : require('../image/p62.png'))}
                                        />
                                    </Button>

                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.45, marginTop: height * 0.025 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 10 ? this.state.LstUserInsurance[10].UserInsuranceId : undefined, 10) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p51.png')}
                                            source={(this.state.btn_count > 10 ? require('../image/p51.png') : require('../image/p61.png'))}
                                        />
                                    </Button>
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 11 ? this.state.LstUserInsurance[11].UserInsuranceId : undefined, 11) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p52.png')}
                                            source={(this.state.btn_count > 11 ? require('../image/p52.png') : require('../image/p62.png'))}
                                        />
                                    </Button>

                                </View>
                                <View
                                    style={[styles.row_view, { marginTop: (height * 0.03) * -1 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 12 ? this.state.LstUserInsurance[12].UserInsuranceId : undefined, 12) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p6.png')}
                                            source={this.state.btn_count > 12 ? require('../image/p6.png') : require('../image/p61.png')}
                                        />

                                    </Button>

                                </View>
                            </View>
                            <View
                                style={styles.footer_frame_bk}
                            >
                            </View>
                            <View
                                style={styles.footer_frame}
                            >
                                <View
                                    style={styles.footer}
                                >
                                    <Button transparent
                                        style={[styles.btn_footer,{marginLeft:width*0.22,}]}
                                         onPress={()=>{this.props.navigation.replace("cost_list");}}
                                    >
                                        <Image
                                            style={styles.btn_footer}
                                            resizeMode='stretch'
                                            source={require('../image/btn_x2.png')}
                                        />
                                        {/* <Badge
                                        style={{ marginBottom: height * 0.2, }}
                                    >
                                        <Text>2</Text>
                                    </Badge> */}

                                    </Button>
                                </View>

                                <View
                                    style={{ flex: 0, justifyContent: 'center', }}
                                >
                                    <Button transparent
                                        style={[styles.btn_main_footer, { marginTop: height * 0.05, height: width * 0.22 }]}
                                     onPress={()=>{this.props.navigation.replace("return_cost_list");}}
                                    >
                                        <Image
                                            style={styles.btn_main_footer}
                                            resizeMode='stretch'
                                            source={require('../image/btn2.png')}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={styles.footer}
                                >
                                    <Button transparent
                                        style={[styles.btn_footer, { marginLeft: width * 0.05 }]}
                                     onPress={()=>{this.props.navigation.replace("fractional_documents_list");}}
                                    >
                                        <Image
                                            style={styles.btn_footer}
                                            resizeMode='stretch'
                                            source={require('../image/btn_x1.png')}
                                        />
                                    </Button>

                                </View>

                            </View>

                        </View>
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

    header_btn: {
        width: width * 0.2,
        height: width * 0.15,
        paddingVertical: 30,
        resizeMode: 'stretch',
        marginTop: (height * 0.1) * -1,
        // borderRadius: 75
    },
    header_btn_image: {
        width: width * 0.2,
        height: width * 0.15,
        paddingVertical: 30,
        resizeMode: 'stretch',
        // marginTop: (height*0.1)*-1,
        // borderRadius: 75
    },
    header_btn1: {
        width: width * 0.15,
        height: width * 0.15,
        paddingVertical: 30,
        resizeMode: 'stretch',
        marginTop: (height * 0.1) * -1,
        // borderRadius: 75
    },
    header_btn1_image: {
        width: width * 0.15,
        height: width * 0.15,
        paddingVertical: 30,
        resizeMode: 'stretch',
        //marginTop: (height*0.1)*-1,
        // borderRadius: 75
    },
    divider_view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        justifyContent: 'center',
        height: height * 0.729,
    },

    top_frame: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.1,
    },
    clo_view: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: height*0.9,
        //backgroundColor:"#ffff00",
        marginTop: (height * 0.05) * -1,
    },

    row_view: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 2,

    },

    btn_personal: {
        width: width * 0.15,
        height: width * 0.15,
        paddingVertical: 30,
        borderRadius: 75,
        marginTop: height * -0.03,
    },
    btn_personal_image: {
        width: width * 0.15,
        height: width * 0.15,
        paddingVertical: 30,
        borderRadius: 75,
    },
    btn_main_personal: {
        width: width * 0.4,
        height: width * 0.4,
        paddingVertical: 30,
        borderRadius: width * 0.5,
        marginTop: height * -0.125,
    },
    btn_main_personal_image: {
        width: width * 0.4,
        height: width * 0.4,
        paddingVertical: 30,
        borderRadius: 75
    },
    btn_main_footer: {
        width: width * 0.13,
        height: width * 0.16,
        paddingVertical: 30,
        borderRadius: 75,
        marginTop: height * -0.05,
        //backgroundColor:'#00184e',
        //flex:1,
        // flexGrow: 3,
    },
    btn_footer: {
        width: width * 0.05,
        height: width * 0.05,
        // paddingVertical: 30,
        // marginTop: height*0.02,
        //backgroundColor:'#00184e',
        //flex:1,
        // flexGrow: 3,
    },

    footer_frame: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.04,
        width: width,
        marginTop: height * -0.08,
        // flexWrap:'wrap',
        // backgroundColor:'#00184e',

    },
    footer_frame_bk: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.04,
        width: width,
        marginTop: height * 0.08,
        // flexWrap:'wrap',
        backgroundColor: '#00184e',

    },

    footer: {
        //backgroundColor:'#00184e',
        width: width * 0.33,
        height: height * 0.1,
        alignItems: 'center',
        marginTop: height * 0.05,
    }

});
