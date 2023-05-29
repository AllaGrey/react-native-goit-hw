import { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";


export default function ProfileScreen({navigation}) {
    

    return (
        <View style={styles.container}>
            <Text>This is ProfileScreen Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})