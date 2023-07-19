import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import db from '../../firebase/config'

export default function DefaultPostsScreen({ route }) {

    const [posts, setPosts] = useState([])
    const navigation = useNavigation()
    const { nickname, userId, avatar } = useSelector(state => state.auth)
    

    useEffect(() => {
        getAllPosts();
        return () => getAllPosts();
    }, []);

    const getAllPosts = async() => {
        return await db.firestore().collection('posts').onSnapshot((querySnapshot) => {
            const newPosts = querySnapshot.docs.map((doc) => {
                const { id } = doc;
                const post = doc.data();
                const newPost = { ...post, id };
                setPosts(prevPosts => {

                    const existingPostIndex = prevPosts.findIndex(prevPost => prevPost.id === newPost.id);
                    if (existingPostIndex === -1) {
                        return [...prevPosts, newPost]
                    } else {
                        return [...prevPosts]
                    }
                })
            
                getTotalComments(post, id)

                return newPosts
            });

        });
    };

    const getTotalComments = async (post, id) => {
        await db.firestore().
            collection(`posts/${id}/comments`).onSnapshot(commentsSnapshot => {
                const totalComments = commentsSnapshot.docs.length;

                    setPosts(prevPosts => {
                    const existingPostIndex = prevPosts.findIndex(prevPost => prevPost.id === id);
                    if (existingPostIndex !== -1) {

                    const updatedPosts = [...prevPosts];
                    updatedPosts[existingPostIndex].totalComments = totalComments;
                    return updatedPosts;
                    }

                })
            })
    }


    const onLikePress = async (e) => {

        let updatedLikes = [];
        let likeIndex = -1;

        const currentDBDocRef = db.firestore().collection('posts').doc(e.id);

        const currentPost = (await currentDBDocRef.get()).data();

        if (currentPost.likes !== undefined) {
            const likeIndex = currentPost.likes.findIndex((like) => like === userId);

            if (likeIndex !== -1) {
            updatedLikes = currentPost.likes.filter((like) => like !== userId);

            await currentDBDocRef.update({
                likes: updatedLikes,
            });
            }
        }

            if (likeIndex === -1) {
                updatedLikes.push(userId);
                await currentDBDocRef.update({
                likes: updatedLikes,
                });
                    }
            
            await db.firestore().runTransaction(async (transaction) => {
                transaction.update(currentDBDocRef, { likes: updatedLikes });
            });

            return updatedLikes;
            };


    return (
        <View style={styles.container}>
            <View >
            <FlatList data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <View style={styles.postUserInfoContainer}>
                            <View style={styles.postAvatarContainer}>
                                <Image style={styles.postAvatar} source={{ uri: avatar }} />
                            </View>
                            <Text>{nickname}</Text>
                        </View>
                        <Image style={styles.postImage} source={{ uri: item.dbPhoto }} />
                        <View>
                            <View style={styles.postName}>
                                <Text>{`${item.postName}`}</Text>
                            </View>
                            <View style={styles.postDetailsContainer} >
                                
                                <TouchableOpacity style={styles.postDetails} onPress={() => navigation.navigate("CommentsScreen", {id: item.id, uri: item.dbPhoto})}>
                                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                                    <Text style={styles.postComments}>{item.totalComments}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.postDetails} onPress={(e) => onLikePress(item)}>
                                    <Feather name="thumbs-up" size={24} color={item.likes > 0 ? '#FF6C00' : '#BDBDBD'} />
                                    <Text style={styles.postComments}>{item.likes ? item.likes.length : 0}</Text>
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
    postUserInfoContainer: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 5,
    },
    postAvatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 16,
        overflow: 'hidden',
    },
    postAvatar: {
        width: '100%',
        height: '100%'
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