import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function CommentsScreen({route}) {
    return (
        <View style={styles.container} >
            <Text>This is comments</Text>
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