import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useController } from 'react-hook-form';
import {
    PASSWORD_REGX,
    _getValidateText,
    _getVerticalPadding,
    getAccessbility,
} from '../utils/Helper';
import fonts, { heightPixel, widthPixel } from '../utils/fonts';
import PasswordChecklist from './PasswordChecklist';
import Constants from '../utils/constants';
import AppStyles from '../styles/AppStyles';

const CommonInput = props => {
    const {
        control,
        name,
        rules,
        placeholder,
        keyboardType,
        title,
        secure,
        errors,
        starMark = false,
        errorMessage = null,
        inputProps,
        checklist,
        capital,
        style, isTextArea = false,
        onChange = () => { },
    } = props;

    const { field } = useController({
        control: control,
        name: name,
        rules: rules.pattern ? rules : { ...rules, pattern: /^[\w\s\d!@#$%^&*()-=_+{}\[\]:;"'<>,.?\\/|]*$/ },
    });

    const [password, setInputVal] = useState('');
    const [focus, setOnFocus] = useState(null);

    const colorSet = AppStyles.colorSet['light']
    const styles = getStyles(colorSet);

    const appstyles = AppStyles.getAllStyles("light");

    const handleOnChange = val => {
        field.onChange(val);
        setInputVal(val);
    };

    const accessbility = getAccessbility(
        title,
        Constants.ACESSBILITY_LABEL.TEXTINPUT,
    );

    const validatePassword = () => {


        const validPass = PASSWORD_REGX.test(password);

        return {
            isValid: validPass,
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
    };

    const validationResults = validatePassword();

    return (
        <View style={[style]}>
            <Text style={[appstyles.text_14_Regular_Black]}>
                {title ? title : placeholder}
                {rules['required'] === true && starMark && '*'}
            </Text>

            {_getVerticalPadding(16)}

            <View View style={[isTextArea ? appstyles.inputBoxTextArea : appstyles.inputBox]} >
                <TextInput
                    accessibilityLabel={accessbility.label}
                    style={[styles.textInput]}
                    onChangeText={text => {
                        handleOnChange(text);
                        onChange(text);
                    }}
                    placeholder={placeholder ?? title}
                    onFocus={setOnFocus}
                    onBlur={() => setOnFocus(false)}
                    placeholderTextColor={colorSet.grey9}
                    value={field.value}
                    color={colorSet.black}
                    keyboardType={keyboardType}
                    secureTextEntry={secure ? true : false}
                    {...inputProps}
                    autoCapitalize={capital ? 'words' : 'none'}
                    multiline={isTextArea}
                    numberOfLines={isTextArea ? 4 : 1}
                />
            </View>

            {
                errors[name]?.type === 'required' &&
                _getValidateText("This field is required")
            }

            {
                errors[name]?.type === 'pattern' &&
                _getValidateText(errorMessage ? errorMessage : "Enter valid" + " " + title)
            }

            {checklist && focus && <PasswordChecklist {...validationResults} />}
        </View >
    );
};

const getStyles = (colorSet) => {
    return StyleSheet.create({
        text: {
            fontWeight: '400',
            fontSize: fonts._12,
            color: colorSet.mainSubtextColor,
            paddingLeft: 5,
        },
        textInput: {
            width: '100%',
            fontSize: fonts._14,
            // height: 49,
            color: colorSet.mainTextColor2,
            textAlignVertical: 'top',
            width: '100%',
            backgroundColor: "#FAFAFA",
            borderRadius: widthPixel(10),
            paddingHorizontal: widthPixel(10)
        },
        ripple: {
            flex: 0.2,
            alignItems: 'center',
        },
    });
};

export default CommonInput;
