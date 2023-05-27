import React, { useState } from 'react';
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

export default function LoginScreen() {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)


    const onFocusInput = () => {
        setIsShowKeyboard(true)

    }

    const onCloseKeyboard = () => {
        setIsShowKeyboard(false)
        Keyboard.dismiss()
    }  
    
    const onShowPassword = () => {
        setHidePassword(hidePassword => !hidePassword)
    }


    return (
        <TouchableWithoutFeedback onPress={onCloseKeyboard}>
            <View style={styles.container}>
                    <ImageBackground
                        style={styles.background}
                        source={require('../assets/images/bg.jpg')}></ImageBackground>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'android' ? -40 : -40}
                        onSubmitEditing={onCloseKeyboard}
                        style={Platform.OS === 'ios' ? { ...styles.loginContainer, bottom: isShowKeyboard ? 80 : 0 } : { ...styles.loginContainer, bottom: isShowKeyboard ? 0 : 0 }} >
                        <Text style={styles.title} >Увійти</Text> 
                        <View style={styles.form}>
                            <View style={styles.inputBox}>
                                <TextInput style={styles.input} placeholder='Адреса електронної пошти' onFocus={onFocusInput}/>
                                <TextInput style={styles.input} placeholder='Пароль' secureTextEntry={hidePassword} onFocus={onFocusInput} />
                                <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={onShowPassword}
                                    style={styles.showPasswordButton}>
                                <Text style={styles.showPasswordText}>{hidePassword ? 'Показати' : 'Приховати'}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={onCloseKeyboard}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Увійти</Text>
                            </TouchableOpacity>
                        </View>
                </KeyboardAvoidingView>
                <Text style={styles.link}>Немає акаунту? Зареєструватися</Text>
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
        gap: 16,
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