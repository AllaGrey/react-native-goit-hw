import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = () => {
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                name="DefaultPosts"
                component={DefaultPostsScreen}
                options={{ headerShown: false }} />
            <NestedScreen.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{ title: 'Коментарі' }} />
            <NestedScreen.Screen
                name="Map"
                component={MapScreen}
                options={{ title: 'Мапа' }} />
        </NestedScreen.Navigator>
    )
}