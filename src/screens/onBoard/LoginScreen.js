import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Ripple from 'react-native-material-ripple'
import Snackbar from 'react-native-snackbar'
import Svg, { Path } from 'react-native-svg'
import CommonInput from '../../components/CommonInput'
import { PrimaryButtonBig } from '../../components/PrimaryBigBtn'
import AppStyles from '../../styles/AppStyles'
import { _getVerticalPadding, EMAIL_REGEX, PASSWORD_REGX } from '../../utils/Helper'
import { heightPixel, widthPixel } from '../../utils/fonts'
import auth from '@react-native-firebase/auth';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const navigation = useNavigation()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const showToast = (code) => {

    let errorMessage = "Someting went wrong"

    switch (code) {
      case 'auth/invalid-credential':
        errorMessage = 'The supplied credentials are incorrect or malformed.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No user found with this email.';

        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      default:
        errorMessage = 'Something went wrong. Please try again later.';
    }

    Snackbar.show({
      text: errorMessage,
      duration: Snackbar.LENGTH_SHORT,
    });

  }


  const style = AppStyles.getAllStyles()

  const signUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      if (userCredential.additionalUserInfo.isNewUser) {
        console.log("userCredential.additionalUserInfo.isNewUse");
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setModalVisible(false)
        navigation.navigate("MainStack")
      }
      console.log('User created:', userCredential.additionalUserInfo.isNewUser);
    } catch (error) {
      if (error.code == 'auth/email-already-in-use') {

        Snackbar.show({
          text: "Email already in use.",
          duration: Snackbar.LENGTH_SHORT,
        });

      }
      console.error('Signup error:', error.message);
    }
    finally {
      setModalVisible(false)
    }
  }

  const onSubmit = async (data) => {

    setEmail(data.Email);
    setPassword(data.password);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(data.Email, data.password);
      await AsyncStorage.setItem('userCredential', JSON.stringify(userCredential));
      navigation.navigate("MainStack")
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setModalVisible(true);
        return;
      }
      showToast(error.code);
    }
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }} >

          <View style={{ paddingHorizontal: widthPixel(25) }} >

            <Text style={[style.text_23_Bold_black, { marginTop: heightPixel(72) }]}>
              Welcome back to RapidShop
            </Text>
            <Text style={[style.text_14_Regular_Black, { marginTop: heightPixel(20) }]}>
              Please enter credentials to log in.
            </Text>

            {_getVerticalPadding(50)}

            <CommonInput
              name={"Email"}
              title={"Email"}
              placeholder={"Enter your email"}
              control={control}
              keyboardType={'default'}
              inputProps={{
                autoCapitalize: "none",
                autoComplete: "email",
                textContentType: "emailAddress"
              }}
              errors={errors}
              rules={{
                required: true,
                pattern: EMAIL_REGEX
              }}
            />

            {_getVerticalPadding(22)}

            <CommonInput
              name={"password"}
              title={"Password"}
              placeholder={"Enter your password"}
              placeholderColor={"#000"}
              control={control}
              keyboardType={'default'}
              errors={errors}
              rules={{
                required: true,
                pattern: PASSWORD_REGX
              }}
            />

            {_getVerticalPadding(32)}

            <PrimaryButtonBig onPress={handleSubmit(onSubmit)} title={"Sign in"} textStyle={{ color: "white" }} />

          </View>

          {_getVerticalPadding(8)}

          <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                <Text style={{ marginBottom: 20, color: 'black' }}>
                  This email is not registered with us. Do you want to sign up with this email address?
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={{ color: 'red' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={signUp}>
                    <Text style={{ color: 'blue' }}>Yes, Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default LoginScreen

const styles = StyleSheet.create({})