import React, {useEffect, useState} from "react"
import { View, Text, StyleSheet } from "react-native"
import MapView, {Marker} from 'react-native-maps';

export default function MapScreen({ route }) {

    const location = route.params.item.location;

    useEffect(() => {

        async () => {
            const { location } = await route.params;

        }
    
    }, [route])
    

    return (
        <View style={styles.container} >
        <MapView style={styles.map}
            region={{
                latitude: location.latitude,
                longitude: location.longitude,

                }}
                minZoomLevel={15}
            >
                <Marker
                title="I am here"
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                description='Hello'
            />
            </MapView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    map: {
        flex: 1,

    }
})