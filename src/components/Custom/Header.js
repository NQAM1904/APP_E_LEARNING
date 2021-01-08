import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Header = (props) => {
    return (
        <View
            style={{
                backgroundColor: '#ffffff',
                paddingTop: 20,
                paddingBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5
            }}>
            <Text
                numberOfLines={1}
                style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#1A232C',
                    fflex: 1,
                    width: '70%'
                }}>
                {props.title}
            </Text>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    left: 20,
                    width: 30,
                    height: 20,
                    justifyContent: 'center',
                }}
                onPress={() => {
                    props.onPressBackButton();
                }}>

                <Icon name="chevron-left" size={20} color='grey' />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
