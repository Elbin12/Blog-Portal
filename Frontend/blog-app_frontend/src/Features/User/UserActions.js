import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogDetailsService, blogListingService, BlogsService, createBlogService, createCommentService, imageUploadService, profileUpdateService, signupService, singinService } from "./UserService";

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

export const imageUpdate = createAsyncThunk(
    'imageUpdate',
    async (data, {rejectWithValue}) => {
        try{
            const response = await imageUploadService(data);
            console.log(response, 'lk');
            return response.data;
        }catch(error){
            console.log(error, 'imageupload error');
            return rejectWithValue(error?.response?.data?.error);
        }
    }
)

export const createBlog = createAsyncThunk(
    'createBlog',
    async (data, {rejectWithValue}) => {
        try{
            console.log('lkk');
            const response = await createBlogService(data);
            console.log(response, 'createBlog')
            return response.data;
        }catch(error){
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

export const blogList = createAsyncThunk(
    'blogList',
    async (data, {rejectWithValue}) => {
        try{
            console.log('jhhh');
            
            const response = await blogListingService();
            console.log(response, 'blog list')
            return response.data;
        }catch(error){
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

export const allBLogs = createAsyncThunk(
    'allBlogs',
    async(data, {rejectWithValue}) => {
        try{
            const response = await BlogsService();
            return response.data;
        }catch(error){
            return rejectWithValue(error?.response?.data?.error)
        }
    }
)

export const blogDetails = createAsyncThunk(
    'blogDetails',
    async (id, {rejectWithValue}) => {
        try{
            const response = await BlogDetailsService(id);
            console.log(response.data, 'selected blog')
            return response.data;
        }catch(error){
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

export const createComment = createAsyncThunk(
    'createComment',
    async (data, {rejectWithValue}) => {
        try{
            const response = await createCommentService(data);
            return response.data;
        }catch(error){
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);