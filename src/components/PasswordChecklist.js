// PasswordChecklist.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose other icons from the library
import { colors } from '../utils/Helper';
import AppStyles from '../styles/AppStyles';
import { useTranslation } from 'react-i18next';

const PasswordChecklist = ({ isValid, minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar }) => {
    const renderIcon = (condition) => {
        return condition ? <Icon name="check" size={12} color="green" /> : <Icon name="times" size={15} color={colors.RED} />;
    };

    const styles = AppStyles.getAllStyles();
    const { t } = useTranslation();


    if (isValid) {
        return (
            <></>
        )
    }

    const translateKeys = {
        Contain_at_least_one_uppercase_letter: t('Contain at least one uppercase letter'),
        Contain_at_least_one_lowercase_letter: t('Contain at least one lowercase letter'),
        Contain_at_least_one_number: t('Contain at least one number'),
        Contain_at_least_one_special_character: t('Contain at least one special character'),
        Be_at_least_8_characters_long: t('Be at least 8 characters long'),
        Password_must: t('Password must:'),
    }

    const getText = (text) => {
        return (
            <Text style={styles.textS}>
                {text}
            </Text>
        )
    }

    return (
        <View style={{ paddingLeft: 5 }}>
            {getText(translateKeys.Password_must)}

            <View>
                <Text style={styles.textS}>{renderIcon(hasUpperCase)} {translateKeys.Contain_at_least_one_uppercase_letter}</Text>
            </View>
            <View>
                <Text style={styles.textS}>{renderIcon(hasLowerCase)}{translateKeys.Contain_at_least_one_lowercase_letter}</Text>
            </View>
            <View>
                <Text style={styles.textS}>{renderIcon(hasNumber)} {translateKeys.Contain_at_least_one_number}</Text>
            </View>
            <View>
                <Text style={styles.textS}>{renderIcon(hasSpecialChar)} {translateKeys.Contain_at_least_one_special_character}</Text>
            </View>
            <View>
                <Text style={styles.textS}>{renderIcon(minLength)} {translateKeys.Be_at_least_8_characters_long}</Text>
            </View>
        </View>
    );
};

export default PasswordChecklist;
