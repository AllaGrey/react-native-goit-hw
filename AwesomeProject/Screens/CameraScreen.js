import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"

import { useState, useEffect } from 'react';

import { Camera, CameraType, AutoFocus, FlashMode } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

import { MaterialIcons, Feather } from '@expo/vector-icons';

export const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [type, setType] = useState(CameraType.front);
    const [photo, setPhoto] = useState('');

        useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");

        })();
    }, [])
    
    if (hasPermission === null) {
    return <View />;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    const onTakePhoto = async () => {
        if (cameraRef) {
            // setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
            const { uri } = await cameraRef.takePictureAsync();
            await MediaLibrary.createAssetAsync(uri);
            setPhoto(uri);
        } 
    }    

    const onDeletePhoto = () => {
        setPhoto('');

    }

    const onSendPhoto = () => {
        setPhoto('')
        navigation.navigate('Registration', {photo})
        
    }
console.log(photo);
    return (
            <View style={styles.container}>
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={setCameraRef}
                    autoFocus={AutoFocus.on}
                    flashMode={FlashMode.auto}>

                    {photo !== '' ?
                    (
                        <View style={styles.photo}>
                            <Image style={styles.photo} source={{ uri: photo }} />
                            <TouchableOpacity style={styles.snapContainer} onPress={onDeletePhoto}>
                                <Feather name="trash-2" size={24} color="#BDBDBD" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onSendPhoto} >
                                <Text style={styles.buttonText}>Зберегти</Text>
                            </TouchableOpacity>
                        </View>
                    ) :
                    (
                        <>
                            <TouchableOpacity
                                style={styles.cameraType}
                                onPress={() => setType(current =>
                                    (current === CameraType.back ? CameraType.front : CameraType.back))}>
                                <MaterialIcons name="flip-camera-ios" size={24} color="#BDBDBD" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.snapContainer}
                                onPress={onTakePhoto}>
                                <MaterialIcons
                                    name="camera-alt"
                                    size={24}
                                    color="#BDBDBD" />
                            </TouchableOpacity>
                        </>
                        )}
                </Camera>
            </View> 
        )
}

const styles = StyleSheet.create({
        container: {
        flex: 1,


    },

    camera: {
        width: '100%',
        height: '100%'
    },

    text: {},
    snapContainer: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        transform: [{translateX: -30}],
        left: '50%'
    },

    cameraType: {
        width: 60,
        height: 60,
        borderRadius: 50,
        // backgroundColor: '#FFFFFF',
        top: 20,
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },

    cameraText: {
        fontSize: 16,
        color: '#BDBDBD',
    },

    cameraTextContainer: {
        marginTop: 8,
    },

    photo: {
        width: '100%',
        height: '100%'
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 32,
        height: 51,
        width: 100,
        borderRadius: 100,
        backgroundColor: '#BDBDBD',
        opacity: 0.5,
        position: 'absolute',
        bottom: 100,
        left: '50%',
        transform: [{translateX: -50}] 
    },
    buttonText: {
        color: '#FFFFFF',
    },
})