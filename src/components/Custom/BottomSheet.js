import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, TouchableWithoutFeedback, Animated, Dimensions, FlatList } from 'react-native'

const BottomSheet = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const time = 300
    const height = Dimensions.get('window').height * 0.4
    const animation = new Animated.Value(height)

    useImperativeHandle(ref, () => ({
        open: () => {
            onShow()
        },
        close: () => {
            onHide()
        }

    }));
    useEffect(() => {
        show && slideUp();
    }, [show])
    const slideUp = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: time,
            useNativeDriver: true
        }).start()
    }
    const slideDown = () => {
        Animated.timing(animation, {
            toValue: height,
            duration: time,
            useNativeDriver: true
        }).start()
    }
    const onShow = () => {
        setShow(true)
    }
    const onHide = () => {
        slideDown()

        setTimeout(() => {
            setShow(false)
        }, time)
    }
    const renderItem = ({ item, index }) => (
        <View></View>
    )
    return (
        <View>
            <TouchableOpacity style={styles.touch} onPress={() => onShow()}>
                <Text style={styles.text}>{props.placeholder}</Text>
            </TouchableOpacity>
            <Modal visible={show} transparent statusBarTranslucent animationType='fade'>
                <TouchableWithoutFeedback onPress={onHide}>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback>
                            <Animated.View style={[styles.modal, { transform: [{ translateY: animation }] }]}>
                                <View style={styles.title}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props.placeholder}</Text>
                                </View>
                                <FlatList data={props.data} keyExtractor={(item, index) => String(index)} renderItem={renderItem} />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
})

export default BottomSheet
BottomSheet.defaultProps = {
    placeholder: 'Vui lòng chọn'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000040',
        justifyContent: 'flex-end',

    },
    touch: {
        height: 56,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 16,
        marginTop: 16,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 16
    },
    modal: {
        backgroundColor: '#ffffff',
        height: Dimensions.get('window').height * 0.4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },

})
