import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authLogin } from '../redux/auth/authOperations';

import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

const initialState = {
    email: null,
    password: null,
}

export default function LoginScreen({ navigation }) {
    const [user, setUser] = useState(initialState)
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const [isOnFocusInput, setIsOnFocusInput] = useState('')

    const dispatch = useDispatch();

    const onFocusInput = (inputValue) => {
        setIsShowKeyboard(true)
        setIsOnFocusInput(inputValue)
        console.log(inputValue)
    }

    const onBlurInput = () => {
        setIsOnFocusInput('')
        
    }

    const onCloseKeyboard = () => {
        setIsShowKeyboard(false)
        Keyboard.dismiss()
        // setUser(initialState)
        
    }  
    
    const onShowPassword = () => {
        setHidePassword(hidePassword => !hidePassword)
    }

    const onSubmitLogin = () => {
        dispatch(authLogin(user))
        navigation.navigate('Home')
    }

    return (
        <TouchableWithoutFeedback onPress={onCloseKeyboard}>
            <View style={styles.container}>
                    <ImageBackground
                        style={styles.background}
                        source={require('../assets/images/bg.jpg')}></ImageBackground>
                    <KeyboardAvoidingView
                        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        // keyboardVerticalOffset={Platform.OS === 'android' ? -20 : -20}
                        onSubmitEditing={onCloseKeyboard}
                        style={Platform.OS === 'ios' ? { ...styles.loginContainer, bottom: isShowKeyboard ? 80 : 0 } : { ...styles.loginContainer, bottom: isShowKeyboard ? 0 : 0 }} >
                        <Text style={styles.title} >Увійти</Text> 
                        <View style={styles.form}>
                            <View style={styles.inputBox}>
                            <TextInput
                                style={isOnFocusInput === 'email' ? styles.inputActive : styles.input}
                                placeholder='Адреса електронної пошти'
                                onFocus={() => onFocusInput('email')}
                                onBlur={onBlurInput} 
                                value={user.email}
                                onChangeText={(value)=> setUser((prev) => ({...prev, email: value}))}
                                />
                            <TextInput
                                style={isOnFocusInput === 'password' ? styles.inputActive : styles.input}
                                placeholder='Пароль'
                                onFocus={() => onFocusInput('password')}
                                secureTextEntry={hidePassword} 
                                onBlur={onBlurInput}
                                value={user.password}
                                onChangeText={(value) => setUser((prev) => ({...prev, password: value}))}
                                />
                                <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={onShowPassword}
                                style={styles.showPasswordButton}>
                                <Text
                                    style={styles.showPasswordText}>{hidePassword ? 'Показати' : 'Приховати'}

                                </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={onSubmitLogin}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Увійти</Text>
                            </TouchableOpacity>
                        </View>
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={()=>navigation.navigate('Registration')}>
                    <Text style={styles.link}>Немає акаунту? Зареєструватися</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        resizeMode: 'cover',

    },
    loginContainer: {
        position: 'absolute',
        height: '60%',
        width: '100%',
        backgroundColor: '#FFFFFF', 
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 32,
        paddingBottom: 80,
        alignItems: 'center',
        paddingHorizontal: 16,

    },
    title: {
        fontSize: 30,
        marginBottom: 33,
        color: '#212121',
    },
    form: {
   
    },
    inputBox: {
        gap: 16,
        marginBottom: 43,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        height: 50,
        width: 343,
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#BDBDBD',
        backgroundColor: '#F6F6F6',
    },
    inputActive: {
        borderWidth: 1,
        borderColor: '#FF6C00',
        height: 50,
        width: 343,
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#212121',
        backgroundColor: '#F6F6F6',
    },    
    showPasswordButton: {
        position: 'absolute',
        right: 16,
        bottom: 32,
    },
    showPasswordText: {
        fontSize: 16,
        color: '#1B4371',
    },
    button: {
        borderRadius: 100,
        backgroundColor: '#FF6C00',
        height: 50,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 16,

    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    link: {
        top: 700,
        marginHorizontal: 60,
        fontSize: 16,
        color: '#1B4371',
    }
})