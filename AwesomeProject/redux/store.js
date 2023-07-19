import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import { authSlice } from './auth/authReducer';
// import { configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { composeWithDevTools } from '@redux-devtools/extension';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    
})

// const composeEnhancers = composeWithDevTools({
//   // Specify here name, actionsDenylist, actionsCreators and other options
// });
const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    // reducer,
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);
