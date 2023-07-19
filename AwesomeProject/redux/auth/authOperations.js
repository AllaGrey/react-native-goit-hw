
import db from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authRegister =  ({name, email, password, avatar}) => async (dispatch, getState) => {
    try {
        await db.auth().createUserWithEmailAndPassword(email, password)

        const user = await db.auth().currentUser
        console.log(avatar, 'avatar');
        

        await user.updateProfile({
            displayName: name,
            photoURL: avatar,
        })

        const {displayName, photoURL, uid} = await db.auth().currentUser

        console.log(photoURL);
        dispatch(authSlice.actions.updateUserStatus({userId: uid, nickname: displayName, photoURL}))

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
    }
export const authLogin = ({ email, password }) => async (dispatch, getState) => { 
    try {
        await db.auth().signInWithEmailAndPassword(email, password);

        const {displayName, photoURL, uid} = await db.auth().currentUser

        dispatch(authSlice.actions.updateUserStatus({userId: uid, nickname: displayName, photoURL}))

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
}
export const authLoginStatusChange = () => async (dispatch, getState) => { 
    try {
        
        await db.auth().onAuthStateChanged((user) => {
            console.log(user);
            
            if (user) {
                const { displayName, photoURL, uid } = user;
                dispatch(authSlice.actions.updateLoginStatus({ loginStatus: true }))
                dispatch(authSlice.actions.updateUserStatus({ userId: uid, nickname: displayName, photoURL }))
                
            }
        });

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
}

export const authUpdateUserAvatar = (avatar) => async (dispatch, getState) => { 
    try {

        const user = await db.auth().currentUser
        console.log(avatar, 'avatar');
        

        await user.updateProfile({
            photoURL: avatar,
        })
        
        await db.auth().onAuthStateChanged((user) => {
            console.log(user);
            
            if (user) {
                const { displayName, photoURL, uid } = user;
                dispatch(authSlice.actions.updateLoginStatus({ loginStatus: true }))
                dispatch(authSlice.actions.updateUserStatus({ userId: uid, nickname: displayName, photoURL }))
                
            }
        });

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
}

export const authLogout = () => async (dispatch, getState) => {
    try {
        await db.auth().signOut()
        dispatch(authSlice.actions.resetUserStatus())
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
}
