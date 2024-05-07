import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import studentSlice from './slice/studentSlice';
import adminSlice from './slice/adminSlice';
import instructorSlice from './slice/instructorSlice';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['student', 'admin', 'instructor'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    student: studentSlice,
    admin: adminSlice,
    instructor: instructorSlice
}));

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

export default store;