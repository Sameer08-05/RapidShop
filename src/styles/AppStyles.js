import { Platform, Dimensions, useColorScheme, StyleSheet } from 'react-native';
import fonts, { heightPixel, widthPixel } from '../utils/fonts';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;


const lightColorSet = {
    mainThemeBackgroundColor: '#ffffff',
    mainThemeForegroundColor: '#333333',
    mainTextColor: '#1F2024',
    mainSubtextColor: '#797C7B',
    hairlineColor: '#cccccc',
    subHairlineColor: '#f2f2f3',
    grey0: '#eaeaea',
    grey3: '#e6e6f2',
    grey6: '#d6d6d6',
    grey9: '#939393',
    tint: '#3068CC',
    blue: "#0AA7D9",
    ghostWhite: '#f2f2f3',
    light: '#fff',
    facebook: '#4267b2',
    grey: 'grey',
    whiteSmoke: '#f5f5f5',
    black: '#000',
    // primaryColor: '#cd9575',
    primaryColor: '#3669C9',
    orderItemBG: '#f8f9fe',
    buttonText: '#fff',
    green: '#23A939',
    greenDark: '#e7f4e8',


    red: '#F04A4C',
    red2: '#d12122',
    white: "#ffffff"

};

const darkColorSet = {
    mainThemeBackgroundColor: '#000000',
    mainThemeForegroundColor: '#cccccc',
    mainTextColor: '#aaaaaa',
    mainSubtextColor: '#666666',
    hairlineColor: '#333333',
    subHairlineColor: '#0d0d0c',
    grey0: '#eaeaea',
    grey3: '#e6e6f2',
    grey6: '#d6d6d6',
    grey9: '#939393',
    tint: '#3068CC',
    ghostWhite: '#f2f2f3',
    light: '#fff',
    facebook: '#4267b2',
    grey: 'grey',
    whiteSmoke: '#f5f5f5',
    black: '#000',
    primaryColor: '#ECC94C',
    orderItemBG: '#F8F9FE',

    buttonText: '#fff',
    red2: '#d12122'
};


const colorSet = {
    light: lightColorSet,
    dark: lightColorSet,
    'no-preference': lightColorSet,
};


const getAllStyles = () => {
    const scheme = useColorScheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorSet[scheme].mainThemeBackgroundColor,
            paddingHorizontal: widthPixel(16),
        },
        containerCenter: {
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: colorSet[scheme].mainThemeBackgroundColor,
            paddingHorizontal: 20,
        },
        containerNoPadding: {
            flex: 1,
            backgroundColor: colorSet[scheme].mainThemeBackgroundColor,
        },
        drawerContainer: {
            flex: 1,
            backgroundColor: colorSet[scheme].mainThemeBackgroundColor,
            borderWidth: 0.5,
            borderColor: colorSet[scheme].primaryColor
        },
        textM: {
            color: colorSet[scheme].mainTextColor,
            fontSize: fonts._12
        },
        text_12_Regular_Black: {
            color: colorSet[scheme].red,
            fontSize: fonts._12,
            fontWeight: '500'
        },
        text_12_Regular_Grey: {
            color: colorSet[scheme].mainSubtextColor,
            fontSize: fonts._12,
            fontWeight: '500'
        },
        text_12_Regular_Black: {
            color: colorSet[scheme].black,
            fontSize: fonts._12,
            fontWeight: '500'
        },
        text_12_Medium_Black: {
            color: colorSet[scheme].black,
            fontSize: fonts._12,
            fontWeight: '500'
        },
        text_12_Medium_Grey: {
            color: colorSet[scheme].mainSubtextColor,
            fontSize: fonts._12,
            fontWeight: '500'
        },
        text_14_Bold_Black: {
            color: colorSet[scheme].mainTextColor,
            fontSize: fonts._14,
            fontWeight: '700'
        },
        text_10_Regular_Grey: {
            color: colorSet[scheme].mainSubtextColor,
            fontSize: fonts._10,
            fontWeight: '500'
        },
        text_14_Medium_Black: {
            color: colorSet[scheme].mainSubtextColor,
            fontSize: fonts._14,
            fontWeight: '600'
        },
        text_14_Regular_Black: {
            color: colorSet[scheme].black,
            fontSize: fonts._14,
            fontWeight: '400'
        },
        text_14_Medium_White: {
            color: colorSet[scheme].white,
            fontSize: fonts._14,
            fontWeight: '600'
        },
        text_14_Medium_black: {
            color: colorSet[scheme].black,
            fontSize: fonts._14,
            fontWeight: '600'
        },
        text_14_Medium_PrimaryColor: {
            color: colorSet[scheme].primaryColor,
            fontSize: fonts._14,
            fontWeight: '600'
        },
        text_14_Regular_PrimaryColor: {
            color: colorSet[scheme].primaryColor,
            fontSize: fonts._14,
            fontWeight: '400'
        },
        text_16_Bold_White: {
            color: colorSet[scheme].white,
            fontSize: fonts._16,
            fontWeight: '700'
        },
        text_16_Medium_Black: {
            color: colorSet[scheme].black,
            fontSize: fonts._16,
            fontWeight: '600'
        },

        text_16_Medium_White: {
            color: colorSet[scheme].white,
            fontSize: fonts._16,
            fontWeight: '600'
        },
        text_16_Medium_Grey: {
            color: colorSet[scheme].mainSubtextColor,
            fontSize: fonts._16,
            fontWeight: '600'
        },
        text_16_Bold_White: {
            color: colorSet[scheme].white,
            fontSize: fonts._16,
            fontWeight: '700'
        },
        text_16_Bold_black: {
            color: colorSet[scheme].black,
            fontSize: fonts._16,
            fontWeight: '700'
        },
        text_16_Regular_White: {
            color: colorSet[scheme].white,
            fontSize: fonts._16,
            fontWeight: '500'
        },
        text_18_Regular_White: {
            color: colorSet[scheme].white,
            fontSize: fonts._18,
            fontWeight: '500'
        },
        text_20_Medium_White: {
            color: colorSet[scheme].white,
            fontSize: fonts._20,
            fontWeight: '600'
        },
        text_20_Medium_Black: {
            color: colorSet[scheme].black,
            fontSize: fonts._20,
            fontWeight: '600'
        },
        text_23_Bold_black: {
            color: colorSet[scheme].black,
            fontSize: fonts._23,
            fontWeight: '500'
        },
        text_25_Bold_white: {
            color: colorSet[scheme].white,
            fontSize: fonts._25,
            fontWeight: '700'
        },
        text_40_Medium_Black: {
            color: colorSet[scheme].black,
            fontSize: fonts._40,
            fontWeight: '600'
        },
        text_40_Medium_White: {
            color: colorSet[scheme].white,
            fontSize: fonts._40,
            fontWeight: '600'
        },


    })
}

export default {
    colorSet,
    getAllStyles
}