import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import db from '../firebase/config';
import { authLogout, authUpdateUserAvatar } from '../redux/auth/authOperations';


import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Image, SafeAreaView, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({navigation}) {
    const [posts, setPosts] = useState([])
    const { nickname, userId, avatar } = useSelector(state => state.auth)
    
    const dispatch = useDispatch()
    const defaultAvatarURL = 'https://firebasestorage.googleapis.com/v0/b/react-native-social-netw-2eb91.appspot.com/o/avatarImage%2Fno-photo-icon-22.jpg?alt=media&token=22799411-430b-4b7d-b4f4-d2ebb9ea9c0a'

        useEffect(() => {
        getAllPosts();
        return () => getAllPosts();
    }, []);

        const getAllPosts = async() => {
        return await db.firestore().collection('posts').where('userId', '==', userId).onSnapshot((querySnapshot) => {
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

    const onLogout = () => {
        dispatch(authLogout())
        
    }

    const onDeleteAvatar = async () => {
        dispatch(authUpdateUserAvatar(defaultAvatarURL))
    }

    // const onLikePress = async (e) => {
    //     console.log(e.id, 'onPress');
    //     let updatedLikes=[];
        

    //     const currentDBDocRef = await db.firestore().collection(`posts`).doc(e.id)

    //     const currentPost = await (await currentDBDocRef.get()).data()

    //     console.log(currentPost.likes, 'CURRENT POST LIKES');

    //     console.log(currentDBDocRef);
        
    //     if (currentPost.likes !== undefined) {
    //         const likeIndex = currentPost.likes.findIndex(like => like === userId)

    //     console.log(likeIndex);

    //     if (likeIndex !== -1) {
    //         updatedLikes = currentPost.likes.filter((like) => like !== userId);
    //         console.log(updatedLikes);
    //         await currentDBDocRef.update({
    //             likes: updatedLikes
    //         })
    //         }
        
    //     } else {
    //         return updatedLikes = currentPost.likes.push(userId)
    //     }

    //     updatedLikes = [userId]
        
    //     await currentDBDocRef.update({
    //             likes: updatedLikes
    //         })

            
    //     }
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
        <>
        <ImageBackground
                style={styles.background}
                source={require('../assets/images/bg.jpg')} />
                <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.imageWrap}>
                    <Image style={styles.photo} source={{uri: avatar}}/>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.addPhotoButton}
                        onPress={onDeleteAvatar}>
                        <Ionicons name="add-outline" size={24} color="#E8E8E8" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.logoutIconContainer} onPress={onLogout}>
                    <Feather name="log-out" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>{nickname}</Text>
                </View>
                <SafeAreaView>
                    <FlatList data={posts}
                    removeClippedSubviews={true}
                    contentContainerStyle={styles.flatListContent}
                            keyExtractor={(item) => item.id.toString()}
                            viewAreaCoveragePercentThreshold={20}
                    renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image style={styles.postImage} source={{ uri: item.dbPhoto }} />
                        <View>
                            <View style={styles.postName}>
                                <Text>{`${item.postName}`}</Text>
                            </View>
                            <View style={styles.postDetailsContainer} >
                                <TouchableOpacity style={styles.postDetails} onPress={() => navigation.navigate("CommentsScreen", {id: item.id, uri: item.dbPhoto})}>
                                    <Feather name="message-circle" size={24} color={item.totalComments > 0 ? '#FF6C00' : '#BDBDBD'} style={styles.commentsIcon} />
                                        <Text style={styles.postComments}>{item.totalComments}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={(e) => onLikePress(item)}>
                                        <Feather name="thumbs-up" size={24} color={item.likes > 0 ? '#FF6C00' : '#BDBDBD'} />
                                        <Text style={styles.postComments}>{item.likes ? item.likes.length : 0}</Text>    
                                </TouchableOpacity>    

                                <TouchableOpacity style={styles.postDetails} onPress={() => navigation.navigate('Map', { item })}>
                                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                                    <Text style={styles.postLocation}>{`${item.transformedCoords.country}`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)} 
                    /> 
                </SafeAreaView>
            </View>
            </View>
            </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        // top: 0,
        // resizeMode: 'cover',

    }, 
    
    loginContainer: {
        // position: 'absolute',
        height: '90%',
        width: '100%',
        backgroundColor: '#FFFFFF', 
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 32,
        paddingBottom: 80,
        alignItems: 'center',
        // paddingHorizontal: 10,
        top: '25%'

    },

    imageWrap: {
        width: 120,
        height: 120,
        borderRadius: 16,
        top: -60,
        backgroundColor: '#F6F6F6',

    },

    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        position: 'absolute',
        
    },
        
    addPhotoButton: {
        position: 'absolute',
        // width: 25,
        // height: 25,
        borderRadius: 50,
        borderColor: '#E8E8E8',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        right: -14,
        bottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{rotate: '45deg'}]
        // padding: 0,

    },

    logoutIconContainer: {
        position: 'absolute',
        top: 50,
        right: 10,
    },

    title: {
        fontSize: 30,
        color: '#212121',

    },

    postContainer: {
        justifyContent: 'center',
        // marginBottom: 32,
        // marginHorizontal: 10,
        width: '100%'
    },

    flatListContent: {
        // position: 'absolute',
        // zIndex: 3,
        // top: 500,
        width: 350,
        marginBottom: 580,
        // height: 800,
        
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

    commentsIcon: {
        transform: [{rotate: '270deg'}]
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