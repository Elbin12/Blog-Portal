import {createSlice} from '@reduxjs/toolkit';
import { profileUpdate, userSignin, signup, imageUpdate, createBlog, blogList, allBLogs, blogDetails, createComment } from './UserActions';


const access_token = localStorage.getItem("user_access_token");
const refresh_token = localStorage.getItem("user_refresh_token");
const userDetails = JSON.parse(localStorage.getItem("userDetails"));

console.log(access_token, 'accesss')

const initialState = {
    userDetails: userDetails? userDetails : null,
    accessToken: access_token? access_token : null,
    refreshToken: refresh_token? refresh_token : null,
    loading:false,
    success:false,
    error:'',
    message:'',
    blogs: [],
    selectedBlog:'',
    allBlogs: [],
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        resetAll:(state)=>{
            state.userDetails = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.loading = false;
            state.success = false;
            state.message = '';
            state.error = '';
        },
        setUserDetails: (state, action)=>{
            state.userDetails = action.payload;
        }
    },
    extraReducers(builder){
        builder
        .addCase(signup.pending, (state)=>{
            state.loading = true;
        })

        .addCase(signup.fulfilled, (state, action)=>{
            state.userDetails = action?.payload?.data;
            state.success = true;
        })

        .addCase(signup.rejected, (state, action)=>{
            state.error = action?.payload;
        })

        .addCase(userSignin.pending, (state)=>{
            state.loading = true;
        })

        .addCase(userSignin.fulfilled, (state, action)=>{
            const userData = action?.payload?.user_data;
            localStorage.setItem("user_access_token", userData?.access_token);
            console.log("kkk");
            localStorage.setItem("user_refresh_token", userData?.refresh_token);
            localStorage.setItem("userDetails", JSON.stringify(userData?.userDetails));
            console.log('kkk',action?.payload?.user_data?.access_token, )
            state.accessToken = userData?.access_token;
            state.refreshToken = userData?.refresh_token;
            state.userDetails = userData?.userDetails;
        })

        .addCase(userSignin.rejected, (state, action) => {
            state.error = action?.payload;
        })

        .addCase(profileUpdate.pending, (state)=>{
            state.pending = true;
        })

        .addCase(profileUpdate.fulfilled, (state, action) => {
            state.userDetails = {...state.userDetails, user_profile: action?.payload}
            localStorage.setItem("userDetails", JSON.stringify({...state.userDetails, user_profile: action?.payload}));
        })

        .addCase(profileUpdate.rejected, (state, action) => {
            state.error = action?.payload;
        })

        .addCase(imageUpdate.pending, (state)=>{
            state.pending = true;
        })

        .addCase(imageUpdate.fulfilled, (state, action)=>{
            state.userDetails = {...state.userDetails, user_profile: {...state.userDetails.user_profile, profile_pic:action?.payload}}
        })

        .addCase(createBlog.pending, (state) => {
            state.pending = true;
        })

        .addCase(createBlog.fulfilled, (state, action) => {
            state.blogs = [...state.blogs, action?.payload];
        })

        .addCase(createBlog.rejected, (state, action) => {
            state.error = action?.payload;
        })

        .addCase(blogList.pending, (state)=>{
            state.pending = true;
        })

        .addCase(blogList.fulfilled, (state, action) => {
            console.log(action?.payload, 'kjh')
            state.blogs = action?.payload;
        })

        .addCase(blogList.rejected, (state, action) => {
            state.error = action?.payload;
        })

        .addCase(blogDetails.pending, (state) => {
            state.pending = true;
        })

        .addCase(blogDetails.fulfilled, (state, action) => {
            state.selectedBlog = action?.payload;
        })

        .addCase(blogDetails.rejected, (state, action) => {
            state.error = action?.payload;
        })

        .addCase(allBLogs.pending, (state) => {
            state.pending = true;
        })

        .addCase(allBLogs.fulfilled, (state, action) => {
            state.allBlogs = action?.payload;
        })

        .addCase(allBLogs.rejected, (state, action) => {
            state.error = action?.payload;
        })

        .addCase(createComment.pending, (state)=>{
            state.pending = true;
        })

        .addCase(createComment.fulfilled, (state, action) => {
            state.selectedBlog = {...state.selectedBlog, comments: [...state.selectedBlog.comments, action?.payload]}
        })

        .addCase(createComment.rejected, (state, action)=>{
            state.error = action?.payload;
        })
    }
})

export const {resetAll, setUserDetails} = userSlice.actions;

export default userSlice.reducer;