import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import images from '../../res/img';

const ItemLH = props => {
    return (
        <View
            style={{
                borderRadius: 0,
                padding: 10,
                marginTop: 10,
                backgroundColor: '#ffffff',
            }}>
            <Text>Ca 2</Text>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                <Image
                    source={images.ic_monhoc}
                    style={{ width: 25, height: 30, marginRight: 10 }}
                    resizeMode="center"
                />
                <Text style={{ alignItems: 'center' }}>
                    Môn học: {props.TENMONHOC}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                <Image
                    source={images.ic_coso}
                    style={{ width: 25, height: 30, marginRight: 10 }}
                    resizeMode="center"
                />
                <Text style={{ alignItems: 'center' }}>Cở sở: {props.TENCS} {props.PHONGHOC}</Text>
            </View>
        </View>
    )
}
export default ItemLH;