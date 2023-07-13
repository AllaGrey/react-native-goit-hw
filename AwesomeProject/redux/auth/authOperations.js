
import db from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authRegister =  ({name, email, password}) => async (dispatch, getState) => {
    try {
        await db.default.auth().createUserWithEmailAndPassword(email, password)

        const user = await db.default.auth().currentUser

        await user.updateProfile({
            displayName: name,
        })

        const {displayName, uid} = await db.default.auth().currentUser

        dispatch(authSlice.actions.updateUserStatus({userId: uid, nickname: displayName}))

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
    }
export const authLogin = ({ email, password }) => async (dispatch, getState) => { 
    try {
        await db.default.auth().signInWithEmailAndPassword(email, password);

        const {displayName, uid} = await db.default.auth().currentUser

        dispatch(authSlice.actions.updateUserStatus({userId: uid, nickname: displayName}))

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
}
export const authLoginStatusChange = () => async (dispatch, getState) => { 
    try {
        
        await db.default.auth().onAuthStateChanged((user) => {

            if (user) {
                dispatch(authSlice.actions.updateUserStatus({ userId: user.uid, nickname: user.displayName }))
                dispatch(authSlice.actions.updateLoginStatus({ loginStatus: true }))
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
        await db.default.auth().signOut()
        dispatch(authSlice.actions.resetUserStatus())
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
}
