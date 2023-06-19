import { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
// import PostsScreen from './PostsScreen';
import { HomeTab } from '../routes/HomeTab';

export default function Home() {
    
    return (

            <HomeTab/>

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})