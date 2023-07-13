import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { authLoginStatusChange } from '../redux/auth/authOperations';

import { selectRoute } from '../routes/routes';


export const Main = () => {
    const {loginStatus} = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authLoginStatusChange())
    }, [loginStatus])

    const routing = selectRoute(loginStatus)

    return(
        <NavigationContainer>
        {routing}
        </NavigationContainer>)
}
