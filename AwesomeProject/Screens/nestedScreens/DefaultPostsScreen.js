import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

export default function DefaultPostsScreen({ route } ) {

    
    const [posts, setPosts] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        if (route.params) setPosts((prev) => [...prev, route.params]);
        
    
    }, [route.params])
    console.log(posts, 'this is posts');

    return (
        <View style={styles.container}>
            <View >
            <FlatList data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image style={styles.postImage} source={{ uri: item.photo }} />
                        <View>
                            <View style={styles.postName}>
                                <Text>{`${item.postName}`}</Text>
                            </View>
                            <View style={styles.postDetailsContainer} >
                                <TouchableOpacity style={styles.postDetails} onPress={() => navigation.navigate("CommentsScreen")}>
                                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                                    <Text style={styles.postComments}>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.postDetails} onPress={() => navigation.navigate('Map', { item })}>
                                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                                    <Text style={styles.postLocation}>{`${item.transformedCoords.region}, ${item.transformedCoords.country}`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)} 
            />                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    postContainer: {
        justifyContent: 'center',
        marginBottom: 32,
        marginHorizontal: 10,
    },
    postImage: {
        height: 240,
        marginBottom: 10,
        borderRadius: 8,
    },
    postName: {
        fontSize: 16,
        color: '#212121',
        marginBottom: 8,
    },
    postDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postDetails: {
        color: '#212121',
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,

    },
    postComments: {
        fontSize: 16,
        color: '#BDBDBD',
    },
    postLocation: {
        fontSize: 16,
        color: '#212121',
    },
})