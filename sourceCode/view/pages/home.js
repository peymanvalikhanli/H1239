import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left } from 'native-base';
import Orientation from 'react-native-orientation';

import lang from '../../model/lang/fa.json';




export default class home extends PureComponent {

    constructor() {
        super();
        Orientation.lockToPortrait();
    }

    btn_send_onclick(){
        this.props.navigation.replace("profile");
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
                                <Image
                                    style={styles.header_btn}
                                    resizeMode='stretch'
                                    source={require('../image/btn_z4.png')} 
                                    />
                                <Image
                                    style={styles.header_btn}
                                    resizeMode='stretch'
                                    source={require('../image/btn_z3.png')} 
                                    />
                                <Image
                                    style={styles.header_btn}
                                    resizeMode='stretch'
                                    source={require('../image/btn_z2.png')} 
                                    />
                                <Image
                                    style={styles.header_btn1}
                                    resizeMode='stretch'
                                    source={require('../image/btn1.png')} 
                                    />
                            </View>
                            <View
                                style={styles.clo_view}
                            >

                                <View
                                    style={[styles.row_view,{marginTop:height*0.05}]}
                                >
                                     <Button Transparent
                                        onPress={()=>{this.btn_send_onclick()}}
                                        style={styles.btn_personal}                                       
                                       >
                                        <Image
                                        style={styles.btn_personal}
                                        resizeMode='stretch'
                                        source={require('../image/p.png')} 
                                        onPress={()=>{this.btn_send_onclick()}}                                    
                                        />
                                    </Button>
                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.45,marginTop:(height*0.03)*-1}]}
                                >

                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p11.png')} 
                                    />
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p12.png')} 
                                    />
                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.68,marginTop:height*0.025}]}
                                >
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p21.png')} 
                                    />
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p22.png')} 
                                    />
                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.75,marginTop:height*0.05}]}
                                >
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p31.png')} 
                                    />
                                    <Image
                                    style={styles.btn_main_personal}
                                    resizeMode='stretch'
                                    source={require('../image/center_image.png')} 
                                    />
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p32.png')} 
                                    />
                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.68,marginTop:height*0.05 }]}
                                >
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p41.png')} 
                                    />
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p42.png')} 
                                    />

                                </View>
                                <View
                                    style={[styles.row_view, { width: width * 0.45,marginTop:height*0.025}]}
                                >
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p51.png')} 
                                    />
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p52.png')} 
                                    />

                                </View>
                                <View
                                    style={[styles.row_view,{marginTop:(height*0.03)*-1}]}
                                >
                                    <Image
                                    style={styles.btn_personal}
                                    resizeMode='stretch'
                                    source={require('../image/p6.png')} 
                                    />

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
                                <Image
                                        style={styles.btn_footer}
                                        resizeMode='stretch'
                                        source={require('../image/btn_x2.png')} 
                                        />
                                </View>
                                
                                <View
                                style={{flex:0,justifyContent: 'center',}}
                                >

                                    <Image
                                        style={styles.btn_main_footer}
                                        resizeMode='stretch'
                                        source={require('../image/btn2.png')} 
                                        />
                                </View>
                                <View
                                style={styles.footer}
                                >
                                   <Image
                                        style={styles.btn_footer}
                                        resizeMode='stretch'
                                        source={require('../image/btn_x1.png')} 
                                        />
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

    header_btn:{
        
        width:width*0.2,
        height:width*0.15,
        paddingVertical: 30,
        resizeMode: 'stretch',
        marginTop: (height*0.1)*-1,
       // borderRadius: 75
    },
    header_btn1:{
        
        width:width*0.15,
        height:width*0.15,
        paddingVertical: 30,
        resizeMode: 'stretch',
        marginTop: (height*0.1)*-1,
       // borderRadius: 75
    },

    divider_view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        justifyContent: 'center',
        height:height*0.729,
    },

    top_frame: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        height:height*0.1,
    },
    clo_view: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       // height: height*0.9,
        //backgroundColor:"#ffff00",
        marginTop:(height*0.05)*-1,
    },

    row_view: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 2 ,

    },

    btn_personal:{
        width:width*0.15,
        height:width*0.15,
        paddingVertical: 30,
        borderRadius: 75
    },
    btn_main_personal:{
        width:width*0.4,
        height:width*0.4,
        paddingVertical: 30,
        borderRadius: 75
    },
    btn_main_footer:{
        width:width*0.13,
        height:width*0.16,
        paddingVertical: 30,
        borderRadius: 75,
        marginTop: height*-0.05,
        //backgroundColor:'#00184e',
        //flex:1,
       // flexGrow: 3,
    },
    btn_footer:{
        width:width*0.05,
        height:width*0.05,
       // paddingVertical: 30,
       // marginTop: height*0.02,
        //backgroundColor:'#00184e',
        //flex:1,
       // flexGrow: 3,
    },

    footer_frame:{
        flex:1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.04,
        width:width,
        marginTop: height*-0.08,
       // flexWrap:'wrap',
       // backgroundColor:'#00184e',
       
    },
    footer_frame_bk:{
        flex:1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.04,
        width:width,
        marginTop: height*0.08,
       // flexWrap:'wrap',
        backgroundColor:'#00184e',
       
    },

    footer:{
        //backgroundColor:'#00184e',
        width:width*0.33,
        height:height*0.1,
        alignItems: 'center',
        marginTop: height*0.05,
    }

});
