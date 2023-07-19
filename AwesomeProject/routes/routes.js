import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import Home from '../Screens/Home';
import { HomeTab } from './HomeTab';
import { CameraScreen } from '../Screens/CameraScreen';

  const AuthStack = createNativeStackNavigator();

export const selectRoute = (routing) => {

  if (routing) {
    return <HomeTab/>
  }
    return (
          <AuthStack.Navigator>
        <AuthStack.Screen name='Registration' component={RegistrationScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name='Camera' component={CameraScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        </AuthStack.Navigator>
        
    ); 
  }