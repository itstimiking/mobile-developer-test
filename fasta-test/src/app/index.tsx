import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { checkAuthStatus } from '../store/slices/authSlice';

const index = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.isAuth)
    const checkingAuth = useAppSelector(state=>state.auth.loading)
    const user = useAppSelector(state=>state.auth.user)

    if(!checkAuthStatus && isAuth && user)
        return <Redirect href={'/dashboard'} />

    if(!checkingAuth && !isAuth)
        return <Redirect href={'/dashboard'} />

    useEffect(()=>{
        dispatch(checkAuthStatus())
    },[isAuth])

    return (
        <View className='flex-1 bg-teal-400 justify-center items-center'>
            {!checkingAuth && <ActivityIndicator size={40} color={'white'} />}
            <Text>loading...</Text>
        </View>
    )
}

export default index