
import db from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authRegister =  ({name, email, password}) => async (dispatch, getState) => {
    try {
        await db.default.auth().createUserWithEmailAndPassword(email, password)
        console.log(user, 'this is user');
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
        const { user } = await db.default.auth().signInWithEmailAndPassword(email, password);
        dispatch(authSlice.actions.updateUserStatus({userId: user.uid}))
        console.log(user, 'user is logged in');

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
}
const authLogout = () => async (dispatch, getState) => { }
