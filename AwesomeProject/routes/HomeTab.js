import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import CreatePostsScreen from '../Screens/CreatePostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { TouchableOpacity } from 'react-native';
import {PostsScreen} from '../Screens/PostScreen';



  const MainTab = createBottomTabNavigator();
  

export const HomeTab = () => {

const navigation = useNavigation()

    return (
        <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }} >
            <MainTab.Screen name='Posts' component={PostsScreen} options={{
                title: 'Публікації',
                headerTintColor: "#212121",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 17,
                    
                },
                // headerShown: false,
                headerRight: () => (
                    <Feather name="log-out" size={24}
                        color="#BDBDBD" 
                        onPress={()=>navigation.navigate('Login')}
                        />
                ),
                tabBarIcon: ({ focused, size, color }) => 
            <Feather name="grid" size={size} color={color} />
        }}/>
            <MainTab.Screen name='Create' component={CreatePostsScreen} options={{
                title: 'Створити публікацію',
                tabBarIcon: ({ focused, size, color }) => 
                    <TouchableOpacity
                        style={{
                            width: 70,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#FF6C00',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={()=>navigation.navigate('Create')}>
                        <Feather name="plus" size={size} color="#FFFFFF" />
                    </TouchableOpacity>
               
            
            }} />
            <MainTab.Screen name='Profile' component={ProfileScreen} options={{
                headerShown: false,
            tabBarIcon: ({ focused, size, color }) => 
            <Feather name="user" size={size} color={color} />}} />
        </MainTab.Navigator> 
    )
  }


