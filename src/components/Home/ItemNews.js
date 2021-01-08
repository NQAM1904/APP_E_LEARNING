import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import HTML from "react-native-render-html";
const contentWidth = Dimensions.get('window').width;
const formatSubstring = (value) => {
    if (value != null) {
        if (value.length > 200) {
            return value.substring(0, 200) + '...';
        } else {
            return value;
        }
    } else return 'Trống';
};
const formatSubstringTitle = value => {
    if (value != null) {
        if (value.length > 25) {
            return value.substring(0, 25) + '...';
        } else {
            return value;
        }
    } else return 'Trống';
}
const ItemNews = props => {
    return (
        <TouchableOpacity
            style={{
                marginTop: 5,
                width: '100%',
                shadowColor: '#000',
                // elevation: 4,
                padding: 6,
                borderRadius: 10
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 15,
                }}>
                <Text style={{ fontSize: 17 }}>{formatSubstringTitle(props.TENEVNT)}</Text>
                <Text style={{ fontSize: 17, color: 'red' }}>Đọc tiếp</Text>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    height: 200,
                    alignItems: 'center',
                    flexGrow: 1,
                }}>
                <Image
                    source={require('../../res/img/sukien.png')}
                    style={{ resizeMode: 'contain', height: 150, width: 200 }}
                />
                <HTML source={{ html: formatSubstring(props.MOTA) }} contentWidth={contentWidth} containerStyle={{ width: 25, height: 30, flex: 1, alignItems: 'center', justifyContent: 'center' }} />

            </ScrollView>
            <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginRight: 20 }}>
                <Text style={{ fontSize: 12, fontStyle: 'italic' }}>{props.THOIGIANEV}</Text>
            </View>
        </TouchableOpacity>

    )
}
export default ItemNews;