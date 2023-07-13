import { useState } from 'react';
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

import { authRegister } from '../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

const initialState = {
    name: '',
    email: '',
    password: '',
}

export default function RegistrationScreen({ navigation }) {
    const [user, setUser] = useState(initialState)

    const dispatch = useDispatch()

    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const [isOnFocusInput, setIsOnFocusInput] = useState('')


    const onFocusInput = (inputValue) => {
        setIsShowKeyboard(true)
        setIsOnFocusInput(inputValue)
    }

    const onCloseKeyboard = () => {
        setIsShowKeyboard(false)
        Keyboard.dismiss()
        setIsOnFocusInput('')
        
        // setUser(initialState)
    }  
    
    const onShowPassword = () => {
        setHidePassword(hidePassword => !hidePassword)
    }

    const onSubmitRegister = () => {
        dispatch(authRegister(user))
        // navigation.navigate('Home')
    }

    return (
        <TouchableWithoutFeedback onPress={onCloseKeyboard}>
            <View style={styles.container}>
                    <ImageBackground
                        style={styles.background}
                        source={require('../assets/images/bg.jpg')}></ImageBackground>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'android' ? -100 : -100}
                        onSubmitEditing={onCloseKeyboard}
                        style={Platform.OS === 'ios' ? { ...styles.registrationContainer, bottom: isShowKeyboard ? 160 : 0 } : { ...styles.registrationContainer, bottom: isShowKeyboard ? 0 : 0 }} >
                    <View style={styles.imageWrap}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.addPhotoButton}>
                                <Text style={styles.addPhotoText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title} >Реєстрація</Text> 
                        <View style={styles.form}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={isOnFocusInput === 'login' ? styles.inputActive : styles.input}
                                    placeholder='Логін'
                                    onFocus={() => onFocusInput('login')}
                                    value={user.name} 
                                    onChangeText={(value) => setUser((prev) => ({...prev, name: value}))}
                                    />
                                <TextInput
                                    style={isOnFocusInput === 'email' ? styles.inputActive : styles.input}
                                    placeholder='Адреса електронної пошти'
                                    onFocus={() => onFocusInput('email')}
                                    value={user.email} 
                                    onChangeText={(value) => setUser((prev) => ({...prev, email: value}))}/>
                                <TextInput
                                    style={isOnFocusInput === 'password' ? styles.inputActive : styles.input}
                                    placeholder='Пароль'
                                    secureTextEntry={hidePassword}
                                    onFocus={() => onFocusInput('password')}
                                    value={user.password} 
                                    onChangeText={(value) => setUser((prev) => ({...prev, password: value}))}/>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={onShowPassword}
                                        style={styles.showPasswordButton}>
                                        <Text style={styles.showPasswordText}>{hidePassword ? 'Показати' : 'Приховати'}</Text>
                                    </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={onSubmitRegister}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Зареєструватися</Text>
                            </TouchableOpacity>
                        </View>
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                    <Text style={styles.link}>Вже є акаунт? Увійти</Text>
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
    registrationContainer: {
        position: 'absolute',
        height: '66%',
        width: '100%',
        backgroundColor: '#FFFFFF', 
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 80,
        alignItems: 'center',
        paddingHorizontal: 16,

    },
    imageWrap: {
        width: 120,
        height: 120,
        borderRadius: 16,
        top: -60,
        backgroundColor: '#F6F6F6',

    },
    addPhotoButton: {
        position: 'absolute',
        width: 25,
        height: 25,
        borderRadius: 50,
        borderColor: '#FF6C00',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        right: -14,
        bottom: 14,
        padding: 0,

    },
    addPhotoText: {
        top: -4,
        right: -4,
        fontSize: 24,
        color: '#FF6C00',
        padding: 0,
        lineHeight: 0,
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
        top: 795,
        marginHorizontal: 108,
        fontSize: 16,
        color: '#1B4371',
    }
})