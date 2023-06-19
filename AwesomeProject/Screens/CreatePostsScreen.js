import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";

import { Camera, CameraType, AutoFocus, FlashMode } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

import * as Location from 'expo-location';

import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function CreatePostsScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [type, setType] = useState(CameraType.back);
    
    const [photo, setPhoto] = useState('');
    const [location, setLocation] = useState(null);
    const [transformedCoords, setTransformedCoords] = useState(null);
    const [postName, setPostName] = useState('');
    const [sendValidation, setSendValidation] = useState(false)

    useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === "granted");

    })();
    }, []);
    
    useEffect(() => {
    (async () => {

        
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});

        const coords = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            };
            setLocation(coords);

        const transformLocation = await Location.reverseGeocodeAsync(coords);
        const {region, country} = transformLocation[0];

        setTransformedCoords({ region, country });

    })();
    }, []);

    useEffect(() => {

        if (!location || !photo || postName === '' || !transformedCoords) {
            return setSendValidation(false)
    
        }

        return setSendValidation(true)
    }, [location, photo, transformedCoords, postName])
    

    if (hasPermission === null) {
    return <View />;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    const takePhoto = async () => {

        if (cameraRef) {
            // setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
            const { uri } = await cameraRef.takePictureAsync();
            await MediaLibrary.createAssetAsync(uri);
            setPhoto(uri);
        }      
    }

    const onChangePostName = (inputValue) => {
        setPostName(inputValue);
    }

    const onSend = () => {

        if(location) navigation.navigate('DefaultPosts', { photo, postName, location, transformedCoords });
        setPhoto('');
        setPostName('');
    }

    const onDeletePhoto = () => {
        setPhoto('');
        setPostName('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.camera}
                    ref={setCameraRef}
                    type={type}
                    autoFocus={AutoFocus.on}
                    flashMode={FlashMode.auto}
                >
                    {photo !== '' &&
                        <View style={styles.photo}>
                            <Image style={styles.photo} source={{uri: photo}} />
                        </View>}
                <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
                    <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cameraType}
                        onPress={()=> setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))}>
                        <MaterialIcons name="flip-camera-ios" size={24} color="#BDBDBD" />
                    </TouchableOpacity>                
            </Camera>
            </View>
            <View style={styles.cameraTextContainer} ><Text style={styles.cameraText} >{photo !== '' ? 'Редагувати фото' : 'Завантажте фото'}</Text></View>
            <View style={styles.inputContainer} >
                <TextInput style={styles.input} placeholder='Назва...' onChangeText={onChangePostName}  />
                <View style={styles.locationInputContainer} >
                    <View style={styles.inputIconContainer}>
                        <Feather name="map-pin" size={24} color="#BDBDBD" />
                    </View>
                    <TextInput style={styles.input} placeholder='Місцевість...' value={transformedCoords ? `${transformedCoords.region}, ${transformedCoords.country}` : null } />
                </View>
            </View>
            <TouchableOpacity style={!sendValidation ? {...styles.button, backgroundColor: '#F6F6F6'} : {...styles.button, backgroundColor: '#FF6C00'} } onPress={onSend} disabled={!sendValidation} >
                <Text style={styles.buttonText}>Опубліковати</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon} onPress={onDeletePhoto}>
                    <Feather name="trash-2" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#E5E5E5',
    },
    cameraContainer: {
        height: 300,
        marginTop: 32,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',

    },
    camera: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 8,
        justifyContent: 'center',

    },
    cameraType: {
        width: 60,
        height: 60,
        borderRadius: 50,
        // backgroundColor: '#FFFFFF',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    snapContainer: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    snap: {
        marginTop: 250,
    },
    cameraText: {
        fontSize: 16,
        color: '#BDBDBD',
    },
    cameraTextContainer: {
        marginTop: 8,

    },
    photo: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
    },
    inputContainer: {
        flex: 1,
        gap: 16,
        marginTop: 32,
    },
    locationInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        
    },
    inputIconContainer: {

    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        height: 51,
        borderRadius: 100,
    },
    buttonText: {
        color: '#BDBDBD',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 120,
    },
})