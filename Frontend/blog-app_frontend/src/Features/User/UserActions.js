import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupService, singinService } from "./UserService";

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

export const signin = createAsyncThunk(
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
)