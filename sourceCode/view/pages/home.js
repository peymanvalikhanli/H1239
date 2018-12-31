import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, AsyncStorage, Alert, BackHandler, PixelRatio,ToastAndroid } from 'react-native';
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
    get_backed_trans_count() {
        axios.post(server_url.GetBackedTransCount, {
            userkey: this.state.Token,
        })
            .then(response => {

                if (response.data.act != undefined || response.data.act != null) {
                     //alert(JSON.stringify(response.data));
                    if (response.data.act != undefined || response.data.act != null || response.data.act != '') {

                        this.setState({ BackedTransCount: response.data.count });
                    
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    get_odat_trans_count() {
        axios.post(server_url.GetOdatTransCount, {
            userkey: this.state.Token,
        })
            .then(response => {

                if (response.data.act != undefined || response.data.act != null) {
                     //alert(JSON.stringify(response.data));
                    if (response.data.act != undefined || response.data.act != null || response.data.act != '') {

                        this.setState({ GetOdatTransCount: response.data.count });
                    
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
            BackedTransCount:0, 
            GetOdatTransCount:0,

        }

        AsyncStorage.getItem('Token', (err, result) => {
            if (result != null) {
                this.setState({ Token: result });
                this.get_personal_data();
                this.get_backed_trans_count();
                this.get_backed_trans_count();
            }
        });

        // AsyncStorage.setItem('const_list', "");

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
                { text: lang.yes, onPress: () => { this.exit_app() } },
            ],
            { cancelable: false }
        )


    }

    get_image_btn(data) {
        // alert(JSON.stringify(data));
        switch (data.RelationTypeId) {
            case 2:
                if(data.GenderTypeId == 2){
                    return require('../image/p41.png');
                }else{
                    return require('../image/p22.png');
                }
                break;
            case 3:
                return require('../image/p51.png');
                break;
            case 4:
                return require('../image/p52.png');
                break;
            case 5:
                return require('../image/p11.png');
                break;
            case 6:
                return require('../image/p12.png');
                break;
            case 7:
                return require('../image/p31.png');
                break;
            case 8:
                return require('../image/p32.png');
                break;

        }
        return require('../image/p.png');
    }

    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    //   }

    //   componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    //   }

    //   handleBackPress = () => {
    //     //this.btn_exit_onclick(); // works best when the goBack is async
    //     exitApp();
    //     return true;
    //   }

    exit_app() {
        AsyncStorage.setItem('Token', null);
        AsyncStorage.setItem('national_code', null);
        AsyncStorage.clear();
        this.props.navigation.replace("introduction");
    }

    render() {
        //  alert(PixelRatio.get());
        var { navigate } = this.props.navigation;
        const mobile_margin_top = 10;
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
                                    onPress={() => { this.props.navigation.replace("report_detail_cost_family", { start_date: null, end_date: null }); }}
                                >
                                    <Image
                                        style={styles.header_btn_image}
                                        resizeMode='stretch'
                                        source={require('../image/btn_z2.png')}
                                    />
                                </Button>
                                <Button transparent
                                    style={styles.header_btn}
                                    onPress={() => { this.props.navigation.replace("introduction_letter_list"); }}
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
                                            source={(this.state.btn_count > 1 ? this.get_image_btn(this.state.LstUserInsurance[1]) : require('../image/p61.png'))}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: PixelRatio.get() == 1 ? width * 0.45 : width * 0.53, marginTop: PixelRatio.get() == 1 ? (height * 0.03) * -1 : (height * 0.015) * -1 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 2 ? this.state.LstUserInsurance[2].UserInsuranceId : undefined, 2) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p11.png')}
                                            source={(this.state.btn_count > 2 ? this.get_image_btn(this.state.LstUserInsurance[2]) : require("../image/p61.png"))}
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
                                            source={(this.state.btn_count > 3 ? this.get_image_btn(this.state.LstUserInsurance[3]) : require('../image/p62.png'))}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: PixelRatio.get() == 1 ? width * 0.68 : width * 0.78, marginTop: PixelRatio.get() == 1 ? height * 0.025 : height * 0.02 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 4 ? this.state.LstUserInsurance[4].UserInsuranceId : undefined, 4) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p21.png')}
                                            source={(this.state.btn_count > 4 ? this.get_image_btn(this.state.LstUserInsurance[4]) : require('../image/p61.png'))}
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
                                            source={(this.state.btn_count > 5 ? this.get_image_btn(this.state.LstUserInsurance[5]) : require('../image/p62.png'))}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: PixelRatio.get() == 1 ? width * 0.75 : width * 0.85, marginTop: PixelRatio.get() == 1 ? height * 0.05 : height * 0.046 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 6 ? this.state.LstUserInsurance[6].UserInsuranceId : undefined, 6) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            source={this.state.btn_count > 6 ? this.get_image_btn(this.state.LstUserInsurance[6]) : require('../image/p61.png')}
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
                                            source={this.state.btn_count > 7 ? this.get_image_btn(this.state.LstUserInsurance[7]) : require('../image/p62.png')}
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: PixelRatio.get() == 1 ? width * 0.68 : width * 0.78, marginTop: PixelRatio.get() == 1 ? height * 0.05 : height * 0.046 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 8 ? this.state.LstUserInsurance[8].UserInsuranceId : undefined, 8) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p41.png')}
                                            source={(this.state.btn_count > 8 ? this.get_image_btn(this.state.LstUserInsurance[8]) : require('../image/p61.png'))}
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
                                            source={(this.state.btn_count > 9 ? this.get_image_btn(this.state.LstUserInsurance[9]) : require('../image/p62.png'))}
                                        />
                                    </Button>

                                </View>
                                <View
                                    style={[styles.row_view, { width: PixelRatio.get() == 1 ? width * 0.45 : width * 0.53, marginTop: PixelRatio.get() == 1 ? height * 0.025 : height * 0.02 }]}
                                >
                                    <Button Transparent
                                        onPress={() => { this.btn_send_onclick(this.state.btn_count > 10 ? this.state.LstUserInsurance[10].UserInsuranceId : undefined, 10) }}
                                        style={styles.btn_personal}
                                    >
                                        <Image
                                            style={styles.btn_personal_image}
                                            resizeMode='stretch'
                                            // source={require('../image/p51.png')}
                                            source={(this.state.btn_count > 10 ? this.get_image_btn(this.state.LstUserInsurance[10]) : require('../image/p61.png'))}
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
                                            source={(this.state.btn_count > 11 ? this.get_image_btn(this.state.LstUserInsurance[11]) : require('../image/p62.png'))}
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
                                            source={this.state.btn_count > 12 ? this.get_image_btn(this.state.LstUserInsurance[12]) : require('../image/p61.png')}
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
                                {/* <View
                                    style={styles.footer}
                                >

                                    <Button transparent
                                        style={[styles.btn_footer, { marginLeft: PixelRatio.get() == 1 ? width * 0.22 : width * 0.1, }]}
                                        onPress={() => { this.props.navigation.replace("cost_list"); }}
                                    >
                                        <Image
                                            style={styles.btn_footer}
                                            resizeMode='stretch'
                                            source={require('../image/btn_x2.png')}
                                        />
                                    </Button>
                                    {/* <Badge
                                        style={{ marginTop: PixelRatio.get() == 1 ? height * 0.2 : height * -0.06, }}
                                    >
                                        <Text>2</Text>
                                    </Badge> 
                                    <Text
                                        style={{color: "#ffffff", marginLeft:PixelRatio.get() == 1 ? width * 0.22 : width * 0.1,fontSize: width * 0.05, marginTop:PixelRatio.get() == 1 ? width * 0.22 : height * -0.02}}
                                    >
                                        {lang.cost}
                                    </Text>
                                </View> */}

                                <View
                                    style={{ flex: 0, justifyContent: 'center', }}
                                >
                                    <Button transparent
                                        style={[styles.btn_main_footer, { marginTop: PixelRatio.get() == 1 ? height * 0.05 : height * -0.07, height: PixelRatio.get() == 1 ? width * 0.22 : width * 0.26 }]}
                                        // onPress={() => { this.props.navigation.replace("return_cost_list"); }}
                                        onPress={() => { this.props.navigation.replace("fractional_documents_list"); }}
                                    >
                                        <Image
                                            style={styles.btn_main_footer}
                                            resizeMode='stretch'
                                            source={require('../image/btn2.png')}
                                        />
                                    </Button>
                                    <Badge
                                        style={{ marginTop: PixelRatio.get() == 1 ? height * 0.2 : height * -0.15, marginLeft: PixelRatio.get() == 1 ? width * 0.05 : width * -0.05, }}
                                    >
                                        {/* <Text style={{ fontFamily: "BNazanin", }}>{this.state.GetOdatTransCount}</Text> */}
                                        <Text style={{ fontFamily: "BNazanin", }}>{this.state.BackedTransCount}</Text>
                                    </Badge>
                                    <Text
                                        style={{color: "#ffffff", marginTop:PixelRatio.get() == 1 ? height * 0.22 : height * 0.025,fontSize: width * 0.03,}}
                                    >
                                        {/* {lang.return} */}
                                           {lang.kasri}
                                    </Text>
                                </View>
                                {/* <View
                                    style={styles.footer}
                                >
                                    <Button transparent
                                        style={[styles.btn_footer, { marginLeft: PixelRatio.get() == 1 ? width * 0.05 : width * 0.2, }]}
                                        onPress={() => { this.props.navigation.replace("fractional_documents_list"); }}
                                    >
                                        <Image
                                            style={styles.btn_footer}
                                            resizeMode='stretch'
                                            source={require('../image/btn_x1.png')}
                                        />
                                    </Button>
                                    <Badge
                                        style={{ marginTop: PixelRatio.get() == 1 ? height * 0.2 : height * -0.06, marginLeft: PixelRatio.get() == 1 ? width * 0.05 : width * 0.1, }}
                                    >
                                        <Text style={{ fontFamily: "BNazanin", }}>{this.state.BackedTransCount}</Text>
                                    </Badge>
                                    <Text
                                        style={{color: "#ffffff", marginLeft:PixelRatio.get() == 1 ? width * 0.22 : width * -0.07,fontSize: width * 0.05,}}
                                    >
                                        {/* {lang.kasri} 
                                    </Text>
                                </View> */}

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
        height: PixelRatio.get() == 1 ? width * 0.15 : width * 0.18,
        paddingVertical: 30,
        resizeMode: 'stretch',
        marginTop: (height * 0.1) * -1,
        // borderRadius: 75
    },
    header_btn_image: {
        width: width * 0.2,
        height: PixelRatio.get() == 1 ? width * 0.15 : width * 0.18,
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
        width: PixelRatio.get() == 1 ? width * 0.15 : width * 0.18,
        height: PixelRatio.get() == 1 ? width * 0.15 : width * 0.18,
        paddingVertical: 30,
        borderRadius: 75,
        marginTop: height * -0.03,
    },
    btn_personal_image: {
        width: PixelRatio.get() == 1 ? width * 0.15 : width * 0.18,
        height: PixelRatio.get() == 1 ? width * 0.15 : width * 0.18,
        paddingVertical: 30,
        borderRadius: 75,
    },
    btn_main_personal: {
        width: width * 0.4,
        height: width * 0.4,
        paddingVertical: 30,
        borderRadius: width * 0.5,
        marginTop: PixelRatio.get() == 1 ? height * -0.125 : height * -0.09,
    },
    btn_main_personal_image: {
        width: width * 0.4,
        height: width * 0.4,
        paddingVertical: 30,
        borderRadius: 75
    },
    btn_main_footer: {
        width: width * 0.13,
        height: PixelRatio.get() == 1 ? width * 0.16 : width * 0.002,
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
