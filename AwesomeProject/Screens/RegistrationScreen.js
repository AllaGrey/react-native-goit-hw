import { useState, useEffect } from 'react';
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
    Keyboard,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { authRegister } from '../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

import db from '../firebase/config'
import { uid } from 'uid';

const defaultAvatarURL = 'https://firebasestorage.googleapis.com/v0/b/react-native-social-netw-2eb91.appspot.com/o/avatarImage%2Fno-photo-icon-22.jpg?alt=media&token=22799411-430b-4b7d-b4f4-d2ebb9ea9c0a'

const initialState = {
    name: '',
    email: '',
    password: '',
    avatar: '',
}


export default function RegistrationScreen({ navigation, route }) {
    const [user, setUser] = useState(initialState)

    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const [isOnFocusInput, setIsOnFocusInput] = useState('')
    const [photo, setPhoto] = useState('');

    const dispatch = useDispatch()

    useEffect(() => {
        if(route.params) setPhoto(route.params.photo)
    }, [route])
    
    const uploadPhotoToServer = async () => {
        
        const resp = await fetch(`${photo}`)
        const file = await resp.blob()
        const fileId = uid(10)

        await db.storage().ref(`avatarImage/${fileId}`).put(file)
        const dbPhoto = await db.storage().ref('avatarImage').child(fileId).getDownloadURL()

        return dbPhoto
    }

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

    const onSubmitRegister = async () => {
        let dbAvatarURL;

        if (photo) dbAvatarURL = await uploadPhotoToServer()
        
        if(!photo) dbAvatarURL = defaultAvatarURL
        
        console.log(photo, 'photo');
        console.log(dbAvatarURL, 'dbAvatar')
        console.log(user, 'user from register');
        dispatch(authRegister({ ...user, avatar: dbAvatarURL }))
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
                        <Image style={styles.photo} source={photo !== '' ? {uri: photo} : require('../assets/images/no-photo-icon-22.jpg')}/>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={photo ? {...styles.addPhotoButton, borderColor: '#BDBDBD'} : {...styles.addPhotoButton, borderColor: '#FF6C00'}}
                                onPress={()=> navigation.navigate('Camera')}>
                            <Ionicons style={photo ? styles.removeIcon : styles.addIcon} name="add-outline" size={24} />
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

    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        position: 'absolute',
        
    },

    addPhotoButton: {
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        right: -14,
        bottom: 14,

    },

    addIcon: {
        color: '#FF6C00'
    },

    removeIcon: {
        color: '#BDBDBD',
        transform: [{rotate: '45deg'}],
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
    },


})