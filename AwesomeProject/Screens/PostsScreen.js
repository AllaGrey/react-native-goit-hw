import { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";


export default function PostsScreen({navigation}) {
    

    return (
        <View style={styles.container}>
            <Text>This is PostsScreen Page</Text>
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