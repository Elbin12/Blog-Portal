import { createAsyncThunk } from "@reduxjs/toolkit";
import { siginService, userBlockService, userDetailService, usersService } from "./AdminService";


export const adminSignin = createAsyncThunk(
    'adminSignin',
    async (data, {rejectWithValue})=>{
        try{
            const response = await siginService(data);
            console.log(response.data, 'admin');
            
            return response.data;
        }catch(error){
            console.log(error, 'errrr')
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

export const users = createAsyncThunk(
    'users',
    async (data, {rejectWithValue})=>{
        try{
            const response = await usersService();
            console.log('kkk', response )
            return response.data;
        }catch(error){
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

export const userDetails = createAsyncThunk(
    'userDetails',
    async(id, {rejectWithValue}) => {
        try{
            const response = await userDetailService(id);
            return response.data;
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const userBlock = createAsyncThunk(
    'userBlock',
    async (data, {rejectWithValue}) => {
        try{
            const response = await userBlockService(data);
            return response.data;
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
)