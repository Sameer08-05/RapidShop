import React from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import fonts, { heightPixel } from '../utils/fonts';
import { getAccessbility, toSentenceCase } from '../utils/Helper';
import AppStyles from '../styles/AppStyles';
import constants from '../utils/constants';

export const PrimaryButtonBig = props => {

    const colors = AppStyles.colorSet['light'];

    const appStyles = AppStyles.getAllStyles();
    const styles = getStyles(colors);
    const {
        disabled,
        onPress,
        iconStyle,
        iconSource,
        title,
        loading,
        secondary = false,
        color,
        style,
        textStyle,
        svgIcon
    } = props;

    const accessbility = getAccessbility(
        title,
        constants.ACESSBILITY_LABEL.BUTTON,
    );

    return (
        // <View style={styles.mainContainer}>

        <Ripple
            disabled={disabled || loading}
            onPress={onPress}
            style={[
                secondary ? styles.containerGreen : styles.container,
                color && { backgroundColor: color },
                style,
                (disabled || loading) && { backgroundColor: colors.light },
            ]}
            accessibilityLabel={accessbility.label}>
            {loading ? (
                <ActivityIndicator animating={true} color={colors.primaryColor} size="small" />
            ) : (
                <>
                    {iconSource && <Image style={iconStyle} source={iconSource} />}
                    <Text style={[appStyles.text_14_Bold_Black, textStyle]}>{toSentenceCase(title)}</Text>
                </>
            )}
        </Ripple>

        // </View>
    );
};

const getStyles = (colors) => {
    return StyleSheet.create({
        mainContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            flex: 1,
        },

        container: {
            width: '100%',
            height: heightPixel(48),
            alignSelf: 'center',
            backgroundColor: colors.primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
        },
        containerGreen: {
            width: '100%',
            height: 48,
            alignSelf: 'center',
            backgroundColor: colors.green,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
        },

        footerTitle: {
            fontSize: fonts._14,
            color: colors.buttonText,
            fontFamily: "bold"
        },
    });
};
