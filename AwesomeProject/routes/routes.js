import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import Home from '../Screens/Home';

  const AuthStack = createNativeStackNavigator();

export const selectRoute = (isLogIn) => {

 
    return (
          <AuthStack.Navigator>
            <AuthStack.Screen name='Registration' component={RegistrationScreen} options={{headerShown: false}}/>
            <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        </AuthStack.Navigator>
        
    ); 
  }