import {createSlice} from '@reduxjs/toolkit';
import { profileUpdate, userSignin, signup, imageUpdate } from './UserActions';


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

        // .addCase(userSignin.fulfilled, (state, action) => {
        //     const userData = action?.payload?.user_data;
        //     if (userData) {
        //         state.accessToken = userData.access_token;
        //         state.refreshToken = userData.refresh_token;
        //         state.userDetails = userData.userDetails;
        //     } else {
        //         console.error("No user data available.");
        //     }
        // })

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
    }
})

export const {resetAll, setUserDetails} = userSlice.actions;

export default userSlice.reducer;