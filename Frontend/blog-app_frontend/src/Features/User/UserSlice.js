import {createSlice} from '@reduxjs/toolkit';
import { signin, signup } from './UserActions';

const accessToken = localStorage.getItem('AccessToken');
const refreshToken = localStorage.getItem('RefreshToken');
const userDetails = JSON.parse(localStorage.getItem('userDetails'));

console.log(userDetails, 'fff')
const initialState = {
    userDetails: userDetails ? userDetails : null,
    accessToken: accessToken? accessToken : null,
    refreshToken: refreshToken? refreshToken : null,
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

        .addCase(signin.pending, (state)=>{
            state.loading = true;
        })

        .addCase(signin.fulfilled, (state, action)=>{
            localStorage.setItem("AccessToken", action?.payload?.user_data?.access_token);
            localStorage.setItem("RefreshToken", action?.payload?.user_data?.refresh_token);
            localStorage.setItem("userDetails", JSON.stringify(action?.payload?.user_data?.userDetails));
            console.log(action?.payload?.user_data?.userDetails, 'kkk')
            state.accessToken = action?.payload?.user_data?.access_token;
            state.refreshToken = action?.payload?.user_data?.refresh_token;
            state.userDetails = action?.payload?.user_data?.userDetails;
        })

        .addCase(signin.rejected, (state, action) => {
            state.error = action?.payload;
        })
    }
})

export const {resetAll, setUserDetails} = userSlice.actions;

export default userSlice.reducer;