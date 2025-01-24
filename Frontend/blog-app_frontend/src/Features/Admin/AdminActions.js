import { createAsyncThunk } from "@reduxjs/toolkit";
import { siginService, usersService } from "./AdminService";


export const signin = createAsyncThunk(
    'signin',
    async (data, {rejectWithValue})=>{
        try{
            const response = await siginService(data);
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