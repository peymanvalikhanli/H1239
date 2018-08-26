import React, { PureComponent } from 'react';
import { Image, View, Dimensions, StyleSheet, } from 'react-native';
import { Container, Header, Content, Body, Label, Form, Button, Input, Item, Text, Right, Icon, Left, Footer, List, ListItem, Picker} from 'native-base';
import Orientation from 'react-native-orientation';

import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

import lang from '../../model/lang/fa.json';




export default class cost_registration extends PureComponent {

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

    btn_send_onclick(){
        this.props.navigation.replace("home");
    }

    render() {
        var { navigate } = this.props.navigation;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD') : '';
 
        return (
            <Container style={{ flex: 1 }}>
                <Header>
                <Left>
                    <Button
                        onPress={()=>{this.props.navigation.replace("profile");}}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                        </Left> 
                        <Body>
                        <Text
                        style= {{textAlign:'center',color:'#ffffff',fontFamily: "DinarTwoMedium_MRT",}}
                        >
                            {lang.cost_registration}
                        </Text>
                    </Body>
                    <Right>
                        <Button
                        onPress={()=>{this.props.navigation.replace("home");}}
                        >
                            <Icon name="menu" />
                        </Button>
                    </Right>
                    
                </Header> 
                <Content 
                    style={{paddingLeft: width*0.01,paddingRight: width*0.02,fontFamily: "DinarTwoMedium_MRT",}}
                >
                     
                    <Form
                    style={{justifyContent:'center',textAlign:'center',}}
                    > 

                        <Text
                        style={styles.text}
                        > 
                                {lang.name}: peyman
                        </Text>
                        <Text
                        style={styles.text}
                        > 
                                {lang.Lname}: valikhanli 
                        </Text> 
                        <Text
                        style={styles.text}                        
                        > 
                                {lang.national_code_}: 0015337006
                        </Text>
                       <List> 
                           <ListItem itemDivider>
                           </ListItem>
                        </List>
                        
                        <Text
                        style={styles.text}                        
                        > 
                        {lang.cost_date}: {startDate}
                        </Text>
                        
                        <Item> 
                            <JalaliCalendarPicker
                            onDateChange={this.onDateChange}
                            textStyle={{fontFamily: "DinarTwoMedium_MRT",}}
                            />
                            
                        </Item>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={[{ width: undefined, },styles.form_input]}
                                placeholder={lang.cost_type}
                                placeholderStyle={[{ color: "#bfc6ea" },styles.form_input]}
                                placeholderIconColor="#007aff"
                                // selectedValue={this.state.selected2}
                                // onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label={lang.cost_type} value="key0" style={styles.form_input}/>
                                <Picker.Item label={lang.cost_type} value="key0" style={styles.form_input}/>
                                <Picker.Item label={lang.cost_type} value="key0" style={styles.form_input}/>
                                <Picker.Item label={lang.cost_type} value="key0" style={styles.form_input}/>
                            </Picker>
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.form_input} >{lang.cost_price}</Label>
                            <Input
                            style={styles.form_input}
                                // placeholder={lang.cost_price}
                             />
                        </Item>
                                    
                        <Item 
                         style= {{textAlign:'center',justifyContent:'center',marginTop: height*0.05,}}
                        >
                            <Label
                            style={styles.form_input}
                            >{lang.cost_price}</Label>    
                        </Item>
                        <Item> 
                            <Button 
                            style={{width:width*0.9,marginTop:height*0.02,marginBottom: height*0.025, marginLeft: width*0.025, marginRight: width*0.05 ,textAlign:'center',justifyContent:'center',fontFamily: "DinarTwoMedium_MRT",}}
                            onPress={()=>{this.props.navigation.replace("upload_file");}}
                            >

                                <Text>{lang.next}</Text>
                            </Button>
                        </Item>
                                    
                    </Form>
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
        marginTop: height * 0.008,
        fontSize: width * 0.03,
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
        //textAlign: 'center',
        //fontSize: width * 0.03,
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
