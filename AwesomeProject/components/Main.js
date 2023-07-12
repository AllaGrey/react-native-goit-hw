import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { selectRoute } from '../routes/routes';
import db from '../firebase/config';


export const Main = () => {
    const [loggedUser, setLoggedUser] = useState(null)
    
    db.default.auth().onAuthStateChanged((user)=> setLoggedUser(user))
    // console.log(isLogged, 'this is islogged');

    const routing = selectRoute(false)
    console.log(routing, 'routing');

    return(
        <NavigationContainer>
        {routing}
        </NavigationContainer>)
}

// export default Main;