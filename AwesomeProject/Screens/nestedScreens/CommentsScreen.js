import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import db from '../../firebase/config';

import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    
} from "react-native"
import { Feather } from '@expo/vector-icons'; 



export default function CommentsScreen({ route }) {
    const [comment, setComment] = useState('');
    const [commentsCollection, setCommentsCollection] = useState([])
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const {nickname, avatar, userId} = useSelector(state => state.auth)
    const {id, uri} = route.params

    // console.log(nickname);
    // console.log(id);
    // console.log(uri);
        // const commentDate = new Date().toLocaleString()
        // console.log(commentDate);

    useEffect(() => {
        getAllComments()
    }, [])
    

    const onAddComment = async () => {
        const commentDate = new Date().toLocaleString()
        console.log(commentDate);
        await db.firestore().collection('posts').doc(id).collection('comments').add({ comment, nickname, avatar, postId: id, userId, commentDate })
        setComment('')
    }

    const getAllComments = async () => {
        await db.firestore().collection('posts').doc(id).collection('comments').orderBy('commentDate').onSnapshot((data) => setCommentsCollection(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    }

    const onFocusInput = () => {
        setIsShowKeyboard(true)
    }

    const onCloseKeyboard = () => {
        setIsShowKeyboard(false)
        Keyboard.dismiss()
        
    }

    return (
        <View style={styles.container} >
            {/* <ScrollView> */}
                <View style={styles.postImageContainer}>
                <Image style={styles.postImage} source={{uri}}/>
            </View>

                <FlatList
                    style={styles.listContainer}
                    data={commentsCollection}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        {/* <Image style={styles.avatarImage} source={{ uri: item.dbAvatar }} /> */}
                            <View style={styles.avatarImage}>
                                <Image style={styles.avatarIcon} source={{uri: item.avatar}}/>
                                {/* <Text>{`${item.nickname}`}</Text> */}
                            </View>
                            <View style={styles.commentTextContainer}>
                                <Text style={styles.commentText}>{`${item.comment}`}</Text>
                                <Text>{`${item.commentDate}`}</Text>
                            </View>
                    </View>)}/>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Коментувати..."
                    value={comment} 
                    onFocus={onFocusInput}
                    onChangeText={(value) => setComment(value)}
                    />
                <TouchableOpacity
                    style={styles.addCommentBtn}
                    onPress={onAddComment}>
                        <Feather name="arrow-up" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
            </View>
            {/* </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 32,
        paddingBottom: 15,
        // justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        gap: 32,
        paddingBottom: 40,
    },

    postImageContainer: {
        width: '100%',
        height: 240,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,
    },

    postImage: {
        width: '100%',
        height: '100%',
    },

    listContainer: {
        flexDirection: 'column',
        gap: 24,
        marginBottom: 15,
    },

    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 16,
        marginBottom: 24,
        paddingHorizontal: 5,
    },

    avatarImage: {
        width: 38,
        height: 38,
        borderRadius: '50%',
        overflow: 'hidden',
    },

    avatarIcon: {
        width: '100%',
        height: '100%',

    },

    commentTextContainer: {
        backgroundColor: '#BDBDBD',
        padding: 16,
        borderRadius: 8,
        width: '80%'
    },

    commentText: {},

    commentDate: {
        justifyContent: 'flex-end',
    },

    inputContainer: {
        width: '100%',
        height: 50,
        borderRadius: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 16,
        backgroundColor: '#F6F6F6',
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
    },

    input: {
        color: '#BDBDBD',
        fontSize: 16,
    },

    addCommentBtn: {
        width: 34,
        height: 34,
        backgroundColor: '#FF6C00',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
    },
})