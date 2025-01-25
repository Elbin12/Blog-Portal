import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileUpdateService, signupService, singinService } from "./UserService";

export const signup = createAsyncThunk(
    "signup", 
    async (data, {rejectWithValue})=>{
        try{
            const response = await signupService(data);
            return response.data;
        }catch(error){
            console.error(error)
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

export const userSignin = createAsyncThunk(
    'signin',
    async (data, {rejectWithValue})=>{
        try{
            const response = await singinService(data);
            console.log(response.data, 'signin data')
            return response.data
        }catch(error){
            console.log(error, 'signin error')
            return rejectWithValue(error?.response?.data?.error)
        }
    }
);

export const profileUpdate = createAsyncThunk(
    'profileUpdate',
    async (data, {rejectWithValue}) => {
        try{
            const response = await profileUpdateService(data);
            console.log(response, 'lk');
            
            return response.data;
        }catch(error){
            console.log('err', error)
            return rejectWithValue(error?.response?.data?.error)
        }
    }
);