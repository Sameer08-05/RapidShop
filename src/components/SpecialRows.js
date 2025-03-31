import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPixel, widthPixel } from '../utils/fonts'
import { _getVerticalPadding } from '../utils/Helper'

const IconTextBox = ({ imageUri, text }) => (
    <View style={styles?.iconTextBox}>
        <View style={styles.iconContainer}>
            <Image style={styles.icon} source={{ uri: imageUri }} resizeMode='contain' />
        </View>
        <Text style={styles.text}>{text}</Text>
    </View>
);

const SpecialRows = () => {
    return (
        <View>
            <View style={styles.row}>
                <IconTextBox
                    imageUri="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1487_1679466558536.png"
                    text="Vegetables & Fruits"
                />
                <IconTextBox
                    imageUri="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949253289.png"
                    text="Dairy & Breakfast"
                />
            </View>

            {_getVerticalPadding(10)}

            <View style={styles.row}>
                <IconTextBox
                    imageUri="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/15_1676610279582.png"
                    text="Frozen Food"
                />
                <IconTextBox
                    imageUri="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/332_1680269009421.png"
                    text="Cold Drinks"
                />
                <IconTextBox
                    imageUri="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/1557_1670927467171.png"
                    text="Masala"
                />
            </View>
        </View>
    )
}

export default SpecialRows;

const styles = StyleSheet.create({
    row: {
        height: heightPixel(105),
        flexDirection: "row",
        gap: widthPixel(6),
    },
    iconTextBox: {
        flex: 1,
    },
    iconContainer: {
        flex: 1,
        backgroundColor: "#E4F2F2",
        borderRadius: widthPixel(8),
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: "90%",
        minHeight: heightPixel(68),
    },
    text: {
        color: "black",
        alignSelf: "center", fontSize: widthPixel(12),
        fontWeight: '500',
        textAlign: "center"
    },
});
