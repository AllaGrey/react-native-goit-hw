// import { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";


export default function CreatePostsScreen({navigation}) {
    

    return (
        <View style={styles.container}>
            <Text>This is CreatePostsScreen Page</Text>
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